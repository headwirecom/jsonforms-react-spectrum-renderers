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
import {
  Categorization,
  Category,
  JsonSchema,
  Layout,
  RuleEffect,
  SchemaBasedCondition,
} from '@jsonforms/core';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { ReactWrapper } from 'enzyme';
import SpectrumCategorizationRenderer, {
  spectrumCategorizationRendererTester,
} from '../../src/complex/SpectrumCategorizationRenderer';
import { mountForm } from '../util';

Enzyme.configure({ adapter: new Adapter() });

const category: Category = {
  type: 'Category',
  label: 'B',
  elements: [],
};

const fixture = {
  data: {},
  schema: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
      },
    },
  },
  uischema: {
    type: 'Categorization',
    label: 'A',
    elements: [category],
  },
};

describe('Spectrum Categorization tester', () => {
  test('tester', () => {
    expect(spectrumCategorizationRendererTester(undefined, undefined)).toBe(-1);
    expect(spectrumCategorizationRendererTester(null, undefined)).toBe(-1);
    expect(
      spectrumCategorizationRendererTester({ type: 'Foo' }, undefined)
    ).toBe(-1);
    expect(
      spectrumCategorizationRendererTester(
        { type: 'Categorization' },
        undefined
      )
    ).toBe(-1);
  });

  test('tester with null elements and no schema', () => {
    const uischema: Layout = {
      type: 'Categorization',
      elements: null,
    };
    expect(spectrumCategorizationRendererTester(uischema, undefined)).toBe(-1);
  });

  test('tester with empty elements and no schema', () => {
    const uischema: Layout = {
      type: 'Categorization',
      elements: [],
    };
    expect(spectrumCategorizationRendererTester(uischema, undefined)).toBe(-1);
  });

  test('apply tester with single unknown element and no schema', () => {
    const uischema: Layout = {
      type: 'Categorization',
      elements: [
        {
          type: 'Foo',
        },
      ],
    };
    expect(spectrumCategorizationRendererTester(uischema, undefined)).toBe(-1);
  });

  test('tester with single category and no schema', () => {
    const categorization = {
      type: 'Categorization',
      elements: [
        {
          type: 'Category',
        },
      ],
    };
    expect(
      spectrumCategorizationRendererTester(categorization, undefined)
    ).toBe(1);
  });

  test('tester with nested categorization and single category and no schema', () => {
    const nestedCategorization: Layout = {
      type: 'Categorization',
      elements: [
        {
          type: 'Category',
        },
      ],
    };
    const categorization: Layout = {
      type: 'Categorization',
      elements: [nestedCategorization],
    };
    expect(
      spectrumCategorizationRendererTester(categorization, undefined)
    ).toBe(-1);
  });

  test('tester with nested categorizations, but no category and no schema', () => {
    const categorization: any = {
      type: 'Categorization',
      elements: [
        {
          type: 'Categorization',
        },
      ],
    };
    expect(
      spectrumCategorizationRendererTester(categorization, undefined)
    ).toBe(-1);
  });

  test('tester with nested categorizations, null elements and no schema', () => {
    const categorization: any = {
      type: 'Categorization',
      elements: [
        {
          type: 'Categorization',
          label: 'Test',
          elements: null,
        },
      ],
    };
    expect(
      spectrumCategorizationRendererTester(categorization, undefined)
    ).toBe(-1);
  });

  test('tester with nested categorizations, empty elements and no schema', () => {
    const categorization: any = {
      type: 'Categorization',
      elements: [
        {
          type: 'Categorization',
          elements: [],
        },
      ],
    };
    expect(
      spectrumCategorizationRendererTester(categorization, undefined)
    ).toBe(-1);
  });
});

