import {
  ControlProps,
  isMultiLineControl,
  RankedTester,
  rankWith,
} from '@jsonforms/core';
import { withJsonFormsControlProps } from '@jsonforms/react';
import React from 'react';
import { InputTextArea } from '../spectrum-control';
import { SpectrumInputControl } from './SpectrumInputControl';

export const SpectrumTextAreaControl = (props: ControlProps) => (
  <SpectrumInputControl {...props} input={InputTextArea} />
);

export const spectrumTextAreaControlTester: RankedTester = rankWith(
  3,
  isMultiLineControl
);

export default withJsonFormsControlProps(SpectrumTextAreaControl);
