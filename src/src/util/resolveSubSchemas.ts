import { JsonSchema, CombinatorKeyword, resolveSchema } from '@jsonforms/core';

export const resolveSubSchemas = (
  schema: JsonSchema,
  rootSchema: JsonSchema,
  keyword: CombinatorKeyword
) => {
  // resolve any $refs, otherwise the generated UI schema can't match the schema???
  const schemas = schema[keyword] as any[];
  if (schemas.findIndex((e) => e.$ref !== undefined) !== -1) {
    return {
      ...schema,
      [keyword]: (schema[keyword] as any[]).map((e) =>
        e.$ref ? resolveSchema(rootSchema, e.$ref, rootSchema) : e
      ),
    };
  }
  return schema;
};
