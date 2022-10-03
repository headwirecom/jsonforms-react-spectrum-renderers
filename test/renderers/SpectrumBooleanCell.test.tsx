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
import SpectrumBooleanCell, {
  SpectrumBooleanCellTester,
} from '../../src/cells/SpectrumBooleanCell';
import { SpectrumRenderers } from '../../src';
import { InputControl } from '../../src/controls/InputControl';
import { JsonForms } from '@jsonforms/react';

Enzyme.configure({ adapter: new Adapter() });

const control: ControlElement = {
  type: 'Control',
  scope: '#/properties/foo',
};

const fixture = {
  data: { foo: true },
  schema: { type: 'boolean' },
  uischema: control,
};

const cells = [{ tester: SpectrumBooleanCellTester, cell: SpectrumBooleanCell }];

describe('Boolean cell tester', () => {
  test('tester', () => {
    expect(SpectrumBooleanCellTester(undefined, undefined)).toBe(-1);
    expect(SpectrumBooleanCellTester(null, undefined)).toBe(-1);
    expect(SpectrumBooleanCellTester({ type: 'Foo' }, undefined)).toBe(-1);
    expect(SpectrumBooleanCellTester({ type: 'Control' }, undefined)).toBe(-1);
  });

  test('tester with wrong prop type', () => {
    const controlElement: ControlElement = {
      type: 'Control',
      scope: '#/properties/foo',
    };
    expect(
      SpectrumBooleanCellTester(controlElement, {
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
      SpectrumBooleanCellTester(controlElement, {
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
      SpectrumBooleanCellTester(controlElement, {
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
    wrapper = mount(
      <JsonForms
        schema={schema}
        uischema={uischema}
        data={data}
        renderers={SpectrumRenderers}
        cells={cells}
      />
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
    wrapper = mount(
      <JsonForms
        schema={fixture.schema}
        uischema={uischema}
        data={fixture.data}
        renderers={SpectrumRenderers}
        cells={cells}
      />
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
    const input = wrapper.find('input').getDOMNode();
    expect(document.activeElement).not.toBe(input);
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
    expect(input.type).toBe('checkbox');
    expect(input.checked).toBe(true);
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
    expect(input.hasClass('validationState')).toBe(true);
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
    input.simulate('change', { target: { checked: false } });
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ data: { foo: false } }));
  });

  test('update via action', () => {
    const data = { foo: false };
    wrapper = mount(
      <JsonForms
        schema={fixture.schema}
        uischema={fixture.uischema}
        data={data}
        renderers={SpectrumRenderers}
        cells={cells}
      />
    );
    const input = wrapper.find('input').getDOMNode() as HTMLInputElement;
    wrapper.setProps({ data: { ...data, foo: false } });
    wrapper.update();
    expect(input.checked).toBe(false);
  });

  test.skip('update with undefined value', () => {
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
    wrapper.setProps({ data: { ...fixture.data, foo: undefined } });
    wrapper.update();
    expect(input.value).toEqual('');
  });

  test.skip('update with null value', () => {
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
    wrapper.setProps({ data: { ...fixture.data, foo: null } });
    wrapper.update();
    expect(input.value).toEqual('');
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
    const input = wrapper.find('input');
    wrapper.setProps({ data: { ...fixture.data, bar: 11 } });
    wrapper.update();
    expect(input.props().checked).toBe(true);
  });

  test('disable', () => {
    const condition: SchemaBasedCondition = {
      scope: '#/properties/foo',
      schema: { type: 'boolean' },
    };
    wrapper = mount(
      <JsonForms
        schema={fixture.schema}
        uischema={{
          ...fixture.uischema,
          rule: { effect: RuleEffect.DISABLE, condition: condition },
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
