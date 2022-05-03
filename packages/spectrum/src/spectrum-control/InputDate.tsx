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
import { CellProps } from '@jsonforms/core';
import merge from 'lodash/merge';
import { SpectrumInputProps } from './index';
import { Provider } from '@adobe/react-spectrum';
import { DimensionValue } from '@react-types/shared';
import { DatePicker } from '@react-spectrum/datepicker';
import { getLocalTimeZone, parseDate, today } from '@internationalized/date';
import SpectrumProvider from '../additional/SpectrumProvider';

export const InputDate = ({
  config,
  data,
  enabled,
  handleChange,
  id,
  label,
  path,
  required,
  schema,
  uischema,
}: CellProps & SpectrumInputProps) => {
  const appliedUiSchemaOptions = merge({}, config, uischema.options);

  const width: DimensionValue = appliedUiSchemaOptions.trim
    ? undefined
    : '100%';

  let maxValue = appliedUiSchemaOptions.maxValue;
  let minValue = appliedUiSchemaOptions.minValue;

  const getMinMaxValue = (minMaxValue: string) => {
    if (minMaxValue === 'today') {
      return today(getLocalTimeZone());
    } else if (minMaxValue) {
      return parseDate(minMaxValue);
    } else {
      return null;
    }
  };

  const errorMessage = () => {
    if (minValue && maxValue) {
      return `Must be between ${minValue} and ${maxValue}!`;
    } else if (minValue) {
      return `Must be at least ${minValue}!`;
    } else if (maxValue) {
      return `Must be at most ${maxValue}!`;
    }
  };

  React.useEffect(() => {
    if (!data && schema?.default) {
      handleChange(path, schema.default);
    }
  }, [schema?.default]);

  return (
    <SpectrumProvider width={width}>
      <Provider locale={appliedUiSchemaOptions.locale ?? 'gregory'}>
        <DatePicker
          autoFocus={uischema.options && uischema.options.focus}
          description={appliedUiSchemaOptions.description ?? null}
          errorMessage={appliedUiSchemaOptions.errorMessage ?? errorMessage()}
          granularity='day'
          hideTimeZone={appliedUiSchemaOptions.hideTimeZone ?? true}
          id={id}
          isDisabled={enabled === undefined ? false : !enabled}
          isQuiet={appliedUiSchemaOptions.isQuiet ?? false}
          isRequired={required}
          label={label}
          labelAlign={appliedUiSchemaOptions.labelAlign ?? null}
          labelPosition={appliedUiSchemaOptions.labelPosition ?? null}
          maxValue={getMinMaxValue(maxValue)}
          maxVisibleMonths={appliedUiSchemaOptions.maxVisibleMonths ?? 1}
          minValue={getMinMaxValue(minValue)}
          necessityIndicator={appliedUiSchemaOptions.necessityIndicator ?? null}
          onChange={(datetime: any) =>
            handleChange(path, datetime ? datetime?.toString() : '')
          }
          showFormatHelpText={
            appliedUiSchemaOptions.showFormatHelpText ?? false
          }
          width={width}
          value={data ? parseDate(data) : null}
        />
      </Provider>
    </SpectrumProvider>
  );
};
