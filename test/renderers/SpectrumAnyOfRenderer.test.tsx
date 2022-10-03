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
import { ControlElement, RuleEffect, SchemaBasedCondition } from '@jsonforms/core';
import { renderForm, triggerPress } from '../util';
import { within } from '@testing-library/dom';

const waitForAsync = () => new Promise((resolve) => setImmediate(resolve));

describe('Spectrum anyOf renderer', () => {
  it('should add an item at correct path', () => {
    let state: any = undefined;
    const schema = {
      type: 'object',
      properties: {
        value: {
          anyOf: [
            {
              title: 'String',
              type: 'string',
            },
            {
              title: 'Number',
              type: 'number',
            },
          ],
        },
      },
    };
    const uischema: ControlElement = {
      type: 'Control',
      label: 'Value',
      scope: '#/properties/value',
    };

    const { container } = renderForm(
      uischema,
      schema,
      undefined,
      undefined,
      ({ data }) => (state = data)
    );

    const input = container.querySelector('input');
    userEvent.type(input, 'test');
    expect(state).toEqual({
      value: 'test',
    });
  });

  it.skip('should add a "mything"', async () => {
    const schema = {
      type: 'object',
      properties: {
        myThingsAndOrYourThings: {
          anyOf: [
            {
              $ref: '#/definitions/myThings',
            },
            {
              $ref: '#/definitions/yourThings',
            },
          ],
        },
      },
      definitions: {
        myThings: {
          title: 'MyThing',
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
              },
            },
          },
        },
        yourThings: {
          title: 'YourThings',
          type: 'array',
          items: {
            type: 'object',
            properties: {
              age: {
                type: 'number',
              },
            },
          },
        },
      },
    };

    const uischema: ControlElement = {
      type: 'Control',
      scope: '#/properties/myThingsAndOrYourThings',
    };

    const { container, getByRole, getAllByRole } = renderForm(uischema, schema, {});
    await waitForAsync(); // TODO: how to do it with the testing-library...

    const tablist = getByRole('tablist');
    const tabs = within(tablist).getAllByRole('tab');
    const firstItem = tabs[0];

    expect(firstItem).toHaveAttribute('aria-selected', 'true');

    await waitForAsync(); // TODO: how to do it with the testing-library...
    expect(getAllByRole('row').length).toBe(2);

    const secondItem = tabs[1];
    triggerPress(secondItem);
    expect(secondItem).toHaveAttribute('aria-selected', 'true');
    await waitForAsync(); // TODO: how to do it with the testing-library...
    const button = container.querySelector('button');
    userEvent.click(button);

    expect(getAllByRole('row').length).toBe(3);
  });

  // TODO: there seems to be no input field...
  it.skip('should switch to "yourThing" edit, then switch back, then edit', async () => {
    let state: any = {};
    const schema = {
      type: 'object',
      properties: {
        myThingsAndOrYourThings: {
          anyOf: [
            {
              $ref: '#/definitions/myThings',
            },
            {
              $ref: '#/definitions/yourThings',
            },
          ],
        },
      },
      definitions: {
        myThings: {
          title: 'MyThing',
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
              },
            },
          },
        },
        yourThings: {
          title: 'YourThings',
          type: 'array',
          items: {
            type: 'object',
            properties: {
              age: {
                type: 'number',
              },
            },
          },
        },
      },
    };
    const uischema: ControlElement = {
      type: 'Control',
      scope: '#/properties/myThingsAndOrYourThings',
    };

    const { container, getByRole } = renderForm(
      uischema,
      schema,
      {},
      undefined,
      ({ data }) => (state = data)
    );
    await waitForAsync(); // TODO: how to do it with the testing-library...

    let tablist = getByRole('tablist');
    let tabs = within(tablist).getAllByRole('tab');
    let firstItem = tabs[0];
    let secondItem = tabs[1];
    triggerPress(secondItem);

    expect(secondItem).toHaveAttribute('aria-selected', 'true');

    const addButton = container.querySelector('button');
    userEvent.click(addButton);

    await waitForAsync();

    // todo: there is no input field available... what is missing here?

    triggerPress(firstItem);
    expect(firstItem).toHaveAttribute('aria-selected', 'true');

    // todo: there is no input field available... what is missing here?
    // const input = container.querySelector('input');
    // userEvent.type(input, 'test');

    expect(state).toEqual({
      myThingsAndOrYourThings: [{ age: 5, name: 'test' }],
    });
  });

  it('should be hideable', () => {
    const condition: SchemaBasedCondition = {
      scope: '',
      schema: {},
    };
    const schema = {
      type: 'object',
      properties: {
        value: {
          anyOf: [
            {
              title: 'String',
              type: 'string',
            },
            {
              title: 'Number',
              type: 'number',
            },
          ],
        },
      },
    };
    const uischema: ControlElement = {
      type: 'Control',
      label: 'Value',
      scope: '#/properties/value',
      rule: {
        effect: RuleEffect.HIDE,
        condition,
      },
    };

    const { container } = renderForm(uischema, schema);
    const renderer = container.querySelector('.anyof-renderer') as HTMLElement;
    expect(renderer.hidden).toBe(true);
  });
});
