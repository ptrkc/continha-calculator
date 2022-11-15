import { Avatar } from '@/components/Avatar';
import { Input } from '@/components/Input';
import { Person } from '@/hooks/usePeopleStore';
import { DeleteButton } from '@/components/DeleteButton';

export function PersonInput({
  person,
  changePersonProp,
  deletePerson,
}: {
  person: Person;
  changePersonProp: (person: Person, name: string, value: string) => void;
  deletePerson: (personId: string) => void;
}) {
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
