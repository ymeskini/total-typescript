import { Equal, Expect } from "../helpers/type-utils";

const testingFrameworks = {
  vitest: {
    label: "Vitest",
  },
  jest: {
    label: "Jest",
  },
  mocha: {
    label: "Mocha",
  },
};

type FrameWorkObject = typeof testingFrameworks;
type TestingFramework = keyof FrameWorkObject;

type tests = [Expect<Equal<TestingFramework, "vitest" | "jest" | "mocha">>];
