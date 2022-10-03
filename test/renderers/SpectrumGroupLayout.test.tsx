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
import { GroupLayout, RuleEffect, SchemaBasedCondition } from '@jsonforms/core';
import '@testing-library/jest-dom';
import { SpectrumGroupLayoutTester } from '../../src/layouts/SpectrumGroupLayout';
import { renderForm } from '../util';

test('tester', () => {
  expect(SpectrumGroupLayoutTester(undefined, undefined)).toBe(-1);
  expect(SpectrumGroupLayoutTester(null, undefined)).toBe(-1);
  expect(SpectrumGroupLayoutTester({ type: 'Foo' }, undefined)).toBe(-1);
  expect(SpectrumGroupLayoutTester({ type: 'Group' }, undefined)).toBe(1);
});

describe('Group layout', () => {
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
      type: 'Group',
      label: 'Foo',
      elements: [nameControl, colorControl],
    },
  };

  test('render without label', () => {
    const uischema: GroupLayout = {
      type: 'Group',
      elements: [],
    };
    const { container } = renderForm(uischema);

    const heading = container.querySelector('h4');
    expect(heading).toBeNull();
  });

  test('render with label', () => {
    const { container } = renderForm(fixture.uischema, fixture.schema, fixture.data);

    const heading = container.querySelector('h4');
    expect(heading?.textContent).toBe('Foo');
  });

  test('render with null elements', () => {
    const uischema: GroupLayout = {
      type: 'Group',
      elements: null,
    };
    const { container } = renderForm(uischema);

    const content = container.querySelector('section');
    expect(content?.children).toHaveLength(0);
  });

  test('render with children', () => {
    const { container } = renderForm(fixture.uischema, fixture.schema, fixture.data);

    const content = container.querySelector('section');
    expect(content?.children).toHaveLength(2);
  });

  test('visible by default', () => {
    const uischema: GroupLayout = {
      type: 'Group',
      elements: [nameControl],
    };
    const { container } = renderForm(uischema);

    const groupLayout = container.firstElementChild.firstElementChild as HTMLElement;
    expect(groupLayout.style.display).not.toBe('none');
  });

  test('hidden', () => {
    // Condition that evaluates to false
    const condition: SchemaBasedCondition = {
      scope: '',
      schema: {},
    };
    const uischema: GroupLayout = {
      type: 'Group',
      elements: [nameControl],
      rule: {
        effect: RuleEffect.HIDE,
        condition,
      },
    };
    const { container } = renderForm(uischema);

    const groupLayout = container.firstElementChild.firstElementChild as HTMLElement;
    expect(groupLayout.style.display).toBe('');
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
    const uischema: GroupLayout = {
      type: 'Group',
      elements: [nameControl],
      rule: {
        effect: RuleEffect.DISABLE,
        condition,
      },
    };
    const { container } = renderForm(uischema, fixture.schema, fixture.data);

    expect(container.querySelector('input').disabled).toBeTruthy();
  });
});
