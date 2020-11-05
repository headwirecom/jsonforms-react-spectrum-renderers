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
import { ControlElement, update } from '@jsonforms/core';
import { JsonFormsReduxContext } from '@jsonforms/react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount, ReactWrapper } from 'enzyme';
import EnumCell, {
  spectrumEnumCellTester,
} from '../../src/cells/SpectrumEnumCell';
import { Provider } from 'react-redux';
import { initJsonFormsSpectrumStore } from '../spectrumStore';
import { mountForm } from '../util';
import {
  defaultTheme,
  Provider as SpectrumThemeProvider,
} from '@adobe/react-spectrum';

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

test('tester', () => {
  expect(spectrumEnumCellTester(undefined, undefined)).toBe(-1);
  expect(spectrumEnumCellTester(null, undefined)).toBe(-1);
  expect(spectrumEnumCellTester({ type: 'Foo' }, undefined)).toBe(-1);
  expect(spectrumEnumCellTester({ type: 'Control' }, undefined)).toBe(-1);
});

test('tester with wrong prop type', () => {
  expect(
    spectrumEnumCellTester(fixture.uischema, {
      type: 'object',
      properties: { foo: { type: 'string' } },
    })
  ).toBe(-1);
});

test('tester with wrong prop type, but sibling has correct one', () => {
  expect(
    spectrumEnumCellTester(fixture.uischema, {
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
    spectrumEnumCellTester(fixture.uischema, {
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
    spectrumEnumCellTester(fixture.uischema, {
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
    const store = initJsonFormsSpectrumStore({
      data,
      schema: fixture.schema,
      uischema: fixture.uischema,
    });
    wrapper = mount(
      <Provider store={store}>
        <SpectrumThemeProvider theme={defaultTheme}>
          <JsonFormsReduxContext>
            <EnumCell
              schema={fixture.schema}
              uischema={fixture.uischema}
              path='foo'
            />
          </JsonFormsReduxContext>
        </SpectrumThemeProvider>
      </Provider>
    );
    const select = wrapper.find('select').getDOMNode() as HTMLSelectElement;
    store.dispatch(update('foo', () => 'b'));
    expect(select.value).toBe('b');
    expect(select.selectedIndex).toBe(1);
  });

  test('update with undefined value', () => {
    const store = initJsonFormsSpectrumStore({
      data: fixture.data,
      schema: fixture.schema,
      uischema: fixture.uischema,
    });
    wrapper = mount(
      <Provider store={store}>
        <SpectrumThemeProvider theme={defaultTheme}>
          <JsonFormsReduxContext>
            <EnumCell
              schema={fixture.schema}
              uischema={fixture.uischema}
              path='foo'
            />
          </JsonFormsReduxContext>
        </SpectrumThemeProvider>
      </Provider>
    );
    const select = wrapper.find('select').getDOMNode() as HTMLSelectElement;
    store.dispatch(update('foo', () => undefined));
    expect(select.selectedIndex).toBe(0);
    expect(select.value).toBe('a');
  });

  test('update with null value', () => {
    const store = initJsonFormsSpectrumStore({
      data: fixture.data,
      schema: fixture.schema,
      uischema: fixture.uischema,
    });
    wrapper = mount(
      <Provider store={store}>
        <SpectrumThemeProvider theme={defaultTheme}>
          <JsonFormsReduxContext>
            <EnumCell
              schema={fixture.schema}
              uischema={fixture.uischema}
              path='foo'
            />
          </JsonFormsReduxContext>
        </SpectrumThemeProvider>
      </Provider>
    );
    const select = wrapper.find('select').getDOMNode() as HTMLSelectElement;
    store.dispatch(update('foo', () => null));
    expect(select.selectedIndex).toBe(0);
    expect(select.value).toBe('a');
  });

  test('update with wrong ref', () => {
    const store = initJsonFormsSpectrumStore({
      data: fixture.data,
      schema: fixture.schema,
      uischema: fixture.uischema,
    });
    wrapper = mount(
      <Provider store={store}>
        <SpectrumThemeProvider theme={defaultTheme}>
          <JsonFormsReduxContext>
            <EnumCell
              schema={fixture.schema}
              uischema={fixture.uischema}
              path='foo'
            />
          </JsonFormsReduxContext>
        </SpectrumThemeProvider>
      </Provider>
    );
    store.dispatch(update('bar', () => 'Bar'));
    wrapper.update();
    const select = wrapper.find('select').getDOMNode() as HTMLSelectElement;
    expect(select.selectedIndex).toBe(0);
    expect(select.value).toBe('a');
  });

  test('update with null ref', () => {
    const store = initJsonFormsSpectrumStore({
      data: fixture.data,
      schema: fixture.schema,
      uischema: fixture.uischema,
    });
    wrapper = mount(
      <Provider store={store}>
        <SpectrumThemeProvider theme={defaultTheme}>
          <JsonFormsReduxContext>
            <EnumCell
              schema={fixture.schema}
              uischema={fixture.uischema}
              path='foo'
            />
          </JsonFormsReduxContext>
        </SpectrumThemeProvider>
      </Provider>
    );
    store.dispatch(update(null, () => false));
    wrapper.update();
    const select = wrapper.find('select').getDOMNode() as HTMLSelectElement;
    expect(select.selectedIndex).toBe(0);
    expect(select.value).toBe('a');
  });

  test('update with undefined ref', () => {
    const store = initJsonFormsSpectrumStore({
      data: fixture.data,
      schema: fixture.schema,
      uischema: fixture.uischema,
    });
    wrapper = mount(
      <Provider store={store}>
        <SpectrumThemeProvider theme={defaultTheme}>
          <JsonFormsReduxContext>
            <EnumCell
              schema={fixture.schema}
              uischema={fixture.uischema}
              path='foo'
            />
          </JsonFormsReduxContext>
        </SpectrumThemeProvider>
      </Provider>
    );
    store.dispatch(update(undefined, () => false));
    const select = wrapper.find('select').getDOMNode() as HTMLSelectElement;
    expect(select.selectedIndex).toBe(0);
    expect(select.value).toBe('a');
  });

  test('disable', () => {
    const store = initJsonFormsSpectrumStore({
      data: fixture.data,
      schema: fixture.schema,
      uischema: fixture.uischema,
    });
    wrapper = mount(
      <Provider store={store}>
        <SpectrumThemeProvider theme={defaultTheme}>
          <JsonFormsReduxContext>
            <EnumCell
              schema={fixture.schema}
              uischema={fixture.uischema}
              enabled={false}
            />
          </JsonFormsReduxContext>
        </SpectrumThemeProvider>
      </Provider>
    );
    const select = wrapper.find('select');
    expect(select.props().disabled).toBe(true);
  });

  test('enabled by default', () => {
    const store = initJsonFormsSpectrumStore({
      data: fixture.data,
      schema: fixture.schema,
      uischema: fixture.uischema,
    });
    wrapper = mount(
      <Provider store={store}>
        <SpectrumThemeProvider theme={defaultTheme}>
          <JsonFormsReduxContext>
            <EnumCell
              schema={fixture.schema}
              uischema={fixture.uischema}
              path='foo'
            />
          </JsonFormsReduxContext>
        </SpectrumThemeProvider>
      </Provider>
    );
    const select = wrapper.find('select');
    expect(select.props().disabled).toBe(false);
  });
});
