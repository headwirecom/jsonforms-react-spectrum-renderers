import {
  ControlProps,
  isIntegerControl,
  RankedTester,
  rankWith,
} from '@jsonforms/core';
import { withJsonFormsControlProps } from '@jsonforms/react';
import React from 'react';
import { InputInteger } from '../spectrum-control';
import { SpectrumInputControl } from './SpectrumInputControl';

export const SpectrumIntegerControl = (props: ControlProps) => (
  <SpectrumInputControl {...props} input={InputInteger} />
);

export const spectrumIntegerControlTester: RankedTester = rankWith(
  3,
  isIntegerControl
);

export default withJsonFormsControlProps(SpectrumIntegerControl);
