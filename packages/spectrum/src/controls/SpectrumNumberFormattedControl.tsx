import {
  ControlProps,
  isNumberFormatControl,
  RankedTester,
  rankWith,
} from '@jsonforms/core';
import { withJsonFormsControlProps } from '@jsonforms/react';
import React from 'react';
import { InputNumberFormatted } from '../spectrum-control';
import { SpectrumInputControl } from './SpectrumInputControl';

export const SpectrumNumberFormattedControl = (props: ControlProps) => (
  <SpectrumInputControl {...props} input={InputNumberFormatted} />
);

export const spectrumNumberFormattedControlTester: RankedTester = rankWith(
  3,
  isNumberFormatControl
);

export default withJsonFormsControlProps(SpectrumNumberFormattedControl);
