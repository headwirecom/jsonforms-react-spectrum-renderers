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
import Adapter from '@cfaester/enzyme-adapter-react-18';
import Enzyme, { mount, ReactWrapper } from 'enzyme';
import SpectrumIntegerCell, {
  SpectrumIntegerCellTester,
} from '../../src/cells/SpectrumIntegerCell';
import { SpectrumRenderers } from '../../src';
import { JsonForms } from '@jsonforms/react';

Enzyme.configure({ adapter: new Adapter() });

const control: ControlElement = {
  type: 'Control',
  scope: '#/properties/foo',
};

const fixture = {
  data: { foo: 42 },
  schema: {
    type: 'integer',
    minimum: 5,
  },
  uischema: control,
};

const cells = [{ tester: SpectrumIntegerCellTester, cell: SpectrumIntegerCell }];

describe('Integer cell tester', () => {
  test('tester', () => {
    expect(SpectrumIntegerCellTester(undefined, undefined)).toBe(-1);
    expect(SpectrumIntegerCellTester(null, undefined)).toBe(-1);
    expect(SpectrumIntegerCellTester({ type: 'Foo' }, undefined)).toBe(-1);
    expect(SpectrumIntegerCellTester({ type: 'Control' }, undefined)).toBe(-1);

    const controlElement: ControlElement = {
      type: 'Control',
      scope: '#/properties/foo',
    };
    expect(
      SpectrumIntegerCellTester(controlElement, {
        type: 'object',
        properties: { foo: { type: 'string' } },
      })
    ).toBe(-1);
    expect(
      SpectrumIntegerCellTester(controlElement, {
        type: 'object',
        properties: { foo: { type: 'string' }, bar: { type: 'integer' } },
      })
    ).toBe(-1);
    expect(
      SpectrumIntegerCellTester(controlElement, {
        type: 'object',
        properties: { foo: { type: 'integer' } },
      })
    ).toBe(2);
  });
});

describe('Integer cell', () => {
  let wrapper: ReactWrapper;

  afterEach(() => wrapper.unmount());

  test.skip('autofocus on first element', () => {
    const schema: JsonSchema = {
      type: 'object',
      properties: {
        firstIntegerCell: { type: 'integer', minimum: 5 },
        secondIntegerCell: { type: 'integer', minimum: 5 },
      },
    };
    const firstControlElement: ControlElement = {
      type: 'Control',
      scope: '#/properties/firstIntegerCell',
      options: {
        focus: true,
      },
    };
    const secondControlElement: ControlElement = {
      type: 'Control',
      scope: '#/properties/secondIntegerCell',
      options: {
        focus: true,
      },
    };
    const uischema: HorizontalLayout = {
      type: 'HorizontalLayout',
      elements: [firstControlElement, secondControlElement],
    };
    const data = {
      firstIntegerCell: 10,
      secondIntegerCell: 12,
    };
    wrapper = mount(
      <JsonForms
        schema={schema}
        uischema={uischema}
        data={data}
        renderers={SpectrumRenderers}
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
        renderers={SpectrumRenderers}
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
        renderers={SpectrumRenderers}
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
        renderers={SpectrumRenderers}
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
        renderers={SpectrumRenderers}
        cells={cells}
      />
    );

    const input = wrapper.find('input').getDOMNode() as HTMLInputElement;
    expect(input.type).toBe('number');
    // todo: react-spectrum does not yet support the step attribute
    // expect(input.step).toBe('1');
    expect(input.value).toBe('42');
  });

  test.skip('has classes set', () => {
    wrapper = mount(
      <JsonForms
        schema={fixture.schema}
        uischema={fixture.uischema}
        data={fixture.data}
        renderers={SpectrumRenderers}
        cells={cells}
      />
    );

    const input = wrapper.find('input');
    expect(input.hasClass('input')).toBe(true);
    expect(input.hasClass('validate')).toBe(true);
    expect(input.hasClass('valid')).toBe(true);
  });

  test('update via input event', () => {
    const onChange = jest.fn();
    wrapper = mount(
      <JsonForms
        schema={fixture.schema}
        uischema={fixture.uischema}
        data={fixture.data}
        renderers={SpectrumRenderers}
        cells={cells}
        onChange={onChange}
      />
    );
    const input = wrapper.find('input');
    input.simulate('change', { target: { value: '13' } });
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ data: { foo: 13 } }));
  });

  test('update via action', () => {
    const data = { foo: 13 };

    wrapper = mount(
      <JsonForms
        schema={fixture.schema}
        uischema={fixture.uischema}
        data={data}
        renderers={SpectrumRenderers}
        cells={cells}
      />
    );
    wrapper.setProps({ data: { ...data, foo: 42 } });
    wrapper.update();
    const input = wrapper.find('input').getDOMNode() as HTMLInputElement;
    expect(input.value).toBe('42');
  });

  test('update with undefined value', () => {
    wrapper = mount(
      <JsonForms
        schema={fixture.schema}
        uischema={fixture.uischema}
        data={fixture.data}
        renderers={SpectrumRenderers}
        cells={cells}
      />
    );
    wrapper.setProps({ data: { ...fixture.data, foo: undefined } });
    wrapper.update();
    const input = wrapper.find('input').getDOMNode() as HTMLInputElement;
    expect(input.value).toBe('');
  });

  test('update with null value', () => {
    wrapper = mount(
      <JsonForms
        schema={fixture.schema}
        uischema={fixture.uischema}
        data={fixture.data}
        renderers={SpectrumRenderers}
        cells={cells}
      />
    );
    wrapper.setProps({ data: { ...fixture.data, foo: null } });
    wrapper.update();
    const input = wrapper.find('input').getDOMNode() as HTMLInputElement;
    expect(input.value).toBe('');
  });

  test('update with wrong ref', () => {
    wrapper = mount(
      <JsonForms
        schema={fixture.schema}
        uischema={fixture.uischema}
        data={fixture.data}
        renderers={SpectrumRenderers}
        cells={cells}
      />
    );
    wrapper.setProps({ data: { ...fixture.data, bar: 11 } });
    wrapper.update();
    const input = wrapper.find('input').getDOMNode() as HTMLInputElement;
    expect(input.value).toBe('42');
  });

  test('disable', () => {
    const condition: SchemaBasedCondition = {
      scope: '#/properties/foo',
      schema: { type: 'integer' },
    };
    wrapper = mount(
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
    );
    const input = wrapper.find('input').getDOMNode() as HTMLInputElement;
    expect(input.disabled).toBe(true);
  });

  test('enabled by default', () => {
    wrapper = mount(
      <JsonForms
        schema={fixture.schema}
        uischema={fixture.uischema}
        data={fixture.data}
        renderers={SpectrumRenderers}
        cells={cells}
      />
    );
    const input = wrapper.find('input').getDOMNode() as HTMLInputElement;
    expect(input.disabled).toBe(false);
  });
});
