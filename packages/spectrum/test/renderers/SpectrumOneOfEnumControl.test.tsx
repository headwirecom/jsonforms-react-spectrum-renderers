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
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount, ReactWrapper } from 'enzyme';
import { ControlElement, JsonFormsState, update } from '@jsonforms/core';
import { JsonFormsDispatch, JsonFormsReduxContext } from '@jsonforms/react';
import { Provider } from 'react-redux';
import { Store, AnyAction } from 'redux';
import {
  defaultTheme,
  Provider as SpectrumThemeProvider,
} from '@adobe/react-spectrum';

import SpectrumOneOfEnumControl, {
  spectrumOneOfEnumControlTester,
} from '../../src/controls/SpectrumOneOfEnumControl';
import { mountForm } from '../util';
import { initJsonFormsSpectrumStore } from '../spectrumStore';

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

test('tester', () => {
  expect(spectrumOneOfEnumControlTester(undefined, undefined)).toBe(-1);
  expect(spectrumOneOfEnumControlTester(null, undefined)).toBe(-1);
  expect(spectrumOneOfEnumControlTester({ type: 'Foo' }, undefined)).toBe(-1);
  expect(spectrumOneOfEnumControlTester({ type: 'Control' }, undefined)).toBe(
    -1
  );
});

test('tester with wrong prop type', () => {
  expect(
    spectrumOneOfEnumControlTester(fixture.uischema, {
      type: 'object',
      properties: { foo: { type: 'string' } },
    })
  ).toBe(-1);
});

test('tester with wrong prop type, but sibling has correct one', () => {
  expect(
    spectrumOneOfEnumControlTester(fixture.uischema, {
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
  expect(spectrumOneOfEnumControlTester(fixture.uischema, fixture.schema)).toBe(
    5
  );
});

test('tester with matching numeric type', () => {
  expect(
    spectrumOneOfEnumControlTester(fixture.uischema, {
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
  let wrapper: ReactWrapper, store: Store<JsonFormsState, AnyAction>;

  beforeEach(() => {
    store = initJsonFormsSpectrumStore({
      data: fixture.data,
      schema: fixture.schema,
      uischema: fixture.uischema,
    });
    wrapper = mount(
      <Provider store={store}>
        <SpectrumThemeProvider theme={defaultTheme}>
          <JsonFormsReduxContext>
            <JsonFormsDispatch
              schema={fixture.schema}
              uischema={fixture.uischema}
              path='foo'
              renderers={[
                {
                  tester: spectrumOneOfEnumControlTester,
                  renderer: SpectrumOneOfEnumControl,
                },
              ]}
            />
          </JsonFormsReduxContext>
        </SpectrumThemeProvider>
      </Provider>
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
    store.dispatch(update('foo', () => 'b'));
    setTimeout(() => {
      expect(select.value).toBe('b');
      expect(select.selectedIndex).toBe(1);
    }, 0);
  });

  test('update with undefined value', () => {
    const select = wrapper.find('select').getDOMNode() as HTMLSelectElement;
    store.dispatch(update('foo', () => undefined));
    setTimeout(() => {
      expect(select.selectedIndex).toBe(0);
      expect(select.value).toBe('a');
    }, 0);
  });

  test('update with null value', () => {
    const select = wrapper.find('select').getDOMNode() as HTMLSelectElement;
    store.dispatch(update('foo', () => null));
    setTimeout(() => {
      expect(select.selectedIndex).toBe(0);
      expect(select.value).toBe('a');
    }, 0);
  });

  test('update with wrong ref', () => {
    const store = initJsonFormsSpectrumStore({
      data: fixture.data,
      schema: fixture.schema,
      uischema: fixture.uischema,
    });

    const select = wrapper.find('select').getDOMNode() as HTMLSelectElement;
    store.dispatch(update('bar', () => 'ABC'));
    setTimeout(() => {
      expect(select.selectedIndex).toBe(0);
      expect(select.value).toBe('a');
    }, 0);
  });
});
