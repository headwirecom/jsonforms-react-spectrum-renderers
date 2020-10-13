/*
  The MIT License

  Copyright (c) 2017-2019 EclipseSource Munich
  https://github.com/eclipsesource/jsonforms

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
import maxBy from 'lodash/maxBy';
import React from 'react';
import {
  ControlProps,
  ControlState,
  isDescriptionHidden,
  NOT_APPLICABLE,
} from '@jsonforms/core';
import { Control } from '@jsonforms/react';
import { VanillaRendererProps } from '../index';
import merge from 'lodash/merge';
import { Flex, Text } from '@adobe/react-spectrum';

interface WithInput {
  input: any;
}

export class SpectrumInputControl extends Control<
  ControlProps & VanillaRendererProps & WithInput,
  ControlState
> {
  render() {
    const {
      //classNames,
      description,
      id,
      errors,
      uischema,
      schema,
      visible,
      cells,
      config,
      input,
    } = this.props;

    const InnerComponent = input;

    const isValid = errors ? errors.length === 0 : true;
    // const divClassNames = `validation  ${
    //   isValid ? classNames.description : 'validation_error'
    // }`;

    const appliedUiSchemaOptions = merge({}, config, uischema.options);
    const showDescription = !isDescriptionHidden(
      visible,
      description,
      this.state.isFocused,
      appliedUiSchemaOptions.showUnfocusedDescription
    );

    const cell = maxBy(cells, (r) => r.tester(uischema, schema));
    if (
      cell === undefined ||
      cell.tester(uischema, schema) === NOT_APPLICABLE
    ) {
      console.warn('No applicable cell found.', uischema, schema);
      return null;
    } else {
      return (
        <div
          //className={classNames.wrapper}
          hidden={!visible}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          id={id}
        >
          <Flex direction='column'>
            <InnerComponent {...this.props} />
            <div>
              <Text>
                {!isValid ? errors : showDescription ? description : null}
              </Text>
            </div>
          </Flex>
        </div>
      );
    }
  }
}
