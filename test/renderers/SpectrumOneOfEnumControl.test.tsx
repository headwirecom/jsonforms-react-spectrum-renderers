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
import React from 'react';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import Enzyme, { mount, ReactWrapper } from 'enzyme';
import { ControlElement } from '@jsonforms/core';
import { defaultTheme, Provider as SpectrumThemeProvider } from '@adobe/react-spectrum';

import SpectrumOneOfEnumControl, {
  SpectrumOneOfEnumControlTester,
} from '../../src/controls/SpectrumOneOfEnumControl';
import { mountForm } from '../util';
import { JsonForms } from '@jsonforms/react';

Enzyme.configure({ adapter: new Adapter() });

const control: ControlElement = {
  type: 'Control',
  scope: '#/properties/foo',
  options: {
    disabled: true,
  },
};

const fixture = {
  data: { foo: 'foo' },
  schema: {
    type: 'string',
    oneOf: [
      {
        const: 'a',
        title: 'Foo',
      },
      {
        const: 'b',
        title: 'Bar',
      },
    ],
  },
  uischema: control,
};

const renderers = [
  {
    tester: SpectrumOneOfEnumControlTester,
    renderer: SpectrumOneOfEnumControl,
  },
];

test('tester', () => {
  expect(SpectrumOneOfEnumControlTester(undefined, undefined)).toBe(-1);
  expect(SpectrumOneOfEnumControlTester(null, undefined)).toBe(-1);
  expect(SpectrumOneOfEnumControlTester({ type: 'Foo' }, undefined)).toBe(-1);
  expect(SpectrumOneOfEnumControlTester({ type: 'Control' }, undefined)).toBe(-1);
});

test('tester with wrong prop type', () => {
  expect(
    SpectrumOneOfEnumControlTester(fixture.uischema, {
      type: 'object',
      properties: { foo: { type: 'string' } },
    })
  ).toBe(-1);
});

test('tester with wrong prop type, but sibling has correct one', () => {
  expect(
    SpectrumOneOfEnumControlTester(fixture.uischema, {
      type: 'object',
      properties: {
        foo: {
          type: 'string',
        },
        bar: fixture.schema,
      },
    })
  ).toBe(-1);
});

test('tester with matching string type', () => {
  expect(SpectrumOneOfEnumControlTester(fixture.uischema, fixture.schema)).toBe(5);
});

test('tester with matching numeric type', () => {
  expect(
    SpectrumOneOfEnumControlTester(fixture.uischema, {
      type: 'object',
      properties: {
        foo: {
          type: 'number',
          oneOf: [
            {
              const: 1,
              title: 'foo',
            },
          ],
        },
      },
    })
  ).toBe(5);
});

describe('OneOfEnumControl', () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(
      <SpectrumThemeProvider theme={defaultTheme}>
        <JsonForms
          schema={fixture.schema}
          uischema={fixture.uischema}
          data={fixture.data}
          renderers={renderers}
        />
      </SpectrumThemeProvider>
    );
  });

  afterEach(() => wrapper.unmount());

  test('render', () => {
    wrapper = mountForm(fixture.uischema, fixture.schema, fixture.data);

    const select = wrapper.find('select');
    expect(select.props().disabled).toBe(false);
    const selectElement = select.getDOMNode() as HTMLSelectElement;
    expect(selectElement.tagName).toBe('SELECT');
    expect(selectElement.value).toBe('a');
    expect(selectElement.options).toHaveLength(2);
    expect(selectElement.options.item(0).value).toBe('a');
    expect(selectElement.options.item(1).value).toBe('b');
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
    const select = wrapper.find('select').getDOMNode() as HTMLSelectElement;
    expect(select.value).toBe('a');
    wrapper.setProps({ data: { ...fixture.data, foo: 'b' } });
    wrapper.update();
    setTimeout(() => {
      expect(select.value).toBe('b');
      expect(select.selectedIndex).toBe(1);
    }, 0);
  });

  test('update with undefined value', () => {
    const select = wrapper.find('select').getDOMNode() as HTMLSelectElement;
    wrapper.setProps({ data: { ...fixture.data, foo: undefined } });
    wrapper.update();
    setTimeout(() => {
      expect(select.selectedIndex).toBe(0);
      expect(select.value).toBe('a');
    }, 0);
  });

  test('update with null value', () => {
    const select = wrapper.find('select').getDOMNode() as HTMLSelectElement;
    wrapper.setProps({ data: { ...fixture.data, foo: null } });
    wrapper.update();
    setTimeout(() => {
      expect(select.selectedIndex).toBe(0);
      expect(select.value).toBe('a');
    }, 0);
  });

  test('update with wrong ref', () => {
    const select = wrapper.find('select').getDOMNode() as HTMLSelectElement;
    wrapper.setProps({ data: { ...fixture.data, bar: 'ABC' } });
    wrapper.update();
    setTimeout(() => {
      expect(select.selectedIndex).toBe(0);
      expect(select.value).toBe('a');
    }, 0);
  });
});
