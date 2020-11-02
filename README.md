Current status: [![Build Status](https://travis-ci.com/headwirecom/jsonforms-react-spectrum-renderers.svg?branch=master)](https://travis-ci.com/headwirecom/jsonforms-react-spectrum-renderers) [![Coverage Status](https://coveralls.io/repos/headwirecom/jsonforms-react-spectrum-renderers/badge.svg?branch=master&service=github)](https://coveralls.io/github/headwirecom/jsonforms-react-spectrum-renderers?branch=master)

# React Spectrum Renderer Set for JSONForms

!! Work in progress !!

# Developers Documentation

## First time setup

- Install [node.js](https://nodejs.org/) (version >= 6.x.x)
- Update npm (version >= 5.8.0)
- Clone this repository
- Install dependencies: `npm ci`
- Hook up dependencies between packages: `npm run init`

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

# License

The JSONForms project is licensed under the MIT License. See the [LICENSE file](https://github.com/headwirecom/jsonforms-react-spectrum-renderers/blob/master/LICENSE) for more information.
