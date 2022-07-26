/*
  The MIT License

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
/* import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/mbo.css';
import 'codemirror/theme/base16-light.css'; */
import * as React from 'react';
// import { UnControlled as CodeMirror } from 'react-codemirror2';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { ColorSchemeContext } from '../../src/util/ColorSchemeContext';
import { ButtonGroup, Button, StatusLight, View } from '@adobe/react-spectrum';

// import 'codemirror/mode/javascript/javascript';

export function TextArea(props: {
  value: string;
  onChange: (newValue: string) => void;
}) {
  const colorScheme = React.useContext(ColorSchemeContext);
  const [value, setValue] = React.useState(props.value);
  const err = getErr(value);
  const [key, setKey] = React.useState(Math.random()); // used to force-rerender CodeMirror when Reset button is clicked
  const reset = React.useCallback(() => {
    setValue(props.value);
    setKey(Math.random());
  }, [props.value]);
  const save = React.useCallback(() => {
    props.onChange(value);
  }, [value]);

  const onChangeHandler = React.useCallback((value: any, _viewUpdate: any) => {
    console.log('value:', value);
  }, []);

  return (
    <>
      <CodeMirror
        key={key}
        value={props.value}
        onChange={onChangeHandler}
        extensions={[javascript()]}
      />
      <View paddingTop='size-50'>
        {value && err && <StatusLight variant='negative'>{err}</StatusLight>}
        {value && !err && (
          <StatusLight variant='positive'>Valid JSON</StatusLight>
        )}
        {value !== props.value && (
          <ButtonGroup>
            <Button variant='cta' onPress={save} isDisabled={!!err}>
              Save
            </Button>
            <Button variant='primary' onPress={reset}>
              Reset
            </Button>
          </ButtonGroup>
        )}
      </View>
    </>
  );
}

function getErr(value: string) {
  if (!value) {
    return null;
  }

  try {
    JSON.parse(value);
    return null;
  } catch (err) {
    return String(err);
  }
}
