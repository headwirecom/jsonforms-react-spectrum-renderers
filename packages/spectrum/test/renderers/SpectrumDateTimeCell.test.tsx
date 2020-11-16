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
import {
  ControlElement,
  HorizontalLayout,
  JsonSchema,
  RuleEffect,
  SchemaBasedCondition,
} from '@jsonforms/core';
import  {
  spectrumDateTimeCellTester,
} from '../../src/cells/SpectrumDateTimeCell';
import { renderForm } from '../util';
import { act, fireEvent } from '@testing-library/react';


const control: ControlElement = {
  type: 'Control',
  scope: '#/properties/foo',
};

const fixture = {
  data: { foo: '1980-04-04T13:37:00.000Z' },
  schema: {
    type: 'string',
    format: 'date-time',
  },
  uischema: control,
};

describe('Date time cell tester', () => {
  test('tester', () => {
    expect(spectrumDateTimeCellTester(undefined, undefined)).toBe(-1);
    expect(spectrumDateTimeCellTester(null, undefined)).toBe(-1);
    expect(spectrumDateTimeCellTester({ type: 'Foo' }, undefined)).toBe(-1);
    expect(spectrumDateTimeCellTester({ type: 'Control' }, undefined)).toBe(-1);
  });

  test('tester with wrong prop type', () => {
    expect(
      spectrumDateTimeCellTester(fixture.uischema, {
        type: 'object',
        properties: {
          foo: { type: 'string' },
        },
      })
    ).toBe(-1);
  });

  test('tester with wrong prop type, but sibling has correct one', () => {
    expect(
      spectrumDateTimeCellTester(fixture.uischema, {
        type: 'object',
        properties: {
          foo: { type: 'string' },
          bar: {
            type: 'string',
            format: 'date-time',
          },
        },
      })
    ).toBe(-1);
  });

  test('tester with correct prop type', () => {
    expect(
      spectrumDateTimeCellTester(fixture.uischema, {
        type: 'object',
        properties: {
          foo: {
            type: 'string',
            format: 'date-time',
          },
        },
      })
    ).toBe(2);
  });
});

describe('date time cell', () => {

  test.skip('autofocus on first element', () => {
    const schema: JsonSchema = {
      type: 'object',
      properties: {
        firstDate: { type: 'string', format: 'date-time' },
        secondDate: { type: 'string', format: 'date-time' },
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
      firstDate: '1980-04-04T13:37:00.000Z',
      secondDate: '1980-04-04T13:37:00.000Z',
    };
    const {getAllByRole } = renderForm(uischema, schema, data);
    const segments = getAllByRole('spinbutton');
    expect(segments[0]).toHaveFocus();
  });

  test('autofocus active', () => {
    const uischema: ControlElement = {
      type: 'Control',
      scope: '#/properties/foo',
      options: {
        focus: true,
      },
    };

    const {getAllByRole} = renderForm(uischema, fixture.schema);
    const segments = getAllByRole("spinbutton");
    expect(segments[0]).toHaveFocus();
  });

  test('autofocus inactive', () => {
    const uischema: ControlElement = {
      type: 'Control',
      scope: '#/properties/foo',
      options: {
        focus: false,
      },
    };
    const {getAllByRole } = renderForm(uischema, fixture.schema);
    const segments = getAllByRole("spinbutton");
    expect(segments[0]).not.toHaveFocus();
  });

  test('autofocus inactive by default', () => {
    const uischema: ControlElement = {
      type: 'Control',
      scope: '#/properties/foo',
    };
    const {getAllByRole} = renderForm(uischema, fixture.schema);
    const segments = getAllByRole("spinbutton");
    expect(segments[0]).not.toHaveFocus();
  });

  // TODO: date-time does not seem to work yet
  test.skip('render', () => {
    const {getByRole} = renderForm(fixture.uischema, fixture.schema, fixture.data);
    let combobox = getByRole('combobox');
    expect(combobox).toHaveTextContent(`4/4/1980T13:37`); // controlled
  });

 
  // TODO: date-time does not seem to work yet
  test.skip('update via event', () => {

    const {getByRole, getAllByRole} = renderForm(fixture.uischema, fixture.schema);

    const combobox =getByRole("combobox");
    const segments = getAllByRole('spinbutton');
    expect(segments.length).toBe(3);

    act(() => segments[0].focus());
    fireEvent.keyDown(document.activeElement, {key: '4'});
    expect(segments[1]).toHaveFocus();
    expect(combobox).toHaveTextContent(`4/1/${new Date().getFullYear()}`);

    fireEvent.keyDown(document.activeElement, {key: '1'});
    fireEvent.keyDown(document.activeElement, {key: '2'});
    expect(segments[2]).toHaveFocus();
    expect(combobox).toHaveTextContent(`4/12/${new Date().getFullYear()}`);

    fireEvent.keyDown(document.activeElement, {key: '1'});
    fireEvent.keyDown(document.activeElement, {key: '9'});
    fireEvent.keyDown(document.activeElement, {key: '6'});
    fireEvent.keyDown(document.activeElement, {key: '1'});
    expect(segments[3]).toHaveFocus();
    fireEvent.keyDown(document.activeElement, {key: '2'});
    fireEvent.keyDown(document.activeElement, {key: '0'});
    expect(segments[4]).toHaveFocus();
    fireEvent.keyDown(document.activeElement, {key: '1'});
    fireEvent.keyDown(document.activeElement, {key: '0⁵'});
    expect(combobox).toHaveTextContent('4/12/1961 20:15');
  });

  
  test('disable', () => {
    const condition: SchemaBasedCondition = {
      scope: '',
      schema: {},
    };

    const uischema = {
      type: 'Control',
      scope: '#/properties/foo',
      rule: {
        effect: RuleEffect.DISABLE,
        condition,
      },
    };

    const {getByRole} = renderForm(uischema, fixture.schema);
    const combobox = getByRole("combobox");
    expect(combobox).toHaveAttribute('aria-disabled');
    
  });

  test('enabled by default', () => {
    const {getByRole} = renderForm(fixture.uischema, fixture.schema);
    const combobox = getByRole("combobox");
    expect(combobox).not.toHaveAttribute("disabled");
  });
});
