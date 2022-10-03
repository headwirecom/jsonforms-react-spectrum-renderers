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
import React from 'react';
import { JsonFormsDispatch } from '@jsonforms/react';
import { JsonFormsReduxContext } from '@jsonforms/react/lib/redux';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Heading,
  Item,
  Content,
  View,
  Tabs,
  TabList,
  TabPanels,
  Provider,
  defaultTheme,
} from '@adobe/react-spectrum';
import './App.css';
import { initializedConnect, ExampleStateProps, ExampleDispatchProps } from './reduxUtil';
import { TextArea } from './TextArea';
import { circularReferenceReplacer, ReactExampleDescription } from './util';
import {
  getExamplesFromLocalStorage,
  setExampleInLocalStorage,
  localPrefix,
  localLabelSuffix,
} from './persistedExamples';
import { ExamplesPicker } from './ExamplesPicker';
import { samples } from './samples';

interface AppProps extends ExampleStateProps, ExampleDispatchProps {}

function App(props: AppProps & { selectedExample: ReactExampleDescription }) {
  const examplesSamples = props.examples.concat(samples);
  const setExampleByName = React.useCallback(
    (exampleName: string | number) => {
      const example = examplesSamples.find((find) => find.name === exampleName);
      if (example) {
        props.changeExample(example);
      }
    },
    [props.changeExample, examplesSamples]
  );

  const updateCurrentSchema = React.useCallback(
    (newSchema: string) => {
      props.changeExample(
        createExample(props.selectedExample, {
          schema: JSON.parse(newSchema),
        })
      );
    },
    [props.changeExample, props.selectedExample]
  );

  const updateCurrentUISchema = React.useCallback(
    (newUISchema: string) => {
      props.changeExample(
        createExample(props.selectedExample, {
          uischema: JSON.parse(newUISchema),
        })
      );
    },
    [props.changeExample, props.selectedExample]
  );

  const updateCurrentData = React.useCallback(
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
    <Provider theme={defaultTheme} id='SpectrumInputControlProvider'>
      <JsonFormsReduxContext>
        <View padding='size-100' minHeight='100vh' paddingTop='0' paddingBottom='size-800'>
          <div className='container'>
            <View padding='size-100'>
              <Heading>react, json-schema, jsonforms.io, react-spectrum</Heading>
              Generate{' '}
              <a href='https://react-spectrum.adobe.com/' target='_blank'>
                react-spectrum
              </a>{' '}
              based forms quickly by leveraging{' '}
              <a href='https://json-schema.org/' target='_blank'>
                json-schemas
              </a>{' '}
              for your object structure definition/validation, and{' '}
              <a href='https://www.jsonforms.io' target='_blank'>
                jsonforms.io
              </a>{' '}
              - choose a sample in the 'Examples' section to preview predefined forms (try for
              example one of the 'Categorization' examples). You can also modify the examples in the
              editors and save them to local storage to play with them later.
            </View>
          </div>
          <div className='container'>
            <div className='App-Form'>
              <View padding='size-100'>
                <Heading>Form: {props.selectedExample.label}</Heading>
                {!!props.getComponent(props.selectedExample)}
                <JsonFormsDispatch />
              </View>
            </div>

            <div className='App-Data tabs'>
              <View padding='size-100'>
                <Heading>Example Forms</Heading>
                <ExamplesPicker {...props} onChange={setExampleByName} />

                <Tabs aria-label='Example Tab' defaultSelectedKey='boundData'>
                  <TabList>
                    <Item key='boundData'>Bound data</Item>
                    <Item key='schema'>Schema</Item>
                    <Item key='uiSchema'>UI Schema</Item>
                  </TabList>

                  <TabPanels>
                    <Item key='boundData'>
                      <Content margin='size-100'>
                        <TextArea value={props.dataAsString} onChange={updateCurrentData} />
                      </Content>
                    </Item>

                    <Item key='schema'>
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
                  </TabPanels>
                </Tabs>
              </View>
            </div>
          </div>
        </View>
      </JsonFormsReduxContext>
    </Provider>
  );
}

function AppWithExampleInURL(props: AppProps) {
  const examplesSamples = props.examples.concat(samples);
  const urlParams = useParams<{ name: string | undefined }>();
  const navigate = useNavigate();
  const examplesRef = React.useRef([...examplesSamples, ...getExamplesFromLocalStorage()]);
  const examples = examplesRef.current;

  const selectedExample = urlParams.name
    ? examples.find(({ name }) => urlParams.name === name)
    : examplesSamples[examplesSamples.length - 1];

  const changeExample = React.useCallback(
    (example: ReactExampleDescription) => {
      // If we're trying to modify an item, save it to local storage and update the list of examples
      if (example.name.startsWith(localPrefix)) {
        setExampleInLocalStorage(example);
        examplesRef.current = [...examplesSamples, ...getExamplesFromLocalStorage()];
      }
      navigate(`/${example.name}`);
    },
    [props.changeExample, navigate]
  );

  // When URL changes, we have to call changeExample to dispatch some jsonforms redux actions
  React.useEffect(() => {
    if (selectedExample) {
      props.changeExample(selectedExample);
    } else {
      navigate('/');
    }
  }, [selectedExample, navigate]);

  // If name is invalid, redirect to home
  if (!selectedExample) {
    console.error(`Could not find an example with name "${urlParams.name}", redirecting to /`);
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
    name: example.name.startsWith(localPrefix) ? example.name : `${localPrefix}${example.name}`,
    label: example.label.endsWith(localLabelSuffix)
      ? example.label
      : `${example.label}${localLabelSuffix}`,
    ...part,
  };
}
