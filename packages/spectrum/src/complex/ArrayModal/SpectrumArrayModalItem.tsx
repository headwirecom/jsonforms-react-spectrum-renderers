/*
  The MIT License

  Copyright (c) 2017-2019 EclipseSource Munich
  https://github.com/eclipsesource/jsonforms

  Copyright (c) 2022 headwire.com, Inc
  https://github.com/headwirecom/jsonforms-react-spectrum-renderers


  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.
*/
import React, { useState, useCallback, ComponentType } from 'react';
import {
  ActionButton,
  Button,
  ButtonGroup,
  Content,
  Dialog,
  DialogContainer,
  Divider,
  Flex,
  Heading,
  Text,
  Tooltip,
  TooltipTrigger,
  View,
} from '@adobe/react-spectrum';
import {
  CombinatorProps,
  ControlElement,
  JsonFormsRendererRegistryEntry,
  JsonFormsState,
  JsonSchema,
  OwnPropsOfControl,
  Resolve,
  UISchemaElement,
  UISchemaTester,
  composePaths,
  findUISchema,
  getData,
} from '@jsonforms/core';
import {
  JsonFormsStateContext,
  ResolvedJsonFormsDispatch,
  areEqual,
  withJsonFormsContext,
} from '@jsonforms/react';

import Delete from '@spectrum-icons/workflow/Delete';
import ChevronDown from '@spectrum-icons/workflow/ChevronDown';
import ChevronUp from '@spectrum-icons/workflow/ChevronUp';

import './SpectrumArrayModalItem.css';

import SpectrumProvider from '../../additional/SpectrumProvider';

export interface OwnPropsOfSpectrumArrayItem {
  index: number;
  expanded: boolean;
  path: string;
  schema: JsonSchema;
  handleExpand(index: number): () => void;
  removeItem(path: string, value: number): () => void;
  uischema: ControlElement;
  renderers?: JsonFormsRendererRegistryEntry[];
  uischemas?: {
    tester: UISchemaTester;
    uischema: UISchemaElement;
  }[];
}

export interface StatePropsOfSpectrumArrayItem
  extends OwnPropsOfSpectrumArrayItem {
  childLabel: string;
}

export interface OwnOneOfProps extends OwnPropsOfControl {
  indexOfFittingSchema?: number;
}
const SpectrumArrayModalItem = ({
  childLabel,
  expanded,
  handleExpand,
  index,
  indexOfFittingSchema,
  path,
  removeItem,
  renderers,
  schema,
  uischema,
  uischemas,
}: StatePropsOfSpectrumArrayItem & CombinatorProps) => {
  const foundUISchema = findUISchema(uischemas, schema, uischema.scope, path);
  const childPath = composePaths(path, `${index}`);
  const [open, setOpen] = useState(false);
  const handleClose = useCallback(() => setOpen(false), [setOpen]);
  return (
    <SpectrumProvider>
      <View
        borderWidth='thin'
        borderColor='dark'
        borderRadius='medium'
        padding='size-250'
      >
        <View aria-selected={expanded}>
          <Flex
            direction='row'
            margin='size-50'
            justifyContent='space-between'
            alignItems='center'
          >
            <View UNSAFE_className='spectrum-array-item-number'>
              <Text>{index + 1}</Text>
            </View>
            <ActionButton
              flex='auto'
              isQuiet
              onPress={handleExpand(index)}
              aria-label={`expand-item-${childLabel}`}
            >
              <Text UNSAFE_style={{ textAlign: 'left' }}>{childLabel}</Text>
            </ActionButton>
            <View>
              <TooltipTrigger delay={0}>
                <ActionButton
                  onPress={handleExpand(index)}
                  isQuiet={true}
                  aria-label={`expand-item-${childLabel}`}
                >
                  {expanded ? (
                    <ChevronUp aria-label='Collapse' />
                  ) : (
                    <ChevronDown aria-label='Expand' />
                  )}
                </ActionButton>
                <Tooltip>{expanded ? 'Collapse' : 'Expand'}</Tooltip>
              </TooltipTrigger>
              <TooltipTrigger delay={0}>
                <ActionButton
                  onPress={() => setOpen(true)}
                  aria-label={`delete-item-${childLabel}`}
                >
                  <Delete aria-label='Delete' />
                </ActionButton>
                <Tooltip>Delete</Tooltip>
              </TooltipTrigger>
              <DialogContainer onDismiss={handleClose}>
                {open && (
                  <Dialog>
                    <Heading>Delete Item?</Heading>
                    <Divider />
                    <Content>
                      Are you sure you wish to delete this item?
                    </Content>
                    <ButtonGroup>
                      <Button variant='secondary' onPress={handleClose}>
                        Cancel
                      </Button>
                      <Button
                        autoFocus
                        variant='cta'
                        onPressStart={removeItem(path, index)}
                        onPressEnd={handleClose}
                      >
                        Delete
                      </Button>
                    </ButtonGroup>
                  </Dialog>
                )}
              </DialogContainer>
            </View>
          </Flex>
        </View>
        {expanded ? (
          <View>
            <ResolvedJsonFormsDispatch
              key={childPath}
              path={childPath + 'SPLITHERE' + indexOfFittingSchema}
              renderers={renderers}
              schema={schema}
              uischema={foundUISchema || uischema}
            />
          </View>
        ) : (
          ''
        )}
      </View>
    </SpectrumProvider>
  );
};

