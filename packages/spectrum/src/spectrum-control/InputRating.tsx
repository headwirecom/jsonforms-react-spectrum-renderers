/*
  The MIT License
  Copyright (c) 2022 headwire.com, Inc
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
import merge from 'lodash/merge';
import { RadioGroup, Radio } from '@adobe/react-spectrum';
import { SpectrumInputProps } from './index';
import { DimensionValue } from '@react-types/shared';
import StarOutline from '@spectrum-icons/workflow/StarOutline';
import Star from '@spectrum-icons/workflow/Star';
import SpectrumProvider from '../additional/SpectrumProvider';

export const InputRating = ({
  config,
  data,
  enabled,
  handleChange,
  id,
  isValid,
  label,
  path,
  required,
  schema,
  uischema,
}: CellProps & SpectrumInputProps) => {
  const [hover, setHover] = React.useState(null);

  const appliedUiSchemaOptions = merge({}, config, uischema.options);

  const width: DimensionValue = appliedUiSchemaOptions.trim
    ? undefined
    : '100%';

  let [selected, setSelected] = React.useState(data);

  const handleOnChange = (value: any) => {
    setSelected(value);
    handleChange(path, value);
  };

  React.useEffect(() => {
    if (!data && schema?.default) {
      handleOnChange(schema.default);
    }
  }, [schema?.default]);

  return (
    <SpectrumProvider width={width}>
      <RadioGroup
        id={id}
        isDisabled={enabled === undefined ? false : !enabled}
        isRequired={required}
        label={label}
        necessityIndicator={appliedUiSchemaOptions.necessityIndicator ?? null}
        onChange={handleOnChange}
        orientation={appliedUiSchemaOptions.orientation ?? 'horizontal'}
        validationState={isValid ? 'valid' : 'invalid'}
        value={selected}
        width={width}
      >
        {[...Array(schema.maximum ?? 5)].map((Stars, i) => {
          const ratingValue = i + 1;
          return (
            <label
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
              key={ratingValue + '/' + (schema.maximum ?? 5)}
            >
              <Radio
                value={'' + ratingValue}
                isHidden={true}
                aria-label={
                  'Rating ' +
                  ratingValue +
                  '/' +
                  (schema.maximum ?? 5) +
                  ', currently selected value: ' +
                  data
                }
              />
              <span>
                {ratingValue <= (hover ?? data) ? (
                  <Star id={Stars} margin='size-25' />
                ) : (
                  <StarOutline id={Stars} margin='size-25' />
                )}
              </span>
            </label>
          );
        })}
      </RadioGroup>
    </SpectrumProvider>
  );
};
