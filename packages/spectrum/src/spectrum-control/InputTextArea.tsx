import React from 'react';

import { CellProps } from '@jsonforms/core';
import { merge } from 'lodash';
import { TextArea } from '@adobe/react-spectrum';

interface SpectrumInputProps {
  required?: boolean;
  label?: string;
}
export class InputTextArea extends React.PureComponent<
  CellProps & SpectrumInputProps
> {
  render() {
    const {
      data,
      config,
      id,
      enabled,
      uischema,
      path,
      handleChange,
      required,
      label,
    } = this.props;

    const appliedUiSchemaOptions = merge({}, config, uischema.options);

    const onChange = (value: string) => handleChange(path, value);
    const isRequired = required && !appliedUiSchemaOptions.hideRequiredAsterisk;

    return (
      <TextArea
        value={data || ''}
        label={label}
        isRequired={isRequired}
        onChange={onChange}
        id={`${id}-input`}
        isDisabled={!enabled}
        autoFocus={uischema.options && uischema.options.focus}
      />
    );
  }
}
