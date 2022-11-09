import { useState } from "react";

export type Person = {
  name: string;
  color: string;
  id: string;
};

export const usePeople = () => {
  const [counter, setCounter] = useState(1);
  const [people, setPeople] = useState<Map<string, Person>>(
    new Map([
      [
        "person-1",
        {
          name: "Pessoa 1",
          color: "bg-red-500",
          id: "person-1",
        },
      ],
    ])
  );

  const addPerson = () => {
    const newCounter = counter + 1;
    const id = "person-" + Math.random().toString(16).slice(2);
    setPeople(
        new Map([...people,[id,{ name: newCounter > 9 ? `${newCounter}` : `Pessoa ${newCounter}`, color: "bg-red-500", id}]])
    );
    setCounter(newCounter)
  };
  const deletePerson = (id: string) => {
    const newPeople = new Map([...people]);
    newPeople.delete(id);
    setPeople(newPeople);
    if(newPeople.size === 0) setCounter(0)
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