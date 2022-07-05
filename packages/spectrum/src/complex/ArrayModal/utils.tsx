/*
  The MIT License

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
import { ErrorObject } from 'ajv';
import Add from '@spectrum-icons/workflow/Add';
import { UISchemaElement } from '@jsonforms/core';
import {
  ActionButton,
  Text,
  Tooltip,
  TooltipTrigger,
  View,
  Header,
  Flex,
  Heading,
} from '@adobe/react-spectrum';
import { ErrorIndicator } from '../../components/ErrorIndicator';
import SpectrumProvider from '../../additional/SpectrumProvider';
import { Dispatch } from './type';

export function getUIOptions(
  uischema: UISchemaElement,
  defaultLabel: string
): UIOptions {
  return {
    addButtonPosition:
      uischema.options?.addButtonPosition === 'bottom' ? 'bottom' : 'top',
    addButtonLabel:
      uischema.options?.addButtonLabel || `Add to ${defaultLabel}`,
    addButtonLabelType:
      uischema.options?.addButtonLabelType === 'inline' ? 'inline' : 'tooltip',
  };
}

export function AddButton(
  props: Pick<UIOptions, 'addButtonLabel' | 'addButtonLabelType'> & {
    onPress: () => void;
  }
) {
  const { addButtonLabel, addButtonLabelType, onPress } = props;
  const button = (
    <SpectrumProvider>
      <ActionButton UNSAFE_className='add-button' onPress={onPress}>
        <Add aria-label='Add' />
        {addButtonLabelType === 'inline' && <Text>{addButtonLabel}</Text>}
      </ActionButton>
    </SpectrumProvider>
  );

  return addButtonLabelType === 'tooltip' ? (
    <SpectrumProvider>
      <TooltipTrigger delay={0}>
        {button}
        <Tooltip>{addButtonLabel}</Tooltip>
      </TooltipTrigger>
    </SpectrumProvider>
  ) : (
    button
  );
}

export function ArrayHeader(
  props: UIOptions & {
    add: () => void;
    labelText: string;
    allErrorsMessages: string[];
  }
) {
  return (
    <Header>
      <Flex direction='row' alignItems='center' justifyContent='space-between'>
        <Heading level={4}>{props.labelText}</Heading>
        <View marginEnd='auto'>
          {props.allErrorsMessages.length ? (
            <ErrorIndicator
              errors={props.allErrorsMessages.map((message, index) => (
                <React.Fragment key={`${message}-${index}`}>
                  {message}
                  <br />
                  {index === props.allErrorsMessages.length - 1 ? null : <br />}
                </React.Fragment>
              ))}
            />
          ) : null}
        </View>
        {props.addButtonPosition === 'top' && (
          <AddButton {...props} onPress={props.add} />
        )}
      </Flex>
    </Header>
  );
}

export function ArrayFooter(props: UIOptions & { add: () => void }) {
  return props.addButtonPosition === 'bottom' ? (
    <View paddingTop='size-125'>
      <AddButton {...props} onPress={props.add} />
    </View>
  ) : null;
}

interface UIOptions {
  addButtonPosition: 'top' | 'bottom';
  addButtonLabel?: string;
  addButtonLabelType: 'tooltip' | 'inline';
}

export function getChildError(e: ErrorObject[], path: string) {
  const childPropErrors = e.filter(
    (localError) => localError.dataPath === path
  );

  if (childPropErrors.length > 0) {
    // TODO: is it possible to have multiple errors on a property?
    return childPropErrors[0].message;
  } else {
    return '';
  }
}

export let indexOfFittingSchemaObject: any = {};

interface UpdateAction {
  type: 'jsonforms/UPDATE';
  path: string;
  updater(existingData?: any): any;
}

export const UPDATE_DATA: 'jsonforms/UPDATE' = 'jsonforms/UPDATE';

const update = (
  path: string,
  updater: (existingData: any) => any
): UpdateAction => ({
  type: UPDATE_DATA,
  path,
  updater,
});

interface DispatchPropsOfArrayControl {
  move?(path: string, from: number, to: number): () => void;
}

/**
 * Maps state to dispatch properties of an array control.
 *
 * @param dispatch the store's dispatch method
 * @returns {DispatchPropsOfArrayControl} dispatch props of an array control
 */
export const mapDispatchToArrayControlProps = (
  dispatch: Dispatch<UpdateAction>
): DispatchPropsOfArrayControl => ({
  move: (path: any, from: number, to: number) => () => {
    dispatch(
      update(path, (array) => {
        move(array, from, to);
        return array;
      })
    );
  },
});

const move = (array: any[], index: number, delta: number) => {
  const newIndex: number = index + delta;
  if (newIndex < 0 || newIndex >= array.length) {
    return;
  } // Already at the top or bottom.
  if (newIndex > index) {
    const indexes: number[] = [index, newIndex].sort((a, b) => a - b); // Sort the indixes
    array.splice(indexes[1], 1, array[indexes[0]], array[indexes[1]]);
  } else {
    const indexes: number[] = [index, newIndex].sort((a, b) => a - b); // Sort the indixes
    array.splice(indexes[0], 1, array[indexes[1]], array[indexes[0]]);
  }
};

export const moveFromTo = (data: any[], from: number, to: number) => {
  let delta = to - from;

  if (delta === 0) {
    return; // If nothing changed, do nothing
  } else {
    move(data, from, delta);
  }
};

export function swap(array: any[], moveIndex: number, toIndex: number) {
  /* #move - Moves an array item from one position in an array to another.
     Note: This is a pure function so a new array will be returned, instead
     of altering the array argument.
    Arguments:
    1. array     (String) : Array in which to move an item.         (required)
    2. moveIndex (Object) : The index of the item to move.          (required)
    3. toIndex   (Object) : The index to move item at moveIndex to. (required)
  */
  const item = array[moveIndex];
  const length = array.length;
  const diff = moveIndex - toIndex;

  if (diff > 0) {
    // move left
    return [
      ...array.slice(0, toIndex),
      item,
      ...array.slice(toIndex, moveIndex),
      ...array.slice(moveIndex + 1, length),
    ];
  } else if (diff < 0) {
    // move right
    const targetIndex = toIndex + 1;
    return [
      ...array.slice(0, moveIndex),
      ...array.slice(moveIndex + 1, targetIndex),
      item,
      ...array.slice(targetIndex, length),
    ];
  }
  return array;
}
