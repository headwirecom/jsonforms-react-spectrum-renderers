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
import { Text, Flex, ActionButton, View } from '@adobe/react-spectrum';
import { StatePropsOfMasterItem } from '@jsonforms/core';
import { withJsonFormsMasterListItemProps } from '@jsonforms/react';
import Delete from '@spectrum-icons/workflow/Delete';

const ListWithDetailMasterItem = ({
  index,
  childLabel,
  selected, // todo: style selected element.
  removeItem,
  path,
  handleSelect,
}: StatePropsOfMasterItem) => {
  const withSelection = (children: JSX.Element) => (
    <View backgroundColor='gray-200'>{children}</View>
  );

  const item = (
    <Flex
      direction='row'
      margin='size-50'
      justifyContent='space-between'
      alignItems='center'
    >
      <View borderRadius='large' backgroundColor='gray-200'>
        <View padding='size-100'>
          <Text>{index}</Text>
        </View>
      </View>
      <ActionButton flex='auto' isQuiet onPress={handleSelect(index)}>
        <Text UNSAFE_style={{ textAlign: 'left' }}>{childLabel}</Text>
      </ActionButton>
      <View>
        <ActionButton onPress={removeItem(path, index)}>
          <Delete />
        </ActionButton>
      </View>
    </Flex>
  );
  const content = selected ? withSelection(item) : item;
  return content;
};

export default withJsonFormsMasterListItemProps(ListWithDetailMasterItem);
