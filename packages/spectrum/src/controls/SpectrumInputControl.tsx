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
import React from 'react';
import {
  ControlProps,
  ControlState,
  isDescriptionHidden,
} from '@jsonforms/core';
import { Control } from '@jsonforms/react';
import { VanillaRendererProps } from '../index';
import merge from 'lodash/merge';
import { Flex, Text, View } from '@adobe/react-spectrum';

interface WithInput {
  input: any;
}

export class SpectrumInputControl extends Control<
  ControlProps & VanillaRendererProps & WithInput,
  ControlState
> {
  render() {
    const {
      description,
      id,
      errors,
      uischema,
      visible,
      config,
      input,
    } = this.props;

    const InnerComponent = input;

    const isValid = errors ? errors.length === 0 : true;

    const appliedUiSchemaOptions = merge({}, config, uischema.options);
    const showDescription = !isDescriptionHidden(
      visible,
      description,
      this.state.isFocused,
      appliedUiSchemaOptions.showUnfocusedDescription
    );

    // use UNSAFE style property for now, since text colors are not supported yet, see https://github.com/adobe/react-spectrum/issues/864
    const UNSAFE_error = {
      color: 'rgb(215, 55, 63)',
    };

    return (
      <div
        hidden={visible === undefined || visible === null ? false : !visible}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        id={id}
      >
        <Flex direction='column'>
          <InnerComponent
            {...this.props}
            id={id + '-input'}
            isValid={isValid}
          />
          <View UNSAFE_style={!isValid ? UNSAFE_error : {}}>
            <Text>
              {!isValid ? errors : showDescription ? description : null}
            </Text>
          </View>
        </Flex>
      </div>
    );
  }
}
