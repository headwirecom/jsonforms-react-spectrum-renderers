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
  createCombinatorRenderInfos,
  createDefaultValue,
  isOneOfControl,
  JsonSchema,
  OwnPropsOfControl,
  RankedTester,
  rankWith,
  resolveSubSchemas,
  //optionIs,
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
  View,
  TabList,
  TabPanels,
  Tabs,
  Picker,
} from '@adobe/react-spectrum';
import SpectrumProvider from '../additional/SpectrumProvider';

export interface OwnOneOfProps extends OwnPropsOfControl {
  indexOfFittingSchema?: number;
}

const oneOf = 'oneOf';
const SpectrumOneOfRenderer = ({
  handleChange,
  schema,
  path,
  enabled,
  renderers,
  cells,
  rootSchema,
  id,
  visible,
  uischema,
  uischemas,
  data,
  indexOfFittingSchema,
}: CombinatorProps) => {
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(indexOfFittingSchema || 0);
  const [newSelectedIndex, setNewSelectedIndex] = useState(0);
  const handleClose = useCallback(() => setOpen(false), [setOpen]);
  const cancel = useCallback(() => {
    setOpen(false);
  }, [setOpen]);
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
    JSON.stringify(schema?.oneOf).includes(`"required":["OneOfEnum"`) ||
    uischema.options?.OneOfEnum === true;

  return (
    <SpectrumProvider>
      <View isHidden={!visible}>
        <CombinatorProperties
          schema={_schema}
          combinatorKeyword={'oneOf'}
          path={path}
        />
        {usePickerInsteadOfTabs ? (
          <>
            <Picker
              isDisabled={enabled === undefined ? false : !enabled}
              selectedKey={String(selectedIndex)}
              onSelectionChange={handleTabChange}
              width='100%'
              aria-label='Select'
            >
              {oneOfRenderInfos.map((oneOfRenderInfo, oneOfIndex) => (
                <Item key={oneOfIndex}>{oneOfRenderInfo.label}</Item>
              ))}
            </Picker>
            {oneOfRenderInfos.map((oneOfRenderInfo, oneOfIndex) => (
              <View key={oneOfIndex} isHidden={oneOfIndex !== selectedIndex}>
                <Content margin='size-160'>
                  <ResolvedJsonFormsDispatch
                    key={oneOfIndex}
                    schema={oneOfRenderInfo.schema}
                    uischema={oneOfRenderInfo.uischema}
                    path={path}
                    renderers={renderers}
                    cells={cells}
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
              <TabList>
                {oneOfRenderInfos.map((oneOfRenderInfo, oneOfIndex) => (
                  <Item key={oneOfIndex}>{oneOfRenderInfo.label}</Item>
                ))}
              </TabList>
              <TabPanels>
                {oneOfRenderInfos.map((oneOfRenderInfo, oneOfIndex) => (
                  <Item key={oneOfIndex} title={oneOfRenderInfo.label}>
                    <Content margin='size-160'>
                      <ResolvedJsonFormsDispatch
                        key={oneOfIndex}
                        schema={oneOfRenderInfo.schema}
                        uischema={oneOfRenderInfo.uischema}
                        path={path}
                        renderers={renderers}
                        cells={cells}
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
                <Button variant='secondary' onPress={cancel}>
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
  3,
  isOneOfControl
);
export default withJsonFormsOneOfProps(SpectrumOneOfRenderer);
