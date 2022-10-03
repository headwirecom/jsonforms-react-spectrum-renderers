import * as React from 'react';
import { Flex, TooltipTrigger, Tooltip, ActionButton } from '@adobe/react-spectrum';
import ArrowUp from '@spectrum-icons/workflow/ArrowUp';
import ArrowDown from '@spectrum-icons/workflow/ArrowDown';
import { indexOfFittingSchemaObject, moveFromTo } from '../utils';
import settings from '../../../util/settings';

interface ArrayModalControlSortButtonsProps {
  data: any;
  index: number;
  path: any;
  removeItems: any;
  uischema: any;
  callbackFunction: any;
}

export default function SortButtons({
  data,
  index,
  path,
  removeItems,
  uischema,
  callbackFunction,
}: ArrayModalControlSortButtonsProps) {
  const moveItUp = (index: number) => {
    const indexOfFittingSchemaOriginal = indexOfFittingSchemaObject[`${path}.${index}`];
    const indexOfFittingSchemaNew = indexOfFittingSchemaObject[`${path}.${index - 1}`];
    indexOfFittingSchemaObject[`${path}.${index}`] = indexOfFittingSchemaNew;
    indexOfFittingSchemaObject[`${path}.${index - 1}`] = indexOfFittingSchemaOriginal;

    //removeItems is only used to update the data, change to a better solution in the future
    removeItems(path, [999999999])();
  };

  const [changeRefKey, setChangeRefKey] = React.useState<boolean>(false);
  const moveDnD = (curIndex: number, tarRow: number) => {
    if (data.length - tarRow === 0) {
      moveFromTo(data, curIndex + 1, tarRow - 2);
    } else {
      moveFromTo(data, curIndex, tarRow);
    }

    if (curIndex - tarRow > 0) {
      removeItems(path, [curIndex + 1])();
    } else if (data.length - tarRow === 1) {
      removeItems(path, [curIndex + 2])();
    } else {
      removeItems(path, [curIndex])();
    }

    if (curIndex - tarRow === 1 || curIndex - tarRow === -2) {
      const indexOfFittingSchemaOriginal = indexOfFittingSchemaObject[`${path}.${curIndex}`];
      const indexOfFittingSchemaNew = indexOfFittingSchemaObject[`${path}.${curIndex - 1}`];
      indexOfFittingSchemaObject[`${path}.${curIndex}`] = indexOfFittingSchemaNew;
      indexOfFittingSchemaObject[`${path}.${curIndex - 1}`] = indexOfFittingSchemaOriginal;
    }

    if (curIndex > 9999999) {
      moveItUp(curIndex);
      moveItDown(curIndex);
    }

    setChangeRefKey(true);
    return data;
  };

  const moveItDown = (index: number) => {
    const indexOfFittingSchemaOriginal = indexOfFittingSchemaObject[`${path}.${index}`];
    const indexOfFittingSchemaNew = indexOfFittingSchemaObject[`${path}.${index + 1}`];
    indexOfFittingSchemaObject[`${path}.${index}`] = indexOfFittingSchemaNew;
    indexOfFittingSchemaObject[`${path}.${index + 1}`] = indexOfFittingSchemaOriginal;

    //removeItems is only used to update the data, change to a better solution in the future
    removeItems(path, [data.length])();
  };

  const firstRender = React.useRef(true);
  React.useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (!changeRefKey) {
      return;
    }
    callbackFunction(Math.random());
    setChangeRefKey(false);
  }, [moveDnD]);

  return (
    <Flex
      direction={uischema.options?.sortButtonDirection === 'Horizontal' ? 'row' : 'column'}
      marginTop={uischema.options?.sortButtonDirection === 'Horizontal' ? 'size-225' : 'size-0'}
    >
      <TooltipTrigger delay={settings.toolTipDelay}>
        <ActionButton
          isQuiet
          onPress={() => moveDnD(index, index - 1)}
          aria-label={`move-item-${path}.${index}-up`}
          marginX='size-10'
          isDisabled={index === 0}
        >
          <ArrowUp aria-label='ArrowUp' size='S' />
        </ActionButton>
        <Tooltip>Move upwards</Tooltip>
      </TooltipTrigger>
      <TooltipTrigger delay={settings.toolTipDelay}>
        <ActionButton
          isQuiet
          onPress={() => moveDnD(index, index + 2)}
          aria-label={`move-item-${path}.${index}-down`}
          marginX='size-10'
          isDisabled={index === indexOfFittingSchemaObject[`${path}itemQuantity`] - 1}
        >
          <ArrowDown aria-label='ArrowDown' size='S' />
        </ActionButton>
        <Tooltip>Move downwards</Tooltip>
      </TooltipTrigger>
    </Flex>
  );
}
