/*
  The MIT License

  Copyright (c) 2017-2019 EclipseSource Munich
  https://github.com/eclipsesource/jsonforms

  Copyright (c) 2022 headwire.com, Inc
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

import { ArrayControlProps, ControlElement, Helpers } from '@jsonforms/core';
import { withJsonFormsArrayControlProps } from '@jsonforms/react';
import SpectrumArrayModalControl from './SpectrumArrayModalControl';

const SpectrumArrayModalControlRenderer = React.memo(
  ({
    addItem,
    data,
    enabled,
    errors,
    id,
    path,
    removeItems,
    rootSchema,
    schema,
    uischema,
    uischemas = [],
    visible,
  }: ArrayControlProps) => {
    const controlElement = uischema as ControlElement;
    const labelDescription = Helpers.createLabelDescriptionFrom(controlElement, schema);
    const label = labelDescription.show ? labelDescription.text : undefined;

    return visible ? (
      <SpectrumArrayModalControl
        addItem={addItem}
        data={data}
        enabled={enabled}
        errors={errors}
        id={id}
        label={label ?? ''}
        path={path}
        removeItems={removeItems}
        rootSchema={rootSchema}
        schema={schema}
        uischema={uischema}
        uischemas={uischemas}
        visible={visible}
      />
    ) : null;
  }
);

export default withJsonFormsArrayControlProps(SpectrumArrayModalControlRenderer);
