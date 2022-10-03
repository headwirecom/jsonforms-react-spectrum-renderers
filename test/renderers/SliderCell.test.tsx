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

import '@testing-library/jest-dom';
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
import SpectrumSliderCell, { SpectrumSliderCellTester } from '../../src/cells/SpectrumSliderCell';
import { renderForm } from '../util';
import { fireEvent } from '@testing-library/dom';
import { SpectrumRenderers } from '../../src/index';
import { JsonForms } from '@jsonforms/react';

Enzyme.configure({ adapter: new Adapter() });

const controlElement: ControlElement = {
  type: 'Control',
  scope: '#/properties/foo',
};

const fixture = {
  data: { foo: 5 },
  schema: {
    type: 'number',
    maximum: 10,
    minimum: 2,
    default: 6,
  },
  uischema: controlElement,
};

const cells = [{ tester: SpectrumSliderCellTester, cell: SpectrumSliderCell }];

describe('Slider cell tester', () => {
  test('tester', () => {
    expect(SpectrumSliderCellTester(undefined, undefined)).toBe(-1);
    expect(SpectrumSliderCellTester(null, undefined)).toBe(-1);
    expect(SpectrumSliderCellTester({ type: 'Foo' }, undefined)).toBe(-1);
    expect(SpectrumSliderCellTester({ type: 'Control' }, undefined)).toBe(-1);
  });

  test('tester with wrong schema type', () => {
    const control: ControlElement = fixture.uischema;
    expect(
      SpectrumSliderCellTester(control, {
        type: 'object',
        properties: {
          foo: { type: 'string' },
        },
      })
    ).toBe(-1);
  });

  test('tester with wrong schema type, but sibling has correct one', () => {
    const control: ControlElement = fixture.uischema;
    expect(
      SpectrumSliderCellTester(control, {
        type: 'object',
        properties: {
          foo: { type: 'string' },
          bar: { type: 'number' },
        },
      })
    ).toBe(-1);
  });

  test('tester with correct schema type, but missing maximum and minimum cells', () => {
    const control: ControlElement = fixture.uischema;
    expect(
      SpectrumSliderCellTester(control, {
        type: 'object',
        properties: {
          foo: { type: 'number' },
        },
      })
    ).toBe(-1);
  });

  test('tester with correct schema type, but missing maximum', () => {
    expect(
      SpectrumSliderCellTester(fixture.uischema, {
        type: 'object',
        properties: {
          foo: {
            type: 'number',
            minimum: 2,
          },
        },
      })
    ).toBe(-1);
  });

  test('tester with correct schema type, but missing minimum', () => {
    expect(
      SpectrumSliderCellTester(fixture.uischema, {
        type: 'object',
        properties: {
          foo: {
            type: 'number',
            maximum: 10,
          },
        },
      })
    ).toBe(-1);
  });

  test('tester with matching schema type (number) without default', () => {
    expect(
      SpectrumSliderCellTester(fixture.uischema, {
        type: 'object',
        properties: {
          foo: {
            type: 'number',
            maximum: 10,
            minimum: 2,
          },
        },
      })
    ).toBe(-1);
  });

  test('tester with matching schema type (integer) without default', () => {
    expect(
      SpectrumSliderCellTester(fixture.uischema, {
        type: 'object',
        properties: {
          foo: {
            type: 'integer',
            maximum: 10,
            minimum: 2,
          },
        },
      })
    ).toBe(-1);
  });

  test('tester with matching schema type (number) with default', () => {
    const control: ControlElement = {
      ...fixture.uischema,
      options: { slider: true },
    };
    expect(
      SpectrumSliderCellTester(control, {
        type: 'object',
        properties: {
          foo: {
            type: 'number',
            maximum: 10,
            minimum: 2,
            default: 3,
          },
        },
      })
    ).toBe(4);
  });

  test('tester with matching schema type (integer) with default', () => {
    const control: ControlElement = fixture.uischema;
    control.options = { slider: true };
    expect(
      SpectrumSliderCellTester(control, {
        type: 'object',
        properties: {
          foo: {
            type: 'integer',
            maximum: 10,
            minimum: 2,
            default: 4,
          },
        },
      })
    ).toBe(4);
  });
});

