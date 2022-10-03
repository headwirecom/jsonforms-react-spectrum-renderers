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

import { fireEvent } from '@testing-library/dom';
import { clone } from 'lodash';
import { renderForm } from '../util';

const fixture = {
  data: {
    comments: [
      {
        message1: 'example',
        message2: 'example2',
      },
      {
        message1: 'booohay1',
        message2: 'booohay2',
      },
    ],
  },
  schema: {
    type: 'object',
    properties: {
      comments: {
        type: 'array',
        title: 'Messages',
        items: {
          type: 'object',
          properties: {
            message1: {
              type: 'string',
            },
            message2: {
              type: 'string',
            },
          },
        },
      },
    },
  },
  uischema: {
    type: 'VerticalLayout',
    elements: [
      {
        type: 'Control',
        scope: '#/properties/comments',
        options: {
          detail: {
            type: 'VerticalLayout',
            elements: [
              {
                type: 'Control',
                scope: '#/properties/message1',
              },
              {
                type: 'Control',
                scope: '#/properties/message2',
              },
            ],
          },
        },
      },
    ],
  },
};

describe('SpectrumArrayControlRenderer', () => {
  test('render', () => {
    const { getByRole, getByText } = renderForm(fixture.uischema, fixture.schema, fixture.data);
    const button1 = getByRole('button', { name: /delete-item-example/ });
    const button2 = getByRole('button', { name: /delete-item-booohay1/ });
    const heading1 = getByText('example');

    expect(button1).toBeDefined();
    expect(button2).toBeDefined();
    expect(heading1).toBeDefined();
    expect(heading1.tagName).toBe('SPAN');
  });

  test('expand details', () => {
    const { getAllByRole, getByLabelText } = renderForm(
      fixture.uischema,
      fixture.schema,
      fixture.data
    );
    const expandButtons = getAllByRole('button', {
      name: /expand-item-example/,
    });

    // form should not be displayed yet
    expect(() => getByLabelText(/Message 1/)).toThrow();

    expandButtons[0].click();

    const input = getByLabelText(/Message 1/) as HTMLInputElement;

    expect(input).toBeDefined();
    expect(input.value).toEqual('example');
  });

  test('change heading label', () => {
    const { getAllByRole, getByLabelText, getByText } = renderForm(
      fixture.uischema,
      fixture.schema,
      fixture.data
    );
    const expandButtons = getAllByRole('button', {
      name: /expand-item-example/,
    });

    expandButtons[0].click();

    const input = getByLabelText(/Message 1/) as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'New Title' } });

    const heading1 = getByText('New Title');

    expect(heading1).toBeDefined();
    expect(heading1.tagName).toBe('SPAN');
    expect(heading1.parentElement.tagName).toBe('BUTTON');
  });

  test('with elementLabelProp', () => {
    const localUiSchema = clone(fixture.uischema);
    (localUiSchema.elements[0].options as any).elementLabelProp = 'message2';

    const { getByText } = renderForm(fixture.uischema, fixture.schema, fixture.data);
    const heading1 = getByText('example2');

    expect(heading1).toBeDefined();
    expect(heading1.tagName).toBe('SPAN');
    expect(heading1.parentElement.tagName).toBe('BUTTON');
  });
});
