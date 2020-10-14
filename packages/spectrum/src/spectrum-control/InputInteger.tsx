import React from 'react';

import { CellProps } from '@jsonforms/core';
import { merge } from 'lodash';
import { TextField } from '@adobe/react-spectrum';

interface SpectrumInputProps {
  required?: boolean;
  label?: string;
}
export class InputInteger extends React.PureComponent<
  CellProps & SpectrumInputProps
> {
  render() {
    const {
      config,
      uischema,
      data,
      isValid,
      id,
      enabled,
      required,
      path,
      handleChange,
      label,
    } = this.props;

    const appliedUiSchemaOptions = merge({}, config, uischema.options);
    const isRequired = required && !appliedUiSchemaOptions.hideRequiredAsterisk;

    return (
      <div>
        <TextField
          label={label}
          type='number'
          inputMode='numeric'
          value={data === undefined || data === null ? '' : data}
          isRequired={isRequired}
          onChange={(value) => handleChange(path, parseInt(value, 10))}
          id={id}
          isDisabled={enabled === undefined ? false : !enabled}
          autoFocus={uischema.options && uischema.options.focus}
          validationState={isValid ? 'valid' : 'invalid'}
        />
      </div>
    );
  }
}
