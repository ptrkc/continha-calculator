import { useCallback } from 'react';
import shallow from 'zustand/shallow';
import { Avatar } from '@/components/Avatar';
import { Input } from '@/components/Input';
import { Person, usePeopleStore } from '@/hooks/usePeopleStore';
import { DeleteButton } from '@/components/DeleteButton';

export function PersonInput({
  personId,
  changePersonProp,
  deletePerson,
}: {
  personId: string;
  changePersonProp: (person: Person, name: string, value: string) => void;
  deletePerson: (personId: string) => void;
}) {
  const person = usePeopleStore(
    useCallback(state => state.people.get(personId), [personId]),
    shallow,
  );
  if (!person) {
    console.log("received a personId that doesn't exist, shouldn't happen");
    return null;
  }

  return (
    <li className="flex gap-2 items-center border rounded-full p-2 shadow-md bg-white">
      <Avatar person={person} />
      <Input
        className="w-full"
        value={person.name}
        placeholder={person.defaultName}
        onChange={value =>
          changePersonProp(person, 'name', value.toUpperCase())
        }
      />
      <DeleteButton onClick={() => deletePerson(person.id)} />
    </li>
  );
}
