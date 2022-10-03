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
import * as React from 'react';

import {
  createCombinatorRenderInfos,
  isAnyOfControl,
  RankedTester,
  rankWith,
  StatePropsOfCombinator,
} from '@jsonforms/core';
import { JsonFormsDispatch, withJsonFormsAnyOfProps } from '@jsonforms/react';
import CombinatorProperties from './CombinatorProperties';
import { Content, Item, View, TabList, TabPanels, Tabs } from '@adobe/react-spectrum';

const SpectrumAnyOfRenderer = ({
  schema,
  rootSchema,
  indexOfFittingSchema,
  visible,
  path,
  renderers,
  cells,
  uischema,
  uischemas,
}: StatePropsOfCombinator) => {
  const [selectedAnyOf, setSelectedAnyOf] = React.useState(indexOfFittingSchema || 0);
  const handleChange = React.useCallback(
    (value: React.Key) => setSelectedAnyOf(Number(value)),
    [setSelectedAnyOf]
  );
  const anyOf = 'anyOf';
  let anyOfRenderInfos;
  if (schema?.anyOf) {
    anyOfRenderInfos = createCombinatorRenderInfos(
      schema.anyOf,
      rootSchema,
      anyOf,
      uischema,
      path,
      uischemas
    );
  }

  return (
    <View isHidden={!visible} UNSAFE_className={`anyof-renderer`}>
      <CombinatorProperties schema={schema} combinatorKeyword={'anyOf'} path={path} />
      {anyOfRenderInfos && (
        <Tabs selectedKey={String(selectedAnyOf)} onSelectionChange={handleChange}>
          <TabList>
            {anyOfRenderInfos?.map((anyOfRenderInfo, anyOfIndex) => (
              <Item key={anyOfIndex}>{anyOfRenderInfo.label}</Item>
            ))}
          </TabList>
          <TabPanels>
            {anyOfRenderInfos?.map((anyOfRenderInfo, anyOfIndex) => (
              <Item key={anyOfIndex} title={anyOfRenderInfo.label}>
                <Content margin='size-160'>
                  <JsonFormsDispatch
                    key={anyOfIndex}
                    schema={anyOfRenderInfo.schema}
                    uischema={anyOfRenderInfo.uischema}
                    path={path}
                    renderers={renderers}
                    cells={cells}
                  />
                </Content>
              </Item>
            ))}
          </TabPanels>
        </Tabs>
      )}
    </View>
  );
};

export const SpectrumAnyOfRendererTester: RankedTester = rankWith(3, isAnyOfControl);
export default withJsonFormsAnyOfProps(SpectrumAnyOfRenderer);
