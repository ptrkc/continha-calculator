import create from 'zustand';

type ShareType = 'all' | 'quantity' | 'price';

export interface Item {
  defaultName: string;
  name: string;
  unitPrice: number;
  quantity: number;
  id: string;
  sharedBy: Partial<Record<string, { type: ShareType; value: number } | false>>;
}

export interface ItemsState {
  _counter: number;
  items: Map<string, Item>;
  deleteItem: (id: string) => void;
  addItem: () => void;
  changeItemProp: (
    item: Item,
    propKey: string,
    newValue: string | number | object,
  ) => void;
  shareItem: (itemId: string, personId: string, shareType: ShareType) => void;
  deleteShareRelation: (personId: string) => void;
}

const _shareItem = (
  state: ItemsState,
  itemId: string,
  personId: string,
  shareType: ShareType,
) => {
  console.log(state);
  console.log(itemId);
  const item = state.items.get(itemId);
  if (!item) {
    console.log("received an itemId that doesn't exist, shouldn't happen");
    return state;
  }

  console.log(shareType);
  return {
    items: new Map(state.items).set(item.id, {
      ...item,
      sharedBy: {
        ...item.sharedBy,
        [personId]: {
          type: shareType,
          value: 0,
        },
      },
    }),
  };
};

const _deleteShareRelation = (state: ItemsState, personId: string) => {
  const items = [...state.items];
  items.forEach(([_, item]) => (item.sharedBy[personId] = false));
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
          defaultName: `ITEM ${currentCounter}`,
          name: '',
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
  newValue: string | number | object,
) => ({
  items: new Map(state.items).set(item.id, {
    ...item,
    [propKey]: newValue,
  }),
});

export const useItemsStore = create<ItemsState>(set => ({
  _counter: 1,
  items: new Map([
    [
      'item-1',
      {
        defaultName: 'ITEM 1',
        name: '',
        unitPrice: 0,
        quantity: 1,
        id: 'item-1',
        sharedBy: {},
      },
    ],
  ]),
  deleteItem: id => set(state => _deleteItem(state, id)),
  addItem: () => set(_addItem),
  changeItemProp: (item, propKey, newValue) => {
    set(state => _changeItemProp(state, item, propKey, newValue));
  },
  shareItem: (itemId, personId, shareType) =>
    set(state => _shareItem(state, itemId, personId, shareType)),
  deleteShareRelation: personId =>
    set(state => _deleteShareRelation(state, personId)),
}));
