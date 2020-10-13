import {
  ControlProps,
  isNumberControl,
  RankedTester,
  rankWith,
} from '@jsonforms/core';
import { withJsonFormsControlProps } from '@jsonforms/react';
import React from 'react';
import { InputNumber } from '../spectrum-control';
import { SpectrumInputControl } from './SpectrumInputControl';

export const SpectrumNumberControl = (props: ControlProps) => (
  <SpectrumInputControl {...props} input={InputNumber} />
);

export const spectrumNumberControlTester: RankedTester = rankWith(
  3,
  isNumberControl
);

export default withJsonFormsControlProps(SpectrumNumberControl);
