import React from 'react';

import { CellProps } from '@jsonforms/core';
import { merge } from 'lodash';
import { TextField } from '@adobe/react-spectrum';
import { DimensionValue } from '@react-types/shared';
import { SpectrumInputProps } from './index';

export class InputNumber extends React.PureComponent<
  CellProps & SpectrumInputProps
> {
  render() {
    const {
      data,
      isValid,
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

    const toNumber = (value: string) =>
      value === '' ? undefined : parseFloat(value);

    const width: DimensionValue = appliedUiSchemaOptions.trim ? undefined : '100%';

    return (
      <TextField
        label={label}
        type='number'
        inputMode='numeric'
        value={data ?? ''}
        onChange={value => handleChange(path, toNumber(value))}
        id={id}
        isDisabled={!enabled}
        autoFocus={uischema.options && uischema.options.focus}
        isRequired={isRequired}
        validationState={isValid ? 'valid' : 'invalid'}
        width={width}
      />
    );
  }
}
