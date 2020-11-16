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
import { merge } from 'lodash';
import { SpectrumInputProps } from './index';
import { DimensionValue } from '@react-types/shared';
import { DatePicker } from '@react-spectrum/datepicker';
import { CellProps } from '@jsonforms/core';
import { Flex } from '@adobe/react-spectrum';

export class InputTime extends React.PureComponent<
  CellProps & SpectrumInputProps
> {
  render() {
    const {
      config,
      uischema,
      // data, TODO: a date is required here - even for times - check out what the definitive api will be...
      // isValid,
      id,
      enabled,
      required,
      path,
      handleChange,
      label,
    } = this.props;

    const appliedUiSchemaOptions = merge({}, config, uischema.options);
    const isRequired = required && !appliedUiSchemaOptions.hideRequiredAsterisk;

    const width: DimensionValue = appliedUiSchemaOptions.trim
      ? undefined
      : '100%';

    let format = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: false
      
    };

    return (
      <Flex direction='row'>
        <DatePicker
          key={id}
          id={id}
          flex='auto'
          label={label}
          isRequired={isRequired}
          isDisabled={!enabled}
          width={width}
          // value={data} TODO: a date is required here - even for times - check out what the definitive api will be...
          onChange={(value) => handleChange(path, value)}
          formatOptions={format}
          autoFocus={uischema.options && uischema.options.focus}
        />
      </Flex>
    );
  }
}
