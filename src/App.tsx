import { PropsWithChildren, useState } from "react";
import Button from "./components/Button";
import CurrencyInput from "./components/CurrencyInput";
import formatCurrency from "./utils/formatCurrency";

type Person = {
  name: string;
  color: string;
  id: string;
};

type Product = {
  emoji: "🍺";
  name: string;
  unitPrice: string;
  quantity: number;
  id: string;
};

const Person = ({
  person,
  changeName,
}: PropsWithChildren<{ person: Person; changeName: Function }>) => {
  return (
    <li className="flex gap-2 items-center">
      <span
        className={`rounded-full w-6 h-6 flex justify-center items-center text-white ${person.color}`}
      >
        {person.name.slice(0, 2)}
      </span>
      <input
        placeholder={person.name}
        onChange={(evt) => changeName(person, evt.target.value)}
      />
    </li>
  );
};

const Product = ({
  product,
  changeName,
}: PropsWithChildren<{ product: Product; changeName: Function }>) => {
  const totalPrice = Number(product.unitPrice) * product.quantity;
  return (
    <li className="flex gap-2 items-center justify-between">
      <span
        className={`rounded-full w-6 h-6 flex justify-center items-center text-white`}
      >
        {product.emoji}
      </span>
      <input
        placeholder={product.name}
        onChange={(evt) => changeName(product, evt.target.value)}
      />
      <span>qt: {product.quantity}</span>
      <span>
        unit: <CurrencyInput price={product.unitPrice} />
      </span>
      <span>total: {formatCurrency(totalPrice)}</span>
    </li>
  );
};

function App() {
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
          unitPrice: "469",
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
              unitPrice: "000",
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

  const changePersonName = (person: Person, newName: string) => {
    setPeople((prev) =>
      new Map(prev).set(person.id, { ...person, name: newName })
    );
  };

  const changeProductName = (product: Product, newName: string) => {
    setProducts((prev) =>
      new Map(prev).set(product.id, { ...product, name: newName })
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
              changeName={changePersonName}
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
              changeName={changeProductName}
            />
          ))}
        </ul>
        <Button onClick={addProduct}>Add product+</Button>
        <p>Total:</p>
      </div>
    </div>
  );
}

export default App;
