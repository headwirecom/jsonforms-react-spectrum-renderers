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
import {
  CellProps,
  isBooleanControl,
  RankedTester,
  rankWith,
} from '@jsonforms/core';
import { withJsonFormsCellProps } from '@jsonforms/react';
import { FunctionComponent } from 'react';
import { Checkbox } from '@adobe/react-spectrum';
import merge from 'lodash/merge';
import { DimensionValue } from '@react-types/shared';

export const SpectrumBooleanCell: FunctionComponent<CellProps> = (
  props: React.PropsWithChildren<CellProps>
) => {
  const {
    data,
    id,
    enabled,
    uischema,
    path,
    handleChange,
    config,
    isValid,
  } = props;
  const appliedUiSchemaOptions = merge({}, config, uischema.options);
  const autoFocus = !!appliedUiSchemaOptions.focus;
  // !! causes undefined value to be converted to false, otherwise has no effect
  const isSelected = !!data;
  const validationState = !!isValid ? 'valid' : 'invalid';
  const width: DimensionValue = appliedUiSchemaOptions.trim
    ? undefined
    : '100%';

  return (
    <Checkbox
      isSelected={isSelected}
      onChange={(selected) => handleChange(path, selected)}
      id={id}
      isDisabled={!enabled}
      autoFocus={autoFocus}
      validationState={validationState}
      width={width}
      aria-label={props.children ? undefined : path}
    >
      {props.children}
    </Checkbox>
  );
};

/**
 * Default tester for boolean controls.
 * @type {RankedTester}
 */
export const spectrumBooleanCellTester: RankedTester = rankWith(
  2,
  isBooleanControl
);

export default withJsonFormsCellProps(SpectrumBooleanCell);
