type Person = {
  name: string;
  age: number;
  birthdate: Date;
};

export function remapPerson<Key extends keyof Person>(
  key: Key,
  value: Person[Key]
): Person[Key] {
  if (key === "birthdate") {
    return new Date() as Person[Key];
  }

  return value;
}

// this present the problem of the type inference
// age is not a Date but a number
remapPerson<"age" | "birthdate">("age", new Date());
