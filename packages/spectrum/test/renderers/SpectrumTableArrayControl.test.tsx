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
import { Provider } from 'react-redux';
import {
  ControlElement,
  getData,
  HorizontalLayout,
  JsonSchema,
  update,
} from '@jsonforms/core';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount, ReactWrapper } from 'enzyme';
import { JsonFormsReduxContext } from '@jsonforms/react';
import TableArrayControl from '../../src/complex/SpectrumTableArrayControl';
import { spectrumTableArrayControlTester } from '../../src/complex/SpectrumTableArrayControl';
import SpectrumHorizontalLayoutRenderer from '../../src/layouts/SpectrumHorizontalLayout';
import '../../src';
import { initJsonFormsSpectrumStore } from '../spectrumStore';
import SpectrumIntegerCell, {
  spectrumIntegerCellTester,
} from '../../src/cells/SpectrumIntegerCell';

import {
  defaultTheme,
  Provider as SpectrumThemeProvider,
} from '@adobe/react-spectrum';
import { mountForm, simulateClick } from '../util';

Enzyme.configure({ adapter: new Adapter() });

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
  let wrapper: ReactWrapper;

  let offsetWidth: any;
  let offsetHeight: any;
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
  });

  afterEach(() => wrapper.unmount());

  test('render two children', () => {
    const cells = {
      tester: spectrumIntegerCellTester,
      cell: SpectrumIntegerCell,
    };

    wrapper = mountForm(fixture.uischema, fixture.schema, fixture.data, cells);
    const header = wrapper.find('header').getDOMNode();
    const headerChildren = header.children;

    const label = headerChildren.item(0);
    expect(label.tagName).toBe('H4');
    expect(label.innerHTML).toBe('Test');

    const button = headerChildren.item(1);
    expect(button.tagName).toBe('BUTTON');
    expect(button.innerHTML).toBe('Add to Test');

    // two data columns + validation column + delete column
    const columnHeaders = wrapper.find('[role="columnheader"]');
    expect(columnHeaders).toHaveLength(4);
    expect(columnHeaders.at(0).text()).toBe('X');
    expect(columnHeaders.at(1).text()).toBe('Y');
    expect(columnHeaders.at(2).text()).toBe('Valid');
    expect(columnHeaders.at(3).text().trim()).toBe('');

    const rows = wrapper.find('[role="row"]');
    expect(rows).toHaveLength(2);
  });

  test('render empty data', () => {
    const control: ControlElement = {
      label: false,
      type: 'Control',
      scope: '#/properties/test',
    };
    wrapper = mountForm(control, fixture.schema);

    const header = wrapper.find('header').getDOMNode();
    const legendChildren = header.children;

    const label = legendChildren.item(0);
    expect(label.tagName).toBe('H4');
    expect(label.innerHTML).toBe('');

    const button = legendChildren.item(1);
    expect(button.tagName).toBe('BUTTON');
    expect(button.innerHTML).toBe('Add to Test');

    const columnHeaders = wrapper.find('[role="columnheader"]');
    expect(columnHeaders).toHaveLength(4);
    expect(columnHeaders.at(0).text()).toBe('X');
    expect(columnHeaders.at(1).text()).toBe('Y');
    expect(columnHeaders.at(2).text()).toBe('Valid');
    expect(columnHeaders.at(3).text().trim()).toBe('');

    const rows = wrapper.find('[role="row"]');
    expect(rows).toHaveLength(2);

    expect(rows.contains('No data')).toBeTruthy();
  });

  test('render new child (empty init data)', () => {
    const store = initJsonFormsSpectrumStore({
      data: { test: [] },
      schema: fixture.schema,
      uischema: fixture.uischema,
    });

    wrapper = mount(
      <Provider store={store}>
        <SpectrumThemeProvider theme={defaultTheme}>
          <JsonFormsReduxContext>
            <TableArrayControl
              schema={fixture.schema}
              uischema={fixture.uischema}
            />
          </JsonFormsReduxContext>
        </SpectrumThemeProvider>
      </Provider>
    );

    const control = wrapper.find('.root_properties_test');
    expect(control).toBeDefined();

    const button = wrapper.find('#button').first();
    simulateClick(button);
    expect(getData(store.getState()).test).toHaveLength(1);
  });

  test('render new child (undefined data)', () => {
    const store = initJsonFormsSpectrumStore({
      data: { test: undefined },
      schema: fixture.schema,
      uischema: fixture.uischema,
    });
    wrapper = mount(
      <Provider store={store}>
        <SpectrumThemeProvider theme={defaultTheme}>
          <JsonFormsReduxContext>
            <TableArrayControl
              schema={fixture.schema}
              uischema={fixture.uischema}
            />
          </JsonFormsReduxContext>
        </SpectrumThemeProvider>
      </Provider>
    );

    const control = wrapper.find('.root_properties_test');
    expect(control).toBeDefined();

    const button = wrapper.find('#button').first();
    simulateClick(button);
    expect(getData(store.getState()).test).toHaveLength(1);
  });

  test('render new child (null data)', () => {
    const store = initJsonFormsSpectrumStore({
      data: { test: null },
      schema: fixture.schema,
      uischema: fixture.uischema,
    });
    wrapper = mount(
      <SpectrumThemeProvider theme={defaultTheme}>
        <Provider store={store}>
          <JsonFormsReduxContext>
            <TableArrayControl
              schema={fixture.schema}
              uischema={fixture.uischema}
            />
          </JsonFormsReduxContext>
        </Provider>
      </SpectrumThemeProvider>
    );

    const control = wrapper.find('.root_properties_test');
    expect(control).toBeDefined();

    const button = wrapper.find('#button').first();
    simulateClick(button);
    expect(getData(store.getState()).test).toHaveLength(1);
  });

  test('render new child', () => {
    const store = initJsonFormsSpectrumStore({
      data: fixture.data,
      schema: fixture.schema,
      uischema: fixture.uischema,
    });
    wrapper = mount(
      <Provider store={store}>
        <SpectrumThemeProvider theme={defaultTheme}>
          <JsonFormsReduxContext>
            <TableArrayControl
              schema={fixture.schema}
              uischema={fixture.uischema}
            />
          </JsonFormsReduxContext>
        </SpectrumThemeProvider>
      </Provider>
    );

    const addButton = wrapper.find('#button').first();
    simulateClick(addButton);
    expect(getData(store.getState()).test).toHaveLength(2);
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
    const store = initJsonFormsSpectrumStore({
      data: { test: ['foo', 'bars'] },
      schema,
      uischema,
    });
    wrapper = mount(
      <SpectrumThemeProvider theme={defaultTheme}>
        <Provider store={store}>
          <JsonFormsReduxContext>
            <TableArrayControl schema={schema} uischema={uischema} />
          </JsonFormsReduxContext>
        </Provider>
      </SpectrumThemeProvider>
    );
    const cell = wrapper.find('[aria-colindex=2]').last();
    expect(cell.text()).toBe('should NOT be longer than 3 characters');

    const rows = wrapper.find('[role="row"]');
    expect(rows).toHaveLength(3);
  });

  test('update via action', () => {
    const store = initJsonFormsSpectrumStore({
      data: fixture.data,
      schema: fixture.schema,
      uischema: fixture.uischema,
    });
    wrapper = mount(
      <SpectrumThemeProvider theme={defaultTheme}>
        <Provider store={store}>
          <JsonFormsReduxContext>
            <TableArrayControl
              schema={fixture.schema}
              uischema={fixture.uischema}
            />
          </JsonFormsReduxContext>
        </Provider>
      </SpectrumThemeProvider>
    );

    expect(wrapper.find('[role="row"]')).toHaveLength(2); // one in the header, one in the body

    store.dispatch(
      update('test', () => [
        { x: 1, y: 3 },
        { x: 2, y: 3 },
      ])
    );
    wrapper.update();
    expect(wrapper.find('[role="row"]')).toHaveLength(3); // successfully added a new row
    store.dispatch(
      update(undefined, () => [
        { x: 1, y: 3 },
        { x: 2, y: 3 },
        { x: 3, y: 3 },
      ])
    );
    expect(wrapper.find('[role="row"]')).toHaveLength(3); // should not have changed anything
  });

  test('hide', () => {
    const store = initJsonFormsSpectrumStore({
      data: fixture.data,
      schema: fixture.schema,
      uischema: fixture.uischema,
    });
    wrapper = mount(
      <SpectrumThemeProvider theme={defaultTheme}>
        <Provider store={store}>
          <JsonFormsReduxContext>
            <TableArrayControl
              schema={fixture.schema}
              uischema={fixture.uischema}
              visible={false}
            />
          </JsonFormsReduxContext>
        </Provider>
      </SpectrumThemeProvider>
    );
    const tableView = wrapper
      .find('#table-view')
      .first()
      .getDOMNode() as HTMLElement;
    expect(tableView.hidden).toBe(true);
  });

  test('show by default', () => {
    const store = initJsonFormsSpectrumStore({
      data: fixture.data,
      schema: fixture.schema,
      uischema: fixture.uischema,
    });
    wrapper = mount(
      <SpectrumThemeProvider theme={defaultTheme}>
        <Provider store={store}>
          <JsonFormsReduxContext>
            <TableArrayControl
              schema={fixture.schema}
              uischema={fixture.uischema}
            />
          </JsonFormsReduxContext>
        </Provider>
      </SpectrumThemeProvider>
    );
    const tableView = wrapper
      .find('#table-view')
      .first()
      .getDOMNode() as HTMLElement;
    expect(tableView.hidden).toBe(false);
  });

  test('single error', () => {
    const store = initJsonFormsSpectrumStore({
      data: fixture.data,
      schema: fixture.schema,
      uischema: fixture.uischema,
    });
    wrapper = mount(
      <SpectrumThemeProvider theme={defaultTheme}>
        <Provider store={store}>
          <JsonFormsReduxContext>
            <TableArrayControl
              schema={fixture.schema}
              uischema={fixture.uischema}
            />
          </JsonFormsReduxContext>
        </Provider>
      </SpectrumThemeProvider>
    );
    store.dispatch(update('test', () => 2));
    const validationWell = wrapper
      .find('#validation')
      .first()
      .getDOMNode() as HTMLElement;
    expect(validationWell.hidden).toBeFalsy();
    const validation = wrapper.find('#validation').last().getDOMNode();
    expect(validation.textContent).toBe('should be array');
  });

  test('multiple errors', () => {
    const store = initJsonFormsSpectrumStore({
      data: fixture.data,
      schema: fixture.schema,
      uischema: fixture.uischema,
    });
    wrapper = mount(
      <SpectrumThemeProvider theme={defaultTheme}>
        <Provider store={store}>
          <JsonFormsReduxContext>
            <TableArrayControl
              schema={fixture.schema}
              uischema={fixture.uischema}
            />
          </JsonFormsReduxContext>
        </Provider>
      </SpectrumThemeProvider>
    );
    store.dispatch(update('test', () => 3));
    const validationWell = wrapper
      .find('#validation')
      .first()
      .getDOMNode() as HTMLElement;
    expect(validationWell.hidden).toBeFalsy();
    const validation = wrapper.find('#validation').last().getDOMNode();
    expect(validation.textContent).toBe('should be array');
  });

  test('empty errors by default', () => {
    const store = initJsonFormsSpectrumStore({
      data: fixture.data,
      schema: fixture.schema,
      uischema: fixture.uischema,
    });
    wrapper = mount(
      <SpectrumThemeProvider theme={defaultTheme}>
        <Provider store={store}>
          <JsonFormsReduxContext>
            <TableArrayControl
              schema={fixture.schema}
              uischema={fixture.uischema}
            />
          </JsonFormsReduxContext>
        </Provider>
      </SpectrumThemeProvider>
    );

    const validationWell = wrapper
      .find('#validation')
      .first()
      .getDOMNode() as HTMLElement;
    expect(validationWell.hidden).toBeTruthy();
  });

  test('reset validation message', () => {
    const store = initJsonFormsSpectrumStore({
      data: fixture.data,
      schema: fixture.schema,
      uischema: fixture.uischema,
    });
    wrapper = mount(
      <SpectrumThemeProvider theme={defaultTheme}>
        <Provider store={store}>
          <JsonFormsReduxContext>
            <TableArrayControl
              schema={fixture.schema}
              uischema={fixture.uischema}
            />
          </JsonFormsReduxContext>
        </Provider>
      </SpectrumThemeProvider>
    );

    const validation = wrapper.find('#validation').last().getDOMNode();
    store.dispatch(update('test', () => 3));
    wrapper.update();
    expect(validation.textContent).toBe('should be array');
    store.dispatch(update('test', () => []));
    wrapper.update();
    expect(validation.textContent).toBe('');
  });
  // must be thought through as to where to show validation errors
  test.skip('validation of nested schema', () => {
    const schema = {
      type: 'object',
      properties: {
        name: { type: 'string' },
        personalData: {
          type: 'object',
          properties: {
            middleName: { type: 'string' },
            lastName: { type: 'string' },
          },
          required: ['middleName', 'lastName'],
        },
      },
      required: ['name'],
    };
    const firstControl: ControlElement = {
      type: 'Control',
      scope: '#/properties/name',
    };
    const secondControl: ControlElement = {
      type: 'Control',
      scope: '#/properties/personalData/properties/middleName',
    };
    const thirdControl: ControlElement = {
      type: 'Control',
      scope: '#/properties/personalData/properties/lastName',
    };
    const uischema: HorizontalLayout = {
      type: 'HorizontalLayout',
      elements: [firstControl, secondControl, thirdControl],
    };
    const store = initJsonFormsSpectrumStore({
      data: {
        name: 'John Doe',
        personalData: {},
      },
      schema,
      uischema,
    });
    wrapper = mount(
      <SpectrumThemeProvider theme={defaultTheme}>
        <Provider store={store}>
          <SpectrumHorizontalLayoutRenderer
            schema={schema}
            uischema={uischema}
          />
        </Provider>
      </SpectrumThemeProvider>
    );
    const validation = wrapper.find('.valdiation');
    expect(validation.at(0).getDOMNode().textContent).toBe('');
    expect(validation.at(1).getDOMNode().textContent).toBe(
      'is a required property'
    );
    expect(validation.at(2).getDOMNode().textContent).toBe(
      'is a required property'
    );
  });
});
