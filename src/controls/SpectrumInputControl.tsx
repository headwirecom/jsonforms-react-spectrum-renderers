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
import { ControlProps, isDescriptionHidden } from '@jsonforms/core';
import merge from 'lodash/merge';
import { Flex, Text, View } from '@adobe/react-spectrum';
import { useFocus } from '../util/focus';
import SpectrumProvider from '../additional/SpectrumProvider';
interface WithInput {
  input: any;
}

export const SpectrumInputControl = (props: ControlProps & WithInput) => {
  const [focused, onFocus, onBlur] = useFocus();
  const { description, id, errors, uischema, visible, config, input } = props;

  const InnerComponent = input;

  const isValid = errors.length === 0;
  const appliedUiSchemaOptions = merge({}, config, uischema.options);

  const showDescription = !isDescriptionHidden(
    visible,
    description,
    focused,
    appliedUiSchemaOptions.showUnfocusedDescription
  );

  return (
    <div
      onFocus={onFocus}
      onBlur={onBlur}
      hidden={visible === undefined || visible === null ? false : !visible}
      id={id}
    >
      <SpectrumProvider>
        <Flex direction='column'>
          <InnerComponent {...props} id={id && `${id}-input`} isValid={isValid} />
          <View>
            <Text>{!isValid ? errors : showDescription ? description : null}</Text>
          </View>
        </Flex>
      </SpectrumProvider>
    </div>
  );
};
