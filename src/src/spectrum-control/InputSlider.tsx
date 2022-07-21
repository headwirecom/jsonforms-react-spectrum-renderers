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
import { merge } from 'lodash';
import { DimensionValue } from '@react-types/shared';
import { SpectrumInputProps } from './index';
import { Slider } from '@adobe/react-spectrum';
import SpectrumProvider from '../additional/SpectrumProvider';
import { useDebouncedChange } from '../util/debounce';

export const InputSlider = React.memo(
  ({
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

    const width: DimensionValue | undefined = appliedUiSchemaOptions.trim
      ? undefined
      : '100%';

    const [inputSlider, onChange] = useDebouncedChange(
      handleChange,
      schema?.default ?? schema?.minimum,
      data,
      path
    );
    return (
      <SpectrumProvider width={width}>
        <Slider
          fillOffset={appliedUiSchemaOptions.fillOffset ?? null}
          formatOptions={appliedUiSchemaOptions.formatOptions ?? false}
          getValueLabel={
            appliedUiSchemaOptions.getValueLabel
              ? (value) => `${value} ${appliedUiSchemaOptions.getValueLabel}`
              : undefined
          }
          isDisabled={enabled === undefined ? false : !enabled}
          isFilled={appliedUiSchemaOptions.isFilled ?? false}
          isHidden={!visible}
          label={label}
          labelPosition={appliedUiSchemaOptions.labelPosition ?? 'top'}
          maxValue={schema.maximum}
          minValue={schema.minimum}
          onChange={onChange}
          orientation={appliedUiSchemaOptions.orientation ?? 'horizontal'}
          showValueLabel={appliedUiSchemaOptions.showValueLabel ?? true}
          step={schema.multipleOf || 1}
          trackGradient={appliedUiSchemaOptions.trackGradient ?? null}
          value={inputSlider}
          width={width}
        />
      </SpectrumProvider>
    );
  }
);
