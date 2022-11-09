import { useState } from "react";

export type Person = {
  defaultName: string;
  name: string;
  color: string;
  id: string;
};

const COLORS = [
  "red",
  "yellow",
  "lime",
  "blue",
  "purple",
  "pink",
  "orange",
  "emerald",
  "cyan",
  "fuchsia",
];

export const usePeople = () => {
  const [counter, setCounter] = useState(1);
  const [people, setPeople] = useState<Map<string, Person>>(
    new Map([
      [
        "person-1",
        {
          defaultName: "PESSOA 1",
          name: "",
          color: COLORS[0],
          id: "person-1",
        },
      ],
    ])
  );

  const addPerson = () => {
    const nextPersonNumber = counter + 1;
    const id = "person-" + Math.random().toString(16).slice(2);
    setPeople(
      new Map([
        ...people,
        [
          id,
          {
            defaultName:
              nextPersonNumber > 9
                ? `${nextPersonNumber}`
                : `PESSOA ${nextPersonNumber}`,
            name: "",
            color: COLORS[counter % COLORS.length],
            id,
          },
        ],
      ])
    );
    setCounter(nextPersonNumber);
  };
  const deletePerson = (id: string) => {
    const newPeople = new Map([...people]);
    newPeople.delete(id);
    setPeople(newPeople);
    if (newPeople.size === 0) setCounter(0);
  };

  const changePersonProp = (
    person: Person,
    propKey: string,
    newValue: string
  ) => {
    setPeople(
      new Map(people).set(person.id, { ...person, [propKey]: newValue })
    );
  };

  return { people, addPerson, changePersonProp, deletePerson };
};
