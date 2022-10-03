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
import * as React from 'react';
import { ControlElement, RuleEffect, SchemaBasedCondition } from '@jsonforms/core';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import Enzyme, { mount, ReactWrapper } from 'enzyme';
import EnumCell, { SpectrumEnumCellTester } from '../../src/src/cells/SpectrumEnumCell';
import { mountForm } from '../util';
import { SpectrumRenderers } from '../../src/src';
import { JsonForms } from '@jsonforms/react';
import { defaultTheme, Provider as SpectrumThemeProvider } from '@adobe/react-spectrum';

Enzyme.configure({ adapter: new Adapter() });

const control: ControlElement = {
  type: 'Control',
  scope: '#/properties/foo',
};

const fixture = {
  data: { foo: 'a' },
  schema: {
    type: 'string',
    enum: ['a', 'b'],
  },
  uischema: control,
};

const cells = [{ tester: SpectrumEnumCellTester, cell: EnumCell }];

test('tester', () => {
  expect(SpectrumEnumCellTester(undefined, undefined)).toBe(-1);
  expect(SpectrumEnumCellTester(null, undefined)).toBe(-1);
  expect(SpectrumEnumCellTester({ type: 'Foo' }, undefined)).toBe(-1);
  expect(SpectrumEnumCellTester({ type: 'Control' }, undefined)).toBe(-1);
});

test('tester with wrong prop type', () => {
  expect(
    SpectrumEnumCellTester(fixture.uischema, {
      type: 'object',
      properties: { foo: { type: 'string' } },
    })
  ).toBe(-1);
});

test('tester with wrong prop type, but sibling has correct one', () => {
  expect(
    SpectrumEnumCellTester(fixture.uischema, {
      type: 'object',
      properties: {
        foo: {
          type: 'string',
        },
        bar: {
          type: 'string',
          enum: ['a', 'b'],
        },
      },
    })
  ).toBe(-1);
});

test('tester with matching string type', () => {
  expect(
    SpectrumEnumCellTester(fixture.uischema, {
      type: 'object',
      properties: {
        foo: {
          type: 'string',
          enum: ['a', 'b'],
        },
      },
    })
  ).toBe(2);
});

test('tester with matching numeric type', () => {
  // TODO should expect be true?
  expect(
    SpectrumEnumCellTester(fixture.uischema, {
      type: 'object',
      properties: {
        foo: {
          type: 'number',
          enum: [1, 2],
        },
      },
    })
  ).toBe(2);
});

describe('Enum cell', () => {
  let wrapper: ReactWrapper;

  afterEach(() => wrapper.unmount());

  test('render', () => {
    wrapper = mountForm(fixture.uischema, fixture.schema, fixture.data);

    const select = wrapper.find('select').getDOMNode() as HTMLSelectElement;
    expect(select.tagName).toBe('SELECT');
    expect(select.value).toBe('a');
    expect(select.options).toHaveLength(2);
    expect(select.options.item(0).value).toBe('a');
    expect(select.options.item(1).value).toBe('b');
  });

  test('update via input event', () => {
    let state = '';
    wrapper = mountForm(
      fixture.uischema,
      fixture.schema,
      fixture.data,
      [],
      (d) => (state = d.data.foo)
    );
    const select = wrapper.find('select');
    select.simulate('change', { target: { value: 'b' } });
    expect(state).toBe('b');
  });

  test('update via action', () => {
    const data = { foo: 'b' };
    wrapper = mount(
      <SpectrumThemeProvider theme={defaultTheme}>
        <JsonForms
          schema={fixture.schema}
          uischema={fixture.uischema}
          data={data}
          renderers={SpectrumRenderers}
          cells={cells}
        />
      </SpectrumThemeProvider>
    );
    const select = wrapper.find('select').getDOMNode() as HTMLSelectElement;
    wrapper.setProps({ data: { ...data, foo: 'b' } });
    wrapper.update();
    expect(select.value).toBe('b');
    expect(select.selectedIndex).toBe(1);
  });

  test('update with undefined value', () => {
    wrapper = mount(
      <SpectrumThemeProvider theme={defaultTheme}>
        <JsonForms
          schema={fixture.schema}
          uischema={fixture.uischema}
          data={fixture.data}
          renderers={SpectrumRenderers}
          cells={cells}
        />
      </SpectrumThemeProvider>
    );
    const select = wrapper.find('select').getDOMNode() as HTMLSelectElement;
    wrapper.setProps({ data: { ...fixture.data, foo: undefined } });
    wrapper.update();
    expect(select.selectedIndex).toBe(0);
    expect(select.value).toBe('a');
  });

  test('update with null value', () => {
    wrapper = mount(
      <SpectrumThemeProvider theme={defaultTheme}>
        <JsonForms
          schema={fixture.schema}
          uischema={fixture.uischema}
          data={fixture.data}
          renderers={SpectrumRenderers}
          cells={cells}
        />
      </SpectrumThemeProvider>
    );
    const select = wrapper.find('select').getDOMNode() as HTMLSelectElement;
    wrapper.setProps({ data: { ...fixture.data, foo: null } });
    wrapper.update();
    expect(select.selectedIndex).toBe(0);
    expect(select.value).toBe('a');
  });

  test('update with wrong ref', () => {
    wrapper = mount(
      <SpectrumThemeProvider theme={defaultTheme}>
        <JsonForms
          schema={fixture.schema}
          uischema={fixture.uischema}
          data={fixture.data}
          renderers={SpectrumRenderers}
          cells={cells}
        />
      </SpectrumThemeProvider>
    );
    wrapper.setProps({ data: { ...fixture.data, bar: 'Bar' } });
    wrapper.update();
    const select = wrapper.find('select').getDOMNode() as HTMLSelectElement;
    expect(select.selectedIndex).toBe(0);
    expect(select.value).toBe('a');
  });

  test('disable', () => {
    const condition: SchemaBasedCondition = {
      scope: '#/properties/foo',
      schema: { type: 'string' },
    };
    wrapper = mount(
      <SpectrumThemeProvider theme={defaultTheme}>
        <JsonForms
          schema={fixture.schema}
          uischema={{
            ...fixture.uischema,
            rule: { effect: RuleEffect.DISABLE, condition },
          }}
          data={fixture.data}
          renderers={SpectrumRenderers}
          cells={cells}
        />
      </SpectrumThemeProvider>
    );
    const select = wrapper.find('select');
    expect(select.props().disabled).toBe(true);
  });

  test('enabled by default', () => {
    wrapper = mount(
      <SpectrumThemeProvider theme={defaultTheme}>
        <JsonForms
          schema={fixture.schema}
          uischema={fixture.uischema}
          data={fixture.data}
          renderers={SpectrumRenderers}
          cells={cells}
        />
      </SpectrumThemeProvider>
    );
    const select = wrapper.find('select');
    expect(select.props().disabled).toBe(false);
  });
});
