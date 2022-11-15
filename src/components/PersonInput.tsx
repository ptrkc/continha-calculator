import { Avatar } from "@/components/Avatar";
import { Input } from "@/components/Input";
import { Person } from "@/hooks/usePeopleStore";
import { DeleteButton } from "@/components/DeleteButton";

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
    <li className="flex gap-2 items-center border rounded-full p-2 shadow-md bg-white">
      <Avatar person={person} />
      <Input
        className="w-full"
        value={person.name}
        placeholder={person.defaultName}
        onChange={(event) =>
          changePersonProp(person, "name", event.target.value.toUpperCase())
        }
      />
      <DeleteButton onClick={() => deletePerson(person.id)} />
    </li>
  );
};
