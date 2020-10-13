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
import {
  ControlElement,
  getData,
  HorizontalLayout,
  JsonSchema,
  update,
} from '@jsonforms/core';
import { JsonFormsReduxContext } from '@jsonforms/react';
import { Provider } from 'react-redux';
import {
  Provider as SpectrumThemeProvider,
  defaultTheme,
} from '@adobe/react-spectrum';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount, ReactWrapper } from 'enzyme';
import SpectrumBooleanCell, {
  spectrumBooleanCellTester,
} from '../../src/cells/SpectrumBooleanCell';
import SpectrumHorizontalLayoutRenderer from '../../src/layouts/SpectrumHorizontalLayout';
import { initJsonFormsVanillaStore } from '../vanillaStore';
import { vanillaRenderers } from '../../src';
import { InputControl } from '../../src/controls/InputControl';

Enzyme.configure({ adapter: new Adapter() });

const control: ControlElement = {
  type: 'Control',
  scope: '#/properties/foo',
};

const fixture = {
  data: { foo: true },
  schema: { type: 'boolean' },
  uischema: control,
  styles: [
    {
      name: 'control',
      classNames: ['control'],
    },
    {
      name: 'control.validation',
      classNames: ['validation'],
    },
  ],
};

describe('Boolean cell tester', () => {
  test('tester', () => {
    expect(spectrumBooleanCellTester(undefined, undefined)).toBe(-1);
    expect(spectrumBooleanCellTester(null, undefined)).toBe(-1);
    expect(spectrumBooleanCellTester({ type: 'Foo' }, undefined)).toBe(-1);
    expect(spectrumBooleanCellTester({ type: 'Control' }, undefined)).toBe(-1);
  });

  test('tester with wrong prop type', () => {
    const controlElement: ControlElement = {
      type: 'Control',
      scope: '#/properties/foo',
    };
    expect(
      spectrumBooleanCellTester(controlElement, {
        type: 'object',
        properties: { foo: { type: 'string' } },
      })
    ).toBe(-1);
  });

  test('tester with wrong prop type, but sibling has correct one', () => {
    const controlElement = {
      type: 'Control',
      scope: '#/properties/foo',
    };
    expect(
      spectrumBooleanCellTester(controlElement, {
        type: 'object',
        properties: {
          foo: {
            type: 'string',
          },
          bar: {
            type: 'boolean',
          },
        },
      })
    ).toBe(-1);
  });

  test('tester with matching prop type', () => {
    const controlElement = {
      type: 'Control',
      scope: '#/properties/foo',
    };
    expect(
      spectrumBooleanCellTester(controlElement, {
        type: 'object',
        properties: {
          foo: {
            type: 'boolean',
          },
        },
      })
    ).toBe(2);
  });
});

