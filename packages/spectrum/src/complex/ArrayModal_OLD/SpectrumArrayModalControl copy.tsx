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
import React, { Key, useCallback, useState } from 'react';
import {
  ArrayControlProps,
  JsonSchema,
  CombinatorProps,
  //OwnPropsOfControl,
  createDefaultValue,
  resolveSubSchemas,
  createCombinatorRenderInfos,
} from '@jsonforms/core';
import CombinatorProperties from '../CombinatorProperties';
import {
  ActionButton,
  Button,
  ButtonGroup,
  Dialog,
  DialogTrigger,
  Divider,
  Flex,
  Heading,
  Text,
  View,
  Picker,
  Item,
} from '@adobe/react-spectrum';
import SpectrumArrayModalItem from './SpectrumArrayModalItem';

/* export interface OwnOneOfProps extends OwnPropsOfControl {
  indexOfFittingSchema?: number;
} */

const oneOf = 'oneOf';
export const SpectrumArrayModalControl = ({
  addItem,
  data,
  handleChange,
  //indexOfFittingSchema,
  label,
  path,
  removeItems,
  renderers,
  rootSchema,
  schema,
  uischema,
  uischemas,
}: ArrayControlProps & CombinatorProps) => {
  const handleRemoveItem = useCallback(
    (p: string, value: any) => () => {
      removeItems(p, [value])();
    },
    [removeItems]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  //const [newSelectedIndex, setNewSelectedIndex] = useState(0);
  const _schema = resolveSubSchemas(schema, rootSchema, oneOf);
  const oneOfRenderInfos = createCombinatorRenderInfos(
    (_schema as JsonSchema).oneOf,
    rootSchema,
    oneOf,
    uischema,
    path,
    uischemas
  );

  const openNewTab = (newIndex: number) => {
    handleChange(path, createDefaultValue(schema.oneOf[newIndex]));
    setSelectedIndex(newIndex);
  };

  const [expaned, setExpaned] = useState<number>();

  const isExpaned = (index: number) => expaned === index;

  const onExpand = (index: number) => () =>
    setExpaned((current) => (current === index ? null : index));

  const addItemOnClick = useCallback(() => {
    addItem(path, createDefaultValue(schema.oneOf[1]))();
  }, [addItem, path, schema]);

  const handleOnClick = (close: any) => {
    addItemOnClick();
    close();
  };

  const handleTabChange = useCallback(
    (newOneOfIndex: Key) => {
      newOneOfIndex = Number(newOneOfIndex);
      openNewTab(newOneOfIndex);
    },
    [setSelectedIndex, data]
  );

  return (
    <View>
      <CombinatorProperties
        schema={_schema}
        combinatorKeyword={'oneOf'}
        path={path}
      />
      <Flex direction='row' justifyContent='space-between'>
        <Heading level={4}>{label}</Heading>
        <DialogTrigger>
          <ActionButton alignSelf='center'>+</ActionButton>
          {(close) => (
            <Dialog>
              <div style={{ gridColumn: '1 / -1' }}>
                <Heading margin='size-100'>Add a new item</Heading>
                <Divider />
                <Picker
                  selectedKey={String(selectedIndex)}
                  onSelectionChange={handleTabChange}
                  aria-label='Select'
                  width='calc(100% - size-200)'
                  margin='size-100'
                >
                  {oneOfRenderInfos.map((oneOfRenderInfo, oneOfIndex) => (
                    <Item key={oneOfIndex}>{oneOfRenderInfo.label}</Item>
                  ))}
                </Picker>
              </div>
              <ButtonGroup>
                <Button variant='secondary' onPress={close}>
                  Cancel
                </Button>
                <Button
                  variant='cta'
                  onPress={() => handleOnClick(close)}
                  autoFocus
                >
                  Confirm
                </Button>
              </ButtonGroup>
            </Dialog>
          )}
        </DialogTrigger>
      </Flex>
      <Flex direction='column' gap='size-100'>
        {data && data.length ? (
          Array.from(Array(data.length)).map((_, index) => {
            return (
              <SpectrumArrayModalItem
                oneOfIndex={index} //Test
                index={index}
                path={path}
                schema={schema}
                handleExpand={onExpand}
                removeItem={handleRemoveItem}
                expanded={isExpaned(index)}
                uischema={uischema}
                uischemas={uischemas}
                renderers={renderers}
                key={index}
                //indexOfFittingSchema={indexOfFittingSchema}
              ></SpectrumArrayModalItem>
            );
          })
        ) : (
          <Text>No data</Text>
        )}
      </Flex>
    </View>
  );
};
