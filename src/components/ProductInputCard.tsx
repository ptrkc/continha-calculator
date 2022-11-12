import { AvatarSplittingButton } from "@/components/Avatar";
import { IconButton } from "@/components/IconButton";
import { TrashIcon } from "@/components/Icons";
import { Input } from "@/components/Input";
import { usePeopleStore } from "@/hooks/usePeopleStore";
import { Product, useProductsStore } from "@/hooks/useProductsStore";
import { currencyInput } from "@/utils/currencyInput";
import { formatCurrency } from "@/utils/formatCurrency";

export const ProductInputCard = ({ productId }: { productId: string }) => {
  const product = useProductsStore((state) => state.products.get(productId));
  const { changeProductProp, deleteProduct } = useProductsStore((state) => ({
    changeProductProp: state.changeProductProp,
    deleteProduct: state.deleteProduct,
  }));
  const { people, splitProduct } = usePeopleStore((state) => ({
    people: state.people,
    splitProduct: state.splitProduct,
  }));
  if (product === undefined) {
    console.log("error");
    return null;
  }

  const totalPrice = product.unitPrice * product.quantity;
  return (
    <li className="flex flex-col border rounded-lg p-2 shadow-md">
      <div className="flex gap-2 mb-4 items-center justify-between">
        <div className="flex flex-col gap-2">
          <Input
            className="w-full"
            placeholder={product.defaultName}
            value={product.name}
            onChange={(event) =>
              changeProductProp(product, "name", event.target.value)
            }
          />
          <span>
            Preço un.: R${" "}
            <Input
              className="w-20 text-right"
              maxLength={11}
              inputMode="numeric"
              placeholder="0,00"
              value={product.unitPrice}
              onChange={(event) =>
                changeProductProp(
                  product,
                  "unitPrice",
                  currencyInput.toCents(event.target.value)
                )
              }
              format={currencyInput.format}
            />
          </span>
          <span>
            Qtd.:{" "}
            <Input
              className="w-16 text-right"
              type="number"
              step={1}
              min={1}
              value={String(product.quantity)}
              onChange={(event) =>
                changeProductProp(
                  product,
                  "quantity",
                  Number(event.target.value)
                )
              }
            />
          </span>
        </div>
        <div className="whitespace-nowrap flex flex-col items-end">
          <IconButton
            className="bg-red-700"
            onClick={() => deleteProduct(product.id)}
            icon={<TrashIcon />}
          />
          <p>Total:</p>
          <p>{formatCurrency(totalPrice)}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 justify-around">
        {[...people.values()].map((person) => (
          <AvatarSplittingButton
            person={person}
            productId={product.id}
            size="lg"
            onClick={() => {
              splitProduct(person, product.id);
            }}
            key={person.id}
          />
        ))}
      </div>
    </li>
  );
};
