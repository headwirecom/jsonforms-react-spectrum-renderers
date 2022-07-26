import React from 'react';
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
  schema: any;
  handleOnConfirm: any;
  open: boolean;
  setSelectedIndex: any;
}

export default function AddDialog({
  uischema,
  handleClose,
  selectedIndex,
  schema,
  handleOnConfirm,
  open,
  setSelectedIndex,
}: ArrayModalControlAddDialogProps) {
  const usePickerInsteadOfListBox = uischema.options?.picker;

  const handleListBoxChange = React.useCallback(
    (newOneOfIndex: any) => {
      if (newOneOfIndex.currentKey) {
        setSelectedIndex(newOneOfIndex.currentKey);
      }
    },
    [setSelectedIndex]
  );

  const handlePickerChange = React.useCallback(
    (newOneOfIndex: React.Key) => {
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
                  {schema?.map((oneOfRenderInfo: any, oneOfIndex: number) => (
                    <Item key={oneOfIndex}>
                      {oneOfRenderInfo.title ?? `Item ${oneOfIndex + 1}`}
                    </Item>
                  ))}
                </Picker>
              </>
            ) : (
              <>
                <ListBox
                  aria-label='Select'
                  items={schema}
                  margin='size-100'
                  onSelectionChange={(selected) =>
                    handleListBoxChange(selected)
                  }
                  selectedKeys={String(selectedIndex)}
                  selectionMode='single'
                  width='calc(100% - size-200)'
                  maxHeight='size-2400'
                >
                  {schema?.oneOf?.map(
                    (oneOfRenderInfo: any, oneOfIndex: number) => (
                      <Item key={oneOfIndex}>
                        {oneOfRenderInfo.title ?? `Item ${oneOfIndex + 1}`}
                      </Item>
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
