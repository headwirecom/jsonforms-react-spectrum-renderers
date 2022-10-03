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
import React from 'react';
import { ArrayControlProps, OwnPropsOfControl, createDefaultValue } from '@jsonforms/core';
import { Button, Flex, Heading, Text, View } from '@adobe/react-spectrum';
import SpectrumArrayModalItem from '../SpectrumArrayModalItem/ModalItemComponent';
import Add from '@spectrum-icons/workflow/Add';
import { indexOfFittingSchemaObject } from '../utils';
import DragAndDrop from './DragAndDrop';
import AddDialog from './AddDialog';
import SortButtons from './SortButtons';
import { withHandleChange, HandleChangeProps } from '../../../util';

export interface OverrideProps extends OwnPropsOfControl {
  indexOfFittingSchema?: number;
}

const SpectrumArrayModalControl = React.memo(
  ({
    addItem,
    data,
    label,
    path,
    removeItems,
    renderers,
    schema,
    uischema,
    uischemas,
    handleChange,
  }: ArrayControlProps & OverrideProps & HandleChangeProps) => {
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const [openedIndex, setOpenedIndex] = React.useState<number | undefined>(undefined);
    const handleClose = () => setOpen(false);

    const [indexOfFittingSchemaArray, setIndexOfFittingSchemaArray] = React.useState(
      data?.map((boundData: any) => (boundData ? undefined : 999)) ?? []
    );

    React.useEffect(() => {
      setIndexOfFittingSchemaArray(
        data?.map((boundData: any) => (boundData ? undefined : 999)) ?? []
      );
    }, []);

    const handleRemoveItem = React.useCallback(
      (path: string, value: any) => () => {
        if (removeItems) {
          removeItems(path, [value])();
          setRefKey(Math.random());
        }
        indexOfFittingSchemaArray.splice(value, 1);
      },
      [removeItems]
    );

    const handleOnConfirm = (handleClose: any, index: number) => {
      setIndexOfFittingSchemaArray([...indexOfFittingSchemaArray, Math.floor(index)]);
      if (schema.oneOf) {
        addItem(path, createDefaultValue(schema.oneOf[index]))();
      }
      indexOfFittingSchemaObject[path + `.${data?.length}`] = selectedIndex;
      setSelectedIndex(0);
      handleClose();
      console.log('TEST', indexOfFittingSchemaObject[path + `.${data?.length}`]);
    };

    const duplicateContent = (index: number) => {
      data.push(data[index]);
      setRefKey(Math.random());
    };

    const [RefKey, setRefKey] = React.useState<number>(0);
    const callbackFunction = (editorJSON: any) => {
      setRefKey(editorJSON);
    };

    const callbackOpenedIndex = (index: number | undefined) => {
      setOpenedIndex(index);
    };

    const onPressHandler = React.useCallback(() => {
      if (uischema?.options?.picker) {
        window.postMessage({
          type: 'customPicker:open',
          open: true,
          schema,
          current: {
            path,
          },
        });
      } else if (schema?.oneOf?.length === 1) {
        addItem(path, createDefaultValue(schema.oneOf[0]))();
      } else {
        setOpen(true);
      }
    }, [open]);

    const handleCustomPickerMessage = (e: MessageEvent) => {
      if (e?.data?.type === 'customPicker:return') {
        console.log('handleCustomPickerMessage', e?.data);
      }
      if (e?.data?.type === 'customPicker:return' && e?.data?.path === path && e?.data?.data) {
        console.log('handleCustomPickerMessage handling', e?.data?.data);
        let newData = data || [];
        if (e?.data?.index && typeof e.data.index === 'number') {
          console.log('handleCustomPickerMessage replace existing data');
          newData[e.data.index] = e.data.data;
          console.log('handleCustomPickerMessage old data', data);
          console.log('handleCustomPickerMessage newData', newData);
        } else {
          console.log('handleCustomPickerMessage addItem', e.data.data, data);
          newData.push(e.data.data);
        }
        //data.splice(0, data.length);
        //data.push(...newData);
        handleChange(path, newData);
        setRefKey(Math.random());
      }
    };

    React.useEffect(() => {
      if (uischema?.options?.picker) {
        window.addEventListener('message', handleCustomPickerMessage);
      }

      return () => {
        if (uischema?.options?.picker) {
          window.removeEventListener('message', handleCustomPickerMessage);
        }
      };
    }, [data]);

    return (
      <View id='json-form-array-wrapper'>
        <Flex direction='row' justifyContent='space-between'>
          <Heading level={4}>{label}</Heading>
          <Button alignSelf='center' onPress={onPressHandler} variant='primary'>
            <Add aria-label='Add' size='S' />
          </Button>
          <AddDialog
            uischema={uischema}
            handleClose={handleClose}
            selectedIndex={selectedIndex}
            schema={schema}
            setSelectedIndex={setSelectedIndex}
            handleOnConfirm={handleOnConfirm}
            open={open}
          />
        </Flex>
        <Flex
          id={`spectrum-renderer-arrayContentWrapper_${path}`}
          direction='column'
          gap='size-100'
        >
          {uischema?.options?.sortMode === 'disabled' && data && data?.length ? (
            Array.from(Array(data?.length)).map((_, index) => {
              indexOfFittingSchemaObject[`${path}itemQuantity`] = data?.length;
              return (
                <Flex
                  key={`${index}_${RefKey}`}
                  direction='row'
                  alignItems='stretch'
                  flex='auto inherit'
                >
                  <SpectrumArrayModalItem
                    index={index}
                    indexOfFittingSchema={indexOfFittingSchemaArray[index]}
                    path={path}
                    removeItem={handleRemoveItem}
                    duplicateItem={duplicateContent}
                    renderers={renderers}
                    schema={schema}
                    uischema={uischema}
                    uischemas={uischemas}
                    callbackFunction={callbackFunction}
                  ></SpectrumArrayModalItem>
                  {uischema.options?.sortMode === 'arrows' && (
                    <SortButtons
                      data={data}
                      index={index}
                      path={path}
                      removeItems={removeItems}
                      uischema={uischema}
                      callbackFunction={callbackFunction}
                    />
                  )}
                </Flex>
              );
            })
          ) : data && data?.length ? (
            <div>
              <DragAndDrop
                data={data}
                handleRemoveItem={handleRemoveItem}
                indexOfFittingSchemaArray={indexOfFittingSchemaArray}
                path={path}
                removeItems={removeItems}
                renderers={renderers}
                schema={schema}
                uischema={uischema}
                uischemas={uischemas}
                callbackFunction={callbackFunction}
                handleChange={handleChange}
                openedIndex={openedIndex}
                callbackOpenedIndex={callbackOpenedIndex}
              />
            </div>
          ) : (
            <Text>No data</Text>
          )}
        </Flex>
      </View>
    );
  }
);

export default withHandleChange(SpectrumArrayModalControl);
