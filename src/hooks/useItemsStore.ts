import create from 'zustand';

type ShareType = 'all' | 'quantity' | 'price';

export interface Item {
  defaultName: string;
  name: string;
  unitPrice: number;
  quantity: number;
  id: string;
  sharedBy: Map<string, { type: ShareType; value: number }>;
}

export interface ItemsState {
  _counter: number;
  items: Map<string, Item>;
  deleteItem: (id: string) => void;
  addItem: () => void;
  changeItemProp: (
    itemId: string,
    propKey: 'name' | 'quantity' | 'unitPrice',
    newValue: string | number | object,
  ) => void;
  changeShareBy: (
    personId: string,
    itemId: string,
    newValue: { type: ShareType; value: number },
  ) => void;
  shareItem: (itemId: string, personId: string, shareType: ShareType) => void;
  deleteShareRelation: (personId: string, itemId?: string) => void;
}

const _shareItem = (
  state: ItemsState,
  itemId: string,
  personId: string,
  shareType: ShareType,
) => {
  const item = state.items.get(itemId);
  if (!item) return state;

  item.sharedBy.set(personId, { type: shareType, value: 0 });
  return { items: new Map(state.items).set(itemId, item) };
};

const _deleteShareRelation = (
  state: ItemsState,
  personId: string,
  itemId?: string,
) => {
  if (itemId) {
    const item = state.items.get(itemId);
    if (!item) return state;

    item.sharedBy.delete(personId);
    const items = new Map(state.items).set(itemId, item);
    return { items };
  }

  const items = new Map(state.items);
  items.forEach(item => item.sharedBy.delete(personId));
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
          sharedBy: new Map<string, { type: ShareType; value: number }>(),
        },
      ],
    ]),
  };
};

const _deleteItem = (state: ItemsState, id: string) => {
  const newItems = new Map([...state.items]);
  newItems.delete(id);
  return { items: newItems };
};

const _changeItemProp = (
  state: ItemsState,
  itemId: string,
  propKey: 'name' | 'quantity' | 'unitPrice',
  newValue: string | number | object,
) => {
  const item = state.items.get(itemId);
  if (!item) return state;

  return {
    items: new Map(state.items).set(item.id, {
      ...item,
      [propKey]: newValue,
    }),
  };
};

const _changeShareBy = (
  state: ItemsState,
  personId: string,
  itemId: string,
  newValue: { type: ShareType; value: number },
) => {
  const item = state.items.get(itemId);
  if (!item) return state;

  item.sharedBy.set(personId, newValue);

  const items = new Map(state.items).set(itemId, item);
  return { items };
};

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
        sharedBy: new Map<string, { type: ShareType; value: number }>(),
      },
    ],
  ]),
  deleteItem: id => set(state => _deleteItem(state, id)),
  addItem: () => set(_addItem),
  changeItemProp: (itemId, propKey, newValue) => {
    set(state => _changeItemProp(state, itemId, propKey, newValue));
  },
  changeShareBy: (itemId, personId, newValue) => {
    set(state => _changeShareBy(state, itemId, personId, newValue));
  },
  shareItem: (itemId, personId, shareType) =>
    set(state => _shareItem(state, itemId, personId, shareType)),
  deleteShareRelation: (personId, itemId) =>
    set(state => _deleteShareRelation(state, personId, itemId)),
}));
