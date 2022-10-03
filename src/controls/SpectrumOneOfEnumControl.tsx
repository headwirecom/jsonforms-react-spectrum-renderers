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

import { ControlProps, isOneOfEnumControl, RankedTester, rankWith } from '@jsonforms/core';
import { withJsonFormsOneOfEnumProps } from '@jsonforms/react';
import merge from 'lodash/merge';
import { SpectrumInputControl } from './SpectrumInputControl';
import { InputEnum } from '../spectrum-control/InputEnum';
import { InputEnumAutocomplete } from '../spectrum-control/InputEnumAutocomplete';

export const SpectrumOneOfEnumControl = (props: ControlProps) => {
  const { config, uischema } = props;
  const appliedUiSchemaOptions = merge({}, config, uischema.options);

  return (
    <SpectrumInputControl
      {...props}
      input={appliedUiSchemaOptions.autocomplete === false ? InputEnum : InputEnumAutocomplete}
    />
  );
};

export const SpectrumOneOfEnumControlTester: RankedTester = rankWith(5, isOneOfEnumControl);

export default withJsonFormsOneOfEnumProps(SpectrumOneOfEnumControl);
