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
import SpectrumTextCell, { SpectrumTextCellTester } from '../../src/cells/SpectrumTextCell';
import { SpectrumRenderers } from '../../src';
import { JsonForms } from '@jsonforms/react';

Enzyme.configure({ adapter: new Adapter() });

const defaultMaxLength = 524288;
const defaultSize = 20;

const controlElement: ControlElement = {
  type: 'Control',
  scope: '#/properties/name',
};

const fixture = {
  data: { name: 'Foo' },
  minLengthSchema: {
    type: 'string',
    minLength: 3,
  },
  maxLengthSchema: {
    type: 'string',
    maxLength: 5,
  },
  schema: { type: 'string' },
  uischema: controlElement,
};

const cells = [{ tester: SpectrumTextCellTester, cell: SpectrumTextCell }];

test('Text cell tester', () => {
  expect(SpectrumTextCellTester(undefined, undefined)).toBe(-1);
  expect(SpectrumTextCellTester(null, undefined)).toBe(-1);
  expect(SpectrumTextCellTester({ type: 'Foo' }, undefined)).toBe(-1);
  expect(SpectrumTextCellTester({ type: 'Control' }, undefined)).toBe(-1);
});

describe('Text cell', () => {
  let wrapper: ReactWrapper;

  afterEach(() => wrapper.unmount());

  test.skip('autofocus on first element', () => {
    const schema: JsonSchema = {
      type: 'object',
      properties: {
        firstName: { type: 'string' },
        lastName: { type: 'string' },
      },
    };
    const firstControlElement: ControlElement = {
      type: 'Control',
      scope: '#/properties/firstName',
      options: { focus: true },
    };
    const secondControlElement: ControlElement = {
      type: 'Control',
      scope: '#/properties/lastName',
      options: { focus: true },
    };
    const uischema: HorizontalLayout = {
      type: 'HorizontalLayout',
      elements: [firstControlElement, secondControlElement],
    };
    wrapper = mount(
      <JsonForms
        schema={schema}
        uischema={uischema}
        data={{ firstName: 'Foo', lastName: 'Boo' }}
        renderers={SpectrumRenderers}
        cells={cells}
      />
    );
    const inputs = wrapper.find('input');
    expect(document.activeElement).not.toBe(inputs.at(0).getDOMNode());
    expect(document.activeElement).toBe(inputs.at(1).getDOMNode());
  });

  test('autofocus active', () => {
    const uischema: ControlElement = {
      type: 'Control',
      scope: '#/properties/name',
      options: { focus: true },
    };
    wrapper = mount(
      <JsonForms
        schema={fixture.minLengthSchema}
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
      scope: '#/properties/name',
      options: { focus: false },
    };
    wrapper = mount(
      <JsonForms
        schema={fixture.minLengthSchema}
        uischema={uischema}
        data={fixture.data}
        renderers={SpectrumRenderers}
        cells={cells}
      />
    );
    const input = wrapper.find('input').getDOMNode();
    expect(document.activeElement).not.toBe(input);
  });

  test('autofocus inactive by default', () => {
    wrapper = mount(
      <JsonForms
        schema={fixture.minLengthSchema}
        uischema={fixture.uischema}
        data={fixture.data}
        renderers={SpectrumRenderers}
        cells={cells}
      />
    );
    const input = wrapper.find('input').getDOMNode();
    expect(document.activeElement).not.toBe(input);
  });

  test('render', () => {
    const schema: JsonSchema = {
      type: 'object',
      properties: {
        name: { type: 'string' },
      },
    };
    wrapper = mount(
      <JsonForms
        schema={schema}
        uischema={fixture.uischema}
        data={{ name: 'Foo' }}
        renderers={SpectrumRenderers}
        cells={cells}
      />
    );
    const input = wrapper.find('input').getDOMNode() as HTMLInputElement;
    expect(input.value).toBe('Foo');
  });

  test('update via input event', () => {
    const onChange = jest.fn();
    wrapper = mount(
      <JsonForms
        schema={fixture.minLengthSchema}
        uischema={fixture.uischema}
        data={fixture.data}
        renderers={SpectrumRenderers}
        cells={cells}
        onChange={onChange}
      />
    );
    const input = wrapper.find('input');
    input.simulate('change', { target: { value: 'Bar' } });
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ data: { name: 'Bar' } }));
  });

  test('update via action', () => {
    wrapper = mount(
      <JsonForms
        schema={fixture.minLengthSchema}
        uischema={fixture.uischema}
        data={fixture.data}
        renderers={SpectrumRenderers}
        cells={cells}
      />
    );
    const input = wrapper.find('input').getDOMNode() as HTMLInputElement;
    wrapper.setProps({ data: { ...fixture.data, name: 'Bar' } });
    wrapper.update();
    expect(input.value).toBe('Bar');
  });

  test('update with undefined value', () => {
    wrapper = mount(
      <JsonForms
        schema={fixture.minLengthSchema}
        uischema={fixture.uischema}
        data={fixture.data}
        renderers={SpectrumRenderers}
        cells={cells}
      />
    );
    wrapper.setProps({ data: { ...fixture.data, name: undefined } });
    wrapper.update();
    const input = wrapper.find('input').getDOMNode() as HTMLInputElement;
    expect(input.value).toBe('');
  });

  test('update with null value', () => {
    wrapper = mount(
      <JsonForms
        schema={fixture.minLengthSchema}
        uischema={fixture.uischema}
        data={fixture.data}
        renderers={SpectrumRenderers}
        cells={cells}
      />
    );
    wrapper.setProps({ data: { ...fixture.data, name: null } });
    wrapper.update();
    const input = wrapper.find('input').getDOMNode() as HTMLInputElement;
    expect(input.value).toBe('');
  });

  test('update with wrong ref', () => {
    wrapper = mount(
      <JsonForms
        schema={fixture.minLengthSchema}
        uischema={fixture.uischema}
        data={fixture.data}
        renderers={SpectrumRenderers}
        cells={cells}
      />
    );
    wrapper.setProps({ data: { ...fixture.data, firstname: 'Bar' } });
    wrapper.update();
    const input = wrapper.find('input').getDOMNode() as HTMLInputElement;
    expect(input.value).toBe('Foo');
  });

  test('disable', () => {
    const condition: SchemaBasedCondition = {
      scope: '#/properties/name',
      schema: { type: 'string' },
    };
    wrapper = mount(
      <JsonForms
        schema={fixture.minLengthSchema}
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
        schema={fixture.minLengthSchema}
        uischema={fixture.uischema}
        data={fixture.data}
        renderers={SpectrumRenderers}
        cells={cells}
      />
    );
    const input = wrapper.find('input').getDOMNode() as HTMLInputElement;
    expect(input.disabled).toBe(false);
  });

  test.skip('use maxLength for attributes size and maxlength', () => {
    const uischema: ControlElement = {
      type: 'Control',
      scope: '#/properties/name',
    };
    const config = {
      restrict: true,
      trim: true,
    };
    wrapper = mount(
      <JsonForms
        schema={fixture.maxLengthSchema}
        uischema={uischema}
        data={fixture.data}
        renderers={SpectrumRenderers}
        config={config}
        cells={cells}
      />
    );
    const input = wrapper.find('input').getDOMNode() as HTMLInputElement;
    expect(input.maxLength).toBe(5);
    expect(input.size).toBe(5);
  });

  test.skip('use maxLength for attribute size only', () => {
    const uischema: ControlElement = {
      type: 'Control',
      scope: '#/properties/name',
    };
    const config = {
      restrict: false,
      trim: true,
    };
    wrapper = mount(
      <JsonForms
        schema={fixture.maxLengthSchema}
        uischema={uischema}
        data={fixture.data}
        renderers={SpectrumRenderers}
        config={config}
        cells={cells}
      />
    );
    const input = wrapper.find('input').getDOMNode() as HTMLInputElement;
    expect(input.maxLength).toBe(defaultMaxLength);
    expect(input.size).toBe(5);
  });

  test('use maxLength for attribute max length only', () => {
    const uischema: ControlElement = {
      type: 'Control',
      scope: '#/properties/name',
    };
    const config = {
      restrict: true,
      trim: false,
    };
    wrapper = mount(
      <JsonForms
        schema={fixture.maxLengthSchema}
        uischema={uischema}
        data={fixture.data}
        renderers={SpectrumRenderers}
        config={config}
        cells={cells}
      />
    );
    const input = wrapper.find('input').getDOMNode() as HTMLInputElement;
    expect(input.maxLength).toBe(5);
    expect(input.size).toBe(defaultSize);
  });

  test.skip('do not use maxLength by default', () => {
    wrapper = mount(
      <JsonForms
        schema={fixture.maxLengthSchema}
        uischema={fixture.uischema}
        data={fixture.data}
        renderers={SpectrumRenderers}
        cells={cells}
      />
    );
    const input = wrapper.find('input').getDOMNode() as HTMLInputElement;
    expect(input.maxLength).toBe(defaultMaxLength);
    expect(input.size).toBe(defaultSize);
  });

  test('maxLength not specified, attributes should have default values (trim && restrict)', () => {
    const uischema: ControlElement = {
      type: 'Control',
      scope: '#/properties/name',
    };
    const config = {
      restrict: true,
      trim: true,
    };
    wrapper = mount(
      <JsonForms
        schema={fixture.schema}
        uischema={uischema}
        data={fixture.data}
        renderers={SpectrumRenderers}
        config={config}
        cells={cells}
      />
    );
    const input = wrapper.find('input').getDOMNode() as HTMLInputElement;
    expect(input.maxLength).toBe(defaultMaxLength);
    expect(input.size).toBe(defaultSize);
  });

  test('maxLength not specified, attributes should have default values (trim)', () => {
    const uischema: ControlElement = {
      type: 'Control',
      scope: '#/properties/name',
    };
    const config = {
      restrict: false,
      trim: true,
    };
    wrapper = mount(
      <JsonForms
        schema={fixture.schema}
        uischema={uischema}
        data={fixture.data}
        renderers={SpectrumRenderers}
        config={config}
        cells={cells}
      />
    );
    const input = wrapper.find('input').getDOMNode() as HTMLInputElement;
    expect(input.maxLength).toBe(defaultMaxLength);
    expect(input.size).toBe(defaultSize);
  });

  test('maxLength not specified, attributes should have default values (restrict)', () => {
    const uischema: ControlElement = {
      type: 'Control',
      scope: '#/properties/name',
    };
    const config = {
      restrict: true,
      trim: false,
    };
    wrapper = mount(
      <JsonForms
        schema={fixture.schema}
        uischema={uischema}
        data={fixture.data}
        renderers={SpectrumRenderers}
        config={config}
        cells={cells}
      />
    );
    const input = wrapper.find('input').getDOMNode() as HTMLInputElement;
    expect(input.maxLength).toBe(defaultMaxLength);
    expect(input.size).toBe(defaultSize);
  });

  test('maxLength not specified, attributes should have default values', () => {
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
    expect(input.maxLength).toBe(defaultMaxLength);
    expect(input.size).toBe(defaultSize);
  });
});
