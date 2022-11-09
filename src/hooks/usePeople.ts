import { useState } from "react";

export type Person = {
  name: string;
  color: string;
  id: string;
};

const COLORS = [
  "bg-red-500",
  "bg-yellow-500",
  "bg-lime-500",
  "bg-blue-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-orange-500",
  "bg-emerald-500",
  "bg-cyan-500",
  "bg-fuchsia-500",
];

export const usePeople = () => {
  const [counter, setCounter] = useState(1);
  const [people, setPeople] = useState<Map<string, Person>>(
    new Map([
      [
        "person-1",
        {
          name: "Pessoa 1",
          color: COLORS[0],
          id: "person-1",
        },
      ],
    ])
  );

  const addPerson = () => {
    const newCounter = counter + 1;
    const id = "person-" + Math.random().toString(16).slice(2);
    setPeople(
      new Map([
        ...people,
        [
          id,
          {
            name: newCounter > 9 ? `${newCounter}` : `Pessoa ${newCounter}`,
            color: COLORS[counter % COLORS.length],
            id,
          },
        ],
      ])
    );
    setCounter(newCounter);
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
