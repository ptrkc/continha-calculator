import { PropsWithChildren, useState } from "react";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { usePeople, Person } from "@hooks/usePeople";
import { formatCurrency } from "@utils/formatCurrency";
import { cn } from "@utils/classnames";

type Product = {
  name: string;
  unitPrice: number;
  quantity: number;
  id: string;
};

const PersonCircle = ({ person }: { person: Person }) => {
  const splitName = person.name.split(/\s+/);
  const abbreviation =
    splitName.length > 1 && splitName[1]
      ? `${splitName[0][0]}${splitName[1][0]}`
      : person.name.slice(0, 2);
  return (
    <span
      className={cn(
        "shrink-0 rounded-full w-8 h-8 flex overflow-hidden justify-center items-center text-white",
        person.color
      )}
    >
      <span>{abbreviation.toUpperCase()}</span>
    </span>
  );
};

const PersonInput = ({
  person,
  changePersonProp,
  deletePerson,
}: PropsWithChildren<{
  person: Person;
  changePersonProp: Function;
  deletePerson: Function;
}>) => {
  console.log("person input started rendering");
  return (
    <li className="flex gap-2 items-center">
      <PersonCircle person={person} />

      <Input
        className="w-full"
        value={person.name}
        onChange={(value: string) => changePersonProp(person, "name", value)}
        focus
      />
      <Button onClick={() => deletePerson(person.id)}>X</Button>
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
        <Input
          className="w-full"
          value={product.name}
          onChange={(value: string) =>
            changeProductProp(product, "name", value)
          }
        />
        <div className="flex justify-between">
          <span>
            Preço un.:{" "}
            <Input
              className="w-20"
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
              className="w-16 text-right"
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
  const { people, addPerson, changePersonProp, deletePerson } = usePeople();
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
              name: "Produto",
              unitPrice: 0,
              quantity: 1,
              id,
            },
          ],
        ])
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
      <div className="flex flex-col gap-4 mx-auto max-w-2xl p-2 bg-yellow-200">
        <div className="flex justify-between">
          <p>Pessoas:</p>
          <Button onClick={addPerson}>Adicionar +</Button>
        </div>
        <ul className="flex flex-col gap-4">
          {people.size ? (
            [...people.values()].map((person) => (
              <PersonInput
                person={person}
                changePersonProp={changePersonProp}
                deletePerson={deletePerson}
                key={person.id}
              />
            ))
          ) : (
            <p className="text-center">
              Adicione pessoas para dividir a continha 😉
            </p>
          )}
        </ul>
        <div className="flex justify-between">
          <p>Produtos:</p>
          <Button onClick={addProduct}>Adicionar +</Button>
        </div>
        <ul className="flex flex-col gap-8">
          {[...products.values()].map((product) => (
            <Product
              product={product}
              key={product.id}
              changeProductProp={changeProductProp}
            />
          ))}
        </ul>
        <p className="text-right">
          Serviço:{" "}
          <Input
            className="w-10"
            type="number"
            value={tax}
            onChange={(value: string) => setTax(Number(value))}
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
