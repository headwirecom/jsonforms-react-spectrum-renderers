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
  HorizontalLayout,
  JsonSchema,
  RuleEffect,
  SchemaBasedCondition,
} from '@jsonforms/core';
import { defaultTheme, Provider as SpectrumThemeProvider } from '@adobe/react-spectrum';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import Enzyme, { mount, ReactWrapper } from 'enzyme';
import '../../src';
import SpectrumHorizontalLayoutRenderer, {
  SpectrumHorizontalLayoutTester,
} from '../../src/layouts/SpectrumHorizontalLayout';
import InputControl, { inputControlTester } from '../../src/controls/InputControl';
import SpectrumTextCell, { SpectrumTextCellTester } from '../../src/cells/SpectrumTextCell';
import { JsonForms } from '@jsonforms/react';

Enzyme.configure({ adapter: new Adapter() });

const fixture: { schema: JsonSchema; uischema: ControlElement; data: any } = {
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

const cells = [{ tester: SpectrumTextCellTester, cell: SpectrumTextCell }];
const renderers = [{ tester: inputControlTester, renderer: InputControl }];

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
    wrapper = mount(
      <SpectrumThemeProvider theme={defaultTheme}>
        <JsonForms
          schema={schema}
          uischema={uischema}
          data={data}
          renderers={[
            { tester: inputControlTester, renderer: InputControl },
            {
              tester: SpectrumHorizontalLayoutTester,
              renderer: SpectrumHorizontalLayoutRenderer,
            },
          ]}
          cells={cells}
        />
      </SpectrumThemeProvider>
    );
    const inputs = wrapper.find('input');
    expect(document.activeElement).not.toBe(inputs.at(0).getDOMNode());
    expect(document.activeElement).toBe(inputs.at(1).getDOMNode());
  });

  test('render', () => {
    wrapper = mount(
      <SpectrumThemeProvider theme={defaultTheme}>
        <JsonForms
          schema={fixture.schema}
          uischema={fixture.uischema}
          data={fixture.data}
          renderers={renderers}
          cells={cells}
        />
      </SpectrumThemeProvider>
    );

    const control = wrapper.find('.control').getDOMNode();
    expect(control).toBeDefined();
    expect(control.childNodes).toHaveLength(1);
    expect(wrapper.find('.root_properties_foo')).toBeDefined();

    // TODO: labels work different with react spectrum
    // const label = wrapper.find('label');
    // expect(label.text()).toBe('Foo');

    const input = wrapper.find('input');
    expect(input).toBeDefined();
    expect(input).not.toBeNull();

    const validation = wrapper.find('.validation').getDOMNode() as HTMLDivElement;
    expect(validation.tagName).toBe('DIV');
    expect(validation.children).toHaveLength(1);
  });

  test('render without label', () => {
    const uischema: ControlElement = {
      type: 'Control',
      scope: '#/properties/foo',
      label: false,
    };
    wrapper = mount(
      <SpectrumThemeProvider theme={defaultTheme}>
        <JsonForms
          schema={fixture.schema}
          uischema={uischema}
          data={fixture.data}
          renderers={renderers}
          cells={cells}
        />
      </SpectrumThemeProvider>
    );

    const control = wrapper.find('.control');
    expect(control).toBeDefined();
    expect(control.getDOMNode().childNodes).toHaveLength(1);
    expect(wrapper.find('.root_properties_foo')).toBeDefined();

    const label = wrapper.find('label');
    expect(label.exists()).toBe(false);

    const input = wrapper.find('input');
    expect(input).toBeDefined();
    expect(input).not.toBeNull();

    const validation = wrapper.find('.validation').getDOMNode() as HTMLDivElement;
    expect(validation.tagName).toBe('DIV');
    expect(validation.children).toHaveLength(1);
  });

  test('hide', () => {
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
            rule: { effect: RuleEffect.HIDE, condition },
          }}
          data={fixture.data}
          renderers={renderers}
          cells={cells}
        />
      </SpectrumThemeProvider>
    );
    const control = wrapper.find('.control').getDOMNode() as HTMLElement;
    expect(control.hidden).toBe(true);
  });

  test('show by default', () => {
    wrapper = mount(
      <SpectrumThemeProvider theme={defaultTheme}>
        <JsonForms
          schema={fixture.schema}
          uischema={fixture.uischema}
          data={fixture.data}
          renderers={renderers}
          cells={cells}
        />
      </SpectrumThemeProvider>
    );
    const control = wrapper.find('.control').getDOMNode() as HTMLElement;
    expect(control.hidden);
  });

  test('single error', () => {
    wrapper = mount(
      <SpectrumThemeProvider theme={defaultTheme}>
        <JsonForms
          schema={fixture.schema}
          uischema={fixture.uischema}
          data={{ foo: 2 }}
          renderers={renderers}
          cells={cells}
        />
      </SpectrumThemeProvider>
    );
    const validation = wrapper.find('.validation');
    expect(validation.text()).toBe('should be string');
  });

  test('multiple errors', () => {
    wrapper = mount(
      <SpectrumThemeProvider theme={defaultTheme}>
        <JsonForms
          schema={fixture.schema}
          uischema={fixture.uischema}
          data={{ foo: 3 }}
          renderers={renderers}
          cells={cells}
        />
      </SpectrumThemeProvider>
    );
    const validation = wrapper.find('.validation');
    expect(validation.text()).toBe('should be string');
  });

  test('empty errors by default', () => {
    wrapper = mount(
      <SpectrumThemeProvider theme={defaultTheme}>
        <JsonForms
          schema={fixture.schema}
          uischema={fixture.uischema}
          data={fixture.data}
          renderers={renderers}
          cells={cells}
        />
      </SpectrumThemeProvider>
    );
    const validation = wrapper.find('.validation');
    expect(validation.text()).toBe('');
  });

  test('reset validation message', () => {
    wrapper = mount(
      <SpectrumThemeProvider theme={defaultTheme}>
        <JsonForms
          schema={fixture.schema}
          uischema={fixture.uischema}
          data={fixture.data}
          renderers={renderers}
          cells={cells}
        />
      </SpectrumThemeProvider>
    );
    const validation = wrapper.find('.validation');
    wrapper.setProps({ data: { ...fixture.data, foo: 3 } });
    wrapper.update();
    wrapper.setProps({ data: { ...fixture.data, foo: 'foo' } });
    wrapper.update();
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
      elements: [firstControlElement, secondControlElement, thirdControlElement],
    };
    const data = {
      name: 'John Doe',
      personalData: {},
    };
    wrapper = mount(
      <JsonForms
        schema={schema}
        uischema={uischema}
        data={data}
        renderers={[
          { tester: inputControlTester, renderer: InputControl },
          {
            tester: SpectrumHorizontalLayoutTester,
            renderer: SpectrumHorizontalLayoutRenderer,
          },
        ]}
        cells={cells}
      />
    );
    const validation = wrapper.find('.validation');
    expect(validation.at(0).text()).toBe('');
    expect(validation.at(1).text()).toBe('is a required property');
    expect(validation.at(2).text()).toBe('is a required property');
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
    wrapper = mount(
      <JsonForms
        schema={schema}
        uischema={uischema}
        data={data}
        renderers={renderers}
        cells={cells}
      />
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
    wrapper = mount(
      <JsonForms
        schema={schema}
        uischema={uischema}
        data={data}
        renderers={renderers}
        cells={cells}
      />
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
    wrapper = mount(
      <JsonForms
        schema={schema}
        uischema={uischema}
        data={data}
        renderers={renderers}
        cells={cells}
      />
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
    wrapper = mount(
      <JsonForms
        schema={schema}
        uischema={uischema}
        data={data}
        renderers={renderers}
        cells={cells}
      />
    );
    const description = wrapper.find('.input-description').getDOMNode();
    expect(description.textContent).toBe('');
  });

  test('undefined input control', () => {
    const schema: JsonSchema = {
      type: 'object',
      properties: {
        expectedValue: {
          type: ['string', 'integer', 'rating', 'number', 'boolean'],
        },
      },
    };
    const uischema: ControlElement = {
      type: 'Control',
      scope: '#/properties/expectedValue',
    };
    wrapper = mount(
      <JsonForms
        schema={schema}
        uischema={uischema}
        data={{}}
        renderers={renderers}
        cells={cells}
      />
    );
    const control = wrapper.find('.control');
    expect(control).toHaveLength(1);
  });
});
