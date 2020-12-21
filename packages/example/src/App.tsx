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

import React, { useCallback, useEffect, useRef } from 'react';
import { JsonFormsDispatch, JsonFormsReduxContext } from '@jsonforms/react';
import { useParams, useHistory } from 'react-router-dom';
import { Heading, Item, Content, View } from '@adobe/react-spectrum';
import { Tabs } from '@react-spectrum/tabs';
import './App.css';
import {
  initializedConnect,
  ExampleStateProps,
  ExampleDispatchProps,
} from './reduxUtil';
import { TextArea } from './TextArea';
import { circularReferenceReplacer, ReactExampleDescription } from './util';
import {
  getExamplesFromLocalStorage,
  setExampleInLocalStorage,
  localPrefix,
  localLabelSuffix,
} from './persistedExamples';
import { ExamplesPicker } from './ExamplesPicker';

interface AppProps extends ExampleStateProps, ExampleDispatchProps {}

function App(props: AppProps & { selectedExample: ReactExampleDescription }) {
  const setExampleByName = useCallback(
    (exampleName: string | number) => {
      const example = props.examples.find(
        (example) => example.name === exampleName
      );
      if (example) {
        props.changeExample(example);
      }
    },
    [props.changeExample, props.examples]
  );

  const updateCurrentSchema = useCallback(
    (newSchema: string) => {
      props.changeExample(
        createExample(props.selectedExample, {
          schema: JSON.parse(newSchema),
        })
      );
    },
    [props.changeExample, props.selectedExample]
  );

  const updateCurrentUISchema = useCallback(
    (newUISchema: string) => {
      props.changeExample(
        createExample(props.selectedExample, {
          uischema: JSON.parse(newUISchema),
        })
      );
    },
    [props.changeExample, props.selectedExample]
  );

  const updateCurrentData = useCallback(
    (newData: string) => {
      props.changeExample(
        createExample(props.selectedExample, {
          data: JSON.parse(newData),
        })
      );
    },
    [props.changeExample, props.selectedExample]
  );

  return (
    <JsonFormsReduxContext>
      <View
        padding='size-100'
        minHeight='100vh'
        paddingTop='0'
        paddingBottom='size-800'
      >
        <div className='container'>
          <div className='App-Form'>
            <View padding='size-100'>
              <Heading>{props.selectedExample.label}</Heading>
              {props.getComponent(props.selectedExample)}
              <JsonFormsDispatch onChange={props.onChange} />
            </View>
          </div>

          <div className='App-Data tabs'>
            <View padding='size-100'>
              <Heading>JsonForms Examples</Heading>
              <ExamplesPicker {...props} onChange={setExampleByName} />
              <Tabs defaultSelectedKey='boundData'>
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
                      value={
                        JSON.stringify(
                          props.selectedExample.uischema,
                          circularReferenceReplacer(),
                          2
                        ) || ''
                      }
                      onChange={updateCurrentUISchema}
                    />
                  </Content>
                </Item>
                <Item key='schema' title='Schema'>
                  <Content margin='size-100'>
                    <TextArea
                      value={
                        JSON.stringify(
                          props.selectedExample.schema,
                          circularReferenceReplacer(),
                          2
                        ) || ''
                      }
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

function AppWithExampleInURL(props: AppProps) {
  const urlParams = useParams<{ name: string | undefined }>();
  const history = useHistory();
  const examplesRef = useRef([
    ...props.examples,
    ...getExamplesFromLocalStorage(),
  ]);
  const examples = examplesRef.current;

  const selectedExample = urlParams.name
    ? examples.find(({ name }) => urlParams.name === name)
    : examples[examples.length - 1];

  const changeExample = useCallback(
    (example: ReactExampleDescription) => {
      // If we're trying to modify an item, save it to local storage and update the list of examples
      if (example.name.startsWith(localPrefix)) {
        setExampleInLocalStorage(example);
        examplesRef.current = [
          ...props.examples,
          ...getExamplesFromLocalStorage(),
        ];
      }
      history.push(`/${example.name}`);
    },
    [props.changeExample, history]
  );

  // When URL changes, we have to call changeExample to dispatch some jsonforms redux actions
  useEffect(() => {
    if (selectedExample) {
      props.changeExample(selectedExample);
    }
  }, [selectedExample]);

  // If name is invalid, redirect to home
  if (!selectedExample) {
    console.error(
      `Could not find an example with name "${urlParams.name}", redirecting to /`
    );
    history.push('/');
    return null;
  }

  return (
    <App
      {...props}
      examples={examples}
      selectedExample={selectedExample}
      changeExample={changeExample}
    />
  );
}

export const ConnectedApp = initializedConnect(AppWithExampleInURL);

function createExample(
  example: ReactExampleDescription,
  part: Partial<ReactExampleDescription>
): ReactExampleDescription {
  return {
    ...example,
    name: example.name.startsWith(localPrefix)
      ? example.name
      : `${localPrefix}${example.name}`,
    label: example.label.endsWith(localLabelSuffix)
      ? example.label
      : `${example.label}${localLabelSuffix}`,
    ...part,
  };
}
