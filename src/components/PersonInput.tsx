import { Avatar } from "@/components/Avatar";
import { IconButton } from "@/components/IconButton";
import { Input } from "@/components/Input";
import { TrashIcon } from "@/components/Icons";
import { Person } from "@/hooks/usePeopleStore";

export const PersonInput = ({
  person,
  changePersonProp,
  deletePerson,
}: {
  person: Person;
  changePersonProp: Function;
  deletePerson: Function;
}) => {
  return (
    <li className="flex gap-2 items-center border rounded-lg p-2 shadow-md">
      <Avatar person={person} />
      <Input
        className="w-full"
        value={person.name}
        placeholder={person.defaultName}
        onChange={(event) =>
          changePersonProp(person, "name", event.target.value.toUpperCase())
        }
      />
      <IconButton
        className="bg-red-700"
        onClick={() => deletePerson(person.id)}
        icon={<TrashIcon />}
      />
    </li>
  );
};
