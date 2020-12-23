/*
  The MIT License

  Copyright (c) 2017-2019 EclipseSource Munich
  https://github.com/eclipsesource/jsonforms

  Copyright (c) 2020 headwire.com, Inc
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
import React, { ComponentType } from 'react';
import {
  Text,
  Flex,
  ActionButton,
  View,
  DialogTrigger,
  TooltipTrigger,
  Tooltip,
  AlertDialog,
} from '@adobe/react-spectrum';
import {
  composePaths,
  ControlElement,
  findUISchema,
  getData,
  JsonFormsRendererRegistryEntry,
  JsonFormsState,
  JsonSchema,
  Resolve,
  UISchemaElement,
  UISchemaTester,
} from '@jsonforms/core';
import {
  areEqual,
  JsonFormsStateContext,
  ResolvedJsonFormsDispatch,
  withJsonFormsContext,
} from '@jsonforms/react';
import Delete from '@spectrum-icons/workflow/Delete';
import ChevronDown from '@spectrum-icons/workflow/ChevronDown';
import ChevronUp from '@spectrum-icons/workflow/ChevronUp';
import { find, omit } from 'lodash';

import './SpectrumArrayItem.css';

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

const SpectrumArrayItem = ({
  index,
  childLabel,
  expanded,
  removeItem,
  path,
  handleExpand,
  schema,
  uischema,
  uischemas,
  renderers,
}: StatePropsOfSpectrumArrayItem) => {
  const foundUISchema = findUISchema(uischemas, schema, uischema.scope, path);
  const childPath = composePaths(path, `${index}`);
  return (
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
            <ActionButton
              onPress={handleExpand(index)}
              isQuiet={true}
              aria-label={`expand-item-${childLabel}`}
            >
              {expanded ? <ChevronUp /> : <ChevronDown />}
            </ActionButton>
            <DialogTrigger>
              <TooltipTrigger delay={0}>
                <ActionButton
                  isQuiet={true}
                  aria-label={`delete-item-${childLabel}`}
                >
                  <Delete />
                </ActionButton>
                <Tooltip>Delete</Tooltip>
              </TooltipTrigger>
              <AlertDialog
                variant='confirmation'
                title='Delete'
                primaryActionLabel='Delete'
                cancelLabel='Cancel'
                autoFocusButton='primary'
                onPrimaryAction={removeItem(path, index)}
              >
                Are you sure you wish to delete this item?
              </AlertDialog>
            </DialogTrigger>
          </View>
        </Flex>
      </View>
      {expanded ? (
        <View>
          <ResolvedJsonFormsDispatch
            schema={schema}
            uischema={foundUISchema || uischema}
            path={childPath}
            key={childPath}
            renderers={renderers}
          />
        </View>
      ) : (
        ''
      )}
    </View>
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
    ? find(Object.keys(schema.properties), (propName: any) => {
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
  const childLabel = uischema.options.elementLabelProp
    ? childData[uischema.options.elementLabelProp]
    : firstPrimitiveProp
    ? childData[firstPrimitiveProp]
    : '';

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
): ComponentType<OwnPropsOfSpectrumArrayItem> =>
  withJsonFormsContext(
    withContextToSpectrumArrayItemProps(
      React.memo(
        Component,
        (
          prevProps: StatePropsOfSpectrumArrayItem,
          nextProps: StatePropsOfSpectrumArrayItem
        ) =>
          areEqual(
            omit(prevProps, ['handleExpand', 'removeItem']),
            omit(nextProps, ['handleExpand', 'removeItem'])
          )
      )
    )
  );

export default withJsonFormsSpectrumArrayItemProps(SpectrumArrayItem);
