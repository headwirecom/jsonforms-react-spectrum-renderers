Current status: [![Build Status](https://travis-ci.com/headwirecom/jsonforms-react-spectrum-renderers.svg?branch=master)](https://travis-ci.com/headwirecom/jsonforms-react-spectrum-renderers) [![Coverage Status](https://coveralls.io/repos/headwirecom/jsonforms-react-spectrum-renderers/badge.svg?branch=master&service=github)](https://coveralls.io/github/headwirecom/jsonforms-react-spectrum-renderers?branch=master)

# React Spectrum Renderer Set for JSONForms

Notice: This renderer set is work in progress and integrates yet unreleased React Spectrum components.

[Checkout the examples](https://headwirecom.github.io/jsonforms-react-spectrum-renderers/) to see the React Spectrum renderer set in action.

# Developers Documentation

## First time setup

- Install [node.js](https://nodejs.org/) (version = 14.x.x)
- Update npm (version = 6.x.x)
- Clone this repository
- Change into the Directory: `cd jsonforms-react-spectrum-renderers`
- Install dependencies and Hook up dependencies between packages: `npm ci && npm run init`
- Build and Run React Spectrum examples: `cd packages/spectrum && npm i && npm run build && npm run dev`

## Start the example application locally

- Run React Spectrum examples: `cd packages/spectrum && npm run dev`

## Build & Testing

- Run React Spectrum tests in watch mode: `cd packages/spectrum && npx jest --watch`
- Check Formatting: `npm run check-format`

- Build (all packages): `npm run build`
- Test (all packages): `npm run test`
- Clean (delete `dist` folder of all packages): `npm run clean`

## Dependency & Release management

// TODO

## Continuous Integration

The React Spectrum JSONForms project is build and tested via [Travis](https://travis-ci.org/). Coverage is documented by [Coveralls](https://coveralls.io).

## JSON Schema Features

- [x] boolean - Checkbox
- [x] boolean - Toggle
- [x] boolean - Button
- [x] integer - Number
- [ ] integer - Text (only used in Angular Material and Ionic, toFormatted doesn't work)
- [x] integer - Starrating
- [x] number - Number
- [ ] number - Text (only used in Angular Material and Ionic, toFormatted doesn't work)
- [x] number range - Slider
- [x] string - Text
- [x] string - TextArea
- [x] enum - Combo
- [x] enum - Autocomplete
- [x] Date format - Date field
- [x] Time format - Time field
- [x] Datetime format - Datetime field
- [x] Object - Vertical grid
- [x] Array of primitives - List
- [x] Array of objects - Table
- [x] Array of objects - List
- [x] Array of objects - List with Detail
- [x] Array of enums - Multiple Choice
- [x] oneOf - Tabs
- [x] allOf - Vertical Grid
- [x] anyOf - Tabs

## UI Schema Features

- [x] Vertical Layout - Vertical Grid
- [x] Horizontal Layout - Horizontal Grid
- [x] Categorization - Tabs
- [x] Group - Group
- [x] Label - Text

# License

The JSONForms project is licensed under the MIT License. See the [LICENSE file](https://github.com/headwirecom/jsonforms-react-spectrum-renderers/blob/master/LICENSE) for more information.
