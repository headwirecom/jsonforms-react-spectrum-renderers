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
  and,
  Categorization,
  categorizationHasCategory,
  Category,
  isVisible,
  optionIs,
  RankedTester,
  rankWith,
  StatePropsOfLayout,
  UISchemaElement,
  uiTypeIs,
} from '@jsonforms/core';
import { withJsonFormsLayoutProps } from '@jsonforms/react';
import {
  Button,
  ButtonGroup,
  Content,
  Flex,
  Item,
  TabList,
  TabPanels,
  Tabs,
} from '@adobe/react-spectrum';
import merge from 'lodash/merge';
import { AjvProps, withAjvProps } from '../util';
import { SpectrumVerticalLayout } from '../layouts';
import SpectrumProvider from '../additional/SpectrumProvider';

import './SpectrumCategorizationStepper.css';

export const SpectrumCategorizationStepperRendererTester: RankedTester =
  rankWith(
    2,
    and(
      uiTypeIs('Categorization'),
      categorizationHasCategory,
      optionIs('variant', 'stepper')
    )
  );

export interface SpectrumCategorizationRendererProps
  extends StatePropsOfLayout,
    AjvProps {}

export const SpectrumCategorizationStepperRenderer = (
  props: SpectrumCategorizationRendererProps
) => {
  const { data, ajv, path, schema, visible, enabled, uischema, config } = props;
  const [step, setStep] = React.useState(0);

  const selectStep = (selectedItem: any): void => {
    setStep(Number(selectedItem));
  };
  const appliedUiSchemaOptions = merge({}, config, uischema.options);
  const categorization = uischema as Categorization;
  const categories = categorization.elements.filter((category: Category) =>
    isVisible(category, data, undefined, ajv)
  );

  return (
    <SpectrumProvider>
      <Flex
        direction='column'
        isHidden={!visible}
        UNSAFE_className='categorization-stepper'
      >
        <Tabs
          isDisabled={enabled === undefined ? false : !enabled}
          selectedKey={String(step)}
          onSelectionChange={selectStep}
        >
          <TabList>
            {categories.map((category, index) => (
              <Item key={index}>{category.label}</Item>
            ))}
          </TabList>
          <TabPanels>
            {categories.map((category, index) => (
              <Item key={index} title={category.label}>
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
                  ></SpectrumVerticalLayout>
                </Content>
              </Item>
            ))}
          </TabPanels>
        </Tabs>
        {Boolean(appliedUiSchemaOptions.showNavButtons) ? (
          <ButtonGroup
            marginX='size-160'
            marginBottom='size-160'
            flex='auto'
            align='end'
          >
            <Button
              variant='secondary'
              isDisabled={step <= 0}
              onPress={() => selectStep(step - 1)}
            >
              Previous
            </Button>
            <Button
              variant='primary'
              isDisabled={step >= categories.length - 1}
              onPress={() => selectStep(step + 1)}
            >
              Next
            </Button>
          </ButtonGroup>
        ) : (
          <></>
        )}
      </Flex>
    </SpectrumProvider>
  );
};

export default withJsonFormsLayoutProps(
  withAjvProps(SpectrumCategorizationStepperRenderer)
);
