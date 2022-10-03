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
import userEvent from '@testing-library/user-event';
import {
  ControlElement,
  JsonFormsCellRendererRegistryEntry,
  JsonSchema,
  RuleEffect,
  SchemaBasedCondition,
} from '@jsonforms/core';
import { SpectrumArrayControlGridTester } from '../../src/complex/SpectrumArrayControlGrid';
import SpectrumIntegerCell, {
  SpectrumIntegerCellTester,
} from '../../src/cells/SpectrumIntegerCell';
import SpectrumTextCell, { SpectrumTextCellTester } from '../../src/cells/SpectrumTextCell';
import { renderForm } from '../util';

jest.mock('../../src/complex/SpectrumTableArrayControl', () => ({
  ...jest.requireActual('../../src/complex/SpectrumTableArrayControl'),
  __esModule: true,
  default: () => {
    throw new Error(
      'Not allowed to use SpectrumTableArrayControl from SpectrumArrayControlGrid test! Make sure options.table is false in your test.'
    );
  },
}));

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

describe('Array tester', () => {
  test('tester with recursive document ref only', () => {
    const control: ControlElement = {
      type: 'Control',
      scope: '#',
    };
    expect(SpectrumArrayControlGridTester(control, undefined)).toBe(-1);
  });

  test('tester with prop of wrong type', () => {
    const control: ControlElement = {
      type: 'Control',
      scope: '#/properties/x',
    };
    expect(
      SpectrumArrayControlGridTester(control, {
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
      SpectrumArrayControlGridTester(control, {
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
      SpectrumArrayControlGridTester(control, {
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

  test.each([
    [undefined, 3],
    [{}, 3],
    [{ table: false }, 3],
    [{ table: true }, -1],
  ])('tester with primitive item type and options: %s', (options, expected) => {
    const control: ControlElement = {
      type: 'Control',
      scope: '#/properties/foo',
      options,
    };
    expect(
      SpectrumArrayControlGridTester(control, {
        type: 'object',
        properties: {
          foo: {
            type: 'array',
            items: { type: 'integer' },
          },
        },
      })
    ).toBe(expected);
  });

  test.each([
    [undefined, 3],
    [{}, 3],
    [{ table: false }, 3],
    [{ table: true }, -1],
  ])('tester with options: %s', (options, expected) => {
    const uischema: ControlElement = {
      type: 'Control',
      scope: '#/properties/test',
      options,
    };

    expect(SpectrumArrayControlGridTester(uischema, fixture.schema)).toBe(expected);
  });

  test('tester - wrong type', () =>
    expect(SpectrumArrayControlGridTester({ type: 'Foo', options: { table: true } }, null)).toBe(
      -1
    ));
});

describe('Array control', () => {
  let offsetWidth: any;
  let offsetHeight: any;

  beforeAll(() => {
    offsetWidth = jest
      .spyOn(window.HTMLElement.prototype, 'clientWidth', 'get')
      .mockImplementation(() => 1000);
    offsetHeight = jest
      .spyOn(window.HTMLElement.prototype, 'clientHeight', 'get')
      .mockImplementation(() => 1000);
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb: any) => cb());
    jest.useFakeTimers();
  });

  afterAll(() => {
    offsetWidth.mockReset();
    offsetHeight.mockReset();
    jest.useRealTimers();
  });

  test('render headers and 2 rows', () => {
    const cells: JsonFormsCellRendererRegistryEntry[] = [
      {
        tester: SpectrumIntegerCellTester,
        cell: SpectrumIntegerCell,
      },
    ];

    const { container } = renderForm(
      fixture.uischema,
      fixture.schema,
      {
        test: [
          { x: 9, y: 8 },
          { x: 7, y: 6 },
        ],
      },
      cells
    );

    expect(container.querySelector('header h4').textContent).toBe('Test');
    expect(getContent(container)).toContain('TestXY9876');
  });

  test('render empty data', () => {
    const control: ControlElement = {
      label: false,
      type: 'Control',
      scope: '#/properties/test',
    };
    const { container } = renderForm(control, fixture.schema);
    expect(getContent(container)).toBe('');
  });

  test.each([{ test: [] }, { test: undefined }, null])(
    'render new child when initial data is %s',
    (initialData) => {
      const { container } = renderForm(fixture.uischema, fixture.schema, initialData, [
        {
          tester: SpectrumIntegerCellTester,
          cell: SpectrumIntegerCell,
        },
      ]);

      expect(getContent(container)).not.toContain('XY'); // Headers not visible
      expect(container.querySelectorAll('input').length).toBe(0); // No inputs visible

      userEvent.click(container.querySelector('.add-button'));

      expect(getContent(container)).toContain('XY'); // Headers appeared
      expect(container.querySelectorAll('input').length).toBe(2); // Inputs appeared
    }
  );

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

  test('render primitives', () => {
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

    const { container } = renderForm(uischema, schema, { test: ['foo', 'bars'] }, [
      {
        tester: SpectrumTextCellTester,
        cell: SpectrumTextCell,
      },
    ]);
    const content = getContent(container);
    expect(content).toContain('foobars');
    expect(content.match(/should NOT be longer than 3 characters/gi)).toHaveLength(1);
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
    const view: HTMLElement = container.firstChild.firstChild as HTMLElement;
    expect(view.hidden).toBe(true);
  });

  test('show by default', () => {
    const { container } = renderForm(fixture.uischema, fixture.schema, fixture.data);

    const view: HTMLElement = container.firstChild.firstChild as HTMLElement;
    expect(view.hidden).toBe(false);
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
        const gridPosition = container.innerHTML.indexOf('display: grid');
        const addButtonPosition = container.innerHTML.indexOf('add-button');
        if (expectedPosition === 'bottom') {
          expect(addButtonPosition).toBeGreaterThan(gridPosition);
        } else {
          expect(addButtonPosition).toBeLessThan(gridPosition);
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
      expect(container.querySelector('.add-button').textContent).toBe('Add to Test');
    });

    test('when option is set, should render it', () => {
      const label = 'increase the count of items';
      const uischemaWithLabel = {
        ...uischema,
        options: { ...uischema.options, addButtonLabel: label },
      };
      const { container } = renderForm(uischemaWithLabel, fixture.schema, fixture.data);
      expect(container.querySelector('.add-button').textContent).toBe(label);
    });
  });
});

describe('validations messages', () => {
  test('single error', () => {
    const data = { test: 2 };
    const { getByRole } = renderForm(fixture.uischema, fixture.schema, data);

    expect(getByRole('button', { name: /error-indicator/ })).toBeInTheDocument();
  });

  test('empty errors by default', () => {
    const { getByRole } = renderForm(fixture.uischema, fixture.schema, fixture.data);

    expect(() => {
      getByRole('button', { name: /error-indicator/ });
    }).toThrow();
  });
});

function getContent(container: Element) {
  return (
    container.textContent +
    Array.from(container.querySelectorAll<HTMLInputElement>('input[value]'))
      .map((el) => el.value)
      .join('') +
    Array.from(container.querySelectorAll('[aria-label]'))
      .map((el) => el.getAttribute('aria-label'))
      .join('')
  );
}
