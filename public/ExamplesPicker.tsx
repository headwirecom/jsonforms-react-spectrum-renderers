/*
  The MIT License

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

import * as React from 'react';
import { Item, Picker, Section } from '@adobe/react-spectrum';
import './App.css';
import { localPrefix } from './persistedExamples';
import { ReactExampleDescription } from './util';

export function ExamplesPicker(props: {
  examples: ReactExampleDescription[];
  selectedExample: ReactExampleDescription;
  onChange: (exampleName: string | number) => void;
}) {
  // Re-create Picker instance (by changing key) when examples array changes, otherwise selection won't update on Save
  const prevExamples = React.useRef(props.examples);
  const keyRef = React.useRef(0);
  if (prevExamples.current !== props.examples) {
    prevExamples.current = props.examples;
    keyRef.current++;
  }

  const options = [
    {
      name: 'Locally Modified Tests',
      children: props.examples
        .filter((example) => example.name.startsWith(localPrefix))
        .map((item) => ({ ...item, id: item.name })),
    },
    {
      name: 'React Spectrum Tests',
      children: props.examples
        .filter((example) => example.name.startsWith('spectrum-'))
        .map((item) => ({ ...item, id: item.name })),
    },
    {
      name: 'JSONForms Tests',
      children: props.examples
        .filter(
          (example) =>
            !example.name.startsWith('spectrum-') && !example.name.startsWith(localPrefix)
        )
        .map((item) => ({ ...item, id: item.name })),
    },
  ].filter((category) => category.children.length);

  return (
    <Picker
      key={keyRef.current}
      aria-label='JSONForms Examples'
      items={options}
      width='100%'
      defaultSelectedKey={props.selectedExample.name}
      onSelectionChange={props.onChange}
    >
      {(item) => (
        <Section
          aria-label={`Example Section ${item?.name}`}
          key={item?.name}
          items={item?.children}
          title={item?.name}
        >
          {(item) => <Item aria-label={`Example Picker ${item?.label}`}>{item?.label}</Item>}
        </Section>
      )}
    </Picker>
  );
}
