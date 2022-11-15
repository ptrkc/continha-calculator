import { Button } from '@/components/Button';
import { PlusIcon } from '@/components/Icons';
import { PersonInput } from '@/components/PersonInput';
import { usePeopleStore } from '@/hooks/usePeopleStore';
import { useItemsStore } from '@/hooks/useItemsStore';

export function PeopleSection() {
  const {
    people, addPerson, changePersonProp, deletePerson,
  } = usePeopleStore();
  const deleteShareRelation = useItemsStore(
    (state) => state.deleteShareRelation,
  );
  const deletePersonAndRelation = (id: string) => {
    deletePerson(id);
    deleteShareRelation(id);
  };
  return (
    <>
      <div className="flex justify-between items-center">
        <h2>
          Pessoas (
          {people.size}
          ):
        </h2>
        <Button onClick={addPerson} icon={<PlusIcon />}>
          Pessoa
        </Button>
      </div>
      <ul className="flex flex-col gap-4">
        {people.size ? (
          [...people.values()].map((person) => (
            <PersonInput
              key={person.id}
              person={person}
              changePersonProp={changePersonProp}
              deletePerson={deletePersonAndRelation}
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
}
