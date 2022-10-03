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
import { ReactExampleDescription } from './util';

const key = 'customExamples';

export const localPrefix = 'modified-';
export const localLabelSuffix = ' - Modified';

export function getExamplesFromLocalStorage(): ReactExampleDescription[] {
  try {
    const examples = JSON.parse(localStorage.getItem(key) || '');
    if (!Array.isArray(examples)) {
      return [];
    }
    return examples.filter((example) => {
      return (
        typeof example === 'object' &&
        'name' in example &&
        typeof example.name === 'string' &&
        example.name.startsWith(localPrefix) &&
        'label' in example &&
        typeof example.label === 'string' &&
        example.label.endsWith(localLabelSuffix) &&
        'data' in example &&
        'schema' in example &&
        typeof example.schema === 'object' &&
        'uischema' in example &&
        typeof example.uischema === 'object'
      );
    });
  } catch (err) {
    return [];
  }
}

export function setExampleInLocalStorage(example: ReactExampleDescription) {
  const examples = getExamplesFromLocalStorage();
  const indexOfExample = examples.findIndex(({ name }) => example.name === name);
  const newExamples =
    indexOfExample === -1
      ? examples.concat(example)
      : [...examples.slice(0, indexOfExample), example, ...examples.slice(indexOfExample + 1)];
  localStorage.setItem(key, JSON.stringify(newExamples));
}
