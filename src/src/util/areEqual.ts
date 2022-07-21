import { get, isEqual } from 'lodash';
import { JsonSchema } from '@jsonforms/core';

const areEqual = (
  prevProps: object | JsonSchema | undefined,
  nextProps: object | JsonSchema | undefined
) => {
  return (
    get(prevProps, 'renderers.length') === get(nextProps, 'renderers.length') &&
    get(prevProps, 'cells.length') === get(nextProps, 'cells.length') &&
    get(prevProps, 'uischemas.length') === get(nextProps, 'uischemas.length') &&
    get(prevProps, 'schema') === get(nextProps, 'schema') &&
    isEqual(get(prevProps, 'uischema'), get(nextProps, 'uischema')) &&
    get(prevProps, 'path') === get(nextProps, 'path')
  );
};

export default areEqual;
