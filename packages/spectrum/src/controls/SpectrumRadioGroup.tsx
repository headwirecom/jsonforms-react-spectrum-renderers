/*
  The MIT License
  Copyright (c) 2022 headwire.com, Inc
  https://github.com/eclipsesource/jsonforms
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
import merge from 'lodash/merge';
import { ControlProps, OwnPropsOfEnum } from '@jsonforms/core';
import { View, RadioGroup, Radio } from '@adobe/react-spectrum';

export const SpectrumRadioGroup = (props: ControlProps & OwnPropsOfEnum) => {
  const {
    config,
    handleChange,
    label,
    options,
    path,
    required,
    uischema,
    visible,
  } = props;
  const appliedUiSchemaOptions = merge({}, config, uischema.options);

  console.log("SpectrumRadioGroup");
  return (
    <View
      isHidden={visible === undefined || visible === null ? false : !visible}
    >
      <RadioGroup
        aria-label={'radiogroup' + props.data}
        isEmphasized={appliedUiSchemaOptions.isEmphasized ?? false}
        isRequired={required}
        label={label}
        labelAlign={appliedUiSchemaOptions.labelAlign ?? null}
        labelPosition={appliedUiSchemaOptions.labelPosition ?? null}
        necessityIndicator={appliedUiSchemaOptions.necessityIndicator ?? null}
        onChange={(ev) => handleChange(path, ev)}
        orientation={appliedUiSchemaOptions.orientation ?? 'vertical'}
        value={props.data}
      >
        {options.map((option) => (
          <Radio value={option.value} key={option.label}>
            {option.label}
          </Radio>
        ))}
      </RadioGroup>
    </View>
  );
};
