import React from 'react';

import { CellProps } from '@jsonforms/core';
import { merge } from 'lodash';
import { TextArea } from '@adobe/react-spectrum';
import { DimensionValue } from '@react-types/shared';
import { SpectrumInputProps } from './index';

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

    const width: DimensionValue = appliedUiSchemaOptions.trim ? undefined : '100%';

    return (
      <TextArea
        value={data ?? ''}
        label={label}
        isRequired={isRequired}
        onChange={onChange}
        id={`${id}-input`}
        isDisabled={!enabled}
        autoFocus={uischema.options && uischema.options.focus}
        width={width}
      />
    );
  }
}
