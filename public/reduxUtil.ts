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
import { Actions, getData, JsonFormsCore } from '@jsonforms/core';
import { ReactExampleDescription } from './util';
import * as React from 'react';
import { connect } from 'react-redux';
import { AnyAction, Dispatch, Reducer } from 'redux';

export const UPDATE_EXAMPLE_EXTENSION_STATE: 'jsonforms-example/UPDATE_EXAMPLE_EXTENSION_STATE' =
  'jsonforms-example/UPDATE_EXAMPLE_EXTENSION_STATE';

export interface UpdateExampleExtensionStateAction {
  type: 'jsonforms-example/UPDATE_EXAMPLE_EXTENSION_STATE';
  extensionState: any;
}

export const updateExampleExtensionState = (
  extensionState: any
): UpdateExampleExtensionStateAction => ({
  type: UPDATE_EXAMPLE_EXTENSION_STATE,
  extensionState,
});

export interface ExampleStateProps {
  examples: ReactExampleDescription[];
  dataAsString: string;
  extensionState: any;
}

export interface ExampleDispatchProps {
  changeExample(example: ReactExampleDescription): void;
  getComponent(example: ReactExampleDescription): React.Component | null;
  onChange?(
    example: ReactExampleDescription
  ): ((state: Pick<JsonFormsCore, 'data' | 'errors'>) => void) | null;
}

const mapStateToProps = (state: any) => {
  const examples = state.examples.data;
  const extensionState = state.examples.extensionState;
  return {
    dataAsString: JSON.stringify(getData(state), null, 2),
    examples,
    extensionState,
  };
};
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): ExampleDispatchProps => ({
  changeExample: (example: ReactExampleDescription) => {
    dispatch(Actions.init(example.data, example.schema, example.uischema));
    dispatch(Actions.setConfig(example.config));
  },
  getComponent: (example: ReactExampleDescription) =>
    example.customReactExtension ? example.customReactExtension(dispatch) : null,
  onChange: (example: ReactExampleDescription) =>
    example.onChange ? example.onChange(dispatch) : null,
});

interface ExamplesState {
  data: ReactExampleDescription[];
}

const initState: ExamplesState = {
  data: [],
};

export const exampleReducer = (state: ExamplesState = initState, action: any) => {
  switch (action.type) {
    case UPDATE_EXAMPLE_EXTENSION_STATE:
      return Object.assign({}, state, {
        extensionState: action.extensionState,
      });
    default:
      return state;
  }
};
export const initializedConnect = connect(mapStateToProps, mapDispatchToProps);
export interface AdditionalStoreParams {
  name: string;
  reducer?: Reducer<any>;
  state: any;
}
