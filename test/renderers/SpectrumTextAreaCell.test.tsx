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
import SpectrumTextAreaCell, {
  SpectrumTextAreaCellTester,
} from '../../src/cells/SpectrumTextAreaCell';
import { SpectrumRenderers } from '../../src';
import { JsonForms } from '@jsonforms/react';

Enzyme.configure({ adapter: new Adapter() });

const controlElement: ControlElement = {
  type: 'Control',
  scope: '#/properties/name',
  options: { multi: true },
};

const fixture = {
  data: { name: 'Foo' },
  schema: {
    type: 'string',
    minLength: 3,
  },
  uischema: controlElement,
};

const cells = [{ tester: SpectrumTextAreaCellTester, cell: SpectrumTextAreaCell }];

describe('Text area cell', () => {
  let wrapper: ReactWrapper;

  afterEach(() => wrapper.unmount());

  test.skip('autofocus on first element', () => {
    const schema: JsonSchema = {
      type: 'object',
      properties: {
        firstName: { type: 'string', minLength: 3 },
        lastName: { type: 'string', minLength: 3 },
      },
    };
    const firstControlElement: ControlElement = {
      type: 'Control',
      scope: '#/properties/firstName',
      options: {
        focus: true,
        multi: true,
      },
    };
    const secondControlElement: ControlElement = {
      type: 'Control',
      scope: '#/properties/lastName',
      options: {
        focus: true,
        multi: true,
      },
    };
    const uischema: HorizontalLayout = {
      type: 'HorizontalLayout',
      elements: [firstControlElement, secondControlElement],
    };
    const data = {
      firstName: 'Foo',
      lastName: 'Boo',
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
    expect(document.activeElement).not.toBe(inputs.at(0).getDOMNode());
    expect(document.activeElement).toBe(inputs.at(1).getDOMNode());
  });

  test('autofocus active', () => {
    const uischema: ControlElement = {
      type: 'Control',
      scope: '#/properties/name',
      options: {
        focus: true,
        multi: true,
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
    const input = wrapper.find('textarea').getDOMNode();
    expect(document.activeElement).toBe(input);
  });

  test('autofocus inactive', () => {
    const uischema: ControlElement = {
      type: 'Control',
      scope: '#/properties/name',
      options: {
        focus: false,
        multi: true,
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
    const input = wrapper.find('textarea').getDOMNode() as HTMLInputElement;
    expect(input.autofocus).toBe(false);
  });

  test('autofocus inactive by default', () => {
    const uischema: ControlElement = {
      type: 'Control',
      scope: '#/properties/name',
      options: { multi: true },
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
    const input = wrapper.find('textarea').getDOMNode() as HTMLInputElement;
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
    console.log(wrapper.html());
    const textarea = wrapper.find('textarea').getDOMNode() as HTMLTextAreaElement;
    expect(textarea.value).toBe('Foo');
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

    const textarea = wrapper.find('textarea');
    textarea.simulate('change', { target: { value: 'Bar' } });
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ data: { name: 'Bar' } }));
  });

  test('update via action', () => {
    wrapper = mount(
      <JsonForms
        schema={fixture.schema}
        uischema={fixture.uischema}
        data={fixture.data}
        renderers={SpectrumRenderers}
        cells={cells}
      />
    );
    wrapper.setProps({ data: { ...fixture.data, name: 'Bar' } });
    wrapper.update();
    const textarea = wrapper.find('textarea').getDOMNode() as HTMLTextAreaElement;
    expect(textarea.value).toBe('Bar');
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
    const textArea = wrapper.find('textarea').getDOMNode() as HTMLTextAreaElement;
    wrapper.setProps({ data: { ...fixture.data, name: undefined } });
    wrapper.update();
    expect(textArea.value).toBe('');
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
    wrapper.setProps({ data: { ...fixture.data, name: null } });
    wrapper.update();
    const textArea = wrapper.find('textarea').getDOMNode() as HTMLTextAreaElement;
    expect(textArea.value).toBe('');
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
    wrapper.setProps({ data: { ...fixture.data, firstname: 'Bar' } });
    wrapper.update();
    const textArea = wrapper.find('textarea').getDOMNode() as HTMLTextAreaElement;
    expect(textArea.value).toBe('Foo');
  });

  test('disable', () => {
    const condition: SchemaBasedCondition = {
      scope: '#/properties/name',
      schema: { type: 'string' },
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
    const textArea = wrapper.find('textarea').getDOMNode() as HTMLTextAreaElement;
    expect(textArea.disabled).toBe(true);
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
    const textArea = wrapper.find('textarea').getDOMNode() as HTMLTextAreaElement;
    expect(textArea.disabled).toBe(false);
  });
});

describe('Text area cell tester', () => {
  test('tester', () => {
    expect(SpectrumTextAreaCellTester(undefined, undefined)).toBe(-1);
    expect(SpectrumTextAreaCellTester(null, undefined)).toBe(-1);
    expect(SpectrumTextAreaCellTester({ type: 'Foo' }, undefined)).toBe(-1);
    expect(SpectrumTextAreaCellTester({ type: 'Control' }, undefined)).toBe(-1);
    expect(
      SpectrumTextAreaCellTester({ type: 'Control', options: { multi: true } }, undefined)
    ).toBe(2);
  });
});
