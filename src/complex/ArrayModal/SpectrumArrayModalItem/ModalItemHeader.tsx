import React from 'react';
import {
  ActionButton,
  ActionMenu,
  Flex,
  Item,
  Text,
  Tooltip,
  TooltipTrigger,
  View,
  Divider,
} from '@adobe/react-spectrum';

import Delete from '@spectrum-icons/workflow/Delete';
import Edit from '@spectrum-icons/workflow/Edit';
import Close from '@spectrum-icons/workflow/Close';
import ChevronUp from '@spectrum-icons/workflow/ChevronUp';
import ChevronDown from '@spectrum-icons/workflow/ChevronDown';
import Duplicate from '@spectrum-icons/workflow/Duplicate';
import settings from '../../../util/settings';

import ModalItemDelete from './ModalItemDelete';
import FolderSearch from '@spectrum-icons/workflow/FolderSearch';

interface ArrayModalItemHeaderProps {
  expanded: boolean;
  enableDetailedView: boolean;
  index: number;
  path: string;
  handleExpand: () => void;
  removeItem: (path: string, value: number) => () => void;
  duplicateItem: (index: number) => () => void;
  childLabel: string;
  childData: any;
  DNDHandle?: any;
  customPicker: {
    enabled: boolean;
    handler: (current?: object) => void;
  };
  uischema: any;
  JsonFormsDispatch: any;
}

export default function ModalItemHeader({
  DNDHandle = false,
  childData,
  childLabel,
  customPicker,
  duplicateItem,
  enableDetailedView,
  expanded,
  handleExpand,
  index,
  path,
  removeItem,
  uischema,
  JsonFormsDispatch,
}: ArrayModalItemHeaderProps) {
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
  const actionMenuTriggered = (action: any) => {
    const testArr = action.split('-');
    testArr[0] = testArr[0].toLowerCase();
    const actionName: any = testArr.join('');

    const lookupObj: any = {
      delete: () => setDeleteModalOpen(true),
      duplicate: () => duplicateItem(index),
    };

    lookupObj[actionName]();
  };

  React.useEffect(() => {
    console.log(childLabel);
  }, [childLabel]);

  return (
    <View aria-selected={expanded} UNSAFE_className='array-item-header'>
      <Flex direction='row' margin='size-50' justifyContent='space-between' alignItems='center'>
        <View UNSAFE_className='spectrum-array-item-number'>
          <Text>{index + 1}</Text>
        </View>
        {uischema?.options?.noAccordion ? (
          <View UNSAFE_className='JsonFormsDispatchContainer'>{JsonFormsDispatch}</View>
        ) : (
          <TooltipTrigger delay={settings.toolTipDelay} placement={'top'}>
            <ActionButton
              flex={'1 1 auto'}
              isQuiet
              onPress={() => handleExpand()}
              aria-label={`expand-item-${childLabel}`}
            >
              <Text
                UNSAFE_className='spectrum-array-item-name'
                UNSAFE_style={{ textAlign: 'left' }}
              >
                {childLabel}
              </Text>
            </ActionButton>
            <Tooltip>{childData?._path || childLabel}</Tooltip>
          </TooltipTrigger>
        )}
        <View>
          <Flex gap={'size-0'}>
            <ActionMenu align='end' onAction={actionMenuTriggered} isQuiet={true}>
              <Item key='delete' textValue={`delete-item-${childLabel}`}>
                <Text>Delete</Text>
                <Delete size='S' />
              </Item>

              <Item key='duplicate' textValue={`duplicate-item-${childLabel}`}>
                <Text>Duplicate</Text>
                <Duplicate size='S' />
              </Item>
            </ActionMenu>

            {customPicker?.enabled && (
              <TooltipTrigger delay={settings.toolTipDelay}>
                <ActionButton
                  onPress={customPicker.handler}
                  isQuiet={true}
                  aria-label={`change-reference-${childLabel}`}
                >
                  <FolderSearch aria-label='Change Reference' size='S' />
                </ActionButton>
                <Tooltip>Change Content Fragment Reference</Tooltip>
              </TooltipTrigger>
            )}

            {uischema?.options?.noAccordion ? null : (
              <TooltipTrigger delay={settings.toolTipDelay}>
                <ActionButton
                  onPress={() => handleExpand()}
                  isQuiet={true}
                  aria-label={`expand-item-${childLabel}`}
                >
                  {expanded ? (
                    enableDetailedView ? (
                      <Close aria-label='Close' size='S' />
                    ) : (
                      <ChevronUp aria-label='Collapse' size='S' />
                    )
                  ) : enableDetailedView ? (
                    <Edit aria-label='Edit' size='S' />
                  ) : (
                    <ChevronDown aria-label='Expand' size='S' />
                  )}
                </ActionButton>
                <Tooltip>
                  {expanded
                    ? enableDetailedView
                      ? 'Close'
                      : 'Collapse'
                    : enableDetailedView
                    ? 'Edit'
                    : 'Expand'}
                </Tooltip>
              </TooltipTrigger>
            )}
            {DNDHandle && !expanded && (
              <>
                <Divider orientation='vertical' size='M' marginStart={'size-100'} />
                {DNDHandle}
              </>
            )}
            <ModalItemDelete
              deleteModalOpen={deleteModalOpen}
              setDeleteModalOpen={setDeleteModalOpen}
              removeItem={removeItem}
              path={path}
              index={index}
              expanded={expanded}
              handleExpand={handleExpand}
            />
          </Flex>
        </View>
      </Flex>
    </View>
  );
}