/**
 * Map state to control props.
 * @param state the store's state
 * @param ownProps any own props
 * @returns {StatePropsOfControl} state props for a control
 */
export const mapStateToSpectrumArrayItemProps = (
  state: JsonFormsState,
  ownProps: OwnPropsOfSpectrumArrayItem
): StatePropsOfSpectrumArrayItem => {
  const { schema, path, index, uischema } = ownProps;
  const firstPrimitiveProp = schema.properties
    ? Object.keys(schema.properties).find((propName) => {
        const prop = schema.properties[propName];
        return (
          prop.type === 'string' ||
          prop.type === 'number' ||
          prop.type === 'integer'
        );
      })
    : undefined;
  const childPath = composePaths(path, `${index}`);
  const childData = Resolve.data(getData(state), childPath);
  const childLabel =
    uischema.options?.elementLabelProp ??
    firstPrimitiveProp ??
    Object.values(childData)[uischema.options?.DataAsLabel] ??
    `Item ${index + 1}`;

  return {
    ...ownProps,
    childLabel,
  };
};

export const ctxToSpectrumArrayItemProps = (
  ctx: JsonFormsStateContext,
  ownProps: OwnPropsOfSpectrumArrayItem
) => mapStateToSpectrumArrayItemProps({ jsonforms: { ...ctx } }, ownProps);

const withContextToSpectrumArrayItemProps = (
  Component: ComponentType<StatePropsOfSpectrumArrayItem>
): ComponentType<OwnPropsOfSpectrumArrayItem> => ({
  ctx,
  props,
}: JsonFormsStateContext & StatePropsOfSpectrumArrayItem) => {
  const stateProps = ctxToSpectrumArrayItemProps(ctx, props);
  return <Component {...stateProps} />;
};

export const withJsonFormsSpectrumArrayItemProps = (
  Component: ComponentType<StatePropsOfSpectrumArrayItem>
): ComponentType<any> =>
  withJsonFormsContext(
    withContextToSpectrumArrayItemProps(
      React.memo(
        Component,
        (
          prevProps: StatePropsOfSpectrumArrayItem,
          nextProps: StatePropsOfSpectrumArrayItem
        ) => {
          const {
            handleExpand: prevHandleExpand,
            removeItem: prevRemoveItem,
            ...restPrevProps
          } = prevProps;
          const {
            handleExpand: nextHandleExpand,
            removeItem: nextRemoveItem,
            ...restNextProps
          } = nextProps;
          return areEqual(restPrevProps, restNextProps);
        }
      )
    )
  );

export default withJsonFormsSpectrumArrayItemProps(SpectrumArrayModalItem);
