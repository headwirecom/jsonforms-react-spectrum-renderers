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
import {
  HorizontalLayout,
  RuleEffect,
  SchemaBasedCondition,
  UISchemaElement,
} from '@jsonforms/core';
import '@testing-library/jest-dom';
import { SpectrumHorizontalLayoutTester } from '../../src/layouts/SpectrumHorizontalLayout';
import { renderForm } from '../util';

test('tester', () => {
  expect(SpectrumHorizontalLayoutTester(undefined, undefined)).toBe(-1);
  expect(SpectrumHorizontalLayoutTester(null, undefined)).toBe(-1);
  expect(SpectrumHorizontalLayoutTester({ type: 'Foo' }, undefined)).toBe(-1);
  expect(SpectrumHorizontalLayoutTester({ type: 'HorizontalLayout' }, undefined)).toBe(1);
});

describe('Horizontal layout', () => {
  const nameControl = {
    type: 'Control',
    label: 'Name',
    scope: '#/properties/name',
  };

  const colorControl = {
    type: 'Control',
    label: 'Color',
    scope: '#/properties/color',
  };

  const fixture = {
    data: {},
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
        },
        color: {
          type: 'string',
        },
      },
    },
    uischema: {
      type: 'HorizontalLayout',
      elements: [nameControl, colorControl],
    },
  };

  test('render with undefined elements', () => {
    const uischema: UISchemaElement = {
      type: 'HorizontalLayout',
    };
    const { container } = renderForm(uischema, fixture.schema, fixture.data);

    expect(container.querySelectorAll('input')).toHaveLength(0);
  });

  test('render with null elements', () => {
    const uischema: HorizontalLayout = {
      type: 'HorizontalLayout',
      elements: null,
    };
    const { container } = renderForm(uischema, fixture.schema, fixture.data);

    expect(container.querySelectorAll('input')).toHaveLength(0);
  });

  test('render with children', () => {
    const { container } = renderForm(fixture.uischema, fixture.schema, fixture.data);

    expect(container.querySelectorAll('input')).toHaveLength(2);
  });

  test('visible by default', () => {
    const { container } = renderForm(fixture.uischema, fixture.schema, fixture.data);

    const element = container.firstElementChild.firstElementChild as HTMLElement;
    expect(element.style.display).not.toBe('none');
  });

  test('hidden', () => {
    // Condition that evaluates to false
    const condition: SchemaBasedCondition = {
      scope: '',
      schema: {},
    };
    const uischema: HorizontalLayout = {
      type: 'HorizontalLayout',
      elements: [nameControl],
      rule: {
        effect: RuleEffect.HIDE,
        condition,
      },
    };
    const { container } = renderForm(uischema, fixture.schema, fixture.data);

    const element = container.firstElementChild.firstElementChild as HTMLElement;
    expect(element.style.display).toBe('');
  });

  test('enabled by default', () => {
    const { container } = renderForm(fixture.uischema, fixture.schema, fixture.data);

    expect(container.querySelector('input').disabled).toBeFalsy();
  });

  test('disabled', () => {
    // Condition that evaluates to false
    const condition: SchemaBasedCondition = {
      scope: '',
      schema: {},
    };
    const uischema: HorizontalLayout = {
      type: 'HorizontalLayout',
      elements: [nameControl],
      rule: {
        effect: RuleEffect.DISABLE,
        condition,
      },
    };
    const { container } = renderForm(uischema, fixture.schema, fixture.data);

    expect(container.querySelector('input').disabled).toBeTruthy();
  });

  test('options.spacing should set flex-grow to the number specified, or default to 1', () => {
    const { container } = renderForm(
      {
        ...fixture.uischema,
        options: { spacing: [2, 3] },
        elements: [...fixture.uischema.elements, { ...nameControl, scope: '#/properties/shape' }],
      },
      {
        ...fixture.schema,
        properties: { ...fixture.schema.properties, shape: { type: 'string' } },
      },
      fixture.data
    );

    const flexGrowValues = Array.from(container.querySelectorAll(`[style*=flex-grow]`)).map(
      (el) => el.getAttribute('style').match(/flex-grow:\s*(\d+)/)?.[1]
    );

    expect(flexGrowValues).toEqual(['2', '3', '1']);
  });
});
