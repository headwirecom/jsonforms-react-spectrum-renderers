# React Spectrum Renderer Set for JSONForms

# Developers Documentation

## First time setup

- Install [node.js](https://nodejs.org/) (version >= 6.x.x)
- Update npm (version >= 5.8.0)
- Clone this repository
- Install dependencies: `npm ci`
- Hook up dependencies between packages: `npm run init`

## Build & Testing

- Build (all packages): `npm run build`
- Test (all packages): `npm run test`
- Clean (delete `dist` folder of all packages): `npm run clean`
- Run React Spectrum examples: `cd packages/spectrum && npm run dev`
- Run React Spectrum tests in watch mode: `cd packages/spectrum && npm run test -- --watch`
- Check Formatting: `npm run check-format`

## Dependency & Release management

// TODO

## Continuous Integration

The React Spectrum JSONForms project is build and tested via [Travis](https://travis-ci.org/). Coverage is documented by [Coveralls](https://coveralls.io).

// TODO
Current status: [![Build Status](https://travis-ci.org/puzzle/jsonforms.svg?branch=master)](https://travis-ci.org/eclipsesource/jsonforms) [![Coverage Status](https://coveralls.io/repos/puzzle/jsonforms/badge.svg?branch=master&service=github)](https://coveralls.io/github/puzzle/jsonforms?branch=master)

// TODO

# License

The JSONForms project is licensed under the MIT License. See the [LICENSE file](https://github.com/eclipsesource/jsonforms/blob/master/LICENSE) for more information.
