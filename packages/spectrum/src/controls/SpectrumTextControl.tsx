import {
  ControlProps,
  isStringControl,
  RankedTester,
  rankWith,
} from '@jsonforms/core';
import { withJsonFormsControlProps } from '@jsonforms/react';
import React from 'react';
import { InputText } from '../spectrum-control/InputText';
import { SpectrumInputControl } from './SpectrumInputControl';

export const SpectrumTextControl = (props: ControlProps) => (
  <SpectrumInputControl {...props} input={InputText} />
);

export const spectrumTextControlTester: RankedTester = rankWith(
  3,
  isStringControl
);

export default withJsonFormsControlProps(SpectrumTextControl);
