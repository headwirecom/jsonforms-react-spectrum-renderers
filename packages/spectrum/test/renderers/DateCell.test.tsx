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
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount, ReactWrapper } from 'enzyme';
import DateCell, { dateCellTester } from '../../src/cells/DateCell';
import { spectrumRenderers } from '../../src/index';
import { JsonForms } from '@jsonforms/react';

Enzyme.configure({ adapter: new Adapter() });

const control: ControlElement = {
  type: 'Control',
  scope: '#/properties/foo',
};

const fixture = {
  data: { foo: '1980-04-04' },
  schema: {
    type: 'string',
    format: 'date',
  },
  uischema: control,
};

const cells = [{ tester: dateCellTester, cell: DateCell }];

describe('Date cell tester', () => {
  test('tester', () => {
    expect(dateCellTester(undefined, undefined)).toBe(-1);
    expect(dateCellTester(null, undefined)).toBe(-1);
    expect(dateCellTester({ type: 'Foo' }, undefined)).toBe(-1);
    expect(dateCellTester({ type: 'Control' }, undefined)).toBe(-1);
  });

  test('tester with wrong prop type', () => {
    expect(
      dateCellTester(fixture.uischema, {
        type: 'object',
        properties: {
          foo: { type: 'string' },
        },
      })
    ).toBe(-1);
  });

  test('tester with wrong prop type, but sibling has correct one', () => {
    expect(
      dateCellTester(fixture.uischema, {
        type: 'object',
        properties: {
          foo: { type: 'string' },
          bar: {
            type: 'string',
            format: 'date',
          },
        },
      })
    ).toBe(-1);
  });

  test('tester with correct prop type', () => {
    expect(
      dateCellTester(fixture.uischema, {
        type: 'object',
        properties: {
          foo: {
            type: 'string',
            format: 'date',
          },
        },
      })
    ).toBe(2);
  });
});

