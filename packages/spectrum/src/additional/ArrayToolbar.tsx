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
  ActionButton,
  Button,
  Flex,
  Heading,
  Tooltip,
  TooltipTrigger,
  View,
} from '@adobe/react-spectrum';
import Add from '@spectrum-icons/workflow/Add';
import AlertCircle from '@spectrum-icons/workflow/AlertCircle';
import React from 'react';

export interface ArrayLayoutToolbarProps {
  label: string;
  errors: string;
  path: string;
  addItem(path: string, data: any): () => void;
  createDefault(): any;
}
export const ArrayLayoutToolbar = React.memo(
  ({
    label,
    errors,
    addItem,
    path,
    createDefault,
  }: ArrayLayoutToolbarProps) => {
    return (
      <Flex direction='row' alignItems='center'>
        <Heading level={4}>{label}</Heading>
        <View isHidden={errors.length === 0} marginEnd='auto'>
          <TooltipTrigger delay={0}>
            <Button isQuiet variant='negative'>
              <AlertCircle color='negative' />
            </Button>
            <Tooltip>{errors}</Tooltip>
          </TooltipTrigger>
        </View>
        <View>
          <TooltipTrigger delay={0}>
            <ActionButton onPress={addItem(path, createDefault())}>
              <Add />
            </ActionButton>
            <Tooltip>{`Add to ${label}`}</Tooltip>
          </TooltipTrigger>
        </View>
      </Flex>
    );
  }
);
