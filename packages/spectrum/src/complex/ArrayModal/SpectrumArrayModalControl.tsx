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
  CombinatorProps,
  JsonSchema,
  OwnPropsOfControl,
  createCombinatorRenderInfos,
  createDefaultValue,
  resolveSubSchemas,
} from '@jsonforms/core';
import {
  ActionButton,
  Button,
  ButtonGroup,
  Dialog,
  DialogTrigger,
  Divider,
  Flex,
  Heading,
  Item,
  ListBox,
  Picker,
  Text,
  View,
} from '@adobe/react-spectrum';
import SpectrumArrayModalItem from './SpectrumArrayModalItem';

export interface OwnOneOfProps extends OwnPropsOfControl {
  indexOfFittingSchema?: number;
}

const oneOf = 'oneOf';
export const SpectrumArrayModalControl = ({
  addItem,
  data,
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
  const [indexOfFittingSchemaArray, setIndexOfFittingSchemaArray] = useState(
    data.map((boundData: any, index: number) => (boundData ? index : 0))
  );

  const [expanded, setExpanded] = useState<number>();
  const _schema = resolveSubSchemas(schema, rootSchema, oneOf);
  const oneOfRenderInfos = createCombinatorRenderInfos(
    (_schema as JsonSchema).oneOf,
    rootSchema,
    oneOf,
    uischema,
    path,
    uischemas
  );

  const isExpanded = (index: number) => expanded === index;

  const handleTabChange = useCallback(
    (newOneOfIndex: Key) => {
      newOneOfIndex = Number(newOneOfIndex);
      setSelectedIndex(newOneOfIndex);
    },
    [setSelectedIndex, data]
  );

  const handleListBoxChange = useCallback(
    (newOneOfIndex: any) => {
      setSelectedIndex(newOneOfIndex.currentKey);
    },
    [setSelectedIndex, data]
  );

  const handleOnClick = (close: any, index: number) => {
    setIndexOfFittingSchemaArray([...indexOfFittingSchemaArray, index]);
    addItem(path, createDefaultValue(schema.oneOf[index]))();
    setSelectedIndex(0);
    close();
  };

  const onExpand = (index: number) => () =>
    setExpanded((current) => (current === index ? null : index));

  const usePickerInsteadOfListBox = uischema.options?.picker;

  return (
    <View>
      <Flex direction='row' justifyContent='space-between'>
        <Heading level={4}>{label}</Heading>
        <DialogTrigger>
          <ActionButton alignSelf='center'>+</ActionButton>
          {(close) => (
            <Dialog>
              <div style={{ gridColumn: '1 / -1' }}>
                <Heading margin='size-100'>Add a new item</Heading>
                <Divider />
                {usePickerInsteadOfListBox ? (
                  <>
                    <Picker
                      aria-label='Select'
                      margin='size-100'
                      onSelectionChange={handleTabChange}
                      selectedKey={String(selectedIndex)}
                      width='calc(100% - size-200)'
                    >
                      {oneOfRenderInfos.map((oneOfRenderInfo, oneOfIndex) => (
                        <Item key={oneOfIndex}>{oneOfRenderInfo.label}</Item>
                      ))}
                    </Picker>
                  </>
                ) : (
                  <>
                    <ListBox
                      aria-label='Select'
                      items={oneOfRenderInfos}
                      margin='size-100'
                      onSelectionChange={(selected) =>
                        handleListBoxChange(selected)
                      }
                      selectedKeys={String(selectedIndex)}
                      selectionMode='single'
                      width='calc(100% - size-200)'
                    >
                      {oneOfRenderInfos.map((oneOfRenderInfo, oneOfIndex) => (
                        <Item key={oneOfIndex}>{oneOfRenderInfo.label}</Item>
                      ))}
                    </ListBox>
                  </>
                )}
              </div>
              <ButtonGroup>
                <Button variant='secondary' onPress={close}>
                  Cancel
                </Button>
                <Button
                  variant='cta'
                  onPress={() => handleOnClick(close, selectedIndex)}
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
                expanded={isExpanded(index)}
                handleExpand={onExpand}
                index={index}
                indexOfFittingSchema={indexOfFittingSchemaArray[index]}
                key={index}
                path={path}
                removeItem={handleRemoveItem}
                renderers={renderers}
                schema={schema}
                uischema={uischema}
                uischemas={uischemas}
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
