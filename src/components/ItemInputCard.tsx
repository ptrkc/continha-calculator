import { useCallback } from 'react';
import shallow from 'zustand/shallow';
import { Avatar } from '@/components/Avatar';
import { BackButton } from '@/components/BackButton';
import { DeleteButton } from '@/components/DeleteButton';
import { Input } from '@/components/Input';
import { IntegerInput } from '@/components/IntegerInput';
import { Item, ItemsState, useItemsStore } from '@/hooks/useItemsStore';
import { PeopleState, usePeopleStore } from '@/hooks/usePeopleStore';
import { currencyInput } from '@/utils/currencyInput';
import { centsToDecimal } from '@/utils/centsToDecimal';
import { Button } from './Button';

const shareItemSelector = (state: ItemsState) => state.shareItem;

function ShareOptionButtons({
  itemId,
  personId,
}: {
  itemId: string;
  personId: string;
}) {
  const shareItem = useItemsStore(shareItemSelector, shallow);
  return (
    <div className="flex w-full items-center justify-around gap-1">
      <Button
        className=" leading-1 text-sm bg-white text-black border border-black"
        onClick={() => shareItem(itemId, personId, 'all')}
      >
        dividir total
      </Button>
      <Button
        className=" leading-1 text-sm bg-white text-black border border-black"
        onClick={() => shareItem(itemId, personId, 'price')}
      >
        pagar valor
      </Button>
      <Button
        className=" leading-1 text-sm bg-white text-black border border-black"
        onClick={() => shareItem(itemId, personId, 'quantity')}
      >
        pagar quantidade
      </Button>
    </div>
  );
}

const changeItemPropSelector = (state: ItemsState) => state.changeItemProp;

function ShareOptionField({
  item,
  personId,
}: {
  item: Item;
  personId: string;
}) {
  const changeItemProp = useItemsStore(changeItemPropSelector, shallow);
  console.log(personId, item);
  if (item.sharedBy[personId].type === 'price')
    return (
      <div className="flex gap-2 items-center justify-start">
        <span>Valor: </span>
        <Input
          className="w-28"
          type="text"
          value={item.sharedBy[personId].value}
          onChange={value =>
            changeItemProp(item, 'sharedBy', {
              ...item.sharedBy,
              [personId]: {
                type: item.sharedBy[personId].type,
                value: currencyInput.toCents(value),
              },
            })
          }
          format={currencyInput.format}
          inputMode="numeric"
          placeholder="0,00"
        />
      </div>
    );

  if (item.sharedBy[personId].type === 'quantity')
    return (
      <div className="flex gap-2">
        <span>Qtd.: </span>
        <IntegerInput
          min={1}
          max={item.quantity}
          value={item.sharedBy[personId].value}
          onChange={value =>
            changeItemProp(item, 'sharedBy', {
              ...item.sharedBy,
              [personId]: {
                type: item.sharedBy[personId].type,
                value: Number(value),
              },
            })
          }
          buttonsFunction={value =>
            changeItemProp(item, 'sharedBy', {
              ...item.sharedBy,
              [personId]: {
                type: item.sharedBy[personId].type,
                value,
              },
            })
          }
        />
      </div>
    );

  return <span>Dividindo o total</span>;
}

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
            className="w-28 text-right"
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
          <span>Qtd.: </span>
          <IntegerInput
            min={1}
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
        <p>Selecione os participantes:</p>
      </div>
      <div className="py-2 flex flex-col gap-y-2 justify-around">
        {[...people.values()].map(person => (
          <div className="flex gap-2 items-center" key={person.id}>
            <div>
              <Avatar person={person} size="md" />
            </div>
            <div className="flex justify-between w-full">
              {!item.sharedBy[person.id]?.type ? (
                <ShareOptionButtons itemId={itemId} personId={person.id} />
              ) : (
                <>
                  <ShareOptionField item={item} personId={person.id} />
                  <BackButton
                    onClick={() => shareItem(item.id, person.id, false)}
                  />
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </li>
  );
}
