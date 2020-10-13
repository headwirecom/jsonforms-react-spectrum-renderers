import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { UISchemaElement, JsonSchema } from '@jsonforms/core';
import { JsonForms } from '@jsonforms/react';
import { vanillaRenderers } from '../src/index';

export function mountForm(
  uischema: UISchemaElement,
  schema: JsonSchema = {},
  data: any = {}
): ReactWrapper {
  return mount(
    <JsonForms
      schema={schema}
      uischema={uischema}
      data={data}
      renderers={vanillaRenderers}
    />
  );
}
