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
import {
  and,
  ArrayLayoutProps,
  composePaths,
  computeLabel,
  createDefaultValue,
  findUISchema,
  isObjectArray,
  isPlainLabel,
  RankedTester,
  rankWith,
  uiTypeIs,
} from '@jsonforms/core';
import {
  ResolvedJsonFormsDispatch,
  withJsonFormsArrayLayoutProps,
} from '@jsonforms/react';
import map from 'lodash/map';
import range from 'lodash/range';
import React, { useCallback, useState } from 'react';
import ListWithDetailMasterItem from './ListWithDetailMasterItem';
import merge from 'lodash/merge';
import { ArrayLayoutToolbar } from './ArrayLayoutToolbar';
import { Flex, Heading, View } from '@adobe/react-spectrum';

export const SpectrumListWithDetailRenderer = ({
  uischemas,
  schema,
  uischema,
  path,
  errors,
  visible,
  label,
  required,
  removeItems,
  addItem,
  data,
  renderers,
  cells,
  config,
}: ArrayLayoutProps) => {
  const [selectedIndex, setSelectedIndex] = useState(undefined);

  const handleRemoveItem = useCallback(
    (p: string, value: any) => () => {
      removeItems(p, [value])();
      if (selectedIndex === value) {
        setSelectedIndex(undefined);
      } else if (selectedIndex > value) {
        setSelectedIndex(selectedIndex - 1);
      }
    },
    [removeItems, setSelectedIndex]
  );
  const handleListItemClick = useCallback(
    (index: number) => () => setSelectedIndex(index),
    [setSelectedIndex]
  );
  const handleCreateDefaultValue = useCallback(
    () => createDefaultValue(schema),
    [createDefaultValue]
  );
  const foundUISchema = findUISchema(
    uischemas,
    schema,
    uischema.scope,
    path,
    undefined,
    uischema
  );
  const appliedUiSchemaOptions = merge({}, config, uischema.options);

  const addItemAndSelectNewItem = (p: string, v: any) => () => {
    addItem(p, v)();
    setSelectedIndex(data);
  };

  return (
    <View isHidden={!visible} id={`${label}-list-with-details`}>
      <ArrayLayoutToolbar
        label={computeLabel(
          isPlainLabel(label) ? label : label.default,
          required,
          appliedUiSchemaOptions.hideRequiredAsterisk
        )}
        errors={errors}
        path={path}
        addItem={addItemAndSelectNewItem}
        createDefault={handleCreateDefaultValue}
      />
      <Flex direction='row'>
        <Flex direction='column' marginY='size-200' marginEnd='size-200'>
          {data > 0 ? (
            map(range(data), (index) => (
              <ListWithDetailMasterItem
                index={index}
                path={path}
                schema={schema}
                handleSelect={handleListItemClick}
                removeItem={handleRemoveItem}
                selected={selectedIndex === index}
                key={index}
              />
            ))
          ) : (
            <View>
              <p>No data</p>
            </View>
          )}
        </Flex>
        <View flex='auto'>
          {selectedIndex !== undefined ? (
            <ResolvedJsonFormsDispatch
              renderers={renderers}
              cells={cells}
              visible={visible}
              schema={schema}
              uischema={foundUISchema}
              path={composePaths(path, `${selectedIndex}`)}
            />
          ) : (
            <Heading level={4}>No Selection</Heading>
          )}
        </View>
      </Flex>
    </View>
  );
};

export const spectrumListWithDetailTester: RankedTester = rankWith(
  4,
  and(uiTypeIs('ListWithDetail'), isObjectArray)
);

export default withJsonFormsArrayLayoutProps(SpectrumListWithDetailRenderer);
