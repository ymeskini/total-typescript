export type Maybe<T extends {}> = T | null | undefined;
// everything that is not null or undefined

type tests = [
  // @ts-expect-error
  Maybe<null>,
  // @ts-expect-error
  Maybe<undefined>,

  Maybe<string>,
  Maybe<false>,
  Maybe<0>,
  Maybe<"">,
  Maybe<{a: string}>,
];
