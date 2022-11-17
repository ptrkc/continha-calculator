import { IconButton } from '@/components/IconButton';
import { MinusIcon, PlusIcon } from '@/components/Icons';
import { Input } from '@/components/Input';

export function IntegerInput({
  value,
  onChange,
  buttonsFunction,
}: {
  value: number;
  onChange: (value: string) => void;
  buttonsFunction: (newValue: number) => void;
}) {
  return (
    <span className="inline-flex rounded-full border-[1px] border-blue-500">
      <IconButton
        className="bg-blue-500 rounded-r-none w-10"
        onClick={() => {
          buttonsFunction(value - 1);
        }}
        icon={<MinusIcon />}
      />
      <Input
        className="text-center border-0 rounded-none w-10 px-0"
        type="number"
        step={1}
        min={1}
        value={String(value)}
        onChange={onChange}
      />
      <IconButton
        className="bg-blue-500 rounded-l-none w-10"
        onClick={() => {
          buttonsFunction(value + 1);
        }}
        icon={<PlusIcon />}
      />
    </span>
  );
}
