import create from 'zustand';

export interface Item {
  defaultName: string;
  name: string;
  unitPrice: number;
  quantity: number;
  id: string;
  sharedBy: Partial<Record<string, boolean | number>>;
}

interface ItemsState {
  _counter: number;
  items: Map<string, Item>;
  deleteItem: (id: string) => void;
  addItem: () => void;
  changeItemProp: (
    item: Item,
    propKey: string,
    newValue: string | number | object,
  ) => void;
  shareItem: (itemId: string, personId: string) => void;
  deleteShareRelation: (personId: string) => void;
}

const _shareItem = (state: ItemsState, itemId: string, personId: string) => {
  let newSharingValue: boolean | number = false;
  const item = state.items.get(itemId);
  if (!item) {
    console.log('an error that should never happen');
    return state;
  }

  const itemShareBy = item.sharedBy[personId];
  if (itemShareBy === undefined || itemShareBy === false) {
    newSharingValue = true;
  } else if (itemShareBy === true) {
    newSharingValue = 0;
  } else if (typeof itemShareBy === 'number') {
    newSharingValue = false;
  }
  return {
    items: new Map(state.items).set(item.id, {
      ...item,
      sharedBy: {
        ...item.sharedBy,
        [personId]: newSharingValue,
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
  shareItem: (itemId, personId) =>
    set(state => _shareItem(state, itemId, personId)),
  deleteShareRelation: personId =>
    set(state => _deleteShareRelation(state, personId)),
}));
