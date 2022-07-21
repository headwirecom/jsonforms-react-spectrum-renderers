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
import { EnumCellProps } from '@jsonforms/core';
import merge from 'lodash/merge';
import { SpectrumInputProps } from './index';
import { DimensionValue } from '@react-types/shared';
import { Item, ComboBox } from '@adobe/react-spectrum';
import SpectrumProvider from '../additional/SpectrumProvider';

export const InputEnumAutocomplete = React.memo(
  ({
    config,
    data,
    enabled,
    handleChange,
    id,
    label,
    options,
    path,
    required,
    schema,
    uischema,
  }: EnumCellProps & SpectrumInputProps) => {
    const appliedUiSchemaOptions = merge({}, config, uischema.options);

    const width: DimensionValue | undefined = appliedUiSchemaOptions.trim
      ? undefined
      : '100%';

    let [value, setValue] = React.useState(data ?? '');
    const handleOnChange = (value: any) => {
      setValue(value);
      handleChange(path, value);
    };

    React.useEffect(() => {
      if (!data && schema?.default) {
        handleOnChange(schema.default);
      }
    }, [schema?.default]);

    return (
      <SpectrumProvider width={width}>
        {options && (
          <ComboBox
            allowsCustomValue={
              appliedUiSchemaOptions.allowsCustomValue ?? false
            }
            aria-label={label ?? 'combobox'}
            autoFocus={appliedUiSchemaOptions.focus}
            description={appliedUiSchemaOptions.description ?? null}
            direction={appliedUiSchemaOptions.direction ?? 'bottom'}
            errorMessage={appliedUiSchemaOptions.errorMessage ?? null}
            id={id}
            isDisabled={enabled === undefined ? false : !enabled}
            isQuiet={appliedUiSchemaOptions.isQuiet ?? false}
            isReadOnly={
              appliedUiSchemaOptions.readonly ?? schema.readOnly ?? false
            }
            isRequired={required}
            key={id}
            label={label}
            labelAlign={appliedUiSchemaOptions.labelAlign ?? null}
            labelPosition={appliedUiSchemaOptions.labelPosition ?? null}
            menuTrigger={appliedUiSchemaOptions.menuTrigger ?? 'input'}
            necessityIndicator={
              appliedUiSchemaOptions.necessityIndicator ?? null
            }
            onSelectionChange={handleOnChange}
            selectedKey={value}
            shouldFlip={appliedUiSchemaOptions.shouldFlip ?? true}
            shouldFocusWrap={appliedUiSchemaOptions.shouldFocusWrap ?? null}
            width={width}
          >
            {options.map((item) => (
              <Item key={item.value}>{item.label}</Item>
            ))}
          </ComboBox>
        )}
      </SpectrumProvider>
    );
  }
);
