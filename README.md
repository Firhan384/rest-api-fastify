# Restfull API with fastify
saya terinspirasi dari laravel untuk struktur foldernya, dan kali ini saya coba implementasikannya dengan memakai nodejs memakai framework **Fastify** yang mengimplementasikan typescript dan juga clean architecture. dilengkapi dengan dependency injection pada controller, service dan repository.

## note
- masih dalam progress pengerjaan :D

## feature list
- jwt
- rate limit
- send email with smtp
- logging
- validation

## How to run development
```
npm run dev
```

## How to build production
```
npm run build:prod
```

## run migration
```
npm run db:migrate
```

## run seeder
```
npm run db:seed
```

## run with docker
```
first build image
docker build -f Dockerfile -t rest-api:v.1.0 .

then, run the image and create container
docker run --name rest-api-fastify -p 3000:3000 -d rest-api:v.1.0
```

## using validation request
first your must to create file schemas inside modules and then your module features, e.g modules/auth/schemas/login.schemas.ts
```login.schemas.ts
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
```
and then you must to inject the schemaCompile and schema in here
```auth.controller.ts
  @POST({
    url: "/your-endpoint",
    options: {
      validatorCompiler: () => {
        return schemaCompile;
      },
      schema: {
        body: schema,
      },
    },
  })
```


## using rate limit
```auth.controller.ts
  @POST({
    url: "/your-endpoint",
    options: {
      config: {
        rateLimit: {
          max: 3,
          timeWindow: "30 seconds",
        },
      },
    },
  })
```

## Kontribusi
Jika Anda ingin berkontribusi pada proyek ini, silakan terbuka untuk umum.

