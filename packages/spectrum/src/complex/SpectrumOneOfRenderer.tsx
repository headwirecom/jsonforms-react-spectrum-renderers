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
import isEmpty from 'lodash/isEmpty';

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
} from '@adobe/react-spectrum';
import { Tabs } from '@react-spectrum/tabs';

export interface OwnOneOfProps extends OwnPropsOfControl {
  indexOfFittingSchema?: number;
}

const oneOf = 'oneOf';
const SpectrumOneOfRenderer = ({
  handleChange,
  schema,
  path,
  renderers,
  cells,
  rootSchema,
  id,
  visible,
  indexOfFittingSchema,
  uischema,
  uischemas,
  data,
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

  return (
    <View isHidden={!visible}>
      <CombinatorProperties
        schema={_schema}
        combinatorKeyword={'oneOf'}
        path={path}
      />
      <Tabs
        selectedKey={String(selectedIndex)}
        onSelectionChange={handleTabChange}
      >
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
      </Tabs>
      <DialogContainer onDismiss={handleClose}>
        {open && (
          <Dialog>
            <Heading>Clear form?</Heading>
            <Divider />
            <Content>
              Your data will be cleared if you navigate away from this tab. Do
              you want to proceed?
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
                Confirm
              </Button>
            </ButtonGroup>
          </Dialog>
        )}
      </DialogContainer>
    </View>
  );
};

export const spectrumOneOfRendererTester: RankedTester = rankWith(
  3,
  isOneOfControl
);
export default withJsonFormsOneOfProps(SpectrumOneOfRenderer);
