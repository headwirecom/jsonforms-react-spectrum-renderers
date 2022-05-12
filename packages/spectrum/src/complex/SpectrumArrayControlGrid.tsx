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
import React, { useState, useCallback } from 'react';
import startCase from 'lodash/startCase';
import {
  ArrayControlProps,
  ControlElement,
  Helpers,
  Paths,
  RankedTester,
  Resolve,
  Test,
  createDefaultValue,
  isPlainLabel,
} from '@jsonforms/core';
import { DispatchCell, withJsonFormsArrayControlProps } from '@jsonforms/react';
import {
  ActionButton,
  Button,
  ButtonGroup,
  Content,
  Dialog,
  DialogContainer,
  Divider,
  Flex,
  Grid,
  Heading,
  Text,
  Tooltip,
  TooltipTrigger,
  View,
} from '@adobe/react-spectrum';

import Delete from '@spectrum-icons/workflow/Delete';
import {
  ArrayFooter,
  ArrayHeader,
  getChildError,
  getUIOptions,
} from './Array/utils';
import SpectrumProvider from '../additional/SpectrumProvider';

const { createLabelDescriptionFrom } = Helpers;

const {
  and,
  isObjectArrayControl,
  isPrimitiveArrayControl,
  or,
  rankWith,
} = Test;

const isTableOptionNotTrue: Test.Tester = (uischema) =>
  !uischema.options?.table;

export const SpectrumArrayControlGridTester: RankedTester = rankWith(
  3,
  or(
    and(isObjectArrayControl, isTableOptionNotTrue),
    and(isPrimitiveArrayControl, isTableOptionNotTrue)
  )
);

const errorFontSize = 0.8;
const errorStyle = {
  color: 'var(--spectrum-semantic-negative-color-default)',
  lineHeight: 1.3,
  fontSize: `${errorFontSize * 100}%`,
};

// Calculate minimum row height so that it does not change no matter if a call has an error message or not
const rowMinHeight = `calc(var(--spectrum-alias-font-size-default) * ${errorFontSize} * ${errorStyle.lineHeight} + var(--spectrum-alias-single-line-height))`;

const SpectrumArrayControlGrid = ({
  addItem,
  childErrors,
  data,
  label,
  path,
  removeItems,
  rootSchema,
  schema,
  uischema,
  visible,
}: ArrayControlProps) => {
  const [deleteIndex, setdeleteIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const handleClose = useCallback(() => setOpen(false), [setOpen]);

  const setOpenAndsetdeleteIndex = (index: number) => {
    setOpen(true);
    setdeleteIndex(index);
  };

  const confirmDelete = (path: string) => {
    const p = path.substring(0, path.lastIndexOf('.'));
    removeItems(p, [deleteIndex])();
    handleClose();
    setdeleteIndex(0);
  };

  const controlElement = uischema as ControlElement;
  const createControlElement = (key?: string): ControlElement => ({
    type: 'Control',
    label: false,
    scope: schema.type === 'object' ? `#/properties/${key}` : '#',
  });

  const labelObject = createLabelDescriptionFrom(controlElement, schema);

  const uioptions = getUIOptions(uischema, labelObject.text);
  const spacing: number[] = uischema.options?.spacing ?? [];
  const add = addItem(path, createDefaultValue(schema));
  const fields = schema.properties ? Object.keys(schema.properties) : ['items'];
  return (
    <View
      isHidden={visible === undefined || visible === null ? false : !visible}
    >
      <ArrayHeader
        {...uioptions}
        add={add}
        allErrorsMessages={childErrors.map((e) => e.message)}
        labelText={isPlainLabel(label) ? label : label.default}
      />
      {data && Array.isArray(data) && data.length > 0 && (
        <Grid
          columns={
            spacing.length
              ? `${fields.map((_, i) => `${spacing[i] || 1}fr`).join(' ')} 0fr`
              : `repeat(${fields.length}, 1fr) 0fr`
          }
          rows='auto'
          autoRows={`minmax(${rowMinHeight}, auto)`}
          columnGap='size-100'
        >
          {fields
            .map((prop) => (
              <View
                paddingBottom='size-50'
                justifySelf={
                  schema.properties?.[prop]?.type === 'boolean'
                    ? 'center'
                    : undefined
                }
                key={prop}
              >
                {startCase(prop)}
              </View>
            ))
            .concat(<View key='spacer' />)}
          {data.map((_, index) => {
            const childPath = Paths.compose(path, `${index}`);
            const rowCells: JSX.Element[] = schema.properties
              ? fields
                  .filter((prop) => schema.properties[prop].type !== 'array')
                  .map((prop) => {
                    const childPropPath = Paths.compose(
                      childPath,
                      prop.toString()
                    );
                    const isCheckbox =
                      schema.properties[prop].type === 'boolean';
                    return (
                      <View
                        key={childPropPath}
                        paddingStart={isCheckbox ? 'size-200' : undefined}
                      >
                        <Flex
                          direction='column'
                          width='100%'
                          alignItems={isCheckbox ? 'center' : 'start'}
                        >
                          <DispatchCell
                            schema={Resolve.schema(
                              schema,
                              `#/properties/${prop}`,
                              rootSchema
                            )}
                            uischema={
                              isCheckbox
                                ? {
                                    ...createControlElement(prop),
                                    options: { trim: true },
                                  }
                                : createControlElement(prop)
                            }
                            path={childPath + '.' + prop}
                          />
                          <View
                            UNSAFE_style={errorStyle}
                            isHidden={
                              getChildError(childErrors, childPropPath) === ''
                            }
                          >
                            <Text>
                              {getChildError(childErrors, childPropPath)}
                            </Text>
                          </View>
                        </Flex>
                      </View>
                    );
                  })
              : [
                  <View key={Paths.compose(childPath, index.toString())}>
                    <Flex direction='column' width='100%'>
                      <DispatchCell
                        schema={schema}
                        uischema={createControlElement()}
                        path={childPath}
                      />
                      <View
                        UNSAFE_style={errorStyle}
                        isHidden={getChildError(childErrors, childPath) === ''}
                      >
                        <Text>{getChildError(childErrors, childPath)}</Text>
                      </View>
                    </Flex>
                  </View>,
                ];
            return (
              <React.Fragment key={childPath}>
                {rowCells}
                <SpectrumProvider>
                  <TooltipTrigger delay={0}>
                    <ActionButton
                      onPress={() => setOpenAndsetdeleteIndex(index)}
                      aria-label={`delete-row-at-${index}`}
                    >
                      <Delete aria-label='Delete' />
                    </ActionButton>
                    <Tooltip>Delete</Tooltip>
                  </TooltipTrigger>
                  <DialogContainer onDismiss={handleClose}>
                    {open && (
                      <Dialog>
                        <Heading>Delete Row?</Heading>
                        <Divider />
                        <Content>
                          Are you sure you wish to delete this row?
                        </Content>
                        <ButtonGroup>
                          <Button variant='secondary' onPress={handleClose}>
                            Cancel
                          </Button>
                          <Button
                            autoFocus
                            variant='cta'
                            onPress={() => confirmDelete(childPath)}
                          >
                            Delete
                          </Button>
                        </ButtonGroup>
                      </Dialog>
                    )}
                  </DialogContainer>
                </SpectrumProvider>
              </React.Fragment>
            );
          })}
        </Grid>
      )}
      <ArrayFooter {...uioptions} add={add} />
    </View>
  );
};

export default withJsonFormsArrayControlProps(SpectrumArrayControlGrid);
