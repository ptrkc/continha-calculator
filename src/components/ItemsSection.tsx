import shallow from "zustand/shallow";
import { useItemsStore } from "@/hooks/useItemsStore";
import { Button } from "./Button";
import { PlusIcon } from "./Icons";
import { ItemInputCard } from "@/components/ItemInputCard";

export const ItemsSection = () => {
  const itemIds = useItemsStore((state) => [...state.items.keys()], shallow);
  const addItem = useItemsStore((state) => state.addItem);
  return (
    <>
      <h2>Items ({itemIds.length}):</h2>
      <ul className="flex flex-col gap-4">
        {itemIds.length ? (
          itemIds.map((itemId) => (
            <ItemInputCard key={itemId} itemId={itemId} />
          ))
        ) : (
          <p className="text-center">Nenhum item? 🤔</p>
        )}
      </ul>
      <Button className="mx-auto" onClick={addItem} icon={<PlusIcon />}>
        Item
      </Button>
    </>
  );
};
