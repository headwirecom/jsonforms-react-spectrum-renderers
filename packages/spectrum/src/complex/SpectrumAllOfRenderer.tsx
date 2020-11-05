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
  createCombinatorRenderInfos,
  findMatchingUISchema,
  isAllOfControl,
  JsonSchema,
  RankedTester,
  rankWith,
  resolveSubSchemas,
  StatePropsOfCombinator,
} from '@jsonforms/core';
import {
  ResolvedJsonFormsDispatch,
  withJsonFormsAllOfProps,
} from '@jsonforms/react';
import { View } from '@adobe/react-spectrum';

const SpectrumAllOfRenderer = ({
  schema,
  rootSchema,
  visible,
  renderers,
  cells,
  path,
  uischemas,
  uischema,
}: StatePropsOfCombinator) => {
  const _schema = resolveSubSchemas(schema, rootSchema, 'allOf');
  const delegateUISchema = findMatchingUISchema(uischemas)(
    _schema,
    uischema.scope,
    path
  );
  if (delegateUISchema) {
    return (
      <View isHidden={!visible}>
        <ResolvedJsonFormsDispatch
          schema={_schema}
          uischema={delegateUISchema}
          path={path}
          renderers={renderers}
          cells={cells}
        />
      </View>
    );
  }
  const allOfRenderInfos = createCombinatorRenderInfos(
    (_schema as JsonSchema).allOf,
    rootSchema,
    'allOf',
    uischema,
    path,
    uischemas
  );

  return (
    <View isHidden={!visible}>
      {allOfRenderInfos.map((allOfRenderInfo, allOfIndex) => (
        <ResolvedJsonFormsDispatch
          key={allOfIndex}
          schema={allOfRenderInfo.schema}
          uischema={allOfRenderInfo.uischema}
          path={path}
          renderers={renderers}
          cells={cells}
        />
      ))}
    </View>
  );
};

export const spectrumAllOfRendererTester: RankedTester = rankWith(
  3,
  isAllOfControl
);
export default withJsonFormsAllOfProps(SpectrumAllOfRenderer);
