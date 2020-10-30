/* tslint:disable */
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
  Table,
  Row,
  Column,
  TableBody,
  TableHeader,
  Cell,
} from '@react-spectrum/table';

const { createLabelDescriptionFrom, convertToValidClassName } = Helpers;

const { or, isObjectArrayControl, isPrimitiveArrayControl, rankWith } = Test;

/**
 * Alternative tester for an array that also checks whether the 'table'
 * option is set.
 * @type {RankedTester}
 */
export const tableArrayControlTester: RankedTester = rankWith(
  3,
  or(isObjectArrayControl, isPrimitiveArrayControl)
);

class TableArrayControl extends React.Component<ArrayControlProps, any> {
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
    const labelClass = ''; // getStyleAsClassName('array.table.label');
    const buttonClass = ''; // getStyleAsClassName('array.table.button');
    const controlClass = [
      'array-table-layout control', // getStyleAsClassName('array.table'),
      convertToValidClassName(controlElement.scope),
    ].join(' ');
    const createControlElement = (key?: string): ControlElement => ({
      type: 'Control',
      label: false,
      scope: schema.type === 'object' ? `#/properties/${key}` : '#',
    });
    const labelObject = createLabelDescriptionFrom(controlElement, schema);
    const isValid = errors.length === 0;
    const divClassNames = 'validation' + (isValid ? '' : ' validation_error');
    const labelText = isPlainLabel(label) ? label : label.default;

    const headerColumns: JSX.Element[] = schema.properties
      ? fpflow(
          fpkeys,
          fpfilter((prop) => schema.properties[prop].type !== 'array'),
          fpmap((prop) => <Column key={prop}>{fpstartCase(prop)}</Column>)
        )(schema.properties)
      : [<Column>Items</Column>];

    return (
      <div className={controlClass} hidden={!visible}>
        <header>
          <label className={labelClass}>{labelText}</label>
          <button
            className={buttonClass}
            onClick={addItem(path, createDefaultValue(schema))}
          >
            Add to {labelObject.text}
          </button>
        </header>
        <div className={divClassNames}>{!isValid ? errors : ''}</div>
        <Table>
          <TableHeader>
            {[
              ...headerColumns,
              <Column key='valid'>Valid</Column>,
              <Column key='none'>&nbsp;</Column>,
            ]}
          </TableHeader>
          <TableBody>
            {!data || !Array.isArray(data) || data.length === 0 ? (
              <Row>
                <Cell>No data</Cell>
                <Cell>No data</Cell>
                <Cell>No data</Cell>
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
                      <Cell key='errors'>
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
                      <Cell key='delete'>
                        <button
                          aria-label={`Delete`}
                          onClick={() => {
                            if (
                              window.confirm(
                                'Are you sure you wish to delete this item?'
                              )
                            ) {
                              this.confirmDelete(childPath, index);
                            }
                          }}
                        >
                          Delete
                        </button>
                      </Cell>,
                    ]}
                  </Row>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default withJsonFormsArrayControlProps(TableArrayControl);
