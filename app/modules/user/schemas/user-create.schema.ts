import Ajv, { JSONSchemaType } from "ajv";
const ajv = new Ajv();

interface MyData {
  foo: number;
  bar?: string;
}

export const schema: JSONSchemaType<MyData> = {
  type: "object",
  properties: {
    foo: { type: "integer" },
    bar: { type: "string", nullable: true },
  },
  required: ["foo"],
  additionalProperties: false,
};

export const schemaCompile = ajv.compile(schema);
