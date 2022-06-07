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
  moveUp,
  moveDown,
} from '@jsonforms/core';
import {
  Button,
  ButtonGroup,
  Dialog,
  DialogContainer,
  Divider,
  Flex,
  Heading,
  Item,
  ListBox,
  Picker,
  Text,
  View,
  Tooltip,
  TooltipTrigger,
  ActionButton,
} from '@adobe/react-spectrum';
import SpectrumArrayModalItem from './SpectrumArrayModalItem';
import Add from '@spectrum-icons/workflow/Add';
import ArrowUp from '@spectrum-icons/workflow/ArrowUp';
import ArrowDown from '@spectrum-icons/workflow/ArrowDown';
import { indexOfFittingSchemaObject } from './utils';
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
  const _schema = resolveSubSchemas(schema, rootSchema, oneOf);
  const oneOfRenderInfos = createCombinatorRenderInfos(
    (_schema as JsonSchema).oneOf,
    rootSchema,
    oneOf,
    uischema,
    path,
    uischemas
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [expanded, setExpanded] = useState<number>(undefined);
  const isExpanded = (index: number) => expanded === index;
  const onExpand = (index: number) => () =>
    setExpanded((current) => (current === index ? null : index));

  const [indexOfFittingSchemaArray, setIndexOfFittingSchemaArray] = useState(
    data?.map((boundData: any) => (boundData ? undefined : 999)) ?? []
  );

  React.useEffect(() => {
    setIndexOfFittingSchemaArray(
      data?.map((boundData: any) => (boundData ? undefined : 999)) ?? []
    );
  }, [removeItems]);

  const handleRemoveItem = useCallback(
    (path: string, value: any) => () => {
      removeItems(path, [value])();
      indexOfFittingSchemaArray.splice(value, 1);
    },
    [removeItems]
  );

  const handlePickerChange = useCallback(
    (newOneOfIndex: Key) => {
      newOneOfIndex = Number(newOneOfIndex);
      setSelectedIndex(newOneOfIndex);
    },
    [setSelectedIndex]
  );

  const handleListBoxChange = useCallback(
    (newOneOfIndex: any) => {
      if (newOneOfIndex.currentKey) {
        setSelectedIndex(newOneOfIndex.currentKey);
      }
    },
    [setSelectedIndex]
  );

  const handleOnConfirm = (handleClose: any, index: number) => {
    setIndexOfFittingSchemaArray([
      ...indexOfFittingSchemaArray,
      Math.floor(index),
    ]);
    addItem(path, createDefaultValue(schema.oneOf[index]))();
    setSelectedIndex(0);
    handleClose();
    setExpanded(indexOfFittingSchemaArray.length);
  };

  const usePickerInsteadOfListBox = uischema.options?.picker;

  const moveItUp = (index: number) => {
    moveUp(data, index);
    setExpanded(null);
    //addItem and removeItems are only used to update the data, change to a better solution in the future
    addItem(path, data.length)();
    removeItems(path, [data.length])();
  };

  const moveItDown = (index: number) => {
    moveDown(data, index);
    setExpanded(null);
    //addItem and removeItems are only used to update the data, change to a better solution in the future
    addItem(path, data.length)();
    removeItems(path, [data.length])();
  };

  return (
    <View>
      <Flex direction='row' justifyContent='space-between'>
        <Heading level={4}>{label}</Heading>
        <Button
          alignSelf='center'
          onPress={() => setOpen(true)}
          variant='primary'
        >
          <Add aria-label='Add' />
        </Button>
        <DialogContainer onDismiss={handleClose}>
          {open && (
            <Dialog>
              <div style={{ gridColumn: '1 / -1' }}>
                <Heading margin='size-100'>Add a new item</Heading>
                <Divider />
                {usePickerInsteadOfListBox ? (
                  <>
                    <Picker
                      aria-label='Select'
                      margin='size-100'
                      onSelectionChange={handlePickerChange}
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
                      maxHeight='size-2400'
                    >
                      {oneOfRenderInfos.map((oneOfRenderInfo, oneOfIndex) => (
                        <Item key={oneOfIndex}>{oneOfRenderInfo.label}</Item>
                      ))}
                    </ListBox>
                  </>
                )}
              </div>
              <ButtonGroup>
                <Button variant='secondary' onPress={handleClose}>
                  Cancel
                </Button>
                <Button
                  variant='cta'
                  onPress={() => handleOnConfirm(handleClose, selectedIndex)}
                  autoFocus
                >
                  Confirm
                </Button>
              </ButtonGroup>
            </Dialog>
          )}
        </DialogContainer>
      </Flex>
      <Flex direction='column' gap='size-100'>
        {data && data?.length ? (
          Array.from(Array(data?.length)).map((_, index) => {
            indexOfFittingSchemaObject[`${path}itemQuantity`] = data?.length;
            return (
              <Flex
                key={index}
                direction='row'
                alignItems='center'
                flex='auto inherit'
              >
                <SpectrumArrayModalItem
                  expanded={isExpanded(index)}
                  handleExpand={onExpand}
                  index={index}
                  indexOfFittingSchema={indexOfFittingSchemaArray[index]}
                  path={path}
                  removeItem={handleRemoveItem}
                  renderers={renderers}
                  schema={schema}
                  uischema={uischema}
                  uischemas={uischemas}
                ></SpectrumArrayModalItem>
                {uischema.options?.showSortButtons ? (
                  <Flex marginStart='size-40'>
                    <TooltipTrigger delay={0}>
                      <ActionButton
                        isQuiet
                        onPress={() => moveItUp(index)}
                        aria-label={`move-item-${path}.${index}-up`}
                        marginX='size-10'
                        isDisabled={index === 0}
                      >
                        <ArrowUp aria-label='ArrowUp' />
                      </ActionButton>
                      <Tooltip>Move upwards</Tooltip>
                    </TooltipTrigger>
                    <TooltipTrigger delay={0}>
                      <ActionButton
                        isQuiet
                        onPress={() => moveItDown(index)}
                        aria-label={`move-item-${path}.${index}-down`}
                        marginX='size-10'
                        isDisabled={
                          index ===
                          indexOfFittingSchemaObject[`${path}itemQuantity`] - 1
                        }
                      >
                        <ArrowDown aria-label='ArrowDown' />
                      </ActionButton>
                      <Tooltip>Move downwards</Tooltip>
                    </TooltipTrigger>
                  </Flex>
                ) : null}
              </Flex>
            );
          })
        ) : (
          <Text>No data</Text>
        )}
      </Flex>
    </View>
  );
};
