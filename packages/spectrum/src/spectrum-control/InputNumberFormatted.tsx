import React from 'react';

import { CellProps, Formatted } from '@jsonforms/core';
import { merge } from 'lodash';
import { TextField } from '@adobe/react-spectrum';
import { DimensionValue } from '@react-types/shared';
import { SpectrumInputProps } from './index';

export class InputNumberFormatted extends React.PureComponent<
  CellProps & SpectrumInputProps & Formatted<number>
> {
  render() {
    const {
      id,
      enabled,
      required,
      isValid,
      config,
      uischema,
      path,
      handleChange,
      schema,
      label,
    } = this.props;
    const maxLength = schema.maxLength;

    const formattedNumber: string = this.props.toFormatted(this.props.data);

    const onChange = (ev: any) => {
      const validStringNumber = this.props.fromFormatted(
        ev.currentTarget.value
      );
      handleChange(path, validStringNumber);
    };

    const appliedUiSchemaOptions = merge({}, config, uischema.options);
    const isRequired = required && !appliedUiSchemaOptions.hideRequiredAsterisk;

    const width: DimensionValue = appliedUiSchemaOptions.trim ? undefined : '100%';

    return (
      <TextField
        label={label}
        type='text'
        inputMode='numeric'
        value={formattedNumber}
        isRequired={isRequired}
        onChange={onChange}
        id={id}
        isDisabled={!enabled}
        autoFocus={uischema.options && uischema.options.focus}
        maxLength={maxLength}
        validationState={isValid ? 'valid' : 'invalid'}
        width={width}
      />
    );
  }
}
