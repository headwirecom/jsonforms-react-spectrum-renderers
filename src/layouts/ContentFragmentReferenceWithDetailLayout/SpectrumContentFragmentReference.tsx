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
import { Flex, Heading, Text, View } from '@adobe/react-spectrum';
import {
  JsonFormsRendererRegistryEntry,
  JsonFormsState,
  JsonSchema,
  RendererProps,
  Resolve,
  UISchemaElement,
  composePaths,
  getData,
} from '@jsonforms/core';
import { JsonFormsStateContext, withJsonFormsContext } from '@jsonforms/react';
// import areEqual from '../../util/areEqual';
import { findValue } from './utils';
import Item from './ContentFragmentReferenceWithDetailLayoutItem/Item';
export interface extendedLayoutRendererProps extends RendererProps {
  data?: any;
  elements: JSX.Element[];
  enabled: boolean;
  label?: string | undefined;
  layout: any;
  removeItem?: (path: string, value: number) => () => void;
}

export const SpectrumContentFragmentReference = React.memo(
  ({
    data,
    elements,
    enabled,
    label,
    layout,
    path,
    removeItem,
    renderers,
    schema,
    uischema,
    visible,
  }: extendedLayoutRendererProps) => {
    return (
      <View>
        <Flex direction='row' justifyContent='space-between'>
          <Heading level={4}>{label}</Heading>
        </Flex>
        <Flex direction='column' gap='size-100'>
          {elements?.length ? (
            Array.from(Array(elements?.length)).map((_, index) => {
              return (
                <Flex key={index} direction='row' alignItems='stretch' flex='auto inherit'>
                  <Item
                    data={data}
                    elements={elements}
                    enabled={enabled}
                    index={index}
                    layout={layout?.elements[index]}
                    path={path}
                    removeItem={removeItem}
                    renderers={renderers}
                    schema={schema}
                    uischema={uischema}
                    visible={visible}
                  ></Item>
                </Flex>
              );
            })
          ) : (
            <Text>No data</Text>
          )}
        </Flex>
      </View>
    );
  }
);

export interface OwnPropsOfSpectrumArrayModalItem {
  childData?: any;
  childLabel?: string | undefined;
  data?: any;
  elements: any;
  enabled: boolean;
  index: number;
  keyNumber?: number;
  label?: string | undefined;
  layout: any;
  path: string;
  removeItem?: (path: string, value: number) => () => void;
  renderers?: JsonFormsRendererRegistryEntry[] | undefined;
  schema: JsonSchema;
  uischema: UISchemaElement;
  visible: boolean;
}

/**
 * Map state to control props.No indexOfFittingSchema found
 * @param state the store's state
 * @param ownProps any own props
 * @returns {StatePropsOfControl} state props for a control
 */
export const mapStateToSpectrumArrayModalItemProps = (
  state: JsonFormsState,
  ownProps: OwnPropsOfSpectrumArrayModalItem
): OwnPropsOfSpectrumArrayModalItem => {
  const { schema, path, index, uischema } = ownProps;
  const firstPrimitiveProp = schema?.properties
    ? Object.keys(schema?.properties).find((propName) => {
        if (schema.properties) {
          const prop = schema?.properties[propName];
          return prop.type === 'string' || prop.type === 'number' || prop.type === 'integer';
        }
      })
    : undefined;
  const childPath = composePaths(path, `${index}`);
  const childData = Resolve.data(getData(state), childPath);
  const childLabel =
    uischema.options?.elementLabelProp ?? firstPrimitiveProp ?? uischema.options?.childDataAsLabel
      ? childData
      : undefined ?? typeof uischema.options?.dataAsLabel === 'number'
      ? Object.values(childData)[uischema.options?.dataAsLabel]
      : findValue(childData, uischema.options?.dataAsLabel) ?? `Item ${index + 1}`;

  return {
    ...ownProps,
    childLabel,
    childData,
  };
};

export const ctxToSpectrumArrayModalItemProps = (
  ctx: JsonFormsStateContext,
  ownProps: OwnPropsOfSpectrumArrayModalItem
) => mapStateToSpectrumArrayModalItemProps({ jsonforms: { ...ctx } }, ownProps);

const withContextToSpectrumArrayModalItemProps =
  (
    Component: React.ComponentType<OwnPropsOfSpectrumArrayModalItem>
  ): React.ComponentType<OwnPropsOfSpectrumArrayModalItem> =>
  ({ ctx, props, DNDHandle }: JsonFormsStateContext & OwnPropsOfSpectrumArrayModalItem) => {
    const stateProps = ctxToSpectrumArrayModalItemProps(ctx, props);
    return <Component {...stateProps} {...DNDHandle} />;
  };

export const withJsonFormsSpectrumArrayModalItemProps = (
  Component: React.ComponentType<OwnPropsOfSpectrumArrayModalItem>
): React.ComponentType<any> =>
  withJsonFormsContext(
    withContextToSpectrumArrayModalItemProps(
      React.memo(
        Component /* ,
        (
          prevProps: OwnPropsOfSpectrumArrayModalItem,
          nextProps: OwnPropsOfSpectrumArrayModalItem
        ) => {
          const { removeItem: prevRemoveItem, ...restPrevProps } = prevProps;
          const { removeItem: nextRemoveItem, ...restNextProps } = nextProps;
          return areEqual(restPrevProps, restNextProps);
        } */
      )
    )
  );

export default withJsonFormsSpectrumArrayModalItemProps(SpectrumContentFragmentReference);
