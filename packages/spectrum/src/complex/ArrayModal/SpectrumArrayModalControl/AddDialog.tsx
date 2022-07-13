import React, { useCallback, Key } from 'react';
import {
  DialogContainer,
  Dialog,
  Heading,
  Divider,
  Picker,
  Item,
  ListBox,
  ButtonGroup,
  Button,
} from '@adobe/react-spectrum';

interface ArrayModalControlAddDialogProps {
  uischema: any;
  handleClose: any;
  selectedIndex: any;
  oneOfRenderInfos: any;
  handleOnConfirm: any;
  open: boolean;
  setSelectedIndex: any;
}

export default function AddDialog({
  uischema,
  handleClose,
  selectedIndex,
  oneOfRenderInfos,
  handleOnConfirm,
  open,
  setSelectedIndex,
}: ArrayModalControlAddDialogProps) {
  const usePickerInsteadOfListBox = uischema.options?.picker;

  const handleListBoxChange = useCallback(
    (newOneOfIndex: any) => {
      if (newOneOfIndex.currentKey) {
        setSelectedIndex(newOneOfIndex.currentKey);
      }
    },
    [setSelectedIndex]
  );

  const handlePickerChange = useCallback(
    (newOneOfIndex: Key) => {
      newOneOfIndex = Number(newOneOfIndex);
      setSelectedIndex(newOneOfIndex);
    },
    [setSelectedIndex]
  );

  return (
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
                  {oneOfRenderInfos.map(
                    (oneOfRenderInfo: any, oneOfIndex: number) => (
                      <Item key={oneOfIndex}>{oneOfRenderInfo.label}</Item>
                    )
                  )}
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
                  {oneOfRenderInfos.map(
                    (oneOfRenderInfo: any, oneOfIndex: number) => (
                      <Item key={oneOfIndex}>{oneOfRenderInfo.label}</Item>
                    )
                  )}
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
  );
}
