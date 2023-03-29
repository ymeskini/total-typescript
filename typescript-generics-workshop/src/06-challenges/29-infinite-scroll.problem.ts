import { expect, it } from "vitest";
import { Equal, Expect } from "../helpers/type-utils";

type DefaultParams = { key: string; fetchRows: () => Promise<{id: number; name: string}[]> }

const makeInfiniteScroll = <T>(params: T) => {
  
  return {
    scroll: () => Promise.resolve(),
    getRows: () => [],
  };
};

it("Should fetch more data when scrolling", async () => {
  const table = makeInfiniteScroll({
    key: "id",
    fetchRows: () => Promise.resolve([{ id: 1, name: "John" }]),
  });

  await table.scroll();

  await table.scroll();

  expect(table.getRows()).toEqual([
    { id: 1, name: "John" },
    { id: 1, name: "John" },
  ]);
});

it("Should ensure that the key is one of the properties of the row", () => {
  makeInfiniteScroll({
    key: "name",
    fetchRows: () =>
      Promise.resolve([
        {
          id: "1",
        },
      ]),
  });
});

it("Should allow you to pass initialRows", () => {
  const { getRows } = makeInfiniteScroll({
    key: "id",
    initialRows: [
      {
        id: 1,
        name: "John",
      },
    ],
    fetchRows: () => Promise.resolve([]),
  });

  const rows = getRows();

  expect(rows).toEqual([
    {
      id: 1,
      name: "John",
    },
  ]);

  type tests = [
    Expect<Equal<typeof rows, Array<{ id: number; name: string }>>>,
  ];
});
