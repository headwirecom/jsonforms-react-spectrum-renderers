/*
  The MIT License

  Copyright (c) 2017-2019 EclipseSource Munich
  https://github.com/eclipsesource/jsonforms

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
import '@testing-library/jest-dom';
import { LabelElement, RuleEffect, UISchemaElement } from '@jsonforms/core';
import { SpectrumLabelRendererTester } from '../../src/complex/SpectrumLabelRenderer';
import { falseCondition, renderForm } from '../util';

const fixture = {
  data: { name: 'Foo' },
  schema: {
    type: 'object',
    properties: { name: { type: 'string' } },
  },
  uischema: { type: 'Label', text: 'Bar' },
};

describe('Label tester', () => {
  test('tester', () => {
    expect(SpectrumLabelRendererTester(undefined, undefined)).toBe(-1);
    expect(SpectrumLabelRendererTester(null, undefined)).toBe(-1);
    expect(SpectrumLabelRendererTester({ type: 'Foo' }, undefined)).toBe(-1);
    expect(SpectrumLabelRendererTester({ type: 'Label' }, undefined)).toBe(1);
  });
});

describe('Label', () => {
  test('render with undefined text', () => {
    const uischema: UISchemaElement = { type: 'Label' };

    const { container } = renderForm(uischema);

    expect(container.querySelector('span')).toHaveTextContent('');
  });

  test('render with null text', () => {
    const uischema: LabelElement = {
      type: 'Label',
      text: null,
    };

    const { container } = renderForm(uischema);

    expect(container.querySelector('span')).toHaveTextContent('');
  });

  test('render with text', () => {
    const { container } = renderForm(fixture.uischema, fixture.schema, fixture.data);

    expect(container.querySelector('span')).toHaveTextContent('Bar');
  });

  test('hide', () => {
    const uischema: UISchemaElement = {
      ...fixture.uischema,
      rule: {
        effect: RuleEffect.HIDE,
        condition: falseCondition(),
      },
    };

    const { getByText } = renderForm(uischema, fixture.schema, fixture.data);

    expect(getByText('Bar')).not.toBeVisible();
  });

  test('show by default', () => {
    const { getByText } = renderForm(fixture.uischema, fixture.schema, fixture.data);

    expect(getByText('Bar')).toBeVisible();
  });
});
