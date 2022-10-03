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
import { HorizontalLayout, RankedTester, rankWith, RendererProps, uiTypeIs } from '@jsonforms/core';
import { withJsonFormsLayoutProps } from '@jsonforms/react';
import { StyleProps } from '@react-types/shared';
import { SpectrumLayout } from './SpectrumLayout';
import { renderChildren } from './util';
import SpectrumProvider from '../additional/SpectrumProvider';

/**
 * Default tester for a horizontal layout.
 * @type {RankedTester}
 */
export const SpectrumHorizontalLayoutTester: RankedTester = rankWith(
  1,
  uiTypeIs('HorizontalLayout')
);

const SpectrumHorizontalLayoutRenderer: React.FunctionComponent<RendererProps> = ({
  schema,
  uischema,
  enabled,
  visible,
  path,
}: RendererProps) => {
  const horizontalLayout = uischema as HorizontalLayout;
  const spacing: number[] = horizontalLayout.options?.spacing ?? [];
  const direction = 'row';
  const childrenStyles: (childIndex: number) => StyleProps = (i) => ({
    flexGrow: spacing[i] || 1,
    maxWidth: '100%',
    flexBasis: 0,
  });

  return (
    <SpectrumProvider>
      <SpectrumLayout
        direction={direction}
        visible={visible}
        enabled={enabled}
        path={path}
        uischema={uischema}
        schema={schema}
      >
        {renderChildren(horizontalLayout, schema, childrenStyles, path, enabled)}
      </SpectrumLayout>
    </SpectrumProvider>
  );
};

export default withJsonFormsLayoutProps(SpectrumHorizontalLayoutRenderer);