describe('Slider cell', () => {
  let wrapper: ReactWrapper;

  // the react-spectrum slider does not support a focus propery
  test.skip('autofocus on first element', () => {
    const schema: JsonSchema = {
      type: 'object',
      properties: {
        firstSliderCell: { type: 'number', minimum: 5, maximum: 10 },
        secondSliderCell: { type: 'number', minimum: 5, maximum: 10 },
      },
    };
    const firstControlElement: ControlElement = {
      type: 'Control',
      scope: '#/properties/firstSliderCell',
      options: {
        focus: true,
      },
    };
    const secondControlElement: ControlElement = {
      type: 'Control',
      scope: '#/properties/secondSliderCell',
      options: {
        focus: true,
      },
    };
    const uischema: HorizontalLayout = {
      type: 'HorizontalLayout',
      elements: [firstControlElement, secondControlElement],
    };
    const data = {
      firstSliderCell: 3.14,
      secondSliderCell: 5.12,
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
    expect(document.activeElement).toBe(inputs.at(0).getDOMNode());
    expect(document.activeElement).toBe(inputs.at(1).getDOMNode());
    wrapper.unmount();
  });

  // the react-spectrum slider does not support a focus propery
  test.skip('autofocus active', () => {
    const uischema: ControlElement = {
      type: 'Control',
      scope: '#/properties/foo',
      options: { focus: true },
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
    expect(document.activeElement).toBe(input.getDOMNode());
    wrapper.unmount();
  });

  // the react-spectrum slider does not support a focus propery
  test.skip('autofocus inactive', () => {
    const uischema: ControlElement = {
      type: 'Control',
      scope: '#/properties/foo',
      options: { focus: false },
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
    wrapper.unmount();
  });

  // the react-spectrum slider does not support a focus propery
  test.skip('autofocus inactive by default', () => {
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
    expect(input.autofocus).toBe(false);
    wrapper.unmount();
  });

  test('render', () => {
    const schema: JsonSchema = {
      type: 'object',
      properties: {
        foo: {
          type: 'number',
          maximum: 10,
          minimum: 2,
          default: 6,
        },
      },
    };

    const { container } = renderForm(fixture.uischema, schema, { foo: 5 });

    const slider = container.querySelector('input');
    expect(slider.type).toBe('range');
    expect(slider.value).toBe('5');
  });

  test('update via input event', () => {
    const initialData: { foo: number } = { foo: 0 };
    let state: { foo: number };

    const { container } = renderForm(
      fixture.uischema,
      fixture.schema,
      initialData,
      [],
      ({ data }) => {
        state = data;
      }
    );
    const slider = container.querySelector('input');
    fireEvent.change(slider, { target: { value: 3 } });
    expect(state.foo).toBe(3);
  });

  // FIXME expect moves the slider and changes the value
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
    wrapper.setProps({ data: { ...fixture.data, foo: undefined } });
    const input = wrapper.find('input').getDOMNode() as HTMLInputElement;
    expect(input.value).toBe('');
  });

  // FIXME expect moves the slider and changes the value
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
    wrapper.setProps({ data: { ...fixture.data, foo: null } });
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
    const input = wrapper.find('input').getDOMNode() as HTMLInputElement;
    expect(input.value).toBe('5');
  });

  test('disable', () => {
    const condition: SchemaBasedCondition = {
      scope: '',
      schema: {},
    };

    const uischema: ControlElement = {
      type: 'Control',
      scope: '#/properties/foo',
      rule: {
        effect: RuleEffect.DISABLE,
        condition,
      },
    };
    const { container } = renderForm(uischema, fixture.schema, fixture.data);

    const input = container.querySelector('input');
    expect(input.disabled).toBe(true);
  });

  test('enabled by default', () => {
    const { container } = renderForm(fixture.uischema, fixture.schema, fixture.data);
    const input = container.querySelector('input');
    expect(input.disabled).toBe(false);
  });
});
