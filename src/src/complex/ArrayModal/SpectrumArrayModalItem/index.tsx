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
import { JsonFormsStateContext, withJsonFormsContext } from '@jsonforms/react';
import areEqual from '../../../util/areEqual';
import { findValue } from './ModalItemUtils';

export interface OwnPropsOfSpectrumArrayModalItem {
  index: number;
  // expanded: boolean;
  path: string;
  schema: JsonSchema;
  indexOfFittingSchema?: number;
  // handleExpand(index: number, path?: any, isDetailedView?: boolean): () => void;
  removeItem(path: string, value: number): () => void;
  duplicateItem(index: number): () => void;
  uischema: ControlElement;
  renderers?: JsonFormsRendererRegistryEntry[];
  uischemas?: {
    tester: UISchemaTester;
    uischema: UISchemaElement;
  }[];
  childLabel?: string;
  childData?: any;
  rowIndex?: number;
  moveUpCreator?: ((path: string, position: number) => () => void) | undefined;
  moveDownCreator?:
    | ((path: string, position: number) => () => void)
    | undefined;
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
  const firstPrimitiveProp = schema.properties
    ? Object.keys(schema.properties).find((propName) => {
        if (schema.properties) {
          const prop = schema.properties[propName];
          return (
            prop.type === 'string' ||
            prop.type === 'number' ||
            prop.type === 'integer'
          );
        }
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

const withContextToSpectrumArrayModalItemProps =
  (
    Component: ComponentType<OwnPropsOfSpectrumArrayModalItem>
  ): ComponentType<OwnPropsOfSpectrumArrayModalItem> =>
  ({
    ctx,
    props,
  }: JsonFormsStateContext & OwnPropsOfSpectrumArrayModalItem) => {
    const stateProps = ctxToSpectrumArrayModalItemProps(ctx, props);
    return <Component {...stateProps} />;
  };

export const withJsonFormsSpectrumArrayModalItemProps = (
  Component: ComponentType<OwnPropsOfSpectrumArrayModalItem>
): ComponentType<any> =>
  withJsonFormsContext(
    withContextToSpectrumArrayModalItemProps(
      React.memo(
        Component,
        (
          prevProps: OwnPropsOfSpectrumArrayModalItem,
          nextProps: OwnPropsOfSpectrumArrayModalItem
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
