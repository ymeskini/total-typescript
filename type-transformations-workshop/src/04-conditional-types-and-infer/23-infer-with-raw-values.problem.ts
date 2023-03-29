import { Equal, Expect } from "../helpers/type-utils";

type Solution<T> = T[keyof T];
type GetDataValue<T> = T extends { data: infer TData } ? TData : never;

type Example = GetDataValue<{ data: 1 }>;

type tests = [
  Expect<Equal<GetDataValue<{ data: "hello" }>, "hello">>,
  Expect<Equal<GetDataValue<{ data: { name: "hello" } }>, { name: "hello" }>>,
  Expect<
    Equal<
      GetDataValue<{ data: { name: "hello"; age: 20 } }>,
      { name: "hello"; age: 20 }
    >
  >
];
