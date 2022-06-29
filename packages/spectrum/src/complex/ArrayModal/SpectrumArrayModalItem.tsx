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
import React, { useState, useEffect, useCallback, ComponentType } from 'react';
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
import Edit from '@spectrum-icons/workflow/Edit';
import SaveFloppy from '@spectrum-icons/workflow/SaveFloppy';
import SaveAsFloppy from '@spectrum-icons/workflow/SaveAsFloppy';
import ChevronUp from '@spectrum-icons/workflow/ChevronUp';
import ChevronDown from '@spectrum-icons/workflow/ChevronDown';

import './SpectrumArrayModalItem.css';

import SpectrumProvider from '../../additional/SpectrumProvider';
import { indexOfFittingSchemaObject } from './utils';

interface NonEmptyRowProps {
  rowIndex: number;
  moveUpCreator: (path: string, position: number) => () => void;
  moveDownCreator: (path: string, position: number) => () => void;
}
export interface OwnPropsOfSpectrumArrayModalItem {
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

export interface StatePropsOfSpectrumArrayModalItem
  extends OwnPropsOfSpectrumArrayModalItem {
  childLabel: string;
  childData: any;
}

const SpectrumArrayModalItem = React.memo(
  ({
    childLabel,
    childData,
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
  }: StatePropsOfSpectrumArrayModalItem &
    CombinatorProps &
    NonEmptyRowProps) => {
    const foundUISchema = findUISchema(uischemas, schema, uischema.scope, path);
    const childPath = composePaths(path, `${index}`);
    const [open, setOpen] = useState(false);
    const handleClose = useCallback(() => setOpen(false), [setOpen]);

    const findValue: any = (obj: any, key: string) => {
      if (obj[key]) {
        return obj[key];
      }
      for (const prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          if (typeof obj[prop] === 'object') {
            const result: any = findValue(obj[prop], key);
            if (result) {
              return result;
            }
          }
        }
      }
    };

    useEffect(() => {
      indexOfFittingSchemaObject[childPath] =
        indexOfFittingSchema ??
        findValue(childData, 'indexOfFittingSchema') ??
        0;

      /* let fittingSchema = null;
schema.map((item,index) => item.componentType.title === childData.componentType ? fittingSchema = index : null); */
      if (uischema.options?.OneOfModal) {
        indexOfFittingSchemaObject['OneOfModal'] = true;
      }
      if (uischema.options?.OneOfPicker) {
        indexOfFittingSchemaObject['OneOfPicker'] = true;
      }
    }, []);

    const enableDetailedView = false;

    // window.addEventListener('message', (event) => {
    //   console.log(event);
    // });
    // let callOnClose = false;

    // I don't know why, but postmessage is always called, even though if statement is skipped!
    // useEffect(() => {
    //   console.log('~ expanded || callOnClose', expanded, callOnClose);
    //   if (expanded || callOnClose) {
    //     window.postMessage({ index, path, label: childLabel }, '*');
    //     callOnClose = expanded ? true : false;
    //   }
    // }, [expanded]);

    return (
      <SpectrumProvider flex='auto' width={'100%'}>
        <View
          UNSAFE_className={`list-array-item ${
            enableDetailedView && 'enableDetailedView'
          } ${expanded ? 'expanded' : 'collapsed'}`}
          borderWidth='thin'
          borderColor='dark'
          borderRadius='medium'
          padding='size-150'
        >
          <View aria-selected={expanded} UNSAFE_className='array-item-header'>
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
                <Text
                  UNSAFE_className='spectrum-array-item-name'
                  UNSAFE_style={{ textAlign: 'left' }}
                >
                  {childLabel}
                </Text>
              </ActionButton>
              <View>
                <Flex gap={enableDetailedView ? 'size-300' : ''}>
                  {enableDetailedView && expanded && (
                    <TooltipTrigger delay={0}>
                      <ActionButton
                        onPress={() =>console.log('Pressed "Save & continue editing"')} //prettier-ignore
                        aria-label={`save-and-continue-editing-${childLabel}`}
                      >
                        <SaveAsFloppy />
                      </ActionButton>
                      <Tooltip>Save & continue editing</Tooltip>
                    </TooltipTrigger>
                  )}

                  <TooltipTrigger delay={0}>
                    <ActionButton
                      onPress={handleExpand(index)}
                      isQuiet={!enableDetailedView}
                      aria-label={`expand-item-${childLabel}`}
                    >
                      {
                        expanded ? (
                        enableDetailedView ? <SaveFloppy aria-label='Save & Close' /> : <ChevronUp aria-label='Collapse' /> //prettier-ignore
                      ) : //prettier-ignore
                      enableDetailedView ? <Edit aria-label='Edit' /> : <ChevronDown aria-label='Expand' /> //prettier-ignore
                      }
                    </ActionButton>
                    <Tooltip>
                      {expanded
                        ? enableDetailedView
                          ? 'Save & Close'
                          : 'Collapse'
                        : enableDetailedView
                        ? 'Edit'
                        : 'Expand'}
                    </Tooltip>
                  </TooltipTrigger>

                  <TooltipTrigger delay={0}>
                    <ActionButton
                      onPress={() => setOpen(true)}
                      aria-label={`delete-item-${childLabel}`}
                      isQuiet={enableDetailedView}
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
                </Flex>
              </View>
            </Flex>
          </View>
          {expanded ? (
            <View>
              <ResolvedJsonFormsDispatch
                key={childPath}
                path={childPath}
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
  }
);

/**
 * Map state to control props.No indexOfFittingSchema found
 * @param state the store's state
 * @param ownProps any own props
 * @returns {StatePropsOfControl} state props for a control
 */
export const mapStateToSpectrumArrayModalItemProps = (
  state: JsonFormsState,
  ownProps: OwnPropsOfSpectrumArrayModalItem
): StatePropsOfSpectrumArrayModalItem => {
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

  const findValue: any = (obj: any, key: string) => {
    if (obj[key]) {
      return obj[key];
    }
    for (const prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        if (typeof obj[prop] === 'object') {
          const result: any = findValue(obj[prop], key);
          if (result) {
            return result;
          }
        }
      }
    }
  };

  const childLabel =
    uischema.options?.elementLabelProp ??
    firstPrimitiveProp ??
    typeof uischema.options?.DataAsLabel === 'number'
      ? Object.values(childData)[uischema.options?.DataAsLabel]
      : findValue(childData, uischema.options?.DataAsLabel) ??
        `Item ${index + 1}`;

  return {
    ...ownProps,
    childLabel,
    childData,
  };
};

export const ctxToSpectrumArrayModalItemProps = (
  ctx: JsonFormsStateContext,
  ownProps: OwnPropsOfSpectrumArrayModalItem
) => mapStateToSpectrumArrayModalItemProps({ jsonforms: { ...ctx } }, ownProps);

const withContextToSpectrumArrayModalItemProps = (
  Component: ComponentType<StatePropsOfSpectrumArrayModalItem>
): ComponentType<OwnPropsOfSpectrumArrayModalItem> => ({
  ctx,
  props,
}: JsonFormsStateContext & StatePropsOfSpectrumArrayModalItem) => {
  const stateProps = ctxToSpectrumArrayModalItemProps(ctx, props);
  return <Component {...stateProps} />;
};

export const withJsonFormsSpectrumArrayModalItemProps = (
  Component: ComponentType<StatePropsOfSpectrumArrayModalItem>
): ComponentType<any> =>
  withJsonFormsContext(
    withContextToSpectrumArrayModalItemProps(
      React.memo(
        Component,
        (
          prevProps: StatePropsOfSpectrumArrayModalItem,
          nextProps: StatePropsOfSpectrumArrayModalItem
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

export default withJsonFormsSpectrumArrayModalItemProps(SpectrumArrayModalItem);
