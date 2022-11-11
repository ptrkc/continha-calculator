import { PropsWithChildren, useState } from "react";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { usePeopleStore, Person } from "@/hooks/usePeopleStore";
import { useProductsStore, Product } from "@/hooks/useProductsStore";
import { formatCurrency } from "@/utils/formatCurrency";
import { currencyInput } from "@/utils/currencyInput";

import { IconButton } from "./IconButton";
import { CloseIcon, TrashIcon } from "./Icons";
import { Avatar, AvatarSplittingButton } from "./Avatar";

const PersonInput = ({
  person,
  changePersonProp,
  deletePerson,
}: PropsWithChildren<{
  person: Person;
  changePersonProp: Function;
  deletePerson: Function;
}>) => {
  return (
    <li className="flex gap-2 items-center border rounded-lg p-2 shadow-sm">
      <Avatar person={person} />
      <Input
        className="w-full"
        value={person.name}
        placeholder={person.defaultName}
        onChange={(event) =>
          changePersonProp(person, "name", event.target.value.toUpperCase())
        }
      />
      <IconButton
        className="bg-red-700"
        onClick={() => deletePerson(person.id)}
      >
        <TrashIcon />
      </IconButton>
    </li>
  );
};

const ProductInputs = ({
  product,
  people,
  changeProductProp,
  deleteProduct,
}: PropsWithChildren<{
  product: Product;
  people: Map<string, Person>;
  changeProductProp: Function;
  deleteProduct: Function;
}>) => {
  const totalPrice = product.unitPrice * product.quantity;
  return (
    <li className="flex flex-col border rounded-lg p-2 shadow-md">
      <div className="flex gap-2 mb-4 items-center justify-between">
        <div className="flex flex-col gap-2">
          <Input
            className="w-full"
            placeholder="Produto"
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
        <div className="whitespace-nowrap">
          <IconButton
            className="bg-red-700"
            onClick={() => deleteProduct(product.id)}
          >
            <CloseIcon />
          </IconButton>
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
            onClick={() => {}}
            key={person.id}
          />
        ))}
      </div>
    </li>
  );
};

export const HomePage = () => {
  const { people, addPerson, changePersonProp, deletePerson } =
    usePeopleStore();
  const { products, addProduct, changeProductProp, deleteProduct } =
    useProductsStore();
  const [tax, setTax] = useState(10);

  const calculateTotalWithTax = (
    products: Map<string, Product>,
    tax: number
  ) => {
    const total = [...products.values()].reduce(
      (prev, curr) => prev + Number(curr.unitPrice) * curr.quantity,
      0
    );
    return Math.ceil(total + (total * tax) / 100);
  };

  return (
    <div>
      <div className="flex flex-col gap-4 mx-auto max-w-2xl p-2">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Pessoas ({people.size}):</h2>
          <Button onClick={addPerson}>Adicionar Pessoa+</Button>
        </div>
        <ul className="flex flex-col gap-4">
          {people.size ? (
            [...people.values()].map((person) => (
              <PersonInput
                key={person.id}
                person={person}
                changePersonProp={changePersonProp}
                deletePerson={deletePerson}
              />
            ))
          ) : (
            <p className="text-center">
              Adicione pessoas para dividir a continha 😉
            </p>
          )}
        </ul>
        <h2 className="text-xl font-bold">Produtos ({products.size}):</h2>
        <ul className="flex flex-col gap-4">
          {products.size ? (
            [...products.values()].map((product) => (
              <ProductInputs
                key={product.id}
                product={product}
                people={people}
                changeProductProp={changeProductProp}
                deleteProduct={deleteProduct}
              />
            ))
          ) : (
            <p className="text-center">Nenhum produto? 🤔</p>
          )}
        </ul>
        <Button className="mx-auto" onClick={addProduct}>
          Adicionar Produto+
        </Button>
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
      </div>
    </div>
  );
};
