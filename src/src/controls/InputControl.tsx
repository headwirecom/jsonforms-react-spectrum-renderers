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
import {
  ControlProps,
  isControl,
  isDescriptionHidden,
  NOT_APPLICABLE,
  RankedTester,
  rankWith,
} from '@jsonforms/core';
import { DispatchCell, withJsonFormsControlProps } from '@jsonforms/react';
import { useFocus } from '../util/focus';
import merge from 'lodash/merge';
import maxBy from 'lodash/maxBy';
import { Flex, Text } from '@adobe/react-spectrum';

type overrideProps = {
  rootSchema?: any;
  config?: any;
};
export const InputControl = ({
  cells,
  config,
  description,
  errors,
  id,
  path,
  rootSchema,
  schema,
  uischema,
  visible,
}: ControlProps & overrideProps) => {
  const [focused, onFocus, onBlur] = useFocus();
  const classNames: any = {
    wrapper: 'control',
    description: 'input-description',
  }; // TODO: remove when fully implemented with Spectrum
  const isValid = errors.length === 0;
  const divClassNames = `validation  ${
    isValid ? classNames.description : 'validation_error'
  }`;

  const appliedUiSchemaOptions = merge({}, config, uischema.options);
  const showDescription = !isDescriptionHidden(
    visible,
    description,
    focused,
    appliedUiSchemaOptions.showUnfocusedDescription
  );

  const cell = maxBy(cells, (r) => r.tester(uischema, schema, rootSchema));
  if (
    cell === undefined ||
    cell.tester(uischema, schema, rootSchema) === NOT_APPLICABLE
  ) {
    console.warn('No applicable cell found.', uischema, schema);
    return null;
  } else {
    return (
      <div
        className={classNames.wrapper}
        hidden={!visible}
        onFocus={onFocus}
        onBlur={onBlur}
        id={id}
      >
        <Flex direction='column'>
          <DispatchCell
            uischema={uischema}
            schema={schema}
            path={path}
            id={id && `${id}-input`}
          />
          <div className={divClassNames}>
            <Text>
              {!isValid ? errors : showDescription ? description : null}
            </Text>
          </div>
        </Flex>
      </div>
    );
  }
};

export const inputControlTester: RankedTester = rankWith(1, isControl);

export default withJsonFormsControlProps(InputControl);
