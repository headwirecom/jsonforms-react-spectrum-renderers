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
import React, { useState, useCallback } from 'react';
import {
  ActionButton,
  Button,
  ButtonGroup,
  Content,
  Dialog,
  DialogContainer,
  Divider,
  Flex,
  Heading,
  Text,
  Tooltip,
  TooltipTrigger,
  View,
} from '@adobe/react-spectrum';
import { StatePropsOfMasterItem } from '@jsonforms/core';
import { withJsonFormsMasterListItemProps } from '@jsonforms/react';
import Delete from '@spectrum-icons/workflow/Delete';
import SpectrumProvider from './SpectrumProvider';

import './ListDetailMasterItem.css';

const ListWithDetailMasterItem = React.memo(
  ({
    childLabel,
    handleSelect,
    index,
    path,
    removeItem,
    selected,
  }: StatePropsOfMasterItem) => {
    const [deleteIndex, setdeleteIndex] = useState(0);
    const [open, setOpen] = useState(false);
    const handleClose = useCallback(() => setOpen(false), [setOpen]);
    const itemLabel = childLabel ?? `Item ${index + 1}`;

    const setOpenAndsetDeleteIndex = (index: number) => {
      setOpen(true);
      setdeleteIndex(index);
    };

    const deleteItem = (path: string) => {
      handleClose();
      removeItem(path, deleteIndex)();
    };
    return (
      <SpectrumProvider>
        <div
          className='list-with-detail-master-item-row'
          aria-selected={selected}
        >
          <Flex
            direction='row'
            margin='size-50'
            justifyContent='space-between'
            alignItems='center'
          >
            <View UNSAFE_className='list-with-detail-master-item-number'>
              <Text>{index + 1}</Text>
            </View>
            <ActionButton
              flex='auto'
              isQuiet
              onPress={handleSelect(index)}
              aria-label={`select-item-${itemLabel}`}
            >
              <Text UNSAFE_style={{ textAlign: 'left', maxWidth: '30ch' }}>
                {itemLabel}
              </Text>
            </ActionButton>
            <View>
              <TooltipTrigger>
                <ActionButton
                  onPress={() => setOpenAndsetDeleteIndex(index)}
                  aria-label={`delete-item-${itemLabel}`}
                >
                  <Delete aria-label='Delete' />
                </ActionButton>
                <Tooltip>Delete</Tooltip>
              </TooltipTrigger>
              <DialogContainer onDismiss={handleClose}>
                {open && (
                  <Dialog>
                    <Heading>Delete Item?</Heading>
                    <Divider />
                    <Content>
                      Are you sure you wish to delete this item?
                    </Content>
                    <ButtonGroup>
                      <Button variant='secondary' onPress={handleClose}>
                        Cancel
                      </Button>
                      <Button
                        variant='cta'
                        onPress={() => deleteItem(path)}
                        autoFocus
                      >
                        Delete
                      </Button>
                    </ButtonGroup>
                  </Dialog>
                )}
              </DialogContainer>
            </View>
          </Flex>
        </div>
      </SpectrumProvider>
    );
  }
);

export default withJsonFormsMasterListItemProps(ListWithDetailMasterItem);
