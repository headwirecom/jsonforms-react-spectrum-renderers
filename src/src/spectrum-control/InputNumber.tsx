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
import React, { useEffect } from 'react';
import { CellProps } from '@jsonforms/core';
import merge from 'lodash/merge';
import { NumberField } from '@adobe/react-spectrum';
import { DimensionValue } from '@react-types/shared';
import { SpectrumInputProps } from './index';
import SpectrumProvider from '../additional/SpectrumProvider';

export const InputNumber = React.memo(
  ({
    config,
    data,
    enabled,
    handleChange,
    id,
    isValid,
    label,
    path,
    required,
    schema,
    uischema,
  }: CellProps & SpectrumInputProps) => {
    const appliedUiSchemaOptions = merge({}, config, uischema.options);

    const width: DimensionValue | undefined = appliedUiSchemaOptions.trim
      ? undefined
      : '100%';

    const errorMessage = () => {
      let maxValue = schema.maximum;
      let minValue = schema.minimum;
      if (minValue && maxValue) {
        return `Must be between ${minValue} and ${maxValue}!`;
      } else if (minValue) {
        return `Must be at least ${minValue}!`;
      } else if (maxValue) {
        return `Must be at most ${maxValue}!`;
      }
    };

    const stepValue = appliedUiSchemaOptions.step ?? 0.1;

    useEffect(() => {
      if (!data && schema?.default) {
        handleChange(path, schema.default);
      }
    }, [schema?.default]);

    return (
      <SpectrumProvider width={width}>
        <NumberField
          aria-label={'numberfield' + label}
          autoFocus={appliedUiSchemaOptions.focus}
          decrementAriaLabel={
            appliedUiSchemaOptions.incrementAriaLabel ??
            `Decrement -${stepValue}`
          }
          description={appliedUiSchemaOptions.description ?? null}
          errorMessage={appliedUiSchemaOptions.errorMessage ?? errorMessage()}
          formatOptions={appliedUiSchemaOptions.formatOptions ?? false}
          hideStepper={appliedUiSchemaOptions.hideStepper ?? false}
          id={id}
          incrementAriaLabel={
            appliedUiSchemaOptions.incrementAriaLabel ??
            `Increment +${stepValue}`
          }
          isDisabled={enabled === undefined ? false : !enabled}
          isReadOnly={
            appliedUiSchemaOptions.readonly ?? schema.readOnly ?? false
          }
          isRequired={required}
          label={label}
          labelAlign={appliedUiSchemaOptions.labelAlign ?? null}
          labelPosition={appliedUiSchemaOptions.labelPosition ?? null}
          maxValue={schema.maximum}
          minValue={schema.minimum}
          necessityIndicator={appliedUiSchemaOptions.necessityIndicator ?? null}
          onChange={(value: number) => handleChange(path, value)}
          step={stepValue}
          validationState={isValid ? 'valid' : 'invalid'}
          value={data ?? schema.default}
          width={width}
        />
      </SpectrumProvider>
    );
  }
);
