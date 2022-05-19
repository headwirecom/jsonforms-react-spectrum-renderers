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
import React, { useCallback, useState } from 'react';
import { ArrayControlProps, createDefaultValue } from '@jsonforms/core';
import { Button, Flex, Heading, Text, View } from '@adobe/react-spectrum';
import SpectrumArrayItem from './SpectrumArrayItem';
import Add from '@spectrum-icons/workflow/Add';

export const SpectrumArrayControl = ({
  data,
  label,
  path,
  schema,
  addItem,
  removeItems,
  uischema,
  uischemas,
  renderers,
}: ArrayControlProps) => {
  const handleRemoveItem = useCallback(
    (p: string, value: any) => () => {
      removeItems(p, [value])();
    },
    [removeItems]
  );

  const [expaned, setExpaned] = useState<number>();

  const isExpaned = (index: number) => expaned === index;

  const onExpand = (index: number) => () =>
    setExpaned((current) => (current === index ? null : index));

  return (
    <View>
      <Flex direction='row' justifyContent='space-between'>
        <Heading level={4}>{label}</Heading>
        <Button
          variant='primary'
          alignSelf='center'
          onPress={addItem(path, createDefaultValue(schema))}
        >
          <Add aria-label='Add' />
        </Button>
      </Flex>
      <Flex direction='column' gap='size-100'>
        {data && data.length ? (
          Array.from(Array(data.length)).map((_, index) => {
            return (
              <SpectrumArrayItem
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
              ></SpectrumArrayItem>
            );
          })
        ) : (
          <Text>No data</Text>
        )}
      </Flex>
    </View>
  );
};
