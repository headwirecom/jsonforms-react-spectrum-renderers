/*
  The MIT License

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
import { RuleEffect, SchemaBasedCondition } from '@jsonforms/core';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { SpectrumListWithDetailTester } from '../../src';
import { renderForm } from '../util';

const data = [
  {
    message: 'El Barto was here',
    done: true,
  },
  {
    message: 'Yolo',
  },
];
const schema = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      message: {
        type: 'string',
        maxLength: 3,
        title: 'Schema Title',
      },
      done: {
        type: 'boolean',
      },
    },
  },
};

const uischema: any = {
  type: 'ListWithDetail',
  scope: '#',
};

const nestedSchema = {
  type: 'array',
  items: {
    ...schema,
  },
};

const nestedSchema2 = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      objectarrayofstrings: {
        type: 'object',
        properties: {
          choices: {
            type: 'array',
            items: {
              type: 'string',
            },
          },
        },
      },
    },
  },
};

describe('Spectrum list with detail tester', () => {
  test('should only be applicable for intermediate array or when containing proper options', () => {
    const wrongUISchema = {
      type: 'array',
      scope: '#',
    };
    const wrongSchema = {
      type: 'array',
      items: {
        type: 'string',
      },
    };
    expect(SpectrumListWithDetailTester(wrongUISchema, schema)).toBe(-1);
    expect(SpectrumListWithDetailTester(uischema, wrongSchema)).toBe(-1);
    expect(SpectrumListWithDetailTester(uischema, schema)).toBe(4);
    expect(SpectrumListWithDetailTester(uischema, nestedSchema)).toBe(-1);
    expect(SpectrumListWithDetailTester(uischema, nestedSchema2)).toBe(4);
  });
});

describe('Spectrum List With Detail Renderer', () => {
  test('should render two list entires', () => {
    const { getByRole } = renderForm(uischema, schema, data);
    const item1 = getByRole('button', { name: /select-item-Yolo/ });
    const item2 = getByRole('button', {
      name: /select-item-El Barto was here/,
    });

    expect(item1).toBeInTheDocument();
    expect(item2).toBeInTheDocument();
  });
  test('should indicate that there is no data', () => {
    const { getByText } = renderForm(uischema, schema, {});
    expect(getByText('No data')).toBeInTheDocument();
  });

  test('should be hidden', () => {
    const condition: SchemaBasedCondition = {
      scope: '',
      schema: {},
    };

    const uischemaHiddenControl: any = {
      ...uischema,
      rule: {
        effect: RuleEffect.HIDE,
        condition,
      },
    };
    const { container } = renderForm(uischemaHiddenControl, schema, data);
    const control = container.firstElementChild.firstElementChild as HTMLElement;
    expect(control.hidden).toBeTruthy();
  });

  test('select renders data in detail', () => {
    const { getByRole } = renderForm(uischema, schema, data);

    const button = getByRole('button', { name: /select-item-Yolo/ });
    userEvent.click(button);

    const input = getByRole('textbox', { name: /Schema Title/ });

    expect(input).toHaveAttribute('value', 'Yolo');
  });

  test('should use ui schema label for list heading', () => {
    const uischemaWithLabel = {
      ...uischema,
      label: 'My awesome label',
    };

    const { getByRole } = renderForm(uischemaWithLabel, schema, data);

    const heading = getByRole('heading', { name: 'My awesome label' });

    expect(heading).toBeInTheDocument();
  });

  test('should use schema with title for list heading', () => {
    const titleSchema = {
      ...schema,
      title: 'My awesome title',
    };

    const { getByRole } = renderForm(uischema, titleSchema, data);

    const heading = getByRole('heading', { name: 'My awesome title' });

    expect(heading).toBeInTheDocument();
  });

  test('choose appropriate labels in nested schema', () => {
    const { getByRole } = renderForm(uischema, schema, data);

    const button = getByRole('button', { name: /select-item-Yolo/ });
    userEvent.click(button);
    const label = getByRole('textbox', { name: /Schema Title/ });
    expect(label).toBeInTheDocument();
  });

  test('add data to the array', () => {
    const { getByRole, getAllByRole } = renderForm(uischema, schema, data);
    expect(getAllByRole('button', { name: /select-item/ })).toHaveLength(2);
    const addButton = getByRole('button', { name: /add/ });

    userEvent.click(addButton);
    expect(getAllByRole('button', { name: /select-item/ })).toHaveLength(3);
  });

  test('remove data from the array', () => {
    const { getByRole, getAllByRole } = renderForm(uischema, schema, data);
    expect(getAllByRole('button', { name: /select-item/ })).toHaveLength(2);

    const deleteYoloButton = getByRole('button', { name: /delete-item-Yolo/ });
    userEvent.click(deleteYoloButton);

    const confirmButton = getByRole('button', { name: 'Delete' });

    userEvent.click(confirmButton);

    expect(getAllByRole('button', { name: /select-item/ })).toHaveLength(1);
  });
});
