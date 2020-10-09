/*
  The MIT License

  Copyright (c) 2017-2019 EclipseSource Munich
  https://github.com/eclipsesource/jsonforms

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
  Actions,
  ControlElement,
  HorizontalLayout,
  JsonSchema,
} from '@jsonforms/core';
import { JsonFormsDispatch, JsonFormsReduxContext } from '@jsonforms/react';
import { Provider } from 'react-redux';
import {
  Provider as SpectrumThemeProvider,
  defaultTheme,
} from '@adobe/react-spectrum';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount, ReactWrapper } from 'enzyme';
import '../../src';
import HorizontalLayoutRenderer, {
  horizontalLayoutTester,
} from '../../src/layouts/HorizontalLayout';
import InputControl, {
  inputControlTester,
} from '../../src/controls/InputControl';
import SpectrumTextCell, {
  spectrumTextCellTester,
} from '../../src/cells/SpectrumTextCell';
import DateCell, { dateCellTester } from '../../src/cells/DateCell';
import { initJsonFormsVanillaStore } from '../vanillaStore';

Enzyme.configure({ adapter: new Adapter() });

const fixture = {
  data: { foo: 'foo' },
  schema: {
    type: 'object',
    properties: {
      foo: {
        type: 'string',
      },
    },
  },
  uischema: {
    type: 'Control',
    scope: '#/properties/foo',
  },
};

test('tester', () => {
  expect(inputControlTester(undefined, undefined)).toBe(-1);
  expect(inputControlTester(null, undefined)).toBe(-1);
  expect(inputControlTester({ type: 'Foo' }, undefined)).toBe(-1);
  expect(inputControlTester({ type: 'Control' }, undefined)).toBe(-1);
  const control: ControlElement = {
    type: 'Control',
    scope: '#/properties/foo',
  };
  expect(inputControlTester(control, undefined)).toBe(1);
});

describe('Input control', () => {
  let wrapper: ReactWrapper;

  afterEach(() => wrapper.unmount());

  test('autofocus on first element', () => {
    const schema: JsonSchema = {
      type: 'object',
      properties: {
        firstTextCell: { type: 'string' },
        secondTextCell: { type: 'string' },
      },
    };
    const firstControlElement: ControlElement = {
      type: 'Control',
      scope: '#/properties/firstTextCell',
      options: {
        focus: true,
      },
    };
    const secondControlElement: ControlElement = {
      type: 'Control',
      scope: 'properties/secondTextCell',
      options: {
        focus: true,
      },
    };
    const uischema: HorizontalLayout = {
      type: 'HorizontalLayout',
      elements: [firstControlElement, secondControlElement],
    };
    const data = {
      firstTextCell: 'first',
      secondTextCell: 'second',
    };
    const store = initJsonFormsVanillaStore({
      data,
      schema,
      uischema,
      renderers: [
        { tester: inputControlTester, renderer: InputControl },
        { tester: horizontalLayoutTester, renderer: HorizontalLayoutRenderer },
      ],
      cells: [{ tester: spectrumTextCellTester, cell: SpectrumTextCell }],
    });
    wrapper = mount(
      <Provider store={store}>
        <SpectrumThemeProvider theme={defaultTheme}>
          <JsonFormsReduxContext>
            <JsonFormsDispatch />
          </JsonFormsReduxContext>
        </SpectrumThemeProvider>
      </Provider>
    );
    const inputs = wrapper.find('input');
    expect(document.activeElement).not.toBe(inputs.at(0).getDOMNode());
    expect(document.activeElement).toBe(inputs.at(1).getDOMNode());
  });

  test('render', () => {
    const store = initJsonFormsVanillaStore({
      data: fixture.data,
      schema: fixture.schema,
      uischema: fixture.uischema,
      renderers: [{ tester: inputControlTester, renderer: InputControl }],
      cells: [{ tester: spectrumTextCellTester, cell: SpectrumTextCell }],
    });
    wrapper = mount(
      <Provider store={store}>
        <SpectrumThemeProvider theme={defaultTheme}>
          <JsonFormsReduxContext>
            <InputControl uischema={fixture.uischema} schema={fixture.schema} />
          </JsonFormsReduxContext>
        </SpectrumThemeProvider>
      </Provider>
    );

    const control = wrapper.find('.control').getDOMNode();
    expect(control).toBeDefined();
    expect(control.childNodes).toHaveLength(3);
    expect(wrapper.find('.root_properties_foo')).toBeDefined();

    const label = wrapper.find('label');
    expect(label.text()).toBe('Foo');

    const input = wrapper.find('input');
    expect(input).toBeDefined();
    expect(input).not.toBeNull();

    const validation = wrapper
      .find('.validation')
      .getDOMNode() as HTMLDivElement;
    expect(validation.tagName).toBe('DIV');
    expect(validation.children).toHaveLength(0);
  });

  test('render without label', () => {
    const uischema: ControlElement = {
      type: 'Control',
      scope: '#/properties/foo',
      label: false,
    };
    const store = initJsonFormsVanillaStore({
      data: fixture.data,
      schema: fixture.schema,
      uischema,
      renderers: [{ tester: inputControlTester, renderer: InputControl }],
      cells: [{ tester: spectrumTextCellTester, cell: SpectrumTextCell }],
    });
    wrapper = mount(
      <Provider store={store}>
        <SpectrumThemeProvider theme={defaultTheme}>
          <JsonFormsReduxContext>
            <JsonFormsDispatch />
          </JsonFormsReduxContext>
        </SpectrumThemeProvider>
      </Provider>
    );

    const control = wrapper.find('.control');
    expect(control).toBeDefined();
    expect(control.getDOMNode().childNodes).toHaveLength(3);
    expect(wrapper.find('.root_properties_foo')).toBeDefined();

    const label = wrapper.find('label');
    expect(label.text()).toBe('');

    const input = wrapper.find('input');
    expect(input).toBeDefined();
    expect(input).not.toBeNull();

    const validation = wrapper
      .find('.validation')
      .getDOMNode() as HTMLDivElement;
    expect(validation.tagName).toBe('DIV');
    expect(validation.children).toHaveLength(0);
  });

  test('hide', () => {
    const store = initJsonFormsVanillaStore({
      data: fixture.data,
      schema: fixture.schema,
      uischema: fixture.uischema,
      renderers: [{ tester: inputControlTester, renderer: InputControl }],
      cells: [{ tester: spectrumTextCellTester, cell: SpectrumTextCell }],
    });
    wrapper = mount(
      <Provider store={store}>
        <SpectrumThemeProvider theme={defaultTheme}>
          <JsonFormsReduxContext>
            <InputControl
              schema={fixture.schema}
              uischema={fixture.uischema}
              path={''}
              visible={false}
            />
          </JsonFormsReduxContext>
        </SpectrumThemeProvider>
      </Provider>
    );
    const control = wrapper.find('.control').getDOMNode() as HTMLElement;
    expect(control.hidden).toBe(true);
  });

  test('show by default', () => {
    const store = initJsonFormsVanillaStore({
      data: fixture.data,
      schema: fixture.schema,
      uischema: fixture.uischema,
      renderers: [{ tester: inputControlTester, renderer: InputControl }],
      cells: [{ tester: spectrumTextCellTester, cell: SpectrumTextCell }],
    });
    wrapper = mount(
      <Provider store={store}>
        <SpectrumThemeProvider theme={defaultTheme}>
          <JsonFormsReduxContext>
            <InputControl schema={fixture.schema} uischema={fixture.uischema} />
          </JsonFormsReduxContext>
        </SpectrumThemeProvider>
      </Provider>
    );
    const control = wrapper.find('.control').getDOMNode() as HTMLElement;
    expect(control.hidden);
  });

  test('single error', () => {
    const store = initJsonFormsVanillaStore({
      data: fixture.data,
      schema: fixture.schema,
      uischema: fixture.uischema,
      renderers: [{ tester: inputControlTester, renderer: InputControl }],
      cells: [{ tester: spectrumTextCellTester, cell: SpectrumTextCell }],
    });
    wrapper = mount(
      <Provider store={store}>
        <SpectrumThemeProvider theme={defaultTheme}>
          <JsonFormsReduxContext>
            <InputControl schema={fixture.schema} uischema={fixture.uischema} />
          </JsonFormsReduxContext>
        </SpectrumThemeProvider>
      </Provider>
    );
    const validation = wrapper.find('.validation');
    store.dispatch(Actions.update('foo', () => 2));
    expect(validation.text()).toBe('should be string');
  });

  test('multiple errors', () => {
    const store = initJsonFormsVanillaStore({
      data: fixture.data,
      schema: fixture.schema,
      uischema: fixture.uischema,
      renderers: [{ tester: inputControlTester, renderer: InputControl }],
      cells: [{ tester: spectrumTextCellTester, cell: SpectrumTextCell }],
    });
    wrapper = mount(
      <Provider store={store}>
        <SpectrumThemeProvider theme={defaultTheme}>
          <JsonFormsReduxContext>
            <InputControl schema={fixture.schema} uischema={fixture.uischema} />
          </JsonFormsReduxContext>
        </SpectrumThemeProvider>
      </Provider>
    );
    store.dispatch(Actions.update('foo', () => 3));
    wrapper.update();
    const validation = wrapper.find('.validation');
    expect(validation.text()).toBe('should be string');
  });

  test('empty errors by default', () => {
    const store = initJsonFormsVanillaStore({
      data: fixture.data,
      schema: fixture.schema,
      uischema: fixture.uischema,
      renderers: [{ tester: inputControlTester, renderer: InputControl }],
      cells: [{ tester: spectrumTextCellTester, cell: SpectrumTextCell }],
    });
    wrapper = mount(
      <Provider store={store}>
        <SpectrumThemeProvider theme={defaultTheme}>
          <JsonFormsReduxContext>
            <JsonFormsDispatch />
          </JsonFormsReduxContext>
        </SpectrumThemeProvider>
      </Provider>
    );
    const validation = wrapper.find('.validation');
    expect(validation.text()).toBe('');
  });

  test('reset validation message', () => {
    const store = initJsonFormsVanillaStore({
      data: fixture.data,
      schema: fixture.schema,
      uischema: fixture.uischema,
      renderers: [{ tester: inputControlTester, renderer: InputControl }],
      cells: [{ tester: spectrumTextCellTester, cell: SpectrumTextCell }],
    });
    wrapper = mount(
      <Provider store={store}>
        <SpectrumThemeProvider theme={defaultTheme}>
          <JsonFormsReduxContext>
            <JsonFormsDispatch />
          </JsonFormsReduxContext>
        </SpectrumThemeProvider>
      </Provider>
    );
    const validation = wrapper.find('.validation');
    store.dispatch(Actions.update('foo', () => 3));
    store.dispatch(Actions.update('foo', () => 'foo'));
    expect(validation.text()).toBe('');
  });

  test('validation of nested schema', () => {
    const schema = {
      type: 'object',
      properties: {
        name: {
          type: 'string',
        },
        personalData: {
          type: 'object',
          properties: {
            middleName: {
              type: 'string',
            },
            lastName: {
              type: 'string',
            },
          },
          required: ['middleName', 'lastName'],
        },
      },
      required: ['name'],
    };
    const firstControlElement: ControlElement = {
      type: 'Control',
      scope: '#/properties/name',
    };
    const secondControlElement: ControlElement = {
      type: 'Control',
      scope: '#/properties/personalData/properties/middleName',
    };
    const thirdControlElement: ControlElement = {
      type: 'Control',
      scope: '#/properties/personalData/properties/lastName',
    };
    const uischema: HorizontalLayout = {
      type: 'HorizontalLayout',
      elements: [
        firstControlElement,
        secondControlElement,
        thirdControlElement,
      ],
    };
    const data = {
      name: 'John Doe',
      personalData: {},
    };
    const store = initJsonFormsVanillaStore({
      data,
      schema,
      uischema,
      renderers: [{ tester: inputControlTester, renderer: InputControl }],
      cells: [{ tester: spectrumTextCellTester, cell: SpectrumTextCell }],
    });
    wrapper = mount(
      <Provider store={store}>
        <JsonFormsReduxContext>
          <HorizontalLayoutRenderer schema={schema} uischema={uischema} />
        </JsonFormsReduxContext>
      </Provider>
    );
    const validation = wrapper.find('.validation');
    expect(validation.at(0).text()).toBe('');
    expect(validation.at(1).text()).toBe('is a required property');
    expect(validation.at(2).text()).toBe('is a required property');
  });
  test('required cell is marked', () => {
    const schema: JsonSchema = {
      type: 'object',
      properties: {
        dateCell: {
          type: 'string',
          format: 'date',
        },
      },
      required: ['dateCell'],
    };
    const uischema: ControlElement = {
      type: 'Control',
      scope: '#/properties/dateCell',
    };
    const store = initJsonFormsVanillaStore({
      data: {},
      schema,
      uischema,
      renderers: [{ tester: inputControlTester, renderer: InputControl }],
      cells: [{ tester: dateCellTester, cell: DateCell }],
    });
    wrapper = mount(
      <Provider store={store}>
        <JsonFormsReduxContext>
          <InputControl schema={schema} uischema={uischema} />
        </JsonFormsReduxContext>
      </Provider>
    );
    const label = wrapper.find('label');
    expect(label.text()).toBe('Date Cell*');
  });

  test('not required', () => {
    const schema: JsonSchema = {
      type: 'object',
      properties: {
        dateCell: {
          type: 'string',
          format: 'date',
        },
      },
    };
    const uischema: ControlElement = {
      type: 'Control',
      scope: '#/properties/dateCell',
    };
    const store = initJsonFormsVanillaStore({
      data: {},
      schema,
      uischema,
      renderers: [{ tester: inputControlTester, renderer: InputControl }],
      cells: [{ tester: dateCellTester, cell: DateCell }],
    });
    wrapper = mount(
      <Provider store={store}>
        <JsonFormsReduxContext>
          <InputControl schema={schema} uischema={uischema} />
        </JsonFormsReduxContext>
      </Provider>
    );
    const label = wrapper.find('label');
    expect(label.text()).toBe('Date Cell');
  });

  test('show description on focus', () => {
    const schema: JsonSchema = {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'Enter your first name',
        },
      },
    };
    const uischema: ControlElement = {
      type: 'Control',
      scope: '#/properties/name',
    };
    const data = { isFocused: false };
    const store = initJsonFormsVanillaStore({
      data,
      schema,
      uischema,
      renderers: [{ tester: inputControlTester, renderer: InputControl }],
      cells: [{ tester: spectrumTextCellTester, cell: SpectrumTextCell }],
    });
    wrapper = mount(
      <Provider store={store}>
        <JsonFormsReduxContext>
          <InputControl schema={schema} uischema={uischema} />
        </JsonFormsReduxContext>
      </Provider>
    );
    const control = wrapper.find('.control');
    control.simulate('focus');
    const description = wrapper.find('.input-description');
    expect(description.text()).toBe('Enter your first name');
  });

  test('hide description when input cell is not focused', () => {
    const schema: JsonSchema = {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'Enter your first name',
        },
      },
    };
    const uischema: ControlElement = {
      type: 'Control',
      scope: '#/properties/name',
    };
    const data = { isFocused: false };
    const store = initJsonFormsVanillaStore({
      data,
      schema,
      uischema,
      renderers: [{ tester: inputControlTester, renderer: InputControl }],
      cells: [{ tester: spectrumTextCellTester, cell: SpectrumTextCell }],
    });
    wrapper = mount(
      <Provider store={store}>
        <JsonFormsReduxContext>
          <InputControl schema={schema} uischema={uischema} />
        </JsonFormsReduxContext>
      </Provider>
    );
    const description = wrapper.find('.input-description');
    expect(description.text()).toBe('');
  });

  test('hide description on blur', () => {
    const schema: JsonSchema = {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'Enter your first name',
        },
      },
    };
    const uischema: ControlElement = {
      type: 'Control',
      scope: '#/properties/name',
    };
    const data = { isFocused: false };
    const store = initJsonFormsVanillaStore({
      data,
      schema,
      uischema,
      renderers: [{ tester: inputControlTester, renderer: InputControl }],
      cells: [{ tester: spectrumTextCellTester, cell: SpectrumTextCell }],
    });
    wrapper = mount(
      <Provider store={store}>
        <JsonFormsReduxContext>
          <JsonFormsDispatch />
        </JsonFormsReduxContext>
      </Provider>
    );
    const control = wrapper.find('.control');
    control.simulate('focus');
    const description = wrapper.find('.input-description');
    expect(description.text()).toBe('Enter your first name');
    control.simulate('blur');
    const hiddenDescription = wrapper.find('.input-description');
    expect(hiddenDescription.text()).toBe('');
  });

  test('description undefined', () => {
    const schema: JsonSchema = {
      type: 'object',
      properties: {
        name: {
          type: 'string',
        },
      },
    };
    const uischema: ControlElement = {
      type: 'Control',
      scope: '#/properties/name',
    };
    const data = { isFocused: false };
    const store = initJsonFormsVanillaStore({
      data,
      schema,
      uischema,
      renderers: [{ tester: inputControlTester, renderer: InputControl }],
      cells: [{ tester: spectrumTextCellTester, cell: SpectrumTextCell }],
    });
    wrapper = mount(
      <Provider store={store}>
        <JsonFormsReduxContext>
          <JsonFormsDispatch />
        </JsonFormsReduxContext>
      </Provider>
    );
    const description = wrapper.find('.input-description').getDOMNode();
    expect(description.textContent).toBe('');
  });

  test('undefined input control', () => {
    const schema: JsonSchema = {
      type: 'object',
      properties: {
        expectedValue: {
          type: ['string', 'integer', 'number', 'boolean'],
        },
      },
    };
    const uischema: ControlElement = {
      type: 'Control',
      scope: '#/properties/expectedValue',
    };
    const store = initJsonFormsVanillaStore({
      data: {},
      schema,
      uischema,
      renderers: [{ tester: inputControlTester, renderer: InputControl }],
      cells: [{ tester: spectrumTextCellTester, cell: SpectrumTextCell }],
    });
    wrapper = mount(
      <Provider store={store}>
        <JsonFormsReduxContext>
          <InputControl schema={schema} uischema={uischema} />
        </JsonFormsReduxContext>
      </Provider>
    );
    const control = wrapper.find('.control');
    expect(control).toHaveLength(1);
  });
});