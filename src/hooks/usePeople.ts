import { useState } from "react";

export type Person = {
  name: string;
  color: string;
  id: string;
};

export const usePeople = () => {
  const [people, setPeople] = useState<Map<string, Person>>(
    new Map([
      [
        "person-1",
        {
          name: "Pessoa",
          color: "bg-red-500",
          id: "person-1",
        },
      ],
    ])
  );

  const addPerson = () => {
    const id = "person-" + Math.random().toString(16).slice(2);
    setPeople(
        new Map([...people,[id,{ name: "Pessoa", color: "bg-red-500", id}]])
    );
  };
  const deletePerson = (id: string) => {
    console.log('deletePerson called')
    const newPeople = new Map([...people]);
    newPeople.delete(id);
    setPeople(newPeople);
  };

  const changePersonProp = (
    person: Person,
    propKey: string,
    newValue: string
  ) => {
    setPeople(new Map(people).set(person.id, { ...person, [propKey]: newValue }));
  };


  return {people, addPerson, changePersonProp, deletePerson}
}