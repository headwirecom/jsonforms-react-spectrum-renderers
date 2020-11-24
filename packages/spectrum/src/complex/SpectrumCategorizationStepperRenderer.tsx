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
import React, { Key } from 'react';
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
import { RendererComponent, withJsonFormsLayoutProps } from '@jsonforms/react';
import { Tabs } from '@react-spectrum/tabs';
import {
  Button,
  ButtonGroup,
  Content,
  Flex,
  Item,
} from '@adobe/react-spectrum';
import merge from 'lodash/merge';
import { AjvProps, withAjvProps } from '../util';
import { SpectrumVerticalLayout } from '../layouts';

import './SpectrumCategorizationStepper.css';

export const spectrumCategorizationStepperRendererTester: RankedTester = rankWith(
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

class SpectrumCategorizationStepperRenderer extends RendererComponent<
  SpectrumCategorizationRendererProps
> {
  state: { selectedStep: number } = {
    selectedStep: 0,
  };

  selectStep = (selectedItem: Key): void => {
    const selectedStep = Number(selectedItem);
    if (this.state.selectedStep !== selectedStep) {
      this.setState({ selectedStep });
    }
  };

  /**
   * @inheritDoc
   */
  render() {
    const { path, schema, visible, enabled, uischema, config } = this.props;
    const appliedUiSchemaOptions = merge({}, config, uischema.options);
    const categories = this.getCategories();
    const { selectedStep } = this.state;

    return (
      <Flex
        direction='column'
        isHidden={!visible}
        UNSAFE_className='categorization-stepper'
      >
        <Tabs
          isDisabled={!enabled}
          selectedKey={String(selectedStep)}
          onSelectionChange={this.selectStep}
        >
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
              isDisabled={selectedStep <= 0}
              onPress={() => this.selectStep(selectedStep - 1)}
            >
              Previous
            </Button>
            <Button
              variant='primary'
              isDisabled={selectedStep >= categories.length - 1}
              onPress={() => this.selectStep(selectedStep + 1)}
            >
              Next
            </Button>
          </ButtonGroup>
        ) : (
          <></>
        )}
      </Flex>
    );
  }

  private getCategories(): ReadonlyArray<Categorization | Category> {
    const { data, uischema, ajv } = this.props;
    const categorization = uischema as Categorization;

    return categorization.elements.filter((category) =>
      isVisible(category, data, undefined, ajv)
    );
  }
}

export default withJsonFormsLayoutProps(
  withAjvProps(SpectrumCategorizationStepperRenderer)
);
