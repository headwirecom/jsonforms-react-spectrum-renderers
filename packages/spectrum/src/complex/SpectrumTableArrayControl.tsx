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
import React from 'react';
import fpfilter from 'lodash/fp/filter';
import fpmap from 'lodash/fp/map';
import fpflow from 'lodash/fp/flow';
import filter from 'lodash/filter';
import join from 'lodash/join';
import fpkeys from 'lodash/fp/keys';
import fpstartCase from 'lodash/fp/startCase';
import {
  ArrayControlProps,
  ControlElement,
  createDefaultValue,
  Helpers,
  isPlainLabel,
  Paths,
  RankedTester,
  Resolve,
  Test,
} from '@jsonforms/core';
import { DispatchCell, withJsonFormsArrayControlProps } from '@jsonforms/react';
import {
  Cell,
  Column,
  Row,
  Table,
  TableBody,
  TableHeader,
} from '@react-spectrum/table';
import {
  ActionButton,
  Flex,
  Header,
  Heading,
  Tooltip,
  TooltipTrigger,
  View,
  Well,
} from '@adobe/react-spectrum';

import Add from '@spectrum-icons/workflow/Add';
import Delete from '@spectrum-icons/workflow/Delete';

const { createLabelDescriptionFrom } = Helpers;

const { or, isObjectArrayControl, isPrimitiveArrayControl, rankWith } = Test;

/**
 * Alternative tester for an array that also checks whether the 'table'
 * option is set.
 * @type {RankedTester}
 */
export const spectrumTableArrayControlTester: RankedTester = rankWith(
  3,
  or(isObjectArrayControl, isPrimitiveArrayControl)
);

class SpectrumTableArrayControl extends React.Component<
  ArrayControlProps,
  any
> {
  confirmDelete = (path: string, index: number) => {
    const p = path.substring(0, path.lastIndexOf('.'));
    this.props.removeItems(p, [index])();
  };

  render() {
    const {
      addItem,
      uischema,
      schema,
      rootSchema,
      path,
      data,
      visible,
      errors,
      label,
      childErrors,
    } = this.props;

    const controlElement = uischema as ControlElement;

    const createControlElement = (key?: string): ControlElement => ({
      type: 'Control',
      label: false,
      scope: schema.type === 'object' ? `#/properties/${key}` : '#',
    });
    const labelObject = createLabelDescriptionFrom(controlElement, schema);
    const isValid = errors.length === 0;
    const labelText = isPlainLabel(label) ? label : label.default;

    const headerColumns: JSX.Element[] = schema.properties
      ? fpflow(
          fpkeys,
          fpfilter((prop) => schema.properties[prop].type !== 'array'),
          fpmap((prop) => <Column key={prop}>{fpstartCase(prop)}</Column>)
        )(schema.properties)
      : [<Column key='items'>Items</Column>];

    return (
      <View
        id='table-view'
        isHidden={visible === undefined || visible === null ? false : !visible}
      >
        <Header>
          <Flex
            direction='row'
            alignItems='center'
            justifyContent='space-between'
          >
            <Heading level={4}>{labelText}</Heading>
            <TooltipTrigger delay={0}>
              <ActionButton
                id='add-button'
                onPress={addItem(path, createDefaultValue(schema))}
              >
                <Add />
              </ActionButton>
              <Tooltip>Add to {labelObject.text}</Tooltip>
            </TooltipTrigger>
          </Flex>
        </Header>
        <Well id='validation' isHidden={isValid}>
          {!isValid ? errors : ''}
        </Well>
        <Table>
          <TableHeader>
            {[
              ...headerColumns,
              <Column key='valid'>Valid</Column>,
              <Column key='none' width={70}>
                &nbsp;
              </Column>,
            ]}
          </TableHeader>
          <TableBody>
            {!data || !Array.isArray(data) || data.length === 0 ? (
              <Row>
                {[...headerColumns, 3, 4].map((_, index) => (
                  <Cell key={index}>No data</Cell>
                ))}
              </Row>
            ) : (
              data.map((_child, index) => {
                const childPath = Paths.compose(path, `${index}`);
                // TODO
                const errorsPerEntry: any[] = filter(childErrors, (error) =>
                  error.dataPath.startsWith(childPath)
                );

                const rowCells: JSX.Element[] = schema.properties
                  ? fpflow(
                      fpkeys,
                      fpfilter(
                        (prop) => schema.properties[prop].type !== 'array'
                      ),
                      fpmap((prop) => {
                        const childPropPath = Paths.compose(
                          childPath,
                          prop.toString()
                        );

                        return (
                          <Cell key={childPropPath}>
                            <DispatchCell
                              schema={Resolve.schema(
                                schema,
                                `#/properties/${prop}`,
                                rootSchema
                              )}
                              uischema={createControlElement(prop)}
                              path={childPath + '.' + prop}
                            />
                          </Cell>
                        );
                      })
                    )(schema.properties)
                  : [
                      <Cell key={Paths.compose(childPath, index.toString())}>
                        <DispatchCell
                          schema={schema}
                          uischema={createControlElement()}
                          path={childPath}
                        />
                      </Cell>,
                    ];

                return (
                  <Row key={childPath}>
                    {[
                      ...rowCells,
                      <Cell key={`errors-row-${index}`}>
                        {errorsPerEntry ? (
                          <span
                            className={
                              'todo' /* getStyleAsClassName(
                              'array.validation.error'
                            ) */
                            }
                          >
                            {join(
                              errorsPerEntry.map((e) => e.message),
                              ' and '
                            )}
                          </span>
                        ) : (
                          <span>OK</span>
                        )}
                      </Cell>,
                      <Cell key={`delete-row-${index}`}>
                        <TooltipTrigger delay={0}>
                          <ActionButton
                            aria-label={`Delete row at ${index}`}
                            onPress={() => {
                              if (
                                window.confirm(
                                  'Are you sure you wish to delete this item?'
                                )
                              ) {
                                this.confirmDelete(childPath, index);
                              }
                            }}
                          >
                            <Delete />
                          </ActionButton>
                          <Tooltip>Delete</Tooltip>
                        </TooltipTrigger>
                      </Cell>,
                    ]}
                  </Row>
                );
              })
            )}
          </TableBody>
        </Table>
      </View>
    );
  }
}

export default withJsonFormsArrayControlProps(SpectrumTableArrayControl);
