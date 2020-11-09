/*
  The MIT License

  Copyright (c) 2017-2019 EclipseSource Munich
  https://github.com/eclipsesource/jsonforms

  Copyright (c) 2020 headwire.com, Inc
  https://github.com/headwirecom/jsonforms-react-spectrum-renderers

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the 'Software'), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.
*/

import React, { Component, CSSProperties } from 'react';
import { JsonFormsDispatch, JsonFormsReduxContext } from '@jsonforms/react';
import './App.css';
import { AppProps, initializedConnect } from './reduxUtil';

const preStyle: CSSProperties = {
  overflowX: 'auto',
};
class App extends Component<AppProps> {
  render() {
    return (
      <JsonFormsReduxContext>
        <div className='Shell'>
          <div className='App'>
            <header className='App-header'>
              <ul>
                <li>
                  <img src='assets/logo.svg' className='App-logo' alt='logo' />
                </li>
                <li>
                  <h1>React Spectrum</h1>
                </li>
                <li>
                  <h1>JSON Forms</h1>
                </li>
              </ul>
              <p className='App-intro'>More Forms. Less Code.</p>
            </header>
          </div>

          <div className='container'>
            <div className='App-selection'>
              <h4 className='data-title'>JsonForms Examples</h4>
              <div className='data-content'>
                <select
                  value={this.props.selectedExample.name || ''}
                  onChange={(ev) =>
                    this.props.changeExample(ev.currentTarget.value)
                  }
                >
                  <option value='-' disabled>
                    ---- react spectrum tests ----
                  </option>
                  {this.props.examples
                    .filter((optionValue) =>
                      optionValue.name.startsWith('spectrum-')
                    )
                    .map((optionValue) => (
                      <option
                        value={optionValue.name}
                        label={optionValue.label}
                        key={optionValue.name}
                      >
                        {optionValue.label}
                      </option>
                    ))}
                  <option value='-' disabled>
                    ---- jsonforms tests ----
                  </option>
                  {this.props.examples
                    .filter(
                      (optionValue) => !optionValue.name.startsWith('spectrum-')
                    )
                    .map((optionValue) => (
                      <option
                        value={optionValue.name}
                        label={optionValue.label}
                        key={optionValue.name}
                      >
                        {optionValue.label}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <div className='App-Form'>
              <div className='demoform'>
                {this.props.getExtensionComponent()}
                <JsonFormsDispatch onChange={this.props.onChange} />
              </div>
            </div>

            <div className='App-Data tabs'>
              <div className='tab'>
                <input
                  type='radio'
                  id='tab-1'
                  name='tab-group-1'
                  defaultChecked
                />
                <label htmlFor='tab-1'>Bound data</label>
                <div className='data-content content'>
                  <pre style={preStyle}>{this.props.dataAsString}</pre>
                </div>
              </div>
              <div className='tab'>
                <input type='radio' id='tab-2' name='tab-group-1' />
                <label htmlFor='tab-2'>UI Schema</label>
                <div className='data-content content'>
                  <pre style={preStyle}>
                    {JSON.stringify(
                      this.props.selectedExample.uischema,
                      null,
                      2
                    )}
                  </pre>
                </div>
              </div>
              <div className='tab'>
                <input type='radio' id='tab-3' name='tab-group-1' />
                <label htmlFor='tab-3'>Schema</label>
                <div className='data-content content'>
                  <pre style={preStyle}>
                    {JSON.stringify(this.props.selectedExample.schema, null, 2)}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </JsonFormsReduxContext>
    );
  }
}

export default initializedConnect(App);
