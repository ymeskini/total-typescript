import express, { RequestHandler } from "express";
import { it } from "vitest";
import { z, ZodError } from "zod";
import { Equal, Expect } from "../helpers/type-utils";

const makeTypeSafeHandler = <
  TSchemaQuery extends z.Schema,
  TSchemaBody extends z.Schema
>(
  config: {
    query?: TSchemaQuery;
    body?: TSchemaBody;
  },
  handler: RequestHandler<{}, {}, z.infer<TSchemaBody>, z.infer<TSchemaQuery>>
): RequestHandler => {
  return async (req, res, next) => {
    const { query, body } = req;
    if (config.query) {
      try {
        await config.query.parseAsync(query);
      } catch (e) {
        return res.status(400).send((e as ZodError).message);
      }
    }
    if (config.body) {
      try {
        config.body.parse(body);
      } catch (e) {
        return res.status(400).send((e as ZodError).message);
      }
    }
    return handler(req, res, next);
  };
};

const app = express();

it("Should make the query AND body type safe", () => {
  app.get(
    "/users",
    makeTypeSafeHandler(
      {
        query: z.object({
          id: z.string(),
        }),
        body: z.object({
          name: z.string(),
        }),
      },
      (req, res) => {
        type tests = [
          Expect<Equal<typeof req.query, { id: string }>>,
          Expect<Equal<typeof req.body, { name: string }>>
        ];
      }
    )
  );
});

it("Should default them to any if not passed in config", () => {
  app.get(
    "/users",
    makeTypeSafeHandler({}, (req, res) => {
      type tests = [
        Expect<Equal<typeof req.query, any>>,
        Expect<Equal<typeof req.body, any>>
      ];
    })
  );
});
