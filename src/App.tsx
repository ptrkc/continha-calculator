import { FocusEventHandler, PropsWithChildren, useState } from "react";

type Person = {
  name: string;
  color: string;
  id: string;
};

const Person = ({
  person,
  changeName,
}: PropsWithChildren<{ person: Person; changeName: Function }>) => {
  return (
    <li className="flex gap-2 items-center">
      <span
        className={`rounded-full w-6 h-6 flex justify-center items-center text-white ${person.color}`}
      >
        {person.name.slice(0, 2)}
      </span>
      <input
        placeholder={person.name}
        onChange={(evt) => changeName(person.id, evt.target.value)}
      />
    </li>
  );
};

function App() {
  const [people, setPeople] = useState<Person[]>([
    {
      name: "Person",
      color: "bg-red-500",
      id: "1",
    },
  ]);

  const addPerson = () => {
    setPeople([
      ...people,
      {
        name: "Person",
        color: "bg-red-500",
        id: Math.random().toString(16).slice(2),
      },
    ]);
  };

  const changeName = (id: string, newName: string) => {
    const personIndex = people.findIndex((p) => p.id === id);
    const newPeople = [...people];
    newPeople[personIndex].name = newName;
    setPeople(newPeople);
  };
  return (
    <div>
      <div className="flex flex-col mx-auto max-w-2xl border-2 border-black rounded-md p-2 m-2">
        <p>People:</p>
        <ul className="flex flex-col gap-1">
          {people.map((person) => (
            <Person person={person} key={person.id} changeName={changeName} />
          ))}
        </ul>
        <button onClick={addPerson}>Add person+</button>
        <button>Add product+</button>
        <p>Total:</p>
      </div>
    </div>
  );
}

export default App;
