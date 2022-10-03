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
import { mount, ReactWrapper } from 'enzyme';
import {
  JsonFormsCellRendererRegistryEntry,
  JsonSchema,
  SchemaBasedCondition,
  UISchemaElement,
} from '@jsonforms/core';
import { JsonForms } from '@jsonforms/react';
import { SpectrumRenderers } from '../src/index';
import { defaultTheme, Provider as SpectrumThemeProvider } from '@adobe/react-spectrum';
import { act } from 'react-dom/test-utils';
import { render, RenderResult } from '@testing-library/react';
import { fireEvent } from '@testing-library/react';

type OnChangeType<T> = (change: { errors: any; data: T }) => void;

export function renderForm<T extends object, U extends UISchemaElement>(
  uischema: U,
  schema: JsonSchema = {},
  data?: T,
  cells: JsonFormsCellRendererRegistryEntry[] = [],
  onChange: OnChangeType<T> = () => undefined
): RenderResult {
  return render(
    <SpectrumThemeProvider theme={defaultTheme} scale='medium'>
      <JsonForms
        schema={schema}
        uischema={uischema}
        data={data ?? {}}
        renderers={SpectrumRenderers}
        cells={cells}
        onChange={onChange}
      />
    </SpectrumThemeProvider>
  );
}

// Triggers a "press" event on an element.
export function triggerPress(element: any, opts = {}) {
  fireEvent.mouseDown(element, { detail: 1, ...opts });
  fireEvent.mouseUp(element, { detail: 1, ...opts });
  fireEvent.click(element, { detail: 1, ...opts });
}

// deprecated
// tslint:disable-next-line:only-arrow-functions
export function mountForm<T extends object>(
  uischema: UISchemaElement,
  schema: JsonSchema = {},
  data?: T,
  cells: JsonFormsCellRendererRegistryEntry[] = [],
  onChange: OnChangeType<T> = () => undefined
): ReactWrapper {
  return mount(
    <SpectrumThemeProvider theme={defaultTheme} scale='medium'>
      <JsonForms
        schema={schema}
        uischema={uischema}
        data={data ?? {}}
        renderers={SpectrumRenderers}
        cells={cells}
        onChange={onChange}
      />
    </SpectrumThemeProvider>
  );
}

export const simulateClick = (element: ReactWrapper) => {
  const clickHandler =
    element.prop<Function | undefined>('onPress') || element.prop<Function | undefined>('onClick');
  if (clickHandler) {
    act(() => clickHandler());
  } else {
    throw new Error('Given element is not clickable');
  }
};

export const falseCondition = (): SchemaBasedCondition => {
  return {
    scope: '',
    schema: {},
  };
};
