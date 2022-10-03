import React from 'react';
import {
  Button,
  ButtonGroup,
  Content,
  Dialog,
  DialogContainer,
  Divider,
  Heading,
} from '@adobe/react-spectrum';

interface ModalItemDeleteProps {
  deleteModalOpen: boolean;
  setDeleteModalOpen: (value: boolean) => void;
  path: string;
  index: number;
  removeItem?: (path: string, value: number) => () => void;
  expanded: boolean;
  handleExpand: () => void;
}

export default function ModalItemDelete({
  deleteModalOpen,
  setDeleteModalOpen,
  path,
  index,
  removeItem,
  expanded,
  handleExpand,
}: ModalItemDeleteProps) {
  const [durationBeforeDelete, setDurationBeforeDelete] = React.useState(0);
  const onPressStartHandler = () => {
    if (expanded) {
      handleExpand();
      setDurationBeforeDelete(700);
    }
  };

  const onPressEndHandler = () => {
    setDeleteModalOpen(false);
    setTimeout(() => {
      if (removeItem) {
        removeItem(path, index)();
      }
    }, durationBeforeDelete);
  };

  return (
    <DialogContainer onDismiss={() => setDeleteModalOpen(false)}>
      {deleteModalOpen && (
        <Dialog>
          <Heading>Delete Item?</Heading>
          <Divider />
          <Content>Are you sure you wish to delete this item?</Content>
          <ButtonGroup>
            <Button variant='secondary' onPress={() => setDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button
              autoFocus
              variant='cta'
              onPressStart={onPressStartHandler}
              onPressEnd={onPressEndHandler}
            >
              Delete
            </Button>
          </ButtonGroup>
        </Dialog>
      )}
    </DialogContainer>
  );
}
