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
import { DimensionValue } from '@react-types/shared';
import { Provider } from '@adobe/react-spectrum';
import { TimeField } from '@react-spectrum/datepicker';
import { parseAbsoluteToLocal } from '@internationalized/date';
import SpectrumProvider from '../additional/SpectrumProvider';
import moment from 'moment';

export const InputTime = ({
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
      return inputDateTime.substring(0, 16) + 'Z';
    } else if (inputDateTime.length <= 8) {
      return '2022-06-06T' + inputDateTime + 'Z';
    } else {
      return inputDateTime.substring(0, 19) + 'Z';
    }
  };

  React.useEffect(() => {
    data ? null : handleChange(path, schema?.default);
  }, []);

  return (
    <SpectrumProvider width={width}>
      <Provider locale={appliedUiSchemaOptions.locale ?? 'gregory'}>
        <TimeField
          autoFocus={appliedUiSchemaOptions.focus}
          granularity={appliedUiSchemaOptions.granularity ?? 'minute'}
          hideTimeZone={appliedUiSchemaOptions.hideTimeZone ?? true}
          hourCycle={appliedUiSchemaOptions.hourCycle}
          id={id}
          isDisabled={enabled === undefined ? false : !enabled}
          isQuiet={appliedUiSchemaOptions.isQuiet ?? false}
          isRequired={required}
          label={label}
          labelAlign={appliedUiSchemaOptions.labelAlign ?? null}
          labelPosition={appliedUiSchemaOptions.labelPosition ?? null}
          necessityIndicator={appliedUiSchemaOptions.necessityIndicator ?? null}
          width={width}
          minValue={
            appliedUiSchemaOptions.minValue
              ? parseAbsoluteToLocal(
                  moment().format(
                    toISOString(appliedUiSchemaOptions.minValue.toString())
                  )
                )
              : null
          }
          maxValue={
            appliedUiSchemaOptions.maxValue
              ? parseAbsoluteToLocal(
                  moment().format(
                    toISOString(appliedUiSchemaOptions.maxValue.toString())
                  )
                )
              : null
          }
          value={
            data
              ? parseAbsoluteToLocal(moment().format(toISOString(data)))
              : null
          }
          onChange={(datetime: any) =>
            handleChange(
              path,
              datetime
                ? datetime
                    ?.toString()
                    .split('T')
                    .pop()
                    .split('+')[0]
                    .substring(
                      0,
                      5
                    ) /* substring is needed, because ajv throws an error when we use the format HH:mm:ss */
                : ''
            )
          }
        />
      </Provider>
    </SpectrumProvider>
  );
};
