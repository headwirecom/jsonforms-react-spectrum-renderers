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
  RuleEffect,
  SchemaBasedCondition,
  UISchemaElement,
  VerticalLayout,
} from '@jsonforms/core';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { ReactWrapper } from 'enzyme';
import SpectrumVerticalLayoutRenderer, {
  spectrumVerticalLayoutTester,
} from '../../src/layouts/SpectrumVerticalLayout';
import { mountForm } from '../util';

Enzyme.configure({ adapter: new Adapter() });

test('tester', () => {
  expect(spectrumVerticalLayoutTester(undefined, undefined)).toBe(-1);
  expect(spectrumVerticalLayoutTester(null, undefined)).toBe(-1);
  expect(spectrumVerticalLayoutTester({ type: 'Foo' }, undefined)).toBe(-1);
  expect(
    spectrumVerticalLayoutTester({ type: 'VerticalLayout' }, undefined)
  ).toBe(1);
});

describe('Vertical layout', () => {
  let wrapper: ReactWrapper;

  afterEach(() => wrapper.unmount());

  test('render with undefined elements', () => {
    const uischema: UISchemaElement = {
      type: 'VerticalLayout',
    };
    wrapper = mountForm(uischema);

    const verticalLayout = wrapper
      .find(SpectrumVerticalLayoutRenderer)
      .getDOMNode().firstElementChild as HTMLDivElement;

    expect(verticalLayout?.children).toHaveLength(0);
  });

  test('render with null elements', () => {
    const uischema: VerticalLayout = {
      type: 'VerticalLayout',
      elements: null,
    };
    wrapper = mountForm(uischema);

    const verticalLayout = wrapper
      .find(SpectrumVerticalLayoutRenderer)
      .getDOMNode().firstElementChild;
    expect(verticalLayout?.children).toHaveLength(0);
  });

  test('render with children', () => {
    const uischema: VerticalLayout = {
      type: 'VerticalLayout',
      elements: [{ type: 'Control' }, { type: 'Control' }],
    };
    wrapper = mountForm(uischema);

    const verticalLayout = wrapper
      .find(SpectrumVerticalLayoutRenderer)
      .getDOMNode().firstElementChild;
    expect(verticalLayout?.children).toHaveLength(2);
  });

  test('hide', () => {
    // Condition that evaluates to false
    const condition: SchemaBasedCondition = {
      scope: '',
      schema: {},
    };
    const uischema: VerticalLayout = {
      type: 'VerticalLayout',
      elements: [{ type: 'Control' }],
      rule: {
        effect: RuleEffect.HIDE,
        condition,
      },
    };
    wrapper = mountForm(uischema);

    const verticalLayout = wrapper
      .find(SpectrumVerticalLayoutRenderer)
      .getDOMNode() as HTMLElement;
    expect(verticalLayout.style.display).toBe('none');
  });

  test('show by default', () => {
    const uischema: VerticalLayout = {
      type: 'VerticalLayout',
      elements: [{ type: 'Control' }],
    };
    wrapper = mountForm(uischema);

    const verticalLayout = wrapper
      .find(SpectrumVerticalLayoutRenderer)
      .getDOMNode() as HTMLElement;
    expect(verticalLayout.style.display).not.toBe('none');
  });
});
