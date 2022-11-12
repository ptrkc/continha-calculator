import shallow from "zustand/shallow";
import { useProductsStore } from "@/hooks/useProductsStore";
import { Button } from "./Button";
import { PlusIcon } from "./Icons";
import { ProductInputCard } from "./ProductInputCard";

export const ProductsSection = () => {
  const productIds = useProductsStore(
    (state) => [...state.products.keys()],
    shallow
  );
  const addProduct = useProductsStore((state) => state.addProduct);
  return (
    <>
      <h2 className="text-xl font-bold">Produtos ({productIds.length}):</h2>
      <ul className="flex flex-col gap-4">
        {productIds.length ? (
          productIds.map((productId) => (
            <ProductInputCard key={productId} productId={productId} />
          ))
        ) : (
          <p className="text-center">Nenhum produto? 🤔</p>
        )}
      </ul>
      <Button className="mx-auto" onClick={addProduct} icon={<PlusIcon />}>
        Adicionar Produto
      </Button>
    </>
  );
};