describe('Spectrum Categorization renderer', () => {
  let wrapper: ReactWrapper;

  afterEach(() => wrapper.unmount());

  test('render', () => {
    const schema: JsonSchema = {
      type: 'object',
      properties: {
        firstname: {
          type: 'string',
        },
        lastname: {
          type: 'string',
        },
        color: {
          type: 'string',
        },
      },
    };
    const firstnameControl = {
      type: 'Control',
      label: 'Firstname',
      scope: '#/properties/firstname',
    };
    const lastnameControl = {
      type: 'Control',
      label: 'Lastname',
      scope: '#/properties/lastname',
    };
    const colorControl = {
      type: 'Control',
      label: 'Color',
      scope: '#/properties/color',
    };
    const uischema: Categorization = {
      type: 'Categorization',
      label: 'Blah',
      elements: [
        {
          type: 'Category',
          label: 'Foo',
          elements: [firstnameControl, lastnameControl],
        },
        {
          type: 'Category',
          label: 'Bar',
          elements: [colorControl],
        },
      ],
    };

    wrapper = mountForm(uischema, schema, fixture.data);

    const tabLists = wrapper.find('[role="tablist"]');
    expect(tabLists).toHaveLength(1);

    const tabs = tabLists.at(0).find('[role="tab"]');
    expect(tabs).toHaveLength(2);

    const fooTab = tabs.at(0);
    const barTab = tabs.at(1);
    expect(fooTab.getDOMNode().textContent).toBe('Foo');
    expect(fooTab.getDOMNode().className).toContain('is-selected');
    expect(barTab.getDOMNode().textContent).toBe('Bar');
    expect(barTab.getDOMNode().className).not.toContain('is-selected');

    const panel = wrapper.find('[role="tabpanel"]');
    expect(panel.getDOMNode().textContent).toContain('Firstname');
    expect(panel.getDOMNode().textContent).toContain('Lastname');
    expect(panel.getDOMNode().textContent).not.toContain('Color');
  });

  // TODO: How to simulate the click on the Spectrum tabs with Enzyme?
  test.skip('render on click', () => {
    const data = { name: 'John', color: 'Pink' };
    const schema: JsonSchema = {
      type: 'object',
      properties: {
        name: {
          type: 'string',
        },
        color: {
          type: 'string',
        },
      },
    };
    const nameControl = {
      type: 'Control',
      label: 'Name',
      scope: '#/properties/name',
    };
    const colorControl = {
      type: 'Control',
      label: 'Color',
      scope: '#/properties/color',
    };
    const uischema: Categorization = {
      type: 'Categorization',
      label: 'Blah',
      elements: [
        {
          type: 'Category',
          label: 'Foo',
          elements: [nameControl],
        },
        {
          type: 'Category',
          label: 'Bar',
          elements: [colorControl],
        },
        {
          type: 'Category',
          label: 'Baz',
          elements: null,
        },
      ],
    };

    wrapper = mountForm(uischema, schema, data);

    const tabLists = wrapper.find('[role="tablist"]');
    expect(tabLists).toHaveLength(1);

    const tabs = tabLists.at(0).find('[role="tab"]');
    expect(tabs).toHaveLength(3);

    const fooTab = tabs.at(0);
    const barTab = tabs.at(1);
    const bazTab = tabs.at(2);
    const panel = wrapper.find('[role="tabpanel"]');

    expect(fooTab.getDOMNode().textContent).toBe('Foo');
    expect(barTab.getDOMNode().textContent).toBe('Bar');
    expect(bazTab.getDOMNode().textContent).toBe('Baz');

    expect(fooTab.getDOMNode().className).toContain('is-selected');
    expect(barTab.getDOMNode().className).not.toContain('is-selected');
    expect(bazTab.getDOMNode().className).not.toContain('is-selected');
    expect(panel.getDOMNode().textContent).toContain('Name');
    expect(panel.getDOMNode().textContent).not.toContain('Color');

    barTab.simulate('click');
    expect(fooTab.getDOMNode().className).not.toContain('is-selected');
    expect(barTab.update().getDOMNode().className).toContain('is-selected');
    expect(bazTab.getDOMNode().className).not.toContain('is-selected');
    expect(panel.getDOMNode().textContent).not.toContain('Name');
    expect(panel.getDOMNode().textContent).toContain('Color');

    bazTab.simulate('click');
    expect(fooTab.getDOMNode().className).not.toContain('is-selected');
    expect(barTab.getDOMNode().className).not.toContain('is-selected');
    expect(bazTab.getDOMNode().className).toContain('is-selected');
    expect(panel.getDOMNode().textContent).toBe('');
  });

  test('hide', () => {
    const condition: SchemaBasedCondition = {
      scope: '',
      schema: {},
    };
    const uischema: Categorization = {
      type: 'Categorization',
      label: '',
      elements: [
        {
          type: 'Category',
          label: 'Foo',
          elements: [],
        },
      ],
      rule: {
        effect: RuleEffect.HIDE,
        condition,
      },
    };

    wrapper = mountForm(uischema, fixture.schema, fixture.data);

    const renderer = wrapper
      .find(SpectrumCategorizationRenderer)
      .getDOMNode() as HTMLElement;
    expect(renderer.style.display).toBe('none');
  });

  test('show by default', () => {
    const uischema: Categorization = {
      type: 'Categorization',
      label: '',
      elements: [
        {
          type: 'Category',
          label: 'Foo',
          elements: [],
        },
      ],
    };

    wrapper = wrapper = mountForm(uischema, fixture.schema, fixture.data);

    const renderer = wrapper
      .find(SpectrumCategorizationRenderer)
      .getDOMNode() as HTMLElement;
    expect(renderer.style.display).not.toBe('none');
  });

  test('hide single category', () => {
    const condition: SchemaBasedCondition = {
      scope: '',
      schema: {},
    };
    const uischema: Categorization = {
      type: 'Categorization',
      label: '',
      elements: [
        {
          type: 'Category',
          label: 'Foo',
          elements: [],
        },
        {
          type: 'Category',
          label: 'Bar',
          elements: [],
          rule: {
            effect: RuleEffect.HIDE,
            condition,
          },
        },
      ],
    };

    wrapper = mountForm(uischema, fixture.schema, fixture.data);

    const tabLists = wrapper.find('[role="tablist"]');
    expect(tabLists).toHaveLength(1);

    const tabs = tabLists.at(0).find('[role="tab"]');
    expect(tabs).toHaveLength(1);
    expect(tabs.at(0).getDOMNode().textContent).toContain('Foo');
  });

  test('disable', () => {
    const condition: SchemaBasedCondition = {
      scope: '',
      schema: {},
    };
    const nameControl = {
      type: 'Control',
      label: 'Name',
      scope: '#/properties/name',
    };
    const uischema: Categorization = {
      type: 'Categorization',
      label: '',
      elements: [
        {
          type: 'Category',
          label: 'Foo',
          elements: [nameControl],
        },
      ],
      rule: {
        effect: RuleEffect.DISABLE,
        condition,
      },
    };

    wrapper = mountForm(uischema, fixture.schema, fixture.data);

    const tabLists = wrapper.find('[role="tablist"]');
    expect(tabLists).toHaveLength(1);

    const tabs = tabLists.at(0).find('[role="tab"]');
    expect(tabs).toHaveLength(1);
    expect(tabs.at(0).getDOMNode().className).toContain('is-disabled');
  });
});
