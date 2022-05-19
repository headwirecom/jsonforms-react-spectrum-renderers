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
  Cell,
  Column,
  Content,
  Dialog,
  DialogContainer,
  Divider,
  Flex,
  Heading,
  Row,
  TableBody,
  TableHeader,
  TableView,
  Text,
  Tooltip,
  TooltipTrigger,
  View,
} from '@adobe/react-spectrum';

import './table-cell.css';

import Delete from '@spectrum-icons/workflow/Delete';
import {
  ArrayFooter,
  ArrayHeader,
  getChildError,
  getUIOptions,
} from './Array/utils';

const { createLabelDescriptionFrom } = Helpers;

const {
  or,
  isObjectArrayControl,
  isPrimitiveArrayControl,
  rankWith,
  and,
} = Test;

const isTableOptionSet: Test.Tester = (uischema) => !!uischema.options?.table;

/**
 * Alternative tester for an array that also checks whether the 'table'
 * option is set.
 * @type {RankedTester}
 */
export const SpectrumTableArrayControlTester: RankedTester = rankWith(
  3,
  or(
    and(isObjectArrayControl, isTableOptionSet),
    and(isPrimitiveArrayControl, isTableOptionSet)
  )
);

const SpectrumTableArrayControl = ({
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
    handleClose();
    removeItems(p, [deleteIndex])();
    setdeleteIndex(0);
  };

  const controlElement = uischema as ControlElement;
  const createControlElement = (key?: string): ControlElement => ({
    type: 'Control',
    label: false,
    scope: schema.type === 'object' ? `#/properties/${key}` : '#',
  });

  const labelObject = createLabelDescriptionFrom(controlElement, schema);

  const UNSAFE_error = {
    color: 'rgb(215, 55, 63)',
  };

  const headerColumns: JSX.Element[] = schema.properties
    ? Object.keys(schema.properties)
        .filter((prop) => schema.properties[prop].type !== 'array')
        .map((prop) => <Column key={prop}>{startCase(prop)}</Column>)
    : [<Column key='items'>Items</Column>];

  const uioptions = getUIOptions(uischema, labelObject.text);
  const add = addItem(path, createDefaultValue(schema));

  return (
    <View
      UNSAFE_className='spectrum-table-array-control'
      isHidden={visible === undefined || visible === null ? false : !visible}
    >
      <ArrayHeader
        {...uioptions}
        add={add}
        allErrorsMessages={childErrors.map((e) => e.message)}
        labelText={isPlainLabel(label) ? label : label.default}
      />
      <TableView
        aria-label={label + 'TableView'}
        overflowMode='wrap'
        density='compact'
      >
        <TableHeader>
          {[
            ...headerColumns,
            <Column key='none' width={70}>
              &nbsp;
            </Column>,
          ]}
        </TableHeader>
        <TableBody>
          {!data || !Array.isArray(data) || data.length === 0 ? (
            <Row>
              {[...headerColumns, 3].map((_, index) =>
                index === 0 ? (
                  <Cell key={index}>No Data</Cell>
                ) : (
                  <Cell key={index}>&nbsp;</Cell>
                )
              )}
            </Row>
          ) : (
            data.map((_child, index) => {
              const childPath = Paths.compose(path, `${index}`);

              const rowCells: JSX.Element[] = schema.properties
                ? Object.keys(schema.properties)
                    .filter((prop) => schema.properties[prop].type !== 'array')
                    .map((prop) => {
                      const childPropPath = Paths.compose(
                        childPath,
                        prop.toString()
                      );

                      return (
                        <Cell key={childPropPath}>
                          <Flex direction='column' width='100%'>
                            <DispatchCell
                              schema={Resolve.schema(
                                schema,
                                `#/properties/${prop}`,
                                rootSchema
                              )}
                              uischema={createControlElement(prop)}
                              path={childPath + '.' + prop}
                            />
                            <View
                              UNSAFE_style={UNSAFE_error}
                              isHidden={
                                getChildError(childErrors, childPropPath) === ''
                              }
                            >
                              <Text>
                                {getChildError(childErrors, childPropPath)}
                              </Text>
                            </View>
                          </Flex>
                        </Cell>
                      );
                    })
                : [
                    <Cell key={Paths.compose(childPath, index.toString())}>
                      <Flex direction='column' width='100%'>
                        <DispatchCell
                          schema={schema}
                          uischema={createControlElement()}
                          path={childPath}
                        />
                        <View
                          UNSAFE_style={UNSAFE_error}
                          isHidden={
                            getChildError(childErrors, childPath) === ''
                          }
                        >
                          <Text>{getChildError(childErrors, childPath)}</Text>
                        </View>
                      </Flex>
                    </Cell>,
                  ];

              return (
                <Row key={childPath}>
                  {[
                    ...rowCells,
                    <Cell key={`delete-row-${index}`}>
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
                    </Cell>,
                  ]}
                </Row>
              );
            })
          )}
        </TableBody>
      </TableView>
      <ArrayFooter {...uioptions} add={add} />
    </View>
  );
};

export default withJsonFormsArrayControlProps(SpectrumTableArrayControl);
