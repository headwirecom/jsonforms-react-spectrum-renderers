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
  //selected, // todo: style selected element.
  removeItem,
  path,
  handleSelect,
}: StatePropsOfMasterItem) => {
  return (
    <Flex direction='row' margin='size-30' justifyContent='space-around'>
      <View borderRadius='large' backgroundColor='gray-200'>
        <View padding='size-100'>
          <Text>{index}</Text>
        </View>
      </View>
      <ActionButton isQuiet onPress={handleSelect(index)}>
        <Text>{childLabel}</Text>
      </ActionButton>
      <View alignSelf='flex-end'>
        <ActionButton onPress={removeItem(path, index)}>
          <Delete />
        </ActionButton>
      </View>
    </Flex>
  );
};

export default withJsonFormsMasterListItemProps(ListWithDetailMasterItem);
