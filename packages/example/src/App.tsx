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

import React, { Component } from 'react';
import { JsonFormsDispatch, JsonFormsReduxContext } from '@jsonforms/react';
import {
  Picker,
  Item,
  Section,
  Content,
  TextArea,
} from '@adobe/react-spectrum';
import { Tabs } from '@react-spectrum/tabs';
import './App.css';
import { AppProps, initializedConnect } from './reduxUtil';

class App extends Component<AppProps> {
  render() {
    return (
      <JsonFormsReduxContext>
        <div className='Shell'>
          <div className='container'>
            <div className='App-selection'>
              <h4 className='data-title'>JsonForms Examples</h4>
              <ExamplesPicker {...this.props} />
            </div>

            <div className='App-Form'>
              <div className='demoform'>
                {this.props.getExtensionComponent()}
                <JsonFormsDispatch onChange={this.props.onChange} />
              </div>
            </div>

            <div className='App-Data tabs'>
              <Tabs defaultSelectedKey='boundData'>
                <Item key='boundData' title='Bound data'>
                  <Content margin='size-100'>
                    <TextArea
                      width='100%'
                      height='30em'
                      aria-label='Bound data'
                      value={this.props.dataAsString}
                    />
                  </Content>
                </Item>
                <Item key='uiSchema' title='UI Schema'>
                  <Content margin='size-100'>
                    <TextArea
                      width='100%'
                      height='30em'
                      aria-label='UI Schema'
                      value={JSON.stringify(
                        this.props.selectedExample.uischema,
                        null,
                        2
                      )}
                    />
                  </Content>
                </Item>
                <Item key='schema' title='Schema'>
                  <Content margin='size-100'>
                    <TextArea
                      width='100%'
                      height='30em'
                      aria-label='UI Schema'
                      value={JSON.stringify(
                        this.props.selectedExample.schema,
                        null,
                        2
                      )}
                    />
                  </Content>
                </Item>
              </Tabs>
            </div>
          </div>
        </div>
      </JsonFormsReduxContext>
    );
  }
}

export default initializedConnect(App);

function ExamplesPicker(props: AppProps) {
  const options = [
    {
      name: 'React Spectrum Tests',
      children: props.examples
        .filter((example) => example.name.startsWith('spectrum-'))
        .map((item) => ({ ...item, id: item.name })),
    },
    {
      name: 'JSONForms Tests',
      children: props.examples
        .filter((example) => !example.name.startsWith('spectrum-'))
        .map((item) => ({ ...item, id: item.name })),
    },
  ];

  return (
    <Picker
      aria-label='JSONForms Examples'
      items={options}
      width='100%'
      defaultSelectedKey={props.selectedExample.name}
      onSelectionChange={props.changeExample}
    >
      {(item) => (
        <Section key={item.name} items={item.children} title={item.name}>
          {(item) => <Item>{item.name}</Item>}
        </Section>
      )}
    </Picker>
  );
}
