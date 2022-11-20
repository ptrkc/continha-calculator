import styles from './Avatar.module.css';
import { Person } from '@/hooks/usePeopleStore';
import { cn } from '@/utils/classnames';

const abbreviate = (person: Person) => {
  const nameToUse = person.name.trim() || person.defaultName;
  const splitNames = nameToUse.split(/\s+/);
  if (splitNames.length > 1 && splitNames[1].length) {
    return `${splitNames[0][0]}${splitNames[1][0]}`;
  }

  return nameToUse.slice(0, 2);
};

export function Avatar({
  person,
  size = 'sm',
}: {
  person: Person;
  size?: 'sm' | 'md';
}) {
  const abbreviation = abbreviate(person);

  return (
    <div
      className={cn(
        'select-none shrink-0 rounded-full w-8 h-8 flex overflow-hidden justify-center items-center border-2',
        size === 'sm' ? 'w-8 h-8' : 'w-12 h-12',
        styles.avatar,
        styles[person.color],
      )}
    >
      {abbreviation}
    </div>
  );
}
