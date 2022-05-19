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
import { debounce, merge } from 'lodash';
import { DimensionValue } from '@react-types/shared';
import { SpectrumInputProps } from './index';
import { Slider } from '@adobe/react-spectrum';
import SpectrumProvider from '../additional/SpectrumProvider';

export const InputSlider = ({
  config,
  data,
  enabled,
  handleChange,
  label,
  path,
  schema,
  uischema,
  visible,
}: CellProps & SpectrumInputProps) => {
  const appliedUiSchemaOptions = merge({}, config, uischema.options);

  const width: DimensionValue = appliedUiSchemaOptions.trim
    ? undefined
    : '100%';

  let [value, setValue] = React.useState(0);

  const handleOnChange = (value: any) => {
    setValue(value);
  };

  const handleOnChangeEnd = (value: any) => {
    setValue(value);
    handleChange(path, value);
  };

  React.useEffect(() => {
    if (data) {
      handleOnChangeEnd(data);
    } else if (!data && schema?.default) {
      handleOnChangeEnd(schema.default);
    }
  }, [schema?.default]);

  return (
    <SpectrumProvider width={width}>
      <Slider
        fillOffset={appliedUiSchemaOptions.fillOffset ?? null}
        formatOptions={appliedUiSchemaOptions.formatOptions ?? false}
        getValueLabel={
          appliedUiSchemaOptions.getValueLabel
            ? (value) => `${value} ${appliedUiSchemaOptions.getValueLabel}`
            : null
        }
        isDisabled={enabled === undefined ? false : !enabled}
        isFilled={appliedUiSchemaOptions.isFilled ?? false}
        isHidden={!visible}
        label={label}
        labelPosition={appliedUiSchemaOptions.labelPosition ?? 'top'}
        maxValue={schema.maximum}
        minValue={schema.minimum}
        onChange={handleOnChange}
        onChangeEnd={debounce(handleOnChangeEnd, 10)}
        orientation={appliedUiSchemaOptions.orientation ?? 'horizontal'}
        showValueLabel={appliedUiSchemaOptions.showValueLabel ?? true}
        step={schema.multipleOf || 1}
        trackGradient={appliedUiSchemaOptions.trackGradient ?? null}
        value={value}
        width={width}
      />
    </SpectrumProvider>
  );
};
