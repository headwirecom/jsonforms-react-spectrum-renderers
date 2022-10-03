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
import { View } from '@adobe/react-spectrum';
import { JsonFormsDispatch, JsonFormsStateContext, withJsonFormsContext } from '@jsonforms/react';
import {
  ControlElement,
  JsonFormsRendererRegistryEntry,
  JsonFormsState,
  JsonSchema,
  Resolve,
  UISchemaElement,
  UISchemaTester,
  composePaths,
  findUISchema,
  getData,
} from '@jsonforms/core';
import ModalItemAnimatedWrapper from './ModalItemAnimationWrapper';
import SpectrumProvider from '../../../additional/SpectrumProvider';
import { indexOfFittingSchemaObject } from '../utils';
import ModalItemHeader from './ModalItemHeader';
import { openItemWhenInQueryParam } from './ModalItemUtils';
import areEqual from '../../../util/areEqual';
import { findValue } from './ModalItemUtils';
import './SpectrumArrayModalItem.css';

interface NonEmptyRowProps {
  rowIndex?: number | undefined;
  moveUpCreator?: (path: string, position: number) => () => void;
  moveDownCreator?: (path: string, position: number) => () => void;
  DNDHandle?: any;
}

const SpectrumArrayModalItem = React.memo(
  ({
    childData,
    index,
    childLabel,
    callbackFunction,
    path,
    removeItem,
    duplicateItem,
    renderers,
    schema,
    uischema,
    uischemas = [],
    DNDHandle = false,
    callbackOpenedIndex,
  }: OwnPropsOfSpectrumArrayModalItem & NonEmptyRowProps) => {
    const foundUISchema = findUISchema(uischemas, schema, uischema.scope, path);
    const childPath = composePaths(path, `${index}`);
    /* If The Component has an empty Object, open it (true for a newly added Component) */
    const [expanded, setExpanded] = React.useState(
      JSON.stringify(childData) === '{}' ? true : false
    );
    const [isAnimating, setIsAnimating] = React.useState(false);

    const ref = React.useRef(null);

    const handleExpand = () => {
      setIsAnimating(true);
      if (expanded === false) {
        if (enableDetailedView === true) {
          window.postMessage(
            {
              type: 'expanded-item',
              index,
              path,
              breadCrumbLabel: childLabel,
              addToQuery: true,
            },
            '*'
          );
        }
        callbackOpenedIndex(index);
        setExpanded(true);
        return;
      }
      if (enableDetailedView === true) {
        window.postMessage(
          {
            type: 'expanded-item',
            index,
            path,
            breadCrumbLabel: childLabel,
            addToQuery: false,
          },
          '*'
        );
      }
      callbackOpenedIndex(undefined);
      setExpanded(false);

      const url = window.location.href;
      let newUrl: any = new URL(url);
      if (window.location.href.endsWith(`${path}.${index}`)) {
        newUrl = url.replace(`${path}.${index}`, '');
      } else {
        if (window.location.href.includes('formLocation=')) {
          newUrl = url.substring(0, url.lastIndexOf('-'));
        }
      }
      window.history.pushState('', '', newUrl);

      return;
    };

    const enableDetailedView = uischema?.options?.enableDetailedView;

    if (uischema.options?.oneOfModal) {
      indexOfFittingSchemaObject['oneOfModal'] = true;
    }
    if (uischema.options?.OneOfPicker) {
      indexOfFittingSchemaObject['OneOfPicker'] = true;
    }

    React.useEffect(() => {
      openItemWhenInQueryParam(path, index, setExpanded);
    }, []);

    function breadCrumbClose(message: MessageEvent) {
      if (message.data.type !== 'close-item-breadcrumb') {
        return;
      }
      if (message.data.path.includes(`${path}-${index}-${childLabel.replaceAll(/(-|_)/g, '+')}`)) {
        setIsAnimating(true);
        setExpanded(false);
        callbackOpenedIndex(undefined);
      }
    }

    React.useEffect(() => {
      if (expanded) {
        window.addEventListener('message', breadCrumbClose);
      }
      return () => window.removeEventListener('message', breadCrumbClose);
    }, [expanded]);

    const customPickerHandler = () => {
      window.postMessage({
        type: 'customPicker:open',
        open: true,
        schema,
        current: {
          path,
          index,
          data: childData,
        },
      });
    };

    const JsonFormsDispatchComponent = (
      <JsonFormsDispatch
        key={childPath}
        path={childPath}
        renderers={renderers}
        schema={schema}
        uischema={foundUISchema || uischema}
      />
    );

    const Header = (
      <ModalItemHeader
        expanded={expanded}
        enableDetailedView={enableDetailedView}
        index={index}
        path={path}
        handleExpand={handleExpand}
        removeItem={removeItem}
        duplicateItem={duplicateItem}
        childLabel={childLabel}
        childData={childData}
        DNDHandle={DNDHandle}
        customPicker={{
          enabled: uischema?.options?.picker,
          handler: customPickerHandler,
        }}
        uischema={uischema}
        JsonFormsDispatch={JsonFormsDispatchComponent}
      />
    );

    return (
      <SpectrumProvider
        flex='auto'
        width={uischema.options?.sortMode === 'arrows' ? 'calc(100% - 66px)' : '100%'}
      >
        <View
          ref={ref}
          UNSAFE_className={`list-array-item ${
            enableDetailedView ? 'enableDetailedView' : 'accordionView'
          } ${expanded ? 'expanded' : 'collapsed'} ${
            uischema?.options?.noAccordion ? 'noAccordion' : null
          }`}
          borderWidth='thin'
          borderColor='dark'
          borderRadius='medium'
          padding='size-150'
        >
          {Header}
          <ModalItemAnimatedWrapper
            expanded={expanded}
            handleExpand={handleExpand}
            enableDetailedView={enableDetailedView}
            isAnimating={isAnimating}
            setIsAnimating={setIsAnimating}
            path={path}
            callbackFunction={callbackFunction}
          >
            {expanded || isAnimating ? (
              <View UNSAFE_className='json-form-dispatch-wrapper'>
                {enableDetailedView && Header}
                {JsonFormsDispatchComponent}
              </View>
            ) : null}
          </ModalItemAnimatedWrapper>
        </View>
      </SpectrumProvider>
    );
  }
);

export interface OwnPropsOfSpectrumArrayModalItem {
  index: number;
  DNDHandle: any;
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
  childLabel: string;
  childData?: any;
  rowIndex?: number;
  moveUpCreator?: ((path: string, position: number) => () => void) | undefined;
  moveDownCreator?: ((path: string, position: number) => () => void) | undefined;
  callbackFunction: any;
  callbackOpenedIndex: any;
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
        if (schema?.properties) {
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
