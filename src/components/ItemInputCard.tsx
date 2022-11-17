import { useCallback } from 'react';
import shallow from 'zustand/shallow';
import { AvatarSplittingButton } from '@/components/Avatar';
import { DeleteButton } from '@/components/DeleteButton';
import { Input } from '@/components/Input';
import { IntegerInput } from '@/components/IntegerInput';
import { ItemsState, useItemsStore } from '@/hooks/useItemsStore';
import { PeopleState, usePeopleStore } from '@/hooks/usePeopleStore';
import { currencyInput } from '@/utils/currencyInput';
import { centsToDecimal } from '@/utils/centsToDecimal';

const peopleSelector = (state: PeopleState) => [...state.people.values()];
const itemFunctionsSelector = (state: ItemsState) => ({
  changeItemProp: state.changeItemProp,
  deleteItem: state.deleteItem,
  shareItem: state.shareItem,
});

export function ItemInputCard({ itemId }: { itemId: string }) {
  const item = useItemsStore(
    useCallback(state => state.items.get(itemId), [itemId]),
    shallow,
  );
  if (!item) {
    console.log("received an itemId that doesn't exist, shouldn't happen");
    return null;
  }
  const { changeItemProp, deleteItem, shareItem } = useItemsStore(
    itemFunctionsSelector,
    shallow,
  );
  const people = usePeopleStore(peopleSelector, shallow);

  const totalPrice = item.unitPrice * item.quantity;
  return (
    <li className="flex flex-col border rounded-xl p-2 shadow-md bg-white">
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <Input
            className="w-full"
            placeholder={item.defaultName}
            value={item.name}
            onChange={value =>
              changeItemProp(item, 'name', value.toUpperCase())
            }
          />
          <DeleteButton onClick={() => deleteItem(item.id)} />
        </div>
        <div>
          Preço unitário: R${' '}
          <Input
            className=" w-28 text-right"
            maxLength={8}
            inputMode="numeric"
            placeholder="0,00"
            value={item.unitPrice}
            onChange={value =>
              changeItemProp(item, 'unitPrice', currencyInput.toCents(value))
            }
            format={currencyInput.format}
          />
        </div>
        <div className="flex justify-start items-center gap-2">
          <span>Quantidade: </span>
          <IntegerInput
            value={item.quantity}
            onChange={value => changeItemProp(item, 'quantity', Number(value))}
            buttonsFunction={newValue =>
              changeItemProp(item, 'quantity', newValue)
            }
          />
        </div>
        <div className="whitespace-nowrap">
          <span>Total: </span>
          <span>R$ {centsToDecimal(totalPrice)}</span>
        </div>
      </div>
      <div className="py-2 flex flex-wrap gap-y-2 justify-around">
        {[...people.values()].map(person => (
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
                onChange={value =>
                  changeItemProp(item, 'sharedBy', {
                    ...item.sharedBy,
                    [person.id]: currencyInput.toCents(value),
                  })
                }
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
