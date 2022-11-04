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
    <li className="flex flex-wrap gap-2 items-center justify-between">
      <span
        className={`rounded-full w-6 h-6 flex justify-center items-center text-white`}
      >
        {product.emoji}
      </span>
      <Input
        value={product.name}
        onChange={(value: string) => changeProductProp(product, "name", value)}
      />
      <span>
        qt:
        <Input
          value={String(product.quantity)}
          onChange={(value: string) =>
            changeProductProp(product, "quantity", Number(value))
          }
        />
      </span>
      <span>
        unit:{" "}
        <Input
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
      <span>total: {formatCurrency(totalPrice)}</span>
    </li>
  );
};

export const HomePage = () => {
  const [people, setPeople] = useState<Map<string, Person>>(
    new Map([
      [
        "person-1",
        {
          name: "Person",
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
          name: "Product",
          unitPrice: 469,
          quantity: 3,
          id: "prod-1",
        },
      ],
    ])
  );

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
  return (
    <div>
      <div className="flex flex-col mx-auto max-w-2xl border-2 border-black rounded-md p-2 m-2">
        <p>People:</p>
        <ul className="flex flex-col gap-1">
          {[...people.values()].map((person) => (
            <Person
              person={person}
              key={person.id}
              changePersonProp={changePersonProp}
            />
          ))}
        </ul>
        <Button onClick={addPerson}>Add person+</Button>
        <p>Products:</p>
        <ul className="flex flex-col gap-1">
          {[...products.values()].map((product) => (
            <Product
              product={product}
              key={product.id}
              changeProductProp={changeProductProp}
            />
          ))}
        </ul>
        <Button onClick={addProduct}>Add product+</Button>
        <p>
          Total:{" "}
          {formatCurrency(
            [...products.values()].reduce(
              (prev, curr) => prev + Number(curr.unitPrice) * curr.quantity,
              0
            )
          )}
        </p>
      </div>
    </div>
  );
};
