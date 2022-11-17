import shallow from 'zustand/shallow';
import { Button } from '@/components/Button';
import { PlusIcon } from '@/components/Icons';
import { PersonInput } from '@/components/PersonInput';
import { PeopleState, usePeopleStore } from '@/hooks/usePeopleStore';
import { ItemsState, useItemsStore } from '@/hooks/useItemsStore';

const peopleKeysSelector = (state: PeopleState) => [...state.people.keys()];
const peopleFunctionsSelector = (state: PeopleState) => ({
  addPerson: state.addPerson,
  changePersonProp: state.changePersonProp,
  deletePerson: state.deletePerson,
});

const deleteRelationSelector = (state: ItemsState) => state.deleteShareRelation;
export function PeopleSection() {
  const peopleKeys = usePeopleStore(peopleKeysSelector, shallow);
  const { addPerson, changePersonProp, deletePerson } = usePeopleStore(
    peopleFunctionsSelector,
    shallow,
  );
  const deleteShareRelation = useItemsStore(deleteRelationSelector, shallow);
  const deletePersonAndRelation = (id: string) => {
    deletePerson(id);
    deleteShareRelation(id);
  };
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h2>
          Pessoas ({peopleKeys.length}
          ):
        </h2>
        <Button onClick={addPerson} icon={<PlusIcon />}>
          Pessoa
        </Button>
      </div>
      <ul className="flex flex-col gap-4">
        {peopleKeys.length ? (
          peopleKeys.map(personId => (
            <PersonInput
              key={personId}
              personId={personId}
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
    </div>
  );
}