describe('Date cell', () => {
  let wrapper: ReactWrapper;

  afterEach(() => wrapper.unmount());

  test.skip('autofocus on first element', () => {
    const schema: JsonSchema = {
      type: 'object',
      properties: {
        firstDate: { type: 'string', format: 'date' },
        secondDate: { type: 'string', format: 'date' },
      },
    };
    const firstControlElement: ControlElement = {
      type: 'Control',
      scope: '#/properties/firstDate',
      options: {
        focus: true,
      },
    };
    const secondControlElement: ControlElement = {
      type: 'Control',
      scope: '#/properties/secondDate',
      options: {
        focus: true,
      },
    };
    const uischema: HorizontalLayout = {
      type: 'HorizontalLayout',
      elements: [firstControlElement, secondControlElement],
    };
    const data = {
      firstDate: '1980-04-04',
      secondDate: '1980-04-04',
    };
    wrapper = mount(
      <JsonForms
        schema={schema}
        uischema={uischema}
        data={data}
        renderers={spectrumRenderers}
        cells={cells}
      />
    );
    const inputs = wrapper.find('input');
    expect(document.activeElement).not.toBe(inputs.at(0));
    expect(document.activeElement).toBe(inputs.at(1));
  });

  test('autofocus active', () => {
    const uischema: ControlElement = {
      type: 'Control',
      scope: '#/properties/foo',
      options: {
        focus: true,
      },
    };

    wrapper = mount(
      <JsonForms
        schema={fixture.schema}
        uischema={uischema}
        data={fixture.data}
        renderers={spectrumRenderers}
        cells={cells}
      />
    );
    const input = wrapper.find('input').getDOMNode();
    expect(document.activeElement).toBe(input);
  });

  test('autofocus inactive', () => {
    const uischema: ControlElement = {
      type: 'Control',
      scope: '#/properties/foo',
      options: {
        focus: false,
      },
    };
    wrapper = mount(
      <JsonForms
        schema={fixture.schema}
        uischema={uischema}
        data={fixture.data}
        renderers={spectrumRenderers}
        cells={cells}
      />
    );
    const input = wrapper.find('input').getDOMNode() as HTMLInputElement;
    expect(input.autofocus).toBe(false);
  });

  test('autofocus inactive by default', () => {
    const uischema: ControlElement = {
      type: 'Control',
      scope: '#/properties/foo',
    };
    wrapper = mount(
      <JsonForms
        schema={fixture.schema}
        uischema={uischema}
        data={fixture.data}
        renderers={spectrumRenderers}
        cells={cells}
      />
    );
    const input = wrapper.find('input').getDOMNode() as HTMLInputElement;
    expect(input.autofocus).toBe(false);
  });

  test('render', () => {
    wrapper = mount(
      <JsonForms
        schema={fixture.schema}
        uischema={fixture.uischema}
        data={fixture.data}
        renderers={spectrumRenderers}
        cells={cells}
      />
    );

    const input = wrapper.find('input');
    expect(input.props().type).toBe('date');
    expect(input.props().value).toBe('1980-04-04');
  });

  // TODO: update test after implementing with Spectrum
  test.skip('has classes set', () => {
    wrapper = mount(
      <JsonForms
        schema={fixture.schema}
        uischema={fixture.uischema}
        data={fixture.data}
        renderers={spectrumRenderers}
        cells={cells}
      />
    );
    const input = wrapper.find('input');
    expect(input.hasClass('input')).toBe(true);
    expect(input.hasClass('validate')).toBe(true);
    expect(input.hasClass('valid')).toBe(true);
  });

  test('update via event', () => {
    const onChange = jest.fn();
    wrapper = mount(
      <JsonForms
        schema={fixture.schema}
        uischema={fixture.uischema}
        data={fixture.data}
        renderers={spectrumRenderers}
        cells={cells}
        onChange={onChange}
      />
    );
    const input = wrapper.find('input');
    input.simulate('change', { target: { value: '1961-04-12' } });
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ data: { foo: '1961-04-12' } })
    );
    // expect(getData(store.getState()).foo).toBe('1961-04-12');
  });

  test('update via action', () => {
    wrapper = mount(
      <JsonForms
        schema={fixture.schema}
        uischema={fixture.uischema}
        data={fixture.data}
        renderers={spectrumRenderers}
        cells={cells}
      />
    );
    wrapper.setProps({ data: { ...fixture.data, foo: '1961-04-12' } });
    wrapper.update();
    const input = wrapper.find('input');
    expect(input.props().value).toBe('1961-04-12');
  });

  test('update with null value', () => {
    wrapper = mount(
      <JsonForms
        schema={fixture.schema}
        uischema={fixture.uischema}
        data={fixture.data}
        renderers={spectrumRenderers}
        cells={cells}
      />
    );
    wrapper.setProps({ data: { ...fixture.data, foo: null } });
    wrapper.update();
    const input = wrapper.find('input');
    expect(input.props().value).toBe('');
  });

  test('update with undefined value', () => {
    wrapper = mount(
      <JsonForms
        schema={fixture.schema}
        uischema={fixture.uischema}
        data={fixture.data}
        renderers={spectrumRenderers}
        cells={cells}
      />
    );
    wrapper.setProps({ data: { ...fixture.data, foo: undefined } });
    wrapper.update();
    const input = wrapper.find('input');
    expect(input.props().value).toBe('');
  });

  test('update with wrong ref', () => {
    wrapper = mount(
      <JsonForms
        schema={fixture.schema}
        uischema={fixture.uischema}
        data={fixture.data}
        renderers={spectrumRenderers}
        cells={cells}
      />
    );
    const input = wrapper.find('input');
    wrapper.setProps({ data: { ...fixture.data, bar: 'Bar' } });
    expect(input.props().value).toBe('1980-04-04');
  });

  test('disable', () => {
    const condition: SchemaBasedCondition = {
      scope: '#/properties/foo',
      schema: { type: 'string' },
    };
    wrapper = mount(
      <JsonForms
        schema={fixture.schema}
        uischema={{
          ...fixture.uischema,
          rule: { effect: RuleEffect.DISABLE, condition: condition },
        }}
        data={fixture.data}
        renderers={spectrumRenderers}
        cells={cells}
      />
    );
    const input = wrapper.find('input');
    expect(input.props().disabled).toBe(true);
  });

  test('enabled by default', () => {
    wrapper = mount(
      <JsonForms
        schema={fixture.schema}
        uischema={fixture.uischema}
        data={fixture.data}
        renderers={spectrumRenderers}
        cells={cells}
      />
    );
    const input = wrapper.find('input');
    expect(input.props().disabled).toBe(false);
  });
});
