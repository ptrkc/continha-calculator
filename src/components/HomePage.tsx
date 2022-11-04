import { PropsWithChildren, useState } from "react";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { formatCurrency } from "@utils/formatCurrency";

type Person = {
  name: string;
  color: string;
  id: string;
};

type Product = {
  emoji: "🍺";
  name: string;
  unitPrice: number;
  quantity: number;
  id: string;
};

const Person = ({
  person,
  changePersonProp,
}: PropsWithChildren<{ person: Person; changePersonProp: Function }>) => {
  return (
    <li className="flex gap-2 items-center">
      <span
        className={`rounded-full w-6 h-6 flex justify-center items-center text-white ${person.color}`}
      >
        {person.name.slice(0, 2)}
      </span>
      <Input
        className="w-full"
        value={person.name}
        onChange={(value: string) => changePersonProp(person, "name", value)}
        focus
      />
    </li>
  );
};

const Product = ({
  product,
  changeProductProp,
}: PropsWithChildren<{ product: Product; changeProductProp: Function }>) => {
  const totalPrice = product.unitPrice * product.quantity;
  return (
    <li className="flex gap-2 items-center justify-between">
      <div className="flex flex-col w-full gap-2">
        <div className="flex w-full">
          <span className="rounded-full border-2 border-black w-6 h-6 flex justify-center items-center text-white mr-2">
            {product.emoji}
          </span>
          <Input
            className="w-full"
            value={product.name}
            onChange={(value: string) =>
              changeProductProp(product, "name", value)
            }
          />
        </div>
        <div className="flex justify-between">
          <span>
            Preço un.:{" "}
            <Input
              className="w-20 px-2"
              maxLength={11}
              inputMode="numeric"
              value={product.unitPrice}
              onChange={(value: string) =>
                changeProductProp(
                  product,
                  "unitPrice",
                  Number(value.replace(/[^\d]/g, ""))
                )
              }
              maskFunction={formatCurrency}
            />
          </span>
          <span>
            Qtd.:{" "}
            <Input
              className="w-16 px-2"
              type="number"
              step={1}
              min={1}
              value={String(product.quantity)}
              onChange={(value: string) =>
                changeProductProp(product, "quantity", Number(value))
              }
            />
          </span>
        </div>
      </div>
      <div className="whitespace-nowrap ">
        <p>Total:</p>
        <p>{formatCurrency(totalPrice)}</p>
      </div>
    </li>
  );
};

export const HomePage = () => {
  const [people, setPeople] = useState<Map<string, Person>>(
    new Map([
      [
        "person-1",
        {
          name: "Pessoa",
          color: "bg-red-500",
          id: "person-1",
        },
      ],
    ])
  );

  const [products, setProducts] = useState<Map<string, Product>>(
    new Map([
      [
        "prod-1",
        {
          emoji: "🍺",
          name: "Produto",
          unitPrice: 469,
          quantity: 3,
          id: "prod-1",
        },
      ],
    ])
  );
  const [tax, setTax] = useState(10);

  const addProduct = () => {
    const id = "prod-" + Math.random().toString(16).slice(2);
    setProducts(
      (prev) =>
        new Map([
          ...prev,
          [
            id,
            {
              emoji: "🍺",
              name: "Product",
              unitPrice: 0,
              quantity: 1,
              id,
            },
          ],
        ])
    );
  };

  const addPerson = () => {
    const id = "person-" + Math.random().toString(16).slice(2);
    setPeople(
      (prev) =>
        new Map([
          ...prev,
          [
            id,
            {
              name: "Person",
              color: "bg-red-500",
              id,
            },
          ],
        ])
    );
  };

  const changePersonProp = (
    person: Person,
    propKey: string,
    newValue: string
  ) => {
    setPeople((prev) =>
      new Map(prev).set(person.id, { ...person, [propKey]: newValue })
    );
  };

  const changeProductProp = (
    product: Product,
    propKey: string,
    newValue: string
  ) => {
    setProducts((prev) =>
      new Map(prev).set(product.id, { ...product, [propKey]: newValue })
    );
  };

  const calculateTotalWithTax = (products: Product[], tax: number) => {
    const total = [...products.values()].reduce(
      (prev, curr) => prev + Number(curr.unitPrice) * curr.quantity,
      0
    );
    return Math.ceil(total + (total * tax) / 100);
  };

  return (
    <div>
      <div className="flex gap-4 flex-col mx-auto max-w-2xl border-2 border-black rounded-md p-2 m-2">
        <p>Pessoas:</p>
        <ul className="flex flex-col gap-1">
          {[...people.values()].map((person) => (
            <Person
              person={person}
              key={person.id}
              changePersonProp={changePersonProp}
            />
          ))}
        </ul>
        <Button onClick={addPerson}>Adicionar pessoa+</Button>
        <p>Produtos:</p>
        <ul className="flex flex-col gap-8">
          {[...products.values()].map((product) => (
            <Product
              product={product}
              key={product.id}
              changeProductProp={changeProductProp}
            />
          ))}
        </ul>
        <Button onClick={addProduct}>Adicionar produto+</Button>
        <p>
          Serviço:{" "}
          <Input
            className="w-10"
            type="number"
            value={tax}
            onChange={(value: string) => setTax(Number(value))}
          />
          {"%"}
        </p>
        <p>Total: {formatCurrency(calculateTotalWithTax(products, tax))}</p>
      </div>
    </div>
  );
};
