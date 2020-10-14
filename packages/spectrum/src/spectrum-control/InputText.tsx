import React from 'react';

import { CellProps } from '@jsonforms/core';
import { merge } from 'lodash';
import { TextField } from '@adobe/react-spectrum';

interface SpectrumInputProps {
  required?: boolean;
  label?: string;
}
export class InputText extends React.PureComponent<
  CellProps & SpectrumInputProps
> {
  render() {
    const {
      data,
      config,
      id,
      enabled,
      uischema,
      required,
      isValid,
      path,
      handleChange,
      schema,
      label,
    } = this.props;

    const maxLength = schema.maxLength;
    const minLength = schema.minLength;

    const appliedUiSchemaOptions = merge({}, config, uischema.options);

    const onChange = (value: string) => handleChange(path, value);

    // TODO: react-spectrum has no concept of "hide the asterisk" - the value is either required or not
    // check if setting required to false has some unwanted consequences
    const isRequired = required && !appliedUiSchemaOptions.hideRequiredAsterisk;

    return (
      <TextField
        type={
          appliedUiSchemaOptions.format === 'password' ? 'password' : 'text'
        }
        isRequired={isRequired}
        value={data || ''}
        label={label}
        onChange={onChange}
        id={`${id}-input`}
        isDisabled={!enabled}
        autoFocus={appliedUiSchemaOptions.focus}
        maxLength={maxLength}
        minLength={minLength}
        validationState={isValid ? 'valid' : 'invalid'}
      />
    );
  }
}
