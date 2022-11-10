import create from "zustand";

export type Product = {
  name: string;
  unitPrice: number;
  quantity: number;
  id: string;
};

interface ProductsState {
  products: Map<string, Product>;
  deleteProduct: (id: string) => void;
  addProduct: () => void;
  changeProductProp: (
    product: Product,
    propKey: string,
    newValue: string
  ) => void;
}

export const useProductsStore = create<ProductsState>((set) => ({
  products: new Map([
    [
      "product-1",
      {
        name: "",
        unitPrice: 0,
        quantity: 1,
        id: "product-1",
      },
    ],
  ]),
  deleteProduct: (id) => set((state) => _deleteProduct(state.products, id)),
  addProduct: () => set(_addProduct),
  changeProductProp: (product, propKey, newValue) =>
    set((state) => _changeProductProp(state, product, propKey, newValue)),
}));

const _addProduct = (state: ProductsState) => {
  const id = "product-" + Math.random().toString(16).slice(2);
  return {
    products: new Map([
      ...state.products,
      [id, { name: "", unitPrice: 0, quantity: 1, id }],
    ]),
  };
};
const _deleteProduct = (products: Map<string, Product>, id: string) => {
  const newProducts = new Map([...products]);
  newProducts.delete(id);
  return { products: newProducts };
};

const _changeProductProp = (
  state: ProductsState,
  product: Product,
  propKey: string,
  newValue: string
) => {
  return {
    products: new Map(state.products).set(product.id, {
      ...product,
      [propKey]: newValue,
    }),
  };
};
