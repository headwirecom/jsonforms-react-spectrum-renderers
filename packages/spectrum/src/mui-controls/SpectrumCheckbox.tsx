/*
  The MIT License

  Copyright (c) 2017-2019 EclipseSource Munich
  https://github.com/eclipsesource/jsonforms

  Copyright (c) 2020 Puzzle ITC GmbH
  https://github.com/puzzle/jsonforms-react-spectrum

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
import { Checkbox } from '@adobe/react-spectrum';
import { areEqual } from '@jsonforms/react';
import merge from 'lodash/merge';

export const SpectrumCheckbox = React.memo((props: CellProps) => {
  const { data, id, enabled, uischema, path, handleChange, config } = props;
  const appliedUiSchemaOptions = merge({}, config, uischema.options);
  const autoFocus = !!appliedUiSchemaOptions.focus;
  // !! causes undefined value to be converted to false, otherwise has no effect
  const isSelected = !!data;

  return (
    <Checkbox
      isSelected={isSelected}
      onChange={selected => handleChange(path, selected)}
      id={id}
      isDisabled={!enabled}
      autoFocus={autoFocus}
    />
  );
}, areEqual);
