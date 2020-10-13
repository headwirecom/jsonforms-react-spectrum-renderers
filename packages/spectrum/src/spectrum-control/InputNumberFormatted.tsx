import React from 'react';

import { CellProps } from '@jsonforms/core';
import { merge } from 'lodash';
import { TextField } from '@adobe/react-spectrum';

interface SpectrumInputProps {
  required?: boolean;
  label?: string;
}
export class InputNumberFormatted extends React.PureComponent<
  CellProps & SpectrumInputProps
> {
  render() {
    const {
      id,
      enabled,
      required,
      errors,
      config,
      uischema,
      path,
      handleChange,
      schema,
      label,
    } = this.props;
    const maxLength = schema.maxLength;

    const formattedNumber: string = '1';
    const onChange = (event: any) =>
      handleChange(path, event.currentTarget.value);
    // const formattedNumber: string = this.props.toFormatted(this.props.data);

    // const onChange = (ev: any) => {
    //   const validStringNumber = this.props.fromFormatted(
    //     ev.currentTarget.value
    //   );
    //   handleChange(path, validStringNumber);
    // };

    const appliedUiSchemaOptions = merge({}, config, uischema.options);
    const isRequired = required && !appliedUiSchemaOptions.hideRequiredAsterisk;

    const isValid = errors.length === 0;

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
      />
    );
  }
}
