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
  JsonFormsCellRendererRegistryEntry,
  JsonSchema,
  RuleEffect,
  SchemaBasedCondition,
} from '@jsonforms/core';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { spectrumTableArrayControlTester } from '../../src/complex/SpectrumTableArrayControl';
import SpectrumIntegerCell, {
  spectrumIntegerCellTester,
} from '../../src/cells/SpectrumIntegerCell';
import { renderForm } from '../util';

const fixture: { schema: JsonSchema; uischema: ControlElement; data: any } = {
  schema: {
    type: 'object',
    properties: {
      test: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            x: { type: 'integer' },
            y: { type: 'integer' },
          },
        },
      },
    },
  },
  uischema: {
    type: 'Control',
    scope: '#/properties/test',
  },
  data: {
    test: [{ x: 1, y: 3 }],
  },
};

describe('Table array tester', () => {
  test('tester with recursive document ref only', () => {
    const control: ControlElement = {
      type: 'Control',
      scope: '#',
    };
    expect(spectrumTableArrayControlTester(control, undefined)).toBe(-1);
  });

  test('tester with prop of wrong type', () => {
    const control: ControlElement = {
      type: 'Control',
      scope: '#/properties/x',
    };
    expect(
      spectrumTableArrayControlTester(control, {
        type: 'object',
        properties: {
          x: { type: 'integer' },
        },
      })
    ).toBe(-1);
  });

  test('tester with correct prop type, but without items', () => {
    const control: ControlElement = {
      type: 'Control',
      scope: '#/properties/foo',
    };
    expect(
      spectrumTableArrayControlTester(control, {
        type: 'object',
        properties: {
          foo: { type: 'array' },
        },
      })
    ).toBe(-1);
  });

  test('tester with correct prop type, but different item types', () => {
    const control: ControlElement = {
      type: 'Control',
      scope: '#/properties/foo',
    };
    expect(
      spectrumTableArrayControlTester(control, {
        type: 'object',
        properties: {
          foo: {
            type: 'array',
            items: [{ type: 'integer' }, { type: 'string' }],
          },
        },
      })
    ).toBe(-1);
  });

  test('tester with primitive item type', () => {
    const control: ControlElement = {
      type: 'Control',
      scope: '#/properties/foo',
    };
    expect(
      spectrumTableArrayControlTester(control, {
        type: 'object',
        properties: {
          foo: {
            type: 'array',
            items: { type: 'integer' },
          },
        },
      })
    ).toBe(3);
  });

  test('tester', () => {
    const uischema: ControlElement = {
      type: 'Control',
      scope: '#/properties/test',
    };

    expect(spectrumTableArrayControlTester(uischema, fixture.schema)).toBe(3);
  });

  test('tester - wrong type', () =>
    expect(spectrumTableArrayControlTester({ type: 'Foo' }, null)).toBe(-1));
});

