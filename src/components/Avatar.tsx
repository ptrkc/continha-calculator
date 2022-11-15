import { MouseEventHandler } from 'react';
import styles from './Avatar.module.css';
import { Person } from '@/hooks/usePeopleStore';
import { cn } from '@/utils/classnames';
import { Item } from '@/hooks/useItemsStore';

const chooseVariant = (person: Person, item: Item) => {
  if (item.sharedBy[person.id] === true) return 'solid';
  if (typeof item.sharedBy[person.id] === 'number') return 'partial';
  return 'outline';
};

const abbreviate = (person: Person) => {
  const nameToUse = person.name.trim() || person.defaultName;
  const splitNames = nameToUse.split(/\s+/);
  if (splitNames.length > 1 && splitNames[1].length) {
    return `${splitNames[0][0]}${splitNames[1][0]}`;
  }

  return nameToUse.slice(0, 2);
};

function AvatarBase({
  person,
  size,
  onClick,
  variant = 'solid',
}: {
  person: Person;
  size: 'sm' | 'lg';
  variant?: 'solid' | 'partial' | 'outline';
  onClick?: MouseEventHandler<HTMLButtonElement>;
}) {
  const abbreviation = abbreviate(person);

  const DynamicTag = onClick ? 'button' : 'span';

  return (
    <DynamicTag
      {...{ onClick }}
      className={cn(
        'select-none shrink-0 rounded-full w-8 h-8 flex overflow-hidden justify-center items-center border-2',
        size === 'sm' ? 'w-8 h-8' : 'w-14 h-14',
        styles.avatar,
        styles[person.color],
        styles[variant],
      )}
    >
      {abbreviation}
    </DynamicTag>
  );
}

export function Avatar({
  person,
  size = 'sm',
}: {
  person: Person;
  size?: 'sm' | 'lg';
}) {
  return <AvatarBase person={person} size={size} variant="solid" />;
}

export function AvatarSplittingButton({
  person,
  item,
  size = 'lg',
  onClick,
}: {
  person: Person;
  item: Item;
  size?: 'sm' | 'lg';
  onClick: MouseEventHandler<HTMLButtonElement>;
}) {
  const variant = chooseVariant(person, item);
  return (
    <AvatarBase
      person={person}
      size={size}
      onClick={onClick}
      variant={variant}
    />
  );
}
