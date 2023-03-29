import { expect, it } from "vitest";
import { Equal, Expect } from "../helpers/type-utils";

function youSayGoodbyeISayHello<T extends "goodbye" | "hello">(
  greeting: T
): T extends "goodbye" ? "hello" : "goodbye" {
  // hacky solution
  return (greeting === "goodbye" ? "hello" : "goodbye" as any);
}

// type GreetingResult<TGreeting> = TGreeting extends "hello"
//   ? "goodbye"
//   : "hello";

// function youSayGoodbyeISayHello<TGreeting extends "hello" | "goodbye">(
//   greeting: TGreeting,
// ) {
//   return (
//     greeting === "goodbye" ? "hello" : "goodbye"
//   ) as GreetingResult<TGreeting>;

it("Should return goodbye when hello is passed in", () => {
  const result = youSayGoodbyeISayHello("hello");

  type test = [Expect<Equal<typeof result, "goodbye">>];

  expect(result).toEqual("goodbye");
});

it("Should return hello when goodbye is passed in", () => {
  const result = youSayGoodbyeISayHello("goodbye");

  type test = [Expect<Equal<typeof result, "hello">>];

  expect(result).toEqual("hello");
});
