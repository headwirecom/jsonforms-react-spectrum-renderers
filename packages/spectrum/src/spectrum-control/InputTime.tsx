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
import { CellProps, computeLabel } from '@jsonforms/core';
import { merge } from 'lodash';
import { SpectrumInputProps } from './index';
import { DimensionValue } from '@react-types/shared';
import { Flex } from '@adobe/react-spectrum';
import { DatePicker, DatePickerLabel } from '../additional/DatePicker';

export class InputTime extends React.PureComponent<
  CellProps & SpectrumInputProps
> {
  render() {
    const {
      config,
      uischema,
      data,
      id,
      enabled,
      required,
      path,
      handleChange,
      label,
    } = this.props;

    const appliedUiSchemaOptions = merge({}, config, uischema.options);

    const width: DimensionValue = appliedUiSchemaOptions.trim
      ? undefined
      : '100%';

    return (
      <Flex direction='column'>
        <DatePickerLabel htmlFor={id + '-input'}>
          {computeLabel(
            label,
            required,
            appliedUiSchemaOptions.hideRequiredAsterisk
          )}
        </DatePickerLabel>
        <DatePicker
          width={width}
          type='time'
          value={data ?? ''}
          onChange={(ev) => handleChange(path, ev.target.value)}
          id={id}
          disabled={!enabled}
          autoFocus={uischema.options && uischema.options.focus}
        />
      </Flex>
    );
  }
}
