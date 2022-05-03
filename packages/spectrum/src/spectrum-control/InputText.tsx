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
import { TextField } from '@adobe/react-spectrum';
import { DimensionValue } from '@react-types/shared';
import { SpectrumInputProps } from './index';
import SpectrumProvider from '../additional/SpectrumProvider';

export const InputText = ({
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

  const width: DimensionValue = appliedUiSchemaOptions.trim
    ? undefined
    : '100%';

  const isValidCheck = () => {
    let minLength = appliedUiSchemaOptions.minLength ?? (required ? 1 : 0);
    let maxLength = appliedUiSchemaOptions.maxLength ?? Infinity;
    if (isValid && !data && minLength === 0) {
      return 'valid';
    } else if (!data) {
      return 'invalid';
    } else if (
      isValid &&
      data.length >= minLength &&
      data.length <= maxLength
    ) {
      return 'valid';
    } else {
      return 'invalid';
    }
  };

  const errorMessage = () => {
    let minLength = appliedUiSchemaOptions.minLength ?? (required ? 1 : null);
    let maxLength = appliedUiSchemaOptions.maxLength;
    if (minLength && maxLength) {
      return `Must be between ${minLength} and ${maxLength} characters`;
    } else if (minLength) {
      return `Must be at least ${minLength} characters`;
    } else if (maxLength) {
      return `Must be at most ${maxLength} characters`;
    }
  };

  React.useEffect(() => {
    if (!data && schema?.default) {
      handleChange(path, schema.default);
    }
  }, [schema?.default]);

  return (
    <SpectrumProvider width={width}>
      <TextField
        aria-label={label ? label : 'textfield'}
        autoFocus={appliedUiSchemaOptions.focus}
        description={appliedUiSchemaOptions.description ?? null}
        errorMessage={appliedUiSchemaOptions.errorMessage ?? errorMessage()}
        id={id && `${id}-input`}
        inputMode={appliedUiSchemaOptions.inputMode ?? 'none'}
        isDisabled={enabled === undefined ? false : !enabled}
        isQuiet={appliedUiSchemaOptions.isQuiet ?? false}
        isRequired={required}
        label={label}
        labelAlign={appliedUiSchemaOptions.labelAlign ?? null}
        labelPosition={appliedUiSchemaOptions.labelPosition ?? null}
        maxLength={appliedUiSchemaOptions.maxLength ?? null}
        minLength={appliedUiSchemaOptions.minLength ?? null}
        necessityIndicator={appliedUiSchemaOptions.necessityIndicator ?? null}
        onChange={(value: any) => handleChange(path, value)}
        placeholder={appliedUiSchemaOptions.placeholder ?? null}
        type={appliedUiSchemaOptions.format ?? 'text'}
        validationState={isValidCheck()}
        value={data ?? ''}
        width={width}
      />
    </SpectrumProvider>
  );
};
