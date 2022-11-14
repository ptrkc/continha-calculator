import create from "zustand";

export type Item = {
  defaultName: string;
  name: string;
  unitPrice: number;
  quantity: number;
  id: string;
  sharedBy: {
    [key: string]: boolean | number;
  };
};

interface ItemsState {
  _counter: number;
  items: Map<string, Item>;
  deleteItem: (id: string) => void;
  addItem: () => void;
  changeItemProp: (
    item: Item,
    propKey: string,
    newValue: string | number
  ) => void;
  shareItem: (itemId: string, personId: string) => void;
  deleteShareRelation: (personId: string) => void;
}

export const useItemsStore = create<ItemsState>((set) => ({
  _counter: 1,
  items: new Map([
    [
      "item-1",
      {
        defaultName: "Item 1",
        name: "",
        unitPrice: 0,
        quantity: 1,
        id: "item-1",
        sharedBy: {},
      },
    ],
  ]),
  deleteItem: (id) => set((state) => _deleteItem(state, id)),
  addItem: () => set(_addItem),
  changeItemProp: (item, propKey, newValue) =>
    set((state) => _changeItemProp(state, item, propKey, newValue)),
  shareItem: (itemId, personId) =>
    set((state) => _shareItem(state, itemId, personId)),
  deleteShareRelation: (personId) =>
    set((state) => _deleteShareRelation(state, personId)),
}));

const _shareItem = (state: ItemsState, itemId: string, personId: string) => {
  const item = state.items.get(itemId)!;
  return {
    items: new Map(state.items).set(item.id, {
      ...item,
      sharedBy: {
        ...item.sharedBy,
        [personId]: !item.sharedBy[personId],
      },
    }),
  };
};

const _deleteShareRelation = (state: ItemsState, personId: string) => {
  const items = [...state.items];
  items.forEach(([key, item]) => delete item.sharedBy[personId]);
  return { items: new Map(items) };
};

const _addItem = (state: ItemsState) => {
  const currentCounter = state._counter + 1;
  const id = `item-${currentCounter}`;
  return {
    _counter: currentCounter,
    items: new Map([
      ...state.items,
      [
        id,
        {
          defaultName: `Item ${currentCounter}`,
          name: "",
          unitPrice: 0,
          quantity: 1,
          id,
          sharedBy: {},
        },
      ],
    ]),
  };
};
const _deleteItem = (state: ItemsState, id: string) => {
  const newItems = new Map([...state.items]);
  newItems.delete(id);
  return {
    items: newItems,
  };
};

const _changeItemProp = (
  state: ItemsState,
  item: Item,
  propKey: string,
  newValue: string | number
) => {
  return {
    items: new Map(state.items).set(item.id, {
      ...item,
      [propKey]: newValue,
    }),
  };
};
