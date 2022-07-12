import React, { ComponentType } from 'react';
import SpectrumArrayModalItem from './ModalItemComponent';
import {
  ControlElement,
  JsonFormsRendererRegistryEntry,
  JsonFormsState,
  JsonSchema,
  Resolve,
  UISchemaElement,
  UISchemaTester,
  composePaths,
  getData,
} from '@jsonforms/core';
import {
  JsonFormsStateContext,
  areEqual,
  withJsonFormsContext,
} from '@jsonforms/react';
import { findValue } from './ModalItemUtils';

export interface OwnPropsOfSpectrumArrayModalItem {
  index: number;
  // expanded: boolean;
  path: string;
  schema: JsonSchema;
  // handleExpand(index: number, path?: any, isDetailedView?: boolean): () => void;
  removeItem(path: string, value: number): () => void;
  duplicateItem(index: number): () => void;
  uischema: ControlElement;
  renderers?: JsonFormsRendererRegistryEntry[];
  uischemas?: {
    tester: UISchemaTester;
    uischema: UISchemaElement;
  }[];
}

export interface StatePropsOfSpectrumArrayModalItem
  extends OwnPropsOfSpectrumArrayModalItem {
  childLabel: string;
  childData: any;
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
): StatePropsOfSpectrumArrayModalItem => {
  const { schema, path, index, uischema } = ownProps;
  const firstPrimitiveProp = schema.properties
    ? Object.keys(schema.properties).find((propName) => {
        const prop = schema.properties[propName];
        return (
          prop.type === 'string' ||
          prop.type === 'number' ||
          prop.type === 'integer'
        );
      })
    : undefined;
  const childPath = composePaths(path, `${index}`);
  const childData = Resolve.data(getData(state), childPath);

  const childLabel =
    uischema.options?.elementLabelProp ??
    firstPrimitiveProp ??
    typeof uischema.options?.DataAsLabel === 'number'
      ? Object.values(childData)[uischema.options?.DataAsLabel]
      : findValue(childData, uischema.options?.DataAsLabel) ??
        `Item ${index + 1}`;

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

const withContextToSpectrumArrayModalItemProps = (
  Component: ComponentType<StatePropsOfSpectrumArrayModalItem>
): ComponentType<OwnPropsOfSpectrumArrayModalItem> => ({
  ctx,
  props,
}: JsonFormsStateContext & StatePropsOfSpectrumArrayModalItem) => {
  const stateProps = ctxToSpectrumArrayModalItemProps(ctx, props);
  return <Component {...stateProps} />;
};

export const withJsonFormsSpectrumArrayModalItemProps = (
  Component: ComponentType<StatePropsOfSpectrumArrayModalItem>
): ComponentType<any> =>
  withJsonFormsContext(
    withContextToSpectrumArrayModalItemProps(
      React.memo(
        Component,
        (
          prevProps: StatePropsOfSpectrumArrayModalItem,
          nextProps: StatePropsOfSpectrumArrayModalItem
        ) => {
          const {
            // handleExpand: prevHandleExpand,
            removeItem: prevRemoveItem,
            ...restPrevProps
          } = prevProps;
          const {
            // handleExpand: nextHandleExpand,
            removeItem: nextRemoveItem,
            ...restNextProps
          } = nextProps;
          return areEqual(restPrevProps, restNextProps);
        }
      )
    )
  );

export default withJsonFormsSpectrumArrayModalItemProps(SpectrumArrayModalItem);
