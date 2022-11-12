import { Button } from "@/components/Button";
import { PlusIcon } from "@/components/Icons";
import { PersonInput } from "@/components/PersonInput";
import { usePeopleStore } from "@/hooks/usePeopleStore";

export const PeopleSection = () => {
  const { people, addPerson, changePersonProp, deletePerson } =
    usePeopleStore();
  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Pessoas ({people.size}):</h2>
        <Button onClick={addPerson} icon={<PlusIcon />}>
          Adicionar Pessoa
        </Button>
      </div>
      <ul className="flex flex-col gap-4">
        {people.size ? (
          [...people.values()].map((person) => (
            <PersonInput
              key={person.id}
              person={person}
              changePersonProp={changePersonProp}
              deletePerson={deletePerson}
            />
          ))
        ) : (
          <p className="text-center">
            Adicione pessoas para dividir a continha 😉
          </p>
        )}
      </ul>
    </>
  );
};
