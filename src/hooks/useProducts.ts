import { useState } from "react";

export type Product = {
  name: string;
  unitPrice: number;
  quantity: number;
  id: string;
};

export const useProducts = () => {
  const [products, setProducts] = useState<Map<string, Product>>(
    new Map([
      [
        "prod-1",
        {
          name: "",
          unitPrice: 0,
          quantity: 1,
          id: "prod-1",
        },
      ],
    ])
  );

  const addProduct = () => {
    const id = "prod-" + Math.random().toString(16).slice(2);
    setProducts(
        new Map([...products,[id,{ name: "", unitPrice: 0, quantity: 1, id}]])
    );
  };
  const deleteProduct = (id: string) => {
    const newProducts = new Map([...products]);
    newProducts.delete(id);
    setProducts(newProducts);
  };

  const changeProductProp = (
    product: Product,
    propKey: string,
    newValue: string
  ) => {
    setProducts(new Map(products).set(product.id, { ...product, [propKey]: newValue }));
  };


  return {products, addProduct, changeProductProp, deleteProduct}
}