describe('Table array control', () => {
  let offsetWidth: any;
  let offsetHeight: any;

  beforeEach(() => {
    // by firing an event at the beginning of each test, we can put ourselves into
    // keyboard modality for the test
  });
  beforeAll(() => {
    offsetWidth = jest
      .spyOn(window.HTMLElement.prototype, 'clientWidth', 'get')
      .mockImplementation(() => 1000);
    offsetHeight = jest
      .spyOn(window.HTMLElement.prototype, 'clientHeight', 'get')
      .mockImplementation(() => 1000);
    jest
      .spyOn(window, 'requestAnimationFrame')
      .mockImplementation((cb: any) => cb());
    jest.useFakeTimers();
  });

  afterAll(() => {
    offsetWidth.mockReset();
    offsetHeight.mockReset();
    jest.useRealTimers();
  });

  test('render two children', () => {
    const cells: JsonFormsCellRendererRegistryEntry[] = [
      {
        tester: spectrumIntegerCellTester,
        cell: SpectrumIntegerCell,
      },
    ];

    const { container, getAllByRole } = renderForm(
      fixture.uischema,
      fixture.schema,
      fixture.data,
      cells
    );

    expect(container.querySelector('header h4').textContent).toBe('Test');

    // TODO: test that tooltip on the button reads "add to test"

    // two data columns + delete column
    const columnHeaders = getAllByRole('columnheader');
    expect(columnHeaders).toHaveLength(3);
    expect(columnHeaders[0].textContent).toBe('X');
    expect(columnHeaders[1].textContent).toBe('Y');
    expect(columnHeaders[2].textContent.trim()).toBe('');

    const rows = getAllByRole('row');
    expect(rows).toHaveLength(2);
  });

  test('render empty data', () => {
    const control: ControlElement = {
      label: false,
      type: 'Control',
      scope: '#/properties/test',
    };
    const { container, getAllByRole } = renderForm(control, fixture.schema);
    expect(container.querySelector('header h4').textContent).toBe('');

    // TODO: test that tooltip on the button reads "add to test"

    const columnHeaders = getAllByRole('columnheader');
    expect(columnHeaders).toHaveLength(3);
    expect(columnHeaders[0].textContent).toBe('X');
    expect(columnHeaders[1].textContent).toBe('Y');
    expect(columnHeaders[2].textContent.trim()).toBe('');

    const rows = getAllByRole('row');
    expect(rows).toHaveLength(2);

    expect(rows.map((r) => r.textContent.trim())).toContain('No data');
  });

  test('render new child (empty init data)', () => {
    const initialData: { test: object[] } = { test: [] };
    let state: object[] = [];

    const { container } = renderForm(
      fixture.uischema,
      fixture.schema,
      initialData,
      [],
      ({ data }) => {
        state = data.test;
      }
    );

    const control = container.querySelector('.root_properties_test');
    expect(control).toBeDefined();

    const button = container.querySelector('.add-button');
    userEvent.click(button);
    expect(state).toHaveLength(1);
  });

  test('render new child (undefined data)', () => {
    const initialData: { test: object[] } = { test: undefined };
    let state: object[] = [];

    const { container } = renderForm(
      fixture.uischema,
      fixture.schema,
      initialData,
      [],
      ({ data }) => {
        state = data.test;
      }
    );

    const control = container.querySelector('.root_properties_test');
    expect(control).toBeDefined();

    const button = container.querySelector('.add-button');
    userEvent.click(button);
    expect(state).toHaveLength(1);
  });

  test('render new child (null data)', () => {
    const initialData: { test: object[] } = null;
    let state: object[] = [];

    const { container } = renderForm(
      fixture.uischema,
      fixture.schema,
      initialData,
      [],
      ({ data }) => {
        state = data.test;
      }
    );

    const control = container.querySelector('.root_properties_test');
    expect(control).toBeDefined();

    const button = container.querySelector('.add-button');
    userEvent.click(button);
    expect(state).toHaveLength(1);
  });

  test('render new child', () => {
    const initialData: { test: object[] } = fixture.data;
    let state: object[] = [];

    const { container } = renderForm(
      fixture.uischema,
      fixture.schema,
      initialData,
      [],
      ({ data }) => {
        state = data.test;
      }
    );

    const button = container.querySelector('.add-button');
    userEvent.click(button);
    expect(state).toHaveLength(2);
  });

  test('render primitives ', () => {
    const schema = {
      type: 'object',
      properties: {
        test: {
          type: 'array',
          items: {
            type: 'string',
            maxLength: 3,
          },
        },
      },
    };
    const uischema: ControlElement = {
      type: 'Control',
      scope: '#/properties/test',
    };

    const data: { test: string[] } = { test: ['foo', 'bars'] };

    const { container, getAllByRole } = renderForm(uischema, schema, data);

    const cells = container.querySelectorAll('[aria-colindex="1"]');
    const cell = cells[cells.length - 1];
    expect(cell.textContent).toContain(
      'should NOT be longer than 3 characters'
    );

    const rows = getAllByRole('row');
    expect(rows).toHaveLength(3);
  });

  test('hide', () => {
    const condition: SchemaBasedCondition = {
      scope: '',
      schema: {},
    };
    const uischema = {
      type: 'Control',
      scope: '#/properties/test',
      rule: {
        effect: RuleEffect.HIDE,
        condition,
      },
    };
    const { container } = renderForm(uischema, fixture.schema, fixture.data);

    const tableView = container.querySelector(
      '.spectrum-table-array-control'
    ) as HTMLElement;
    expect(tableView.hidden).toBeTruthy();
  });

  test('show by default', () => {
    const { container } = renderForm(
      fixture.uischema,
      fixture.schema,
      fixture.data
    );

    const tableView = container.querySelector(
      '.spectrum-table-array-control'
    ) as HTMLElement;
    expect(tableView.hidden).toBeFalsy();
  });

  describe('uischema.options.addButtonPosition', () => {
    test.each([
      [undefined, 'top'],
      ['top', 'top'],
      ['bottom', 'bottom'],
      ['foobar', 'top'],
    ])(
      'when option is %s, render Add button on %s',
      (value: string | undefined, expectedPosition: 'top' | 'bottom') => {
        const { container } = renderForm(
          {
            ...fixture.uischema,
            options: { addButtonPosition: value },
          },
          fixture.schema,
          fixture.data
        );
        const tablePosition = container.innerHTML.indexOf('spectrum-Table');
        const addButtonPosition = container.innerHTML.indexOf('add-button');
        if (expectedPosition === 'bottom') {
          expect(addButtonPosition).toBeGreaterThan(tablePosition);
        } else {
          expect(addButtonPosition).toBeLessThan(tablePosition);
        }
      }
    );
  });

  describe('uischema.options.addButtonLabel', () => {
    const uischema = {
      ...fixture.uischema,
      options: {
        addButtonLabelType: 'inline',
      },
    };
    test('when option is not set, should render the default label', () => {
      const { container } = renderForm(uischema, fixture.schema, fixture.data);
      expect(container.querySelector('.add-button').textContent).toBe(
        'Add to Test'
      );
    });

    test('when option is set, should render it', () => {
      const label = 'increase the count of items';
      const uischemaWithLabel = {
        ...uischema,
        options: { ...uischema.options, addButtonLabel: label },
      };
      const { container } = renderForm(
        uischemaWithLabel,
        fixture.schema,
        fixture.data
      );
      expect(container.querySelector('.add-button').textContent).toBe(label);
    });
  });
});

describe('validations messages', () => {
  test('single error', () => {
    const data = { test: 2 };
    const { getByRole } = renderForm(fixture.uischema, fixture.schema, data);

    expect(
      getByRole('button', { name: /error-indicator/ })
    ).toBeInTheDocument();
  });

  test('empty errors by default', () => {
    const { getByRole } = renderForm(
      fixture.uischema,
      fixture.schema,
      fixture.data
    );

    expect(() => {
      getByRole('button', { name: /error-indicator/ });
    }).toThrow();
  });
});
