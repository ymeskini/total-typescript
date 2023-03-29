import { S } from "ts-toolbelt";
import { Equal, Expect } from "../helpers/type-utils";

type UserPath = "/users/:id";
type UserOrganisationPath = "/users/:id/organisations/:organisationId";



type ExtractPathParams<TPath extends string> = {
  [R in S.Split<TPath, "/">[number] as R extends `:${infer TParam}`
    ? TParam
    : never]: string;
};


type tests = [
  Expect<Equal<ExtractPathParams<UserPath>, { id: string }>>,
  Expect<
    Equal<
      ExtractPathParams<UserOrganisationPath>,
      { id: string; organisationId: string }
    >
  >
];
