import shallow from 'zustand/shallow';
import { ItemsState, useItemsStore } from '@/hooks/useItemsStore';
import { Button } from '@/components/Button';
import { PlusIcon } from '@/components/Icons';
import { ItemInputCard } from '@/components/ItemInputCard';

const itemKeysSelector = (state: ItemsState) => [...state.items.keys()];
const addItemSelector = (state: ItemsState) => state.addItem;
export function ItemsSection() {
  const itemIds = useItemsStore(itemKeysSelector, shallow);
  const addItem = useItemsStore(addItemSelector, shallow);
  return (
    <>
      <h2>
        Items ({itemIds.length}
        ):
      </h2>
      <ul className="flex flex-col gap-4">
        {itemIds.length ? (
          itemIds.map(itemId => <ItemInputCard key={itemId} itemId={itemId} />)
        ) : (
          <p className="text-center">Nenhum item? 🤔</p>
        )}
      </ul>
      <Button className="mx-auto" onClick={addItem} icon={<PlusIcon />}>
        Item
      </Button>
    </>
  );
}
