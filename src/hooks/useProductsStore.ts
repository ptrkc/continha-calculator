import create from "zustand";

export type Product = {
  defaultName: string;
  name: string;
  unitPrice: number;
  quantity: number;
  id: string;
};

interface ProductsState {
  _counter: number;
  products: Map<string, Product>;
  deleteProduct: (id: string) => void;
  addProduct: () => void;
  changeProductProp: (
    product: Product,
    propKey: string,
    newValue: string | number
  ) => void;
}

export const useProductsStore = create<ProductsState>((set) => ({
  _counter: 1,
  products: new Map([
    [
      "product-1",
      {
        defaultName: "Produto 1",
        name: "",
        unitPrice: 0,
        quantity: 1,
        id: "product-1",
      },
    ],
  ]),
  deleteProduct: (id) => set((state) => _deleteProduct(state, id)),
  addProduct: () => set(_addProduct),
  changeProductProp: (product, propKey, newValue) =>
    set((state) => _changeProductProp(state, product, propKey, newValue)),
}));

const _addProduct = (state: ProductsState) => {
  const currentCounter = state._counter + 1;
  const id = `product-${currentCounter}`;
  return {
    _counter: currentCounter,
    products: new Map([
      ...state.products,
      [
        id,
        {
          defaultName: `Produto ${currentCounter}`,
          name: "",
          unitPrice: 0,
          quantity: 1,
          id,
        },
      ],
    ]),
  };
};
const _deleteProduct = (state: ProductsState, id: string) => {
  const newProducts = new Map([...state.products]);
  newProducts.delete(id);
  return {
    products: newProducts,
    _counter: newProducts.size === 0 ? 0 : state._counter,
  };
};

const _changeProductProp = (
  state: ProductsState,
  product: Product,
  propKey: string,
  newValue: string | number
) => {
  return {
    products: new Map(state.products).set(product.id, {
      ...product,
      [propKey]: newValue,
    }),
  };
};
