import React from 'react';

import { CellProps } from '@jsonforms/core';
import { merge } from 'lodash';
import { TextField } from '@adobe/react-spectrum';

interface SpectrumInputProps {
  required?: boolean;
  label?: string;
}
export class InputNumber extends React.PureComponent<
  CellProps & SpectrumInputProps
> {
  render() {
    const {
      data,
      errors,
      config,
      id,
      required,
      enabled,
      uischema,
      path,
      handleChange,
      label,
    } = this.props;

    const appliedUiSchemaOptions = merge({}, config, uischema.options);
    const isRequired = required && !appliedUiSchemaOptions.hideRequiredAsterisk;

    const isValid = errors ? errors.length === 0 : true;

    const toNumber = (value: string) =>
      value === '' ? undefined : parseFloat(value);

    return (
      <TextField
        label={label}
        type='number'
        inputMode='numeric'
        value={data === undefined || data === null ? '' : data}
        onChange={(value) => handleChange(path, toNumber(value))}
        id={id}
        isDisabled={!enabled}
        autoFocus={uischema.options && uischema.options.focus}
        isRequired={isRequired}
        validationState={isValid ? 'valid' : 'invalid'}
      />
    );
  }
}
