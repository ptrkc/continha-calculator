import { AvatarSplittingButton } from "@/components/Avatar";
import { IconButton } from "@/components/IconButton";
import { TrashIcon } from "@/components/Icons";
import { Input } from "@/components/Input";
import { usePeopleStore } from "@/hooks/usePeopleStore";
import { useItemsStore } from "@/hooks/useItemsStore";
import { currencyInput } from "@/utils/currencyInput";
import { formatCurrency } from "@/utils/formatCurrency";

export const ItemInputCard = ({ itemId }: { itemId: string }) => {
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
    <li className="flex flex-col border rounded-lg p-2 shadow-md">
      <div className="flex gap-2 mb-4 items-center justify-between">
        <div className="flex flex-col gap-2">
          <Input
            className="w-full"
            placeholder={item.defaultName}
            value={item.name}
            onChange={(event) =>
              changeItemProp(item, "name", event.target.value.toUpperCase())
            }
          />
          <span>
            Preço un.: R${" "}
            <Input
              className="w-20 text-right"
              maxLength={11}
              inputMode="numeric"
              placeholder="0,00"
              value={item.unitPrice}
              onChange={(event) =>
                changeItemProp(
                  item,
                  "unitPrice",
                  currencyInput.toCents(event.target.value)
                )
              }
              format={currencyInput.format}
            />
          </span>
          <span>
            Qtd.:{" "}
            <Input
              className="w-16 text-right"
              type="number"
              step={1}
              min={1}
              value={String(item.quantity)}
              onChange={(event) =>
                changeItemProp(item, "quantity", Number(event.target.value))
              }
            />
          </span>
        </div>
        <div className="whitespace-nowrap flex flex-col items-end">
          <IconButton
            className="bg-red-700"
            onClick={() => deleteItem(item.id)}
            icon={<TrashIcon />}
          />
          <p>Total:</p>
          <p>{formatCurrency(totalPrice)}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 justify-around">
        {[...people.values()].map((person) => (
          <div key={person.id}>
            <AvatarSplittingButton
              person={person}
              item={item}
              size="lg"
              onClick={() => {
                shareItem(item.id, person.id);
              }}
            />
            {typeof item.sharedBy[person.id] === "number" && (
              <Input
                className="w-14 text-center"
                type="text"
                value={item.sharedBy[person.id]}
                onChange={(event) =>
                  changeItemProp(item, "sharedBy", {
                    ...item.sharedBy,
                    [person.id]: currencyInput.toCents(event.target.value),
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
};
