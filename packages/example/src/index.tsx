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
import ReactDOM from 'react-dom';
import React from 'react';
import './index.css';
import App from './App';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import geoschema from './geographical-location.schema';
import {
  Actions,
  createAjv,
  JsonFormsCellRendererRegistryEntry,
  jsonformsReducer,
  JsonFormsRendererRegistryEntry,
  RankedTester,
} from '@jsonforms/core';
import { getExamples, registerExamples } from '@jsonforms/examples';
import { exampleReducer } from './reduxUtil';
import { enhanceExample, ReactExampleDescription } from './util';
import { ColorSchemeContext } from './ColorSchemeContext';

declare global {
  interface Window {
    samples: any;
  }
}

import {
  defaultTheme,
  Provider as SpectrumThemeProvider,
} from '@adobe/react-spectrum';

const getExampleSchemas = () => {
  if (window.samples) {
    registerExamples(window.samples);
  } else {
    registerExamples([
      {
        name: 'spectrum-test',
        label: 'test',
        data: { name: 'a sample name' },
        schema: undefined,
        uischema: undefined,
      },
    ]);
  }

  const examples = getExamples();
  return examples;
};

const setupStore = (
  exampleData: ReactExampleDescription[],
  cells: JsonFormsCellRendererRegistryEntry[],
  renderers: JsonFormsRendererRegistryEntry[]
) => {
  const reducer = combineReducers({
    jsonforms: jsonformsReducer(),
    examples: exampleReducer,
  });
  const store = createStore(reducer, {
    jsonforms: {
      cells: cells,
      renderers: renderers,
    },
    examples: {
      data: exampleData,
    },
  } as any);

  // Resolve example configuration
  // Add schema to validation
  const ajv = createAjv();
  ajv.addSchema(geoschema, 'geographical-location.schema.json');
  // Allow json-schema-ref-resolver to resolve same schema
  const geoResolver = {
    order: 1,
    canRead: (file: any) => {
      return file.url.indexOf('geographical-location.schema.json') !== -1;
    },
    read: () => {
      return JSON.stringify(geoschema);
    },
  };
  // Add configuration to JSONForms
  store.dispatch(
    Actions.init(
      exampleData[exampleData.length - 1].data,
      exampleData[exampleData.length - 1].schema,
      exampleData[exampleData.length - 1].uischema,
      {
        ajv: ajv,
        refParserOptions: {
          resolve: {
            geo: geoResolver,
          } as any,
        },
      }
    )
  );
  return store;
};
export const renderExample = (
  renderers: { tester: RankedTester; renderer: any }[],
  cells: { tester: RankedTester; cell: any }[],
  preferredColorScheme: 'light' | 'dark'
) => {
  const exampleData = enhanceExample(getExampleSchemas());
  const store = setupStore(exampleData, cells, renderers);
  const rerender = (colorScheme: 'light' | 'dark') => {
    ReactDOM.render(
      <Provider store={store}>
        <SpectrumThemeProvider colorScheme={colorScheme} theme={defaultTheme}>
          <ColorSchemeContext.Provider value={colorScheme}>
            <App />
          </ColorSchemeContext.Provider>
        </SpectrumThemeProvider>
      </Provider>,
      document.getElementById('root')
    );
  };
  rerender(preferredColorScheme);
  return rerender;
};
