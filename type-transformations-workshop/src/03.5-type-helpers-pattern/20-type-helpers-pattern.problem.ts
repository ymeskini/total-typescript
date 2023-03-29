import { Equal, Expect } from "../helpers/type-utils";

type ReturnWhatIPassIn2<T> = ReturnType<() => T>;

// function with arg T and = T returns T
type ReturnWhatIPassIn<T> = T;

type Example<Arg1, Arg2, Arg3> = Arg1 | Arg2 | Arg3;

type tests = [
  Expect<Equal<ReturnWhatIPassIn<1>, 1>>,
  Expect<Equal<ReturnWhatIPassIn<"1">, "1">>,
  Expect<Equal<ReturnWhatIPassIn<true>, true>>,
  Expect<Equal<ReturnWhatIPassIn<false>, false>>,
  Expect<Equal<ReturnWhatIPassIn<null>, null>>,
];
