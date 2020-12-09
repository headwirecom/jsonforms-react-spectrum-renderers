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
import {
  spectrumTimeCellTester,
} from '../../src/cells/SpectrumTimeCell';
import { renderForm } from '../util';
import { act } from 'react-dom/test-utils';
import { fireEvent } from '@testing-library/react';


const controlElement: ControlElement = {
  type: 'Control',
  scope: '#/properties/foo',
};

const fixture = {
  data: { foo: '13:37' },
  schema: {
    type: 'string',
    format: 'time',
  },
  uischema: controlElement,
};

describe('Time cell tester', () => {
  test('tester', () => {
    expect(spectrumTimeCellTester(undefined, undefined)).toBe(-1);
    expect(spectrumTimeCellTester(null, undefined)).toBe(-1);
    expect(spectrumTimeCellTester({ type: 'Foo' }, undefined)).toBe(-1);
    expect(spectrumTimeCellTester({ type: 'Control' }, undefined)).toBe(-1);
  });

  test('tester with wrong prop type', () => {
    expect(
      spectrumTimeCellTester(fixture.uischema, {
        type: 'object',
        properties: {
          foo: { type: 'string' },
        },
      })
    ).toBe(-1);
  });

  test('tester with wrong prop type, but sibling has correct one', () => {
    expect(
      spectrumTimeCellTester(fixture.uischema, {
        type: 'object',
        properties: {
          foo: { type: 'string' },
          bar: {
            type: 'string',
            format: 'time',
          },
        },
      })
    ).toBe(-1);
  });

  test('tester with correct prop type', () => {
    expect(
      spectrumTimeCellTester(fixture.uischema, {
        type: 'object',
        properties: {
          foo: {
            type: 'string',
            format: 'time',
          },
        },
      })
    ).toBe(4);
  });
});

describe('Time cell', () => {
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

  // TODO: time input does not seem to work yet
  test.skip('render', () => {
    const {getByRole} = renderForm(fixture.uischema, fixture.schema, fixture.data);
    let combobox = getByRole('combobox');
    expect(combobox).toHaveTextContent(`13:37`); // controlled

  });

    // TODO: time input does not seem to work yet
  test('update via event', () => {

    const {getByRole, getAllByRole} = renderForm(fixture.uischema, fixture.schema);

    const combobox = getByRole("combobox");
    const segments = getAllByRole('spinbutton');
    expect(segments.length).toBe(2);

    act(() => segments[0].focus());
    fireEvent.keyDown(document.activeElement, {key: '2'});
    fireEvent.keyDown(document.activeElement, {key: '0'});
    expect(segments[1]).toHaveFocus();
    fireEvent.keyDown(document.activeElement, {key: '1'});
    fireEvent.keyDown(document.activeElement, {key: '5'});

    expect(combobox).toHaveTextContent('20:15');
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
