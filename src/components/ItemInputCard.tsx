import { AvatarSplittingButton } from '@/components/Avatar';
import { DeleteButton } from '@/components/DeleteButton';
import { Input } from '@/components/Input';
import { usePeopleStore } from '@/hooks/usePeopleStore';
import { useItemsStore } from '@/hooks/useItemsStore';
import { currencyInput } from '@/utils/currencyInput';
import { formatCurrency } from '@/utils/formatCurrency';
import { IntegerInput } from './IntegerInput';

export function ItemInputCard({ itemId }: { itemId: string }) {
  const item = useItemsStore((state) => state.items.get(itemId))!;
  const { changeItemProp, deleteItem, shareItem } = useItemsStore((state) => ({
    changeItemProp: state.changeItemProp,
    deleteItem: state.deleteItem,
    shareItem: state.shareItem,
  }));
  const { people } = usePeopleStore((state) => ({
    people: state.people,
  }));

  const totalPrice = item.unitPrice * item.quantity;
  return (
    <li className="flex flex-col border rounded-xl p-2 shadow-md bg-white">
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <Input
            className="w-full"
            placeholder={item.defaultName}
            value={item.name}
            onChange={(value) => changeItemProp(item, 'name', value.toUpperCase())}
          />
          <DeleteButton onClick={() => deleteItem(item.id)} />
        </div>
        <div>
          Preço unitário: R$
          {' '}
          <Input
            className="w-20 text-right"
            maxLength={11}
            inputMode="numeric"
            placeholder="0,00"
            value={item.unitPrice}
            onChange={(value) => changeItemProp(
              item,
              'unitPrice',
              currencyInput.toCents(value),
            )}
            format={currencyInput.format}
          />
        </div>
        <div>
          <span>Quantidade: </span>
          <IntegerInput
            value={item.quantity}
            onChange={(event) => changeItemProp(item, 'quantity', Number(event.target.value))}
            buttonsFunction={(newValue) => changeItemProp(item, 'quantity', newValue)}
          />
        </div>
        <div className="whitespace-nowrap">
          <span>Total: </span>
          <span>{formatCurrency(totalPrice)}</span>
        </div>
      </div>
      <div className="py-2 flex flex-wrap gap-y-2 justify-around">
        {[...people.values()].map((person) => (
          <div
            className="flex flex-col items-center gap-y-1 w-[4.6rem]"
            key={person.id}
          >
            <AvatarSplittingButton
              person={person}
              item={item}
              size="lg"
              onClick={() => {
                shareItem(item.id, person.id);
              }}
            />
            {typeof item.sharedBy[person.id] === 'number' && (
              <Input
                className="w-full text-center px-0"
                type="text"
                value={item.sharedBy[person.id] as number}
                onChange={(value) => changeItemProp(item, 'sharedBy', {
                  ...item.sharedBy,
                  [person.id]: currencyInput.toCents(value),
                })}
                format={currencyInput.format}
                inputMode="numeric"
                placeholder="0,00"
              />
            )}
          </div>
        ))}
      </div>
    </li>
  );
}
