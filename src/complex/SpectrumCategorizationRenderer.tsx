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
  and,
  Categorization,
  Category,
  isVisible,
  RankedTester,
  rankWith,
  StatePropsOfLayout,
  Tester,
  UISchemaElement,
  uiTypeIs,
} from '@jsonforms/core';
import { withJsonFormsLayoutProps } from '@jsonforms/react';
import { Content, Item, TabList, TabPanels, Tabs, View } from '@adobe/react-spectrum';
import { AjvProps, withAjvProps } from '../util';
import { SpectrumVerticalLayout } from '../layouts';
import SpectrumProvider from '../additional/SpectrumProvider';

export const isSingleLevelCategorization: Tester = and(
  uiTypeIs('Categorization'),
  (uischema: UISchemaElement): boolean => {
    const categorization = uischema as Categorization;

    return (
      categorization.elements &&
      categorization.elements.length > 0 &&
      categorization.elements.reduce((acc, e) => acc && e.type === 'Category', true)
    );
  }
);

export const SpectrumCategorizationRendererTester: RankedTester = rankWith(
  1,
  isSingleLevelCategorization
);

export interface SpectrumCategorizationRendererProps extends StatePropsOfLayout, AjvProps {}

export const SpectrumCategorizationRenderer = (props: SpectrumCategorizationRendererProps) => {
  const { data, path, schema, uischema, visible, enabled, ajv } = props;

  const categorization = uischema as Categorization;
  const categories = categorization.elements.filter(
    (category: Categorization | Category, _index: number) => isVisible(category, data, '', ajv)
  );

  // checking formLocation to see if it should have a different default tab
  const params = new URL(window.location.href).searchParams;
  let formLocation: any = params.get('formLocation');
  formLocation = formLocation
    ?.split('_')
    .map((item: string) => {
      const cutIndex = item.lastIndexOf('-');
      return item.substring(0, cutIndex).replace('-', '.');
    })
    .join('.');
  let defaultOpenTab = '0';
  if (formLocation && formLocation.includes(path)) {
    for (let i = 0; i < categories.length; i++) {
      const searchLabel =
        categories[i].label.charAt(0).toLowerCase() + categories[i].label.slice(1);
      if (formLocation.includes(`${path}.${searchLabel}`)) {
        defaultOpenTab = i.toString();
        break;
      }
    }
  }

  return (
    <View isHidden={!visible}>
      <SpectrumProvider>
        <Tabs
          aria-label='Categorization' /* isDisabled={enabled === undefined ? false : !enabled} */
          defaultSelectedKey={defaultOpenTab}
        >
          <TabList>
            {categories?.map((category: { [key: string]: any }, index) => {
              return (
                <Item key={index}>
                  {category?.label ?? category?.i18n ?? `Category ${index + 1}`}
                </Item>
              );
            })}
          </TabList>
          <TabPanels>
            {categories?.map((category: { [key: string]: any }, index) => (
              <Item
                key={index}
                title={category?.label ?? category?.i18n ?? `Category ${index + 1}`}
              >
                <Content margin='size-160'>
                  <SpectrumVerticalLayout
                    uischema={
                      {
                        type: 'VerticalLayout',
                        elements: category.elements ?? [],
                      } as UISchemaElement
                    }
                    schema={schema}
                    path={path}
                    direction='column'
                    enabled={enabled === undefined ? true : enabled}
                    visible={visible === undefined ? true : visible}
                  ></SpectrumVerticalLayout>
                </Content>
              </Item>
            ))}
          </TabPanels>
        </Tabs>
      </SpectrumProvider>
    </View>
  );
};

export default withJsonFormsLayoutProps(withAjvProps(SpectrumCategorizationRenderer));
