import Ajv, { JSONSchemaType } from "ajv";
const ajv = new Ajv();

export interface loginBody {
  email: string;
  password: string;
}

export const loginSchema: JSONSchemaType<loginBody> = {
  type: "object",
  properties: {
    email: { type: "string" },
    password: { type: "string" },
  },
  required: ["email", "password"],
  additionalProperties: false,
};

export const loginSchemaCompile = ajv.compile(loginSchema);
