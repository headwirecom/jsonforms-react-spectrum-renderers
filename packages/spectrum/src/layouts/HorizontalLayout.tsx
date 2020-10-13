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
import React, { FunctionComponent } from 'react';
import {
  HorizontalLayout,
  RankedTester,
  rankWith,
  RendererProps,
  uiTypeIs
} from '@jsonforms/core';
import { withJsonFormsLayoutProps } from '@jsonforms/react';
import { StyleProps } from '@react-types/shared';
import { withVanillaControlProps } from '../util';
import { JsonFormsLayout } from './JsonFormsLayout';
import { renderChildren } from './util';

/**
 * Default tester for a horizontal layout.
 * @type {RankedTester}
 */
export const horizontalLayoutTester: RankedTester = rankWith(1, uiTypeIs('HorizontalLayout'));

const HorizontalLayoutRenderer: FunctionComponent<RendererProps> = (
  {
    schema,
    uischema,
    enabled,
    visible,
    path
  }: RendererProps
) => {

  const horizontalLayout = uischema as HorizontalLayout;
  const direction = 'row';
  const childrenStyles: StyleProps = {
    flexGrow: 1,
    maxWidth: '100%',
    flexBasis: 0,
  };

  return (
    <JsonFormsLayout
      direction={direction}
      visible={visible}
      enabled={enabled}
      path={path}
      uischema={uischema}
      schema={schema}
    >
      {renderChildren(horizontalLayout, schema, childrenStyles, path)}
    </JsonFormsLayout>
  );
};

export default withVanillaControlProps(withJsonFormsLayoutProps(HorizontalLayoutRenderer));
