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
import React, { Key, useCallback, useState } from 'react';
import { isEmpty } from '../util/isEmpty';
import {
  CombinatorProps,
  JsonSchema,
  RankedTester,
  createCombinatorRenderInfos,
  createDefaultValue,
  isOneOfControl,
  rankWith,
  resolveSubSchemas,
} from '@jsonforms/core';
import {
  ResolvedJsonFormsDispatch,
  withJsonFormsOneOfProps,
} from '@jsonforms/react';
import CombinatorProperties from './CombinatorProperties';
import {
  Button,
  ButtonGroup,
  Content,
  Dialog,
  DialogContainer,
  Divider,
  Heading,
  Item,
  Picker,
  TabList,
  TabPanels,
  Tabs,
  View,
} from '@adobe/react-spectrum';
import SpectrumProvider from '../additional/SpectrumProvider';
import { indexOfFittingSchemaObject } from './ArrayModal/utils';
const oneOf = 'oneOf';
const SpectrumOneOfRenderer = ({
  cells,
  data,
  enabled,
  handleChange,
  id,
  indexOfFittingSchema,
  path,
  renderers,
  rootSchema,
  schema,
  uischema,
  uischemas,
  visible,
}: CombinatorProps) => {
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(
    indexOfFittingSchema ?? indexOfFittingSchemaObject[path]
  );

  const [newSelectedIndex, setNewSelectedIndex] = useState(0);
  const handleClose = useCallback(() => setOpen(false), [setOpen]);
  const _schema = resolveSubSchemas(schema, rootSchema, oneOf);
  const oneOfRenderInfos = createCombinatorRenderInfos(
    (_schema as JsonSchema).oneOf,
    rootSchema,
    oneOf,
    uischema,
    path,
    uischemas
  );

  const openNewTab = (newIndex: number) => {
    handleChange(path, createDefaultValue(schema.oneOf[newIndex]));
    setSelectedIndex(newIndex);
  };

  const confirm = useCallback(() => {
    openNewTab(newSelectedIndex);
    setOpen(false);
  }, [handleChange, createDefaultValue, newSelectedIndex]);

  const handleTabChange = useCallback(
    (newOneOfIndex: Key) => {
      newOneOfIndex = Number(newOneOfIndex);
      setNewSelectedIndex(newOneOfIndex);
      if (isEmpty(data)) {
        openNewTab(newOneOfIndex);
      } else {
        setOpen(true);
      }
    },
    [setOpen, setSelectedIndex, data]
  );
  const usePickerInsteadOfTabs =
    indexOfFittingSchemaObject['OneOfModal'] === true ||
    indexOfFittingSchemaObject['OneOfPicker'] === true ||
    uischema.options?.OneOfPicker === true;

  const hideTabs =
    indexOfFittingSchemaObject['OneOfModal'] === true ||
    uischema.options?.OneOfModal === true;

  return (
    <SpectrumProvider>
      <View isHidden={!visible}>
        <CombinatorProperties
          combinatorKeyword={'oneOf'}
          path={path}
          schema={_schema}
        />
        {usePickerInsteadOfTabs ? (
          <>
            <Picker
              aria-label='Select'
              isDisabled={enabled === undefined ? false : !enabled}
              onSelectionChange={handleTabChange}
              selectedKey={String(selectedIndex)}
              width='100%'
              isHidden={hideTabs}
            >
              {oneOfRenderInfos.map((oneOfRenderInfo, oneOfIndex) => (
                <Item key={oneOfIndex}>{oneOfRenderInfo.label}</Item>
              ))}
            </Picker>
            {oneOfRenderInfos
              .filter(
                (_oneOfRenderInfo, oneOfIndex) => oneOfIndex === selectedIndex
              )
              .map((oneOfRenderInfo, oneOfIndex) => (
                <View key={oneOfIndex}>
                  <Content margin='size-160'>
                    <ResolvedJsonFormsDispatch
                      cells={cells}
                      key={oneOfIndex}
                      path={path}
                      renderers={renderers}
                      schema={oneOfRenderInfo.schema}
                      uischema={oneOfRenderInfo.uischema}
                    />
                  </Content>
                </View>
              ))}
          </>
        ) : (
          <>
            <Tabs
              isDisabled={enabled === undefined ? false : !enabled}
              selectedKey={String(selectedIndex)}
              onSelectionChange={handleTabChange}
            >
              <TabList isHidden={hideTabs}>
                {oneOfRenderInfos.map((oneOfRenderInfo, oneOfIndex) => (
                  <Item key={oneOfIndex}>{oneOfRenderInfo.label}</Item>
                ))}
              </TabList>
              <TabPanels>
                {oneOfRenderInfos.map((oneOfRenderInfo, oneOfIndex) => (
                  <Item key={oneOfIndex} title={oneOfRenderInfo.label}>
                    <Content margin='size-160'>
                      <ResolvedJsonFormsDispatch
                        cells={cells}
                        key={oneOfIndex}
                        path={path}
                        renderers={renderers}
                        schema={oneOfRenderInfo.schema}
                        uischema={oneOfRenderInfo.uischema}
                      />
                    </Content>
                  </Item>
                ))}
              </TabPanels>
            </Tabs>
          </>
        )}
        <DialogContainer onDismiss={handleClose}>
          {open && (
            <Dialog>
              <Heading>Clear Form?</Heading>
              <Divider />
              <Content>
                Your Data will be cleared if you navigate away from this Tab. Do
                you want to Clear your Form?
              </Content>
              <ButtonGroup>
                <Button variant='secondary' onPress={handleClose}>
                  Cancel
                </Button>
                <Button
                  variant='cta'
                  onPress={confirm}
                  autoFocus
                  id={id && `oneOf-${id}-confirm-yes`}
                >
                  Clear Form
                </Button>
              </ButtonGroup>
            </Dialog>
          )}
        </DialogContainer>
      </View>
    </SpectrumProvider>
  );
};

export const SpectrumOneOfRendererTester: RankedTester = rankWith(
  5,
  isOneOfControl
);
export default withJsonFormsOneOfProps(SpectrumOneOfRenderer);
