import { useState } from "react";
import { Input } from "@/components/Input";
import { Product, useProductsStore } from "@/hooks/useProductsStore";
import { formatCurrency } from "@/utils/formatCurrency";

const calculateTotalWithTax = (products: Map<string, Product>, tax: number) => {
  const total = [...products.values()].reduce(
    (prev, curr) => prev + Number(curr.unitPrice) * curr.quantity,
    0
  );
  return Math.ceil(total + (total * tax) / 100);
};

export const TotalSection = () => {
  const [tax, setTax] = useState(10);
  const products = useProductsStore((state) => state.products);
  return (
    <>
      <p className="text-right">
        Serviço:{" "}
        <Input
          className="w-16 text-right"
          type="number"
          value={tax}
          onChange={(event) => setTax(Number(event.target.value))}
        />
        {"%"}
      </p>
      <p className="text-right">
        Total: {formatCurrency(calculateTotalWithTax(products, tax))}
      </p>
    </>
  );
};
