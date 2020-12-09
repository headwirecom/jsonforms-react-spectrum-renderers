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
  SliderCell,
  sliderCellTester,
  SpectrumBooleanCell,
  spectrumBooleanCellTester,
  SpectrumDateCell,
  spectrumDateCellTester,
  SpectrumDateTimeCell,
  spectrumDateTimeCellTester,
  SpectrumEnumCell,
  spectrumEnumCellTester,
  spectrumEnumControlTester,
  SpectrumIntegerCell,
  spectrumIntegerCellTester,
  SpectrumNumberCell,
  spectrumNumberCellTester,
  SpectrumTextAreaCell,
  spectrumTextAreaCellTester,
  SpectrumTextCell,
  spectrumTextCellTester,
  SpectrumTimeCell,
  spectrumTimeCellTester,
} from './cells';

import {
  InputControl,
  inputControlTester,
  SpectrumBooleanControl,
  spectrumBooleanControlTester,
  SpectrumDateControl,
  spectrumDateControlTester,
  SpectrumDateTimeControl,
  spectrumDateTimeControlTester,
  SpectrumEnumControl,
  SpectrumIntegerControl,
  spectrumIntegerControlTester,
  SpectrumNumberControl,
  spectrumNumberControlTester,
  SpectrumNumberFormattedControl,
  spectrumNumberFormattedControlTester,
  SpectrumSliderControl,
  spectrumSliderControlTester,
  SpectrumTextAreaControl,
  spectrumTextAreaControlTester,
  SpectrumTextControl,
  spectrumTextControlTester,
  SpectrumTimeControl,
  spectrumTimeControlTester
} from './controls';

import {
  ArrayControl,
  arrayControlTester,
  SpectrumAllOfRenderer,
  spectrumAllOfRendererTester,
  SpectrumAnyOfRenderer,
  spectrumAnyOfRendererTester,
  SpectrumCategorizationRenderer,
  spectrumCategorizationRendererTester,
  SpectrumCategorizationStepperRenderer,
  spectrumCategorizationStepperRendererTester,
  SpectrumLabelRenderer,
  spectrumLabelRendererTester,
  spectrumObjectControlTester,
  SpectrumObjectRenderer,
  SpectrumOneOfRenderer,
  spectrumOneOfRendererTester,
  SpectrumTableArrayControl,
  spectrumTableArrayControlTester,
} from './complex';

import {
  SpectrumGroupLayout,
  spectrumGroupLayoutTester,
  SpectrumHorizontalLayout,
  spectrumHorizontalLayoutTester,
  SpectrumVerticalLayout,
  spectrumVerticalLayoutTester,
} from './layouts';

import {
  SpectrumListWithDetailRenderer,
  spectrumListWithDetailTester,
} from './additional';

export * from './controls';
export * from './complex';
export * from './cells';
export * from './layouts';
export * from './util';
export * from './additional';

export const spectrumRenderers: { tester: RankedTester; renderer: any }[] = [
  { tester: inputControlTester, renderer: InputControl },
  {
    tester: spectrumListWithDetailTester,
    renderer: SpectrumListWithDetailRenderer,
  },
  { tester: spectrumBooleanControlTester, renderer: SpectrumBooleanControl },
  { tester: spectrumDateControlTester, renderer: SpectrumDateControl },
  { tester: spectrumDateTimeControlTester, renderer: SpectrumDateTimeControl },
  { tester: spectrumTimeControlTester, renderer: SpectrumTimeControl },
  { tester: spectrumEnumControlTester, renderer: SpectrumEnumControl },
  { tester: spectrumIntegerControlTester, renderer: SpectrumIntegerControl },
  { tester: spectrumNumberControlTester, renderer: SpectrumNumberControl },
  {
    tester: spectrumNumberFormattedControlTester,
    renderer: SpectrumNumberFormattedControl,
  },
  { tester: spectrumTextAreaControlTester, renderer: SpectrumTextAreaControl },
  { tester: spectrumTextControlTester, renderer: SpectrumTextControl },
  { tester: arrayControlTester, renderer: ArrayControl },
  { tester: spectrumLabelRendererTester, renderer: SpectrumLabelRenderer },
  {
    tester: spectrumCategorizationRendererTester,
    renderer: SpectrumCategorizationRenderer,
  },
  {
    tester: spectrumCategorizationStepperRendererTester,
    renderer: SpectrumCategorizationStepperRenderer,
  },
  { tester: spectrumObjectControlTester, renderer: SpectrumObjectRenderer },
  {
    tester: spectrumOneOfRendererTester,
    renderer: SpectrumOneOfRenderer,
  },
  {
    tester: spectrumAnyOfRendererTester,
    renderer: SpectrumAnyOfRenderer,
  },
  {
    tester: spectrumAllOfRendererTester,
    renderer: SpectrumAllOfRenderer,
  },
  {
    tester: spectrumSliderControlTester,
    renderer: SpectrumSliderControl,
  },
  {
    tester: spectrumTableArrayControlTester,
    renderer: SpectrumTableArrayControl,
  },
  { tester: spectrumGroupLayoutTester, renderer: SpectrumGroupLayout },
  { tester: spectrumVerticalLayoutTester, renderer: SpectrumVerticalLayout },
  {
    tester: spectrumHorizontalLayoutTester,
    renderer: SpectrumHorizontalLayout,
  },
];

export const spectrumCells: { tester: RankedTester; cell: any }[] = [
  { tester: spectrumBooleanCellTester, cell: SpectrumBooleanCell },
  { tester: spectrumDateCellTester, cell: SpectrumDateCell },
  { tester: spectrumDateTimeCellTester, cell: SpectrumDateTimeCell },
  { tester: spectrumEnumCellTester, cell: SpectrumEnumCell },
  { tester: spectrumIntegerCellTester, cell: SpectrumIntegerCell },
  { tester: spectrumNumberCellTester, cell: SpectrumNumberCell },
  { tester: sliderCellTester, cell: SliderCell },
  { tester: spectrumTextAreaCellTester, cell: SpectrumTextAreaCell },
  { tester: spectrumTextCellTester, cell: SpectrumTextCell },
  { tester: spectrumTimeCellTester, cell: SpectrumTimeCell },
];
