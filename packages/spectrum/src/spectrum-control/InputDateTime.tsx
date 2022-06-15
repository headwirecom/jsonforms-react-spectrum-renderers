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
import { DimensionValue } from '@react-types/shared';
import { CellProps } from '@jsonforms/core';
import { SpectrumInputProps } from './index';
import { Provider } from '@adobe/react-spectrum';
import { DatePicker } from '@react-spectrum/datepicker';
import merge from 'lodash/merge';
import {
  getLocalTimeZone,
  parseAbsoluteToLocal,
  parseDateTime,
  today,
} from '@internationalized/date';
import SpectrumProvider from '../additional/SpectrumProvider';

import moment from 'moment';

export const InputDateTime = React.memo(({
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

  const toISOString = (inputDateTime: string) => {
    if (!inputDateTime) {
      return null;
    } else if (inputDateTime.length >= 25) {
      return inputDateTime.substring(0, 25);
    } else {
      return inputDateTime.substring(0, 19) + 'Z';
    }
  };

  let maxValue = appliedUiSchemaOptions.maxValue;
  let minValue = appliedUiSchemaOptions.minValue;

  const getMinMaxValue = (minMaxValue: string) => {
    if (minMaxValue === 'today') {
      return today(getLocalTimeZone());
    } else if (minMaxValue && minMaxValue.length === 19) {
      return parseDateTime(minMaxValue);
    } else if (minMaxValue && minMaxValue.length === 10) {
      if (minMaxValue === maxValue) {
        return parseDateTime(minMaxValue + 'T23:59:59');
      } else {
        return parseDateTime(minMaxValue + 'T00:00:00');
      }
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
      handleChange(path, toISOString(schema.default));
    }
  }, [schema?.default]);

  return (
    <SpectrumProvider width={width}>
      <Provider locale={appliedUiSchemaOptions.locale ?? 'gregory'}>
        <DatePicker
          autoFocus={uischema.options && uischema.options.focus}
          description={appliedUiSchemaOptions.description ?? null}
          errorMessage={appliedUiSchemaOptions.errorMessage ?? errorMessage()}
          granularity={appliedUiSchemaOptions.granularity ?? 'minute'}
          hideTimeZone={appliedUiSchemaOptions.hideTimeZone ?? true}
          hourCycle={appliedUiSchemaOptions.hourCycle}
          id={id}
          isDisabled={enabled === undefined ? false : !enabled}
          isQuiet={appliedUiSchemaOptions.isQuiet ?? false}
          isReadOnly={appliedUiSchemaOptions.readonly ?? schema.readOnly ?? false}
          isRequired={required}
          label={label}
          labelAlign={appliedUiSchemaOptions.labelAlign ?? null}
          labelPosition={appliedUiSchemaOptions.labelPosition ?? null}
          maxValue={getMinMaxValue(maxValue)}
          maxVisibleMonths={appliedUiSchemaOptions.maxVisibleMonths ?? 1}
          minValue={getMinMaxValue(minValue)}
          necessityIndicator={appliedUiSchemaOptions.necessityIndicator ?? null}
          onChange={(datetime: any) =>
            handleChange(
              path,
              datetime ? toISOString(datetime?.toString()) : ''
            )
          }
          showFormatHelpText={
            appliedUiSchemaOptions.showFormatHelpText ?? false
          }
          value={data ? parseAbsoluteToLocal(moment().format(data)) : null}
          width={width}
        />
      </Provider>
    </SpectrumProvider>
  );
});
