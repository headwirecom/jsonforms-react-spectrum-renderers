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

import React, { useCallback } from 'react';
import { JsonFormsDispatch, JsonFormsReduxContext } from '@jsonforms/react';
import {
  Heading,
  Picker,
  Item,
  Section,
  Content,
  View,
} from '@adobe/react-spectrum';
import { Tabs } from '@react-spectrum/tabs';
import './App.css';
import { AppProps, initializedConnect } from './reduxUtil';
import { TextArea } from './TextArea';

function App(props: AppProps) {
  const setExampleByName = useCallback((exampleName: string) => {
    props.changeExample(props.examples.find((example) => example.name === exampleName));
  }, [props.changeExample, props.examples]);

  const updateCurrentSchema = useCallback((newSchema: string) => {
    props.changeExample({ ...props.selectedExample, schema: JSON.parse(newSchema) });
  }, [props.changeExample, props.selectedExample]);

  const updateCurrentUISchema = useCallback((newUISchema: string) => {
    props.changeExample({ ...props.selectedExample, uischema: JSON.parse(newUISchema) });
  }, [props.changeExample, props.selectedExample]);

  const updateCurrentData = useCallback((newData: string) => {
    props.changeExample({ ...props.selectedExample, data: JSON.parse(newData) });
  }, [props.changeExample, props.selectedExample]);

  return (
    <JsonFormsReduxContext>
      <View padding='size-100' minHeight='100vh' paddingTop='0' paddingBottom='size-800'>
        <div className='container'>
          <div className='App-Form'>
            <View padding="size-100">
              <Heading>{props.selectedExample.label}</Heading>
              {props.getExtensionComponent()}
              <JsonFormsDispatch onChange={props.onChange} />
            </View>
          </div>

          <div className='App-Data tabs'>
            <View padding='size-100'>
              <Heading>JsonForms Examples</Heading>
              <ExamplesPicker {...props} onChange={setExampleByName} />
              <Tabs defaultSelectedKey='schema'>
                <Item key='boundData' title='Bound data'>
                  <Content margin='size-100'>
                    <TextArea
                      value={props.dataAsString}
                      onChange={updateCurrentData}
                    />
                  </Content>
                </Item>
                <Item key='uiSchema' title='UI Schema'>
                  <Content margin='size-100'>
                    <TextArea
                      value={JSON.stringify(
                        props.selectedExample.uischema,
                        null,
                        2
                      ) || ''}
                      onChange={updateCurrentUISchema}
                    />
                  </Content>
                </Item>
                <Item key='schema' title='Schema'>
                  <Content margin='size-100'>
                    <TextArea
                      value={JSON.stringify(
                        props.selectedExample.schema,
                        null,
                        2
                      ) || ''}
                      onChange={updateCurrentSchema}
                    />
                  </Content>
                </Item>
              </Tabs>
            </View>
          </div>
        </div>
      </View>
    </JsonFormsReduxContext>
  );
}

export default initializedConnect(App);

function ExamplesPicker(props: Omit<AppProps, "onChange"> & { onChange: (exampleName: string) => void }) {
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
      onSelectionChange={props.onChange}
    >
      {(item) => (
        <Section key={item.name} items={item.children} title={item.name}>
          {(item) => <Item>{item.label}</Item>}
        </Section>
      )}
    </Picker>
  );
}
