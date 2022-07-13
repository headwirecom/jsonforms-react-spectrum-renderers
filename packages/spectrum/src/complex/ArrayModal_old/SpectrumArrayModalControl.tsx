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
import React, { Key, useCallback, useState, useMemo } from 'react';
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
  DialogContainer,
  Divider,
  Flex,
  Heading,
  Item,
  ListBox,
  Picker,
  Text,
  Tooltip,
  TooltipTrigger,
  View,
} from '@adobe/react-spectrum';
import SpectrumArrayModalItem from './SpectrumArrayModalItem';
import Add from '@spectrum-icons/workflow/Add';
import ArrowUp from '@spectrum-icons/workflow/ArrowUp';
import ArrowDown from '@spectrum-icons/workflow/ArrowDown';
import DragHandle from '@spectrum-icons/workflow/DragHandle';
import { indexOfFittingSchemaObject, moveFromTo, swap, clamp } from './utils';
import { useSprings, animated, useSpringRef, config } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import './SpectrumArrayModalItem.css';

export interface OwnOneOfProps extends OwnPropsOfControl {
  indexOfFittingSchema?: number;
}

const oneOf = 'oneOf';
export const SpectrumArrayModalControl = React.memo(
  ({
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
    const _schema = useMemo(
      () => resolveSubSchemas(schema, rootSchema, oneOf),
      [schema, rootSchema, oneOf]
    );
    const oneOfRenderInfos = useMemo(
      () =>
        createCombinatorRenderInfos(
          (_schema as JsonSchema).oneOf,
          rootSchema,
          oneOf,
          uischema,
          path,
          uischemas
        ),
      [_schema, rootSchema, oneOf, uischema, uischemas, path]
    );

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const [expanded, setExpanded] = useState<number>(undefined);
    const isExpanded = (index: number) => expanded === index;
    const onExpand = (index: number) =>
      useCallback(() => {
        setExpanded((current) => (current === index ? null : index));
      }, [index]);

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
      const indexOfFittingSchemaOriginal =
        indexOfFittingSchemaObject[`${path}.${index}`];
      const indexOfFittingSchemaNew =
        indexOfFittingSchemaObject[`${path}.${index - 1}`];
      indexOfFittingSchemaObject[`${path}.${index}`] = indexOfFittingSchemaNew;
      indexOfFittingSchemaObject[
        `${path}.${index - 1}`
      ] = indexOfFittingSchemaOriginal;

      setExpanded(null);
      //removeItems is only used to update the data, change to a better solution in the future
      removeItems(path, [999999999])();
    };

    const moveDnD = (curIndex: number, tarRow: number) => {
      setExpanded(null);
      moveFromTo(data, curIndex, tarRow);

      if (curIndex - tarRow > 0) {
        removeItems(path, [curIndex + 1])();
      } else {
        removeItems(path, [curIndex])();
      }

      if (curIndex - tarRow === 1 || curIndex - tarRow === -2) {
        const indexOfFittingSchemaOriginal =
          indexOfFittingSchemaObject[`${path}.${curIndex}`];
        const indexOfFittingSchemaNew =
          indexOfFittingSchemaObject[`${path}.${curIndex - 1}`];
        indexOfFittingSchemaObject[
          `${path}.${curIndex}`
        ] = indexOfFittingSchemaNew;
        indexOfFittingSchemaObject[
          `${path}.${curIndex - 1}`
        ] = indexOfFittingSchemaOriginal;
      }

      if (curIndex > 9999999) {
        moveItUp(curIndex);
        moveItDown(curIndex);
      }

      return data;
    };

    const moveItDown = (index: number) => {
      const indexOfFittingSchemaOriginal =
        indexOfFittingSchemaObject[`${path}.${index}`];
      const indexOfFittingSchemaNew =
        indexOfFittingSchemaObject[`${path}.${index + 1}`];
      indexOfFittingSchemaObject[`${path}.${index}`] = indexOfFittingSchemaNew;
      indexOfFittingSchemaObject[
        `${path}.${index + 1}`
      ] = indexOfFittingSchemaOriginal;

      setExpanded(null);
      //removeItems is only used to update the data, change to a better solution in the future
      removeItems(path, [data.length])();
    };

    // Drag and Drop
    const stringified = (arr: any) => {
      return arr.map((item: any) => {
        return JSON.stringify(item);
      });
    };
    const order = React.useRef(
      Array.from(Array(data)).map((data: any, _: any) => data)
    );
    const HEIGHT_OF_COMPONENT = 88;
    const fn = (
      order: any[],
      active: boolean = false,
      originalIndex: number = 0,
      curIndex: number = 0,
      y: number = 0
    ) => (index: number) =>
      active && index === originalIndex
        ? {
            y: curIndex * HEIGHT_OF_COMPONENT + y,
            scale: 1.03,
            zIndex: 50,
            shadow: 15,
            immediate: (key: string) => key === 'zIndex',
            config: (key: string) =>
              key === 'y' ? config.stiff : config.default,
          }
        : {
            y:
              stringified(order).indexOf(JSON.stringify(data[index])) *
              HEIGHT_OF_COMPONENT,
            scale: 1,
            zIndex: 20,
            shadow: 1,
            immediate: false,
          };
    const [springs, api] = useSprings(data?.length, fn(order.current[0]));
    const DragHandleRef = useSpringRef();

    const [grabbedIndex, setGrabbedIndex] = useState(null);
    const bind: any = useDrag(
      ({ args: [originalIndex], active, movement: [, y] }) => {
        console.log(y);
        if (grabbedIndex !== null) {
          const curRow = clamp(
            Math.round(
              (grabbedIndex * HEIGHT_OF_COMPONENT + y) / HEIGHT_OF_COMPONENT
            ),
            0,
            data.length - 1
          );
          console.log(curRow);
          const newOrder = swap(
            order.current[0],
            stringified(order.current[0]).indexOf(
              JSON.stringify(order.current[0][grabbedIndex])
            ),
            stringified(order.current[0]).indexOf(
              JSON.stringify(order.current[0][curRow])
            )
          );
          api.start(fn(newOrder, active, originalIndex, curRow, y)); // Feed springs new style data, they'll animate the view without causing a single render

          if (
            stringified(order.current[0]).indexOf(
              JSON.stringify(order.current[0][grabbedIndex])
            ) ===
            stringified(order.current[0]).indexOf(
              JSON.stringify(order.current[0][curRow])
            )
          ) {
            return;
          } else {
            if (data === newOrder) {
              return;
            }
            data.splice(0, data.length);
            data.push(...newOrder);
          }

          if (!active) {
            order.current[0] = newOrder;
            setGrabbedIndex(null);
            removeItems(path, [999999999])();
            api.start(fn(newOrder, active, originalIndex, curRow, y));
          }
        }
      }
    );

    const duplicateContent = (index: number) => {
      data.push(data[index]);
      removeItems(path, [999999999])();
    };

    return (
      <View>
        {
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              height: HEIGHT_OF_COMPONENT * data.length,
              touchAction: 'none',
              transformOrigin: '50% 50% 0px',
              backgroundColor: 'red',
              position: 'relative',
            }}
          >
            {springs.map(({ zIndex, shadow, y, scale }, index: number) => (
              <animated.div
                {...bind(index)}
                key={index}
                style={{
                  zIndex,
                  boxShadow: shadow.to(
                    (s) => `rgba(0, 0, 0, 0.15) 0px ${s}px ${2 * s}px 0px`
                  ),
                  y,
                  scale,
                  width: '100%',
                  touchAction: 'none',
                  transformOrigin: '50% 50% 0px',
                  position: 'absolute',
                }}
                height={HEIGHT_OF_COMPONENT + 'px'}
              >
                <Flex direction='row' alignItems='stretch' flex='auto inherit'>
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
                  <div
                    ref={DragHandleRef}
                    className='grabbable'
                    onMouseDown={() => setGrabbedIndex(index)}
                  >
                    <DragHandle
                      aria-label='Drag and Drop Handle'
                      size='L'
                      alignSelf='center'
                      width={'100%'}
                    />
                  </div>
                  <p onClick={() => duplicateContent(index)}>
                    {JSON.stringify(y)}
                  </p>
                </Flex>
              </animated.div>
            ))}
          </div>
        }
        <Flex direction='row' justifyContent='space-between'>
          <Heading level={4}>{label}</Heading>
          <Button
            alignSelf='center'
            onPress={useCallback(() => {
              setOpen(true);
            }, [open])}
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
                <div key={index} style={{ opacity: 0 }}>
                  <Flex
                    key={index}
                    direction='row'
                    alignItems='stretch'
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
                    <div /* ref={DragHandleRef} */ className='grabbable'>
                      <DragHandle
                        aria-label='Drag and Drop Handle'
                        size='L'
                        alignSelf='center'
                        width={'100%'}
                      />
                    </div>

                    {uischema.options?.showSortButtons ? (
                      <Flex
                        direction={
                          uischema.options?.sortButtonDirection === 'Horizontal'
                            ? 'row'
                            : 'column'
                        }
                        marginTop={
                          uischema.options?.sortButtonDirection === 'Horizontal'
                            ? 'size-225'
                            : 'size-0'
                        }
                      >
                        <TooltipTrigger>
                          <ActionButton
                            isQuiet
                            onPress={() => moveDnD(index, index - 1)}
                            aria-label={`move-item-${path}.${index}-up`}
                            marginX='size-10'
                            isDisabled={index === 0}
                          >
                            <ArrowUp aria-label='ArrowUp' />
                          </ActionButton>
                          <Tooltip>Move upwards</Tooltip>
                        </TooltipTrigger>
                        <TooltipTrigger>
                          <ActionButton
                            isQuiet
                            onPress={() => moveDnD(index, index + 2)}
                            aria-label={`move-item-${path}.${index}-down`}
                            marginX='size-10'
                            isDisabled={
                              index ===
                              indexOfFittingSchemaObject[
                                `${path}itemQuantity`
                              ] -
                                1
                            }
                          >
                            <ArrowDown aria-label='ArrowDown' />
                          </ActionButton>
                          <Tooltip>Move downwards</Tooltip>
                        </TooltipTrigger>
                      </Flex>
                    ) : null}
                  </Flex>
                </div>
              );
            })
          ) : (
            <Text>No data</Text>
          )}
        </Flex>
      </View>
    );
  }
);