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
import { ControlElement, isEnumControl, JsonSchema, rankWith } from '@jsonforms/core';
import * as _ from 'lodash';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import Enzyme, { mount, ReactWrapper } from 'enzyme';
import '../../src';
import SpectrumRadioGroupControl from '../../src/controls/SpectrumRadioGroupControl';
import { JsonForms } from '@jsonforms/react';

Enzyme.configure({ adapter: new Adapter() });

const fixture: { schema: JsonSchema; uischema: ControlElement; data: any } = {
  data: { foo: 'D' },
  schema: {
    type: 'object',
    properties: {
      foo: {
        type: 'string',
        enum: ['A', 'B', 'C', 'D'],
      },
    },
  },
  uischema: {
    type: 'Control',
    scope: '#/properties/foo',
  },
};

const renderers = [{ tester: rankWith(10, isEnumControl), renderer: SpectrumRadioGroupControl }];

describe('Radio group control', () => {
  let wrapper: ReactWrapper;

  afterEach(() => wrapper.unmount());

  test('render', () => {
    wrapper = mount(
      <JsonForms
        schema={fixture.schema}
        uischema={fixture.uischema}
        data={fixture.data}
        renderers={renderers}
      />
    );

    const radioButtons = wrapper.find('input[type="radio"]');
    expect(radioButtons).toHaveLength(4);
    // make sure one option is selected and iexpect "D"
    const currentlyChecked = radioButtons.filter('input[checked=true]');
    expect(currentlyChecked).toHaveLength(1);
    expect((currentlyChecked.getDOMNode() as HTMLInputElement).value).toBe('D');
  });

  test('Radio group should have only one selected option', () => {
    wrapper = mount(
      <JsonForms
        schema={fixture.schema}
        uischema={fixture.uischema}
        data={fixture.data}
        renderers={renderers}
      />
    );

    // change and verify selection
    wrapper.setProps({ data: { ...fixture.data, foo: 'A' } });
    wrapper.update();
    wrapper.setProps({ data: { ...fixture.data, foo: 'B' } });
    wrapper.update();
    const currentlyChecked = wrapper.find('input[checked=true]');
    expect(currentlyChecked).toHaveLength(1);
    expect((currentlyChecked.getDOMNode() as HTMLInputElement).value).toBe('B');
  });
});
