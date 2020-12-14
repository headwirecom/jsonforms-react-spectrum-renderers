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
import React from 'react';
import './DatePicker.css';

/**
 * React Spectrum does not have date picker (it is in progress, not usable at the time of writing).
 * We can make the default date picker look more consistent with other React Spectrum elements by
 * copying the same styles as React Spectrum applies to TextField and FieldLabel.
 */
const inputStyle: React.CSSProperties = {
  border: `var(--spectrum-alias-border-size-thin,var(--spectrum-global-dimension-static-size-10)) solid`,
  borderRadius: `var(--spectrum-alias-border-radius-regular,var(--spectrum-global-dimension-size-50))`,
  boxSizing: 'border-box',
  padding: `3px var(--spectrum-global-dimension-size-150) 5px calc(var(--spectrum-global-dimension-size-150) - 1px)`,
  textIndent: `0`,
  width: `100%`,
  height: `var(--spectrum-alias-single-line-height,var(--spectrum-global-dimension-size-400))`,
  verticalAlign: `top`,
  margin: `0`,
  overflow: `visible`,
  fontFamily: `adobe-clean-ux,adobe-clean,Source Sans Pro,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif`,
  fontSize: `var(--spectrum-alias-font-size-default,var(--spectrum-global-dimension-font-size-100))`,
  lineHeight: `var(--spectrum-alias-body-text-line-height,var(--spectrum-global-font-line-height-medium))`,
  textOverflow: `ellipsis`,
  transition: `border-color .13s ease-in-out,box-shadow .13s ease-in-out`,
  outline: `none`,
  backgroundColor: `var(--spectrum-global-color-gray-50)`,
  borderColor: `var(--spectrum-alias-border-color,var(--spectrum-global-color-gray-400))`,
  color: `var(--spectrum-alias-text-color,var(--spectrum-global-color-gray-800))`,
};

const labelStyle: React.CSSProperties = {
  boxSizing: 'border-box',
  padding: `var(--spectrum-global-dimension-size-50) 0 var(--spectrum-global-dimension-size-65)`,
  fontSize: `var(--spectrum-global-dimension-font-size-75)`,
  fontWeight: `var(--spectrum-global-font-weight-regular,400)` as React.CSSProperties['fontWeight'],
  lineHeight: `var(--spectrum-global-font-line-height-small,1.3)`,
  verticalAlign: `top`,
  WebkitFontSmoothing: `subpixel-antialiased`,
  MozOsxFontSmoothing: `auto`,
  cursor: `default`,
};

export const DatePicker: React.FC<React.ComponentProps<'input'>> = (props) => {
  return (
    <input
      {...props}
      style={props.style ? { ...inputStyle, ...props.style } : inputStyle}
    />
  );
};

export const DatePickerLabel: React.FC<React.ComponentProps<'label'>> = (
  props
) => {
  return (
    <label
      {...props}
      style={props.style ? { ...labelStyle, ...props.style } : labelStyle}
    />
  );
};
