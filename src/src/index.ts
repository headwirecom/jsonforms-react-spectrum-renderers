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
import { RankedTester } from '@jsonforms/core';

import {
  SpectrumSliderCell,
  SpectrumSliderCellTester,
  SpectrumBooleanCell,
  SpectrumBooleanCellTester,
  SpectrumBooleanButtonCell,
  SpectrumBooleanButtonCellTester,
  SpectrumCheckboxCell,
  SpectrumCheckboxCellTester,
  SpectrumSwitchCell,
  SpectrumSwitchCellTester,
  SpectrumEnumCell,
  SpectrumEnumCellTester,
  SpectrumEnumControlTester,
  SpectrumIntegerCell,
  SpectrumIntegerCellTester,
  SpectrumNumberCell,
  SpectrumNumberCellTester,
  SpectrumTextAreaCell,
  SpectrumTextAreaCellTester,
  SpectrumTextCell,
  SpectrumTextCellTester,
} from './cells';

import {
  InputControl,
  inputControlTester,
  SpectrumAnyOfStringOrEnumControl,
  SpectrumAnyOfStringOrEnumControlTester,
  SpectrumBooleanControl,
  SpectrumBooleanControlTester,
  SpectrumBooleanButtonControl,
  SpectrumBooleanButtonControlTester,
  SpectrumDateControl,
  SpectrumDateControlTester,
  SpectrumDateTimeControl,
  SpectrumDateTimeControlTester,
  SpectrumEnumControl,
  SpectrumIntegerControl,
  SpectrumIntegerControlTester,
  SpectrumRadioGroupControl,
  SpectrumRadioGroupControlTester,
  SpectrumRatingControl,
  SpectrumRatingControlTester,
  SpectrumCheckboxControl,
  SpectrumCheckboxControlTester,
  SpectrumSwitchControl,
  SpectrumSwitchControlTester,
  SpectrumNumberControl,
  SpectrumNumberControlTester,
  SpectrumOneOfEnumControl,
  SpectrumOneOfEnumControlTester,
  SpectrumOneOfRadioGroupControl,
  SpectrumOneOfRadioGroupControlTester,
  SpectrumSliderControl,
  SpectrumSliderControlTester,
  SpectrumTextAreaControl,
  SpectrumTextAreaControlTester,
  SpectrumTextControl,
  SpectrumTextControlTester,
  SpectrumTimeControl,
  SpectrumTimeControlTester,
} from './controls';

import {
  ArrayControl,
  arrayControlTester,
  SpectrumArrayModalControl,
  SpectrumArrayModalControlTester,
  SpectrumAnyOfRenderer,
  SpectrumAnyOfRendererTester,
  SpectrumAllOfRenderer,
  SpectrumAllOfRendererTester,
  SpectrumCategorizationRenderer,
  SpectrumCategorizationRendererTester,
  SpectrumCategorizationStepperRenderer,
  SpectrumCategorizationStepperRendererTester,
  SpectrumLabelRenderer,
  SpectrumLabelRendererTester,
  SpectrumObjectControlTester,
  SpectrumObjectRenderer,
  SpectrumOneOfRenderer,
  SpectrumOneOfRendererTester,
  SpectrumArrayControlGrid,
  SpectrumArrayControlGridTester,
} from './complex';

import {
  SpectrumGroupLayout,
  SpectrumGroupLayoutTester,
  SpectrumHorizontalLayout,
  SpectrumHorizontalLayoutTester,
  SpectrumVerticalLayout,
  SpectrumVerticalLayoutTester,
} from './layouts';

import {
  SpectrumListWithDetailRenderer,
  SpectrumListWithDetailTester,
} from './additional';

export * from './controls';
export * from './complex';
export * from './cells';
export * from './layouts';
export * from './util';
export * from './additional';