describe('Boolean cell', () => {
  let wrapper: ReactWrapper;

  afterEach(() => wrapper.unmount());

  test.skip('autofocus on first element', () => {
    const schema: JsonSchema = {
      type: 'object',
      properties: {
        firstBooleanCell: { type: 'boolean' },
        secondBooleanCell: { type: 'boolean' },
      },
    };
    const firstControlElement: ControlElement = {
      type: 'Control',
      scope: '#/properties/firstBooleanCell',
      options: {
        focus: true,
      },
    };
    const secondControlElement: ControlElement = {
      type: 'Control',
      scope: '#/properties/secondBooleanCell',
      options: {
        focus: true,
      },
    };
    const uischema: HorizontalLayout = {
      type: 'HorizontalLayout',
      elements: [firstControlElement, secondControlElement],
    };
    const data = {
      firstBooleanCell: true,
      secondBooleanCell: false,
    };
    const store = initJsonFormsVanillaStore({
      data,
      schema,
      uischema,
      renderers: vanillaRenderers,
    });
    wrapper = mount(
      <Provider store={store}>
        <SpectrumThemeProvider theme={defaultTheme}>
          <JsonFormsReduxContext>
            <SpectrumHorizontalLayoutRenderer schema={schema} uischema={uischema} />
          </JsonFormsReduxContext>
        </SpectrumThemeProvider>
      </Provider>
    );
    const inputs = wrapper.find(InputControl);
    expect(inputs.at(0).is(':focus')).toBe(false);
    expect(inputs.at(1).is(':focus')).toBe(true);
  });

  test('autofocus active', () => {
    const uischema: ControlElement = {
      type: 'Control',
      scope: '#/properties/foo',
      options: {
        focus: true,
      },
    };
    const store = initJsonFormsVanillaStore({
      data: fixture.data,
      schema: fixture.schema,
      uischema,
    });
    wrapper = mount(
      <Provider store={store}>
        <SpectrumThemeProvider theme={defaultTheme}>
          <JsonFormsReduxContext>
            <SpectrumBooleanCell
              schema={fixture.schema}
              uischema={uischema}
              path='foo'
            />
          </JsonFormsReduxContext>
        </SpectrumThemeProvider>
      </Provider>
    );
    const input = wrapper.find('input');
    expect(input.is(':focus')).toBe(true);
  });

  test('autofocus inactive', () => {
    const uischema: ControlElement = {
      type: 'Control',
      scope: '#/properties/foo',
      options: {
        focus: false,
      },
    };
    const store = initJsonFormsVanillaStore({
      data: fixture.data,
      schema: fixture.schema,
      uischema,
    });
    wrapper = mount(
      <Provider store={store}>
        <SpectrumThemeProvider theme={defaultTheme}>
          <JsonFormsReduxContext>
            <SpectrumBooleanCell
              schema={fixture.schema}
              uischema={uischema}
              path='foo'
            />
          </JsonFormsReduxContext>
        </SpectrumThemeProvider>
      </Provider>
    );
    const input = wrapper.find('input').getDOMNode() as HTMLInputElement;
    expect(input.autofocus).toBe(false);
  });

  test('autofocus inactive by default', () => {
    const uischema: ControlElement = {
      type: 'Control',
      scope: '#/properties/foo',
    };
    const store = initJsonFormsVanillaStore({
      data: fixture.data,
      schema: fixture.schema,
      uischema,
    });
    wrapper = mount(
      <Provider store={store}>
        <SpectrumThemeProvider theme={defaultTheme}>
          <JsonFormsReduxContext>
            <SpectrumBooleanCell
              schema={fixture.schema}
              uischema={uischema}
              path='foo'
            />
          </JsonFormsReduxContext>
        </SpectrumThemeProvider>
      </Provider>
    );
    const input = wrapper.find('input').getDOMNode();
    expect(document.activeElement).not.toBe(input);
  });

  test('render', () => {
    const store = initJsonFormsVanillaStore({
      data: fixture.data,
      schema: fixture.schema,
      uischema: fixture.uischema,
    });
    wrapper = mount(
      <Provider store={store}>
        <SpectrumThemeProvider theme={defaultTheme}>
          <JsonFormsReduxContext>
            <SpectrumBooleanCell
              schema={fixture.schema}
              uischema={fixture.uischema}
              path='foo'
            />
          </JsonFormsReduxContext>
        </SpectrumThemeProvider>
      </Provider>
    );

    const input = wrapper.find('input').getDOMNode() as HTMLInputElement;
    expect(input.type).toBe('checkbox');
    expect(input.checked).toBe(true);
  });

  test.skip('has classes set', () => {
    const store = initJsonFormsVanillaStore({
      data: fixture.data,
      schema: fixture.schema,
      uischema: fixture.uischema,
    });
    wrapper = mount(
      <Provider store={store}>
        <SpectrumThemeProvider theme={defaultTheme}>
          <JsonFormsReduxContext>
            <SpectrumBooleanCell
              schema={fixture.schema}
              uischema={fixture.uischema}
              path='foo'
            />
          </JsonFormsReduxContext>
        </SpectrumThemeProvider>
      </Provider>
    );
    const input = wrapper.find('input');
    expect(input.hasClass('validationState')).toBe(true);
  });

  test('update via input event', () => {
    const store = initJsonFormsVanillaStore({
      data: fixture.data,
      schema: fixture.schema,
      uischema: fixture.uischema,
    });
    wrapper = mount(
      <Provider store={store}>
        <SpectrumThemeProvider theme={defaultTheme}>
          <JsonFormsReduxContext>
            <SpectrumBooleanCell
              schema={fixture.schema}
              uischema={fixture.uischema}
              path='foo'
            />
          </JsonFormsReduxContext>
        </SpectrumThemeProvider>
      </Provider>
    );

    const input = wrapper.find('input');
    input.simulate('change', { target: { checked: false } });
    expect(getData(store.getState()).foo).toBe(false);
  });

  test('update via action', () => {
    const data = { foo: false };
    const store = initJsonFormsVanillaStore({
      data,
      schema: fixture.schema,
      uischema: fixture.uischema,
    });
    wrapper = mount(
      <Provider store={store}>
        <SpectrumThemeProvider theme={defaultTheme}>
          <JsonFormsReduxContext>
            <SpectrumBooleanCell
              schema={fixture.schema}
              uischema={fixture.uischema}
              path='foo'
            />
          </JsonFormsReduxContext>
        </SpectrumThemeProvider>
      </Provider>
    );
    const input = wrapper.find('input').getDOMNode() as HTMLInputElement;
    store.dispatch(update('foo', () => false));
    expect(input.checked).toBe(false);
    expect(getData(store.getState()).foo).toBe(false);
  });

  test.skip('update with undefined value', () => {
    const store = initJsonFormsVanillaStore({
      data: fixture.data,
      schema: fixture.schema,
      uischema: fixture.uischema,
    });
    wrapper = mount(
      <Provider store={store}>
        <SpectrumThemeProvider theme={defaultTheme}>
          <JsonFormsReduxContext>
            <SpectrumBooleanCell
              schema={fixture.schema}
              uischema={fixture.uischema}
              path='foo'
            />
          </JsonFormsReduxContext>
        </SpectrumThemeProvider>
      </Provider>
    );
    const input = wrapper.find('input').getDOMNode() as HTMLInputElement;
    store.dispatch(update('foo', () => undefined));
    expect(input.value).toEqual('');
  });

  test.skip('update with null value', () => {
    const store = initJsonFormsVanillaStore({
      data: fixture.data,
      schema: fixture.schema,
      uischema: fixture.uischema,
    });
    wrapper = mount(
      <Provider store={store}>
        <SpectrumThemeProvider theme={defaultTheme}>
          <JsonFormsReduxContext>
            <SpectrumBooleanCell
              schema={fixture.schema}
              uischema={fixture.uischema}
              path='foo'
            />
          </JsonFormsReduxContext>
        </SpectrumThemeProvider>
      </Provider>
    );
    const input = wrapper.find('input').getDOMNode() as HTMLInputElement;
    store.dispatch(update('foo', () => null));
    expect(input.value).toEqual('');
  });

  test('update with wrong ref', () => {
    const store = initJsonFormsVanillaStore({
      data: fixture.data,
      schema: fixture.schema,
      uischema: fixture.uischema,
    });
    wrapper = mount(
      <Provider store={store}>
        <SpectrumThemeProvider theme={defaultTheme}>
          <JsonFormsReduxContext>
            <SpectrumBooleanCell
              schema={fixture.schema}
              uischema={fixture.uischema}
              path='foo'
            />
          </JsonFormsReduxContext>
        </SpectrumThemeProvider>
      </Provider>
    );
    const input = wrapper.find('input');
    store.dispatch(update('bar', () => 11));
    expect(input.props().checked).toBe(true);
  });

  test('update with null ref', () => {
    const store = initJsonFormsVanillaStore({
      data: fixture.data,
      schema: fixture.schema,
      uischema: fixture.uischema,
    });
    wrapper = mount(
      <Provider store={store}>
        <SpectrumThemeProvider theme={defaultTheme}>
          <JsonFormsReduxContext>
            <SpectrumBooleanCell
              schema={fixture.schema}
              uischema={fixture.uischema}
              path='foo'
            />
          </JsonFormsReduxContext>
        </SpectrumThemeProvider>
      </Provider>
    );
    const input = wrapper.find('input').getDOMNode() as HTMLInputElement;
    store.dispatch(update(null, () => false));
    expect(input.checked).toBe(true);
  });

  test('update with undefined ref', () => {
    const store = initJsonFormsVanillaStore({
      data: fixture.data,
      schema: fixture.schema,
      uischema: fixture.uischema,
    });
    wrapper = mount(
      <Provider store={store}>
        <SpectrumThemeProvider theme={defaultTheme}>
          <JsonFormsReduxContext>
            <SpectrumBooleanCell
              schema={fixture.schema}
              uischema={fixture.uischema}
              path='foo'
            />
          </JsonFormsReduxContext>
        </SpectrumThemeProvider>
      </Provider>
    );
    store.dispatch(update(undefined, () => false));
    const input = wrapper.find('input').getDOMNode() as HTMLInputElement;
    expect(input.checked).toBe(true);
  });

  test('disable', () => {
    const store = initJsonFormsVanillaStore({
      data: fixture.data,
      schema: fixture.schema,
      uischema: fixture.uischema,
    });
    wrapper = mount(
      <Provider store={store}>
        <SpectrumThemeProvider theme={defaultTheme}>
          <JsonFormsReduxContext>
            <SpectrumBooleanCell
              schema={fixture.schema}
              uischema={fixture.uischema}
              enabled={false}
            />
          </JsonFormsReduxContext>
        </SpectrumThemeProvider>
      </Provider>
    );
    const input = wrapper.find('input').getDOMNode() as HTMLInputElement;
    expect(input.disabled).toBe(true);
  });

  test('enabled by default', () => {
    const store = initJsonFormsVanillaStore({
      data: fixture.data,
      schema: fixture.schema,
      uischema: fixture.uischema,
    });
    wrapper = mount(
      <Provider store={store}>
        <SpectrumThemeProvider theme={defaultTheme}>
          <JsonFormsReduxContext>
            <SpectrumBooleanCell
              schema={fixture.schema}
              uischema={fixture.uischema}
              path='foo'
            />
          </JsonFormsReduxContext>
        </SpectrumThemeProvider>
      </Provider>
    );
    const input = wrapper.find('input').getDOMNode() as HTMLInputElement;
    expect(input.disabled).toBe(false);
  });
});
