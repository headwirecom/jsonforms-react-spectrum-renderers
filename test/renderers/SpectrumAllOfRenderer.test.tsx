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
import Enzyme, { ReactWrapper } from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import { ControlElement, RuleEffect, SchemaBasedCondition } from '@jsonforms/core';
import { mountForm } from '../util';
import { SpectrumAllOfRenderer } from '../../src';

Enzyme.configure({ adapter: new Adapter() });

describe('Spectrum allOf renderer', () => {
  let wrapper: ReactWrapper;

  afterEach(() => wrapper.unmount());

  it('should render', () => {
    const schema = {
      type: 'object',
      properties: {
        value: {
          allOf: [
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

    wrapper = mountForm(uischema, schema);

    const inputs = wrapper.find('input');
    expect(inputs.length).toBe(2);
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
          allOf: [
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

    wrapper = mountForm(uischema, schema);

    const renderer = wrapper.find(SpectrumAllOfRenderer).getDOMNode() as HTMLElement;
    expect(renderer.style.display).toBe('none');
  });
});