export const SpectrumRenderers: { tester: RankedTester; renderer: any }[] = [
  { tester: inputControlTester, renderer: InputControl },
  {
    tester: SpectrumListWithDetailTester,
    renderer: SpectrumListWithDetailRenderer,
  },
  {
    tester: SpectrumAnyOfStringOrEnumControlTester,
    renderer: SpectrumAnyOfStringOrEnumControl,
  },
  { tester: SpectrumBooleanControlTester, renderer: SpectrumBooleanControl },
  {
    tester: SpectrumBooleanButtonControlTester,
    renderer: SpectrumBooleanButtonControl,
  },
  { tester: SpectrumCheckboxControlTester, renderer: SpectrumCheckboxControl },
  { tester: SpectrumSwitchControlTester, renderer: SpectrumSwitchControl },
  { tester: SpectrumDateControlTester, renderer: SpectrumDateControl },
  { tester: SpectrumDateTimeControlTester, renderer: SpectrumDateTimeControl },
  { tester: SpectrumEnumControlTester, renderer: SpectrumEnumControl },
  {
    tester: SpectrumOneOfEnumControlTester,
    renderer: SpectrumOneOfEnumControl,
  },
  { tester: SpectrumIntegerControlTester, renderer: SpectrumIntegerControl },
  {
    tester: SpectrumRadioGroupControlTester,
    renderer: SpectrumRadioGroupControl,
  },
  { tester: SpectrumRatingControlTester, renderer: SpectrumRatingControl },
  { tester: SpectrumNumberControlTester, renderer: SpectrumNumberControl },
  { tester: SpectrumTextAreaControlTester, renderer: SpectrumTextAreaControl },
  { tester: SpectrumTextControlTester, renderer: SpectrumTextControl },
  { tester: SpectrumTimeControlTester, renderer: SpectrumTimeControl },
  { tester: arrayControlTester, renderer: ArrayControl },
  {
    tester: SpectrumArrayModalControlTester,
    renderer: SpectrumArrayModalControl,
  },
  { tester: SpectrumLabelRendererTester, renderer: SpectrumLabelRenderer },
  {
    tester: SpectrumCategorizationRendererTester,
    renderer: SpectrumCategorizationRenderer,
  },
  {
    tester: SpectrumCategorizationStepperRendererTester,
    renderer: SpectrumCategorizationStepperRenderer,
  },
  { tester: SpectrumObjectControlTester, renderer: SpectrumObjectRenderer },
  {
    tester: SpectrumOneOfRadioGroupControlTester,
    renderer: SpectrumOneOfRadioGroupControl,
  },
  {
    tester: SpectrumOneOfRendererTester,
    renderer: SpectrumOneOfRenderer,
  },
  {
    tester: SpectrumAnyOfRendererTester,
    renderer: SpectrumAnyOfRenderer,
  },
  {
    tester: SpectrumAllOfRendererTester,
    renderer: SpectrumAllOfRenderer,
  },
  {
    tester: SpectrumSliderControlTester,
    renderer: SpectrumSliderControl,
  },
  {
    tester: SpectrumArrayControlGridTester,
    renderer: SpectrumArrayControlGrid,
  },
  { tester: SpectrumGroupLayoutTester, renderer: SpectrumGroupLayout },
  { tester: SpectrumVerticalLayoutTester, renderer: SpectrumVerticalLayout },
  {
    tester: SpectrumHorizontalLayoutTester,
    renderer: SpectrumHorizontalLayout,
  },
];

export const SpectrumCells: { tester: RankedTester; cell: any }[] = [
  { tester: SpectrumBooleanCellTester, cell: SpectrumBooleanCell },
  { tester: SpectrumBooleanButtonCellTester, cell: SpectrumBooleanButtonCell },
  { tester: SpectrumCheckboxCellTester, cell: SpectrumCheckboxCell },
  { tester: SpectrumSwitchCellTester, cell: SpectrumSwitchCell },
  { tester: SpectrumEnumCellTester, cell: SpectrumEnumCell },
  { tester: SpectrumIntegerCellTester, cell: SpectrumIntegerCell },
  { tester: SpectrumNumberCellTester, cell: SpectrumNumberCell },
  { tester: SpectrumSliderCellTester, cell: SpectrumSliderCell },
  { tester: SpectrumTextAreaCellTester, cell: SpectrumTextAreaCell },
  { tester: SpectrumTextCellTester, cell: SpectrumTextCell },
];
