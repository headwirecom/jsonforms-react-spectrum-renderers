/*
  The MIT License

  Copyright (c) 2017-2019 EclipseSource Munich
  https://github.com/eclipsesource/jsonforms

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
  DateCell,
  dateCellTester,
  dateTimeCellTester,
  EnumCell,
  enumCellTester,
  SliderCell,
  sliderCellTester,
  SpectrumBooleanCell,
  spectrumBooleanCellTester,
  SpectrumIntegerCell,
  spectrumIntegerCellTester,
  SpectrumNumberCell,
  spectrumNumberCellTester,
  SpectrumTextAreaCell,
  spectrumTextAreaCellTester,
  SpectrumTextCell,
  spectrumTextCellTester,
  TimeCell,
  timeCellTester,
} from './cells';

import {
  InputControl,
  inputControlTester,
  SpectrumBooleanControl,
  spectrumBooleanControlTester,
  SpectrumIntegerControl,
  spectrumIntegerControlTester,
  SpectrumNumberControl,
  spectrumNumberControlTester,
  SpectrumNumberFormattedControl,
  spectrumNumberFormattedControlTester,
  SpectrumTextAreaControl,
  spectrumTextAreaControlTester,
  SpectrumTextControl,
  spectrumTextControlTester,
} from './controls';

import {
  ArrayControl,
  arrayControlTester,
  Categorization,
  categorizationTester,
  SpectrumLabelRenderer,
  spectrumLabelRendererTester,
  spectrumObjectControlTester,
  SpectrumObjectRenderer,
  TableArrayControl,
  tableArrayControlTester,
} from './complex';

import {
  SpectrumGroupLayout,
  spectrumGroupLayoutTester,
  SpectrumHorizontalLayout,
  spectrumHorizontalLayoutTester,
  SpectrumVerticalLayout,
  spectrumVerticalLayoutTester,
} from './layouts';
import DateTimeCell from './cells/DateTimeCell';

export * from './controls';
export * from './complex';
export * from './cells';
export * from './layouts';
// export * from './util';

export const spectrumRenderers: { tester: RankedTester; renderer: any }[] = [
  { tester: inputControlTester, renderer: InputControl },
  { tester: spectrumBooleanControlTester, renderer: SpectrumBooleanControl },
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
  { tester: categorizationTester, renderer: Categorization },
  { tester: spectrumObjectControlTester, renderer: SpectrumObjectRenderer },
  { tester: tableArrayControlTester, renderer: TableArrayControl },
  { tester: spectrumGroupLayoutTester, renderer: SpectrumGroupLayout },
  { tester: spectrumVerticalLayoutTester, renderer: SpectrumVerticalLayout },
  {
    tester: spectrumHorizontalLayoutTester,
    renderer: SpectrumHorizontalLayout,
  },
];

export const spectrumCells: { tester: RankedTester; cell: any }[] = [
  { tester: spectrumBooleanCellTester, cell: SpectrumBooleanCell },
  { tester: dateCellTester, cell: DateCell },
  { tester: dateTimeCellTester, cell: DateTimeCell },
  { tester: enumCellTester, cell: EnumCell },
  { tester: spectrumIntegerCellTester, cell: SpectrumIntegerCell },
  { tester: spectrumNumberCellTester, cell: SpectrumNumberCell },
  { tester: sliderCellTester, cell: SliderCell },
  { tester: spectrumTextAreaCellTester, cell: SpectrumTextAreaCell },
  { tester: spectrumTextCellTester, cell: SpectrumTextCell },
  { tester: timeCellTester, cell: TimeCell },
];
