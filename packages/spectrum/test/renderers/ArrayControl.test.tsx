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
import { JsonFormsReduxContext } from '@jsonforms/react';
import * as React from 'react';
import { Provider } from 'react-redux';
import { ControlElement, JsonSchema } from '@jsonforms/core';
import ArrayControl from '../../src/complex/array/ArrayControlRenderer';
import { spectrumRenderers } from '../../src/index';
import { initJsonFormsVanillaStore } from '../vanillaStore';
import SpectrumIntegerCell, {
  spectrumIntegerCellTester,
} from '../../src/cells/SpectrumIntegerCell';

import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount } from 'enzyme';

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

describe('Array control renderer', () => {
  test('render two children', () => {
    const store = initJsonFormsVanillaStore({
      data: fixture.data,
      schema: fixture.schema,
      uischema: fixture.uischema,
      renderers: spectrumRenderers,
      cells: [
        {
          tester: spectrumIntegerCellTester,
          cell: SpectrumIntegerCell,
        },
      ],
    });
    const wrapper = mount(
      <Provider store={store}>
        <JsonFormsReduxContext>
          <ArrayControl schema={fixture.schema} uischema={fixture.uischema} />
        </JsonFormsReduxContext>
      </Provider>
    );

    const controls = wrapper.find('input');

    expect(controls).toHaveLength(2);
  });
});
