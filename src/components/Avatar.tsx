import styles from "./Avatar.module.css";
import { Person } from "@/hooks/usePeopleStore";
import { cn } from "@/utils/classnames";

const chooseVariant = (person: Person, productId: string) => {
  if (person.payingFor[productId] === true) return "solid";
  if (typeof person.payingFor[productId] === "number") return "partial";
  return "outline";
};

const abbreviate = (person: Person) => {
  const nameToUse = person.name.trim() || person.defaultName;
  const splitNames = nameToUse.split(/\s+/);
  if (splitNames.length > 1 && splitNames[1].length) {
    return `${splitNames[0][0]}${splitNames[1][0]}`;
  }

  return nameToUse.slice(0, 2);
};

const AvatarBase = ({
  person,
  size,
  onClick,
  variant = "solid",
}: {
  person: Person;
  size: "sm" | "lg";
  variant?: "solid" | "partial" | "outline";
  onClick?: Function;
}) => {
  const abbreviation = abbreviate(person);

  const CustomTag = onClick
    ? "button"
    : ("span" as keyof JSX.IntrinsicElements);

  return (
    <CustomTag
      {...onClick}
      className={cn(
        "select-none shrink-0 rounded-full w-8 h-8 flex overflow-hidden justify-center items-center border-2",
        size === "sm" ? "w-8 h-8" : "w-14 h-14",
        styles.avatar,
        styles[person.color],
        styles[variant]
      )}
    >
      {abbreviation}
    </CustomTag>
  );
};

export const Avatar = ({
  person,
  size = "sm",
}: {
  person: Person;
  size?: "sm" | "lg";
}) => {
  return <AvatarBase person={person} size={size} variant="solid" />;
};

export const AvatarSplittingButton = ({
  person,
  productId,
  size = "lg",
  onClick,
}: {
  person: Person;
  productId: string;
  size?: "sm" | "lg";
  onClick: Function;
}) => {
  const variant = chooseVariant(person, productId);
  return (
    <AvatarBase
      person={person}
      size={size}
      onClick={onClick}
      variant={variant}
    />
  );
};
