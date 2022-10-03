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

import {
  and,
  ControlProps,
  JsonSchema,
  RankedTester,
  rankWith,
  schemaMatches,
  uiTypeIs,
} from '@jsonforms/core';
import { withJsonFormsEnumProps } from '@jsonforms/react';
import { InputEnum } from '../spectrum-control';
import { SpectrumInputControl } from './SpectrumInputControl';

const findEnumSchema = (schemas: JsonSchema[]) =>
  schemas.find((s) => s.enum !== undefined && (s.type === 'string' || s.type === undefined));
const findTextSchema = (schemas: JsonSchema[]) =>
  schemas.find((s) => s.type === 'string' && s.enum === undefined);

export const SpectrumAnyOfStringOrEnumControl = (props: ControlProps) => {
  return <SpectrumInputControl {...props} input={InputEnum} />;
};

const hasEnumAndText = (schemas: JsonSchema[]) => {
  // idea: map to type,enum and check that all types are string and at least one item is of type enum,
  const enumSchema = findEnumSchema(schemas);
  const stringSchema = findTextSchema(schemas);
  const remainingSchemas = schemas.filter((s) => s !== enumSchema || s !== stringSchema);
  const wrongType = remainingSchemas.find((s) => s.type && s.type !== 'string');
  return enumSchema && stringSchema && !wrongType;
};
const simpleAnyOf = and(
  uiTypeIs('Control'),
  schemaMatches((schema: any) => schema?.hasOwnProperty('anyOf') && hasEnumAndText(schema?.anyOf))
);

export const SpectrumAnyOfStringOrEnumControlTester: RankedTester = rankWith(5, simpleAnyOf);

export default withJsonFormsEnumProps(SpectrumAnyOfStringOrEnumControl);
