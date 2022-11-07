import { PropsWithChildren, useState } from "react";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { usePeople, Person } from "@hooks/usePeople";
import { formatCurrency } from "@utils/formatCurrency";
import { cn } from "@utils/classnames";
import { useProducts, Product } from "@hooks/useProducts";

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

const ProductInputs = ({
  product,
  changeProductProp,
  deleteProduct,
}: PropsWithChildren<{
  product: Product;
  changeProductProp: Function;
  deleteProduct: Function;
}>) => {
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
              className="w-24 text-right"
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
        <Button onClick={() => deleteProduct(product.id)}>X</Button>
        <p>Total:</p>
        <p>{formatCurrency(totalPrice)}</p>
      </div>
    </li>
  );
};

export const HomePage = () => {
  const { people, addPerson, changePersonProp, deletePerson } = usePeople();
  const { products, addProduct, changeProductProp, deleteProduct } =
    useProducts();

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
      <div className="flex flex-col gap-4 mx-auto max-w-2xl p-2 bg-yellow-200">
        <div className="flex justify-between">
          <p>Pessoas:</p>
          <Button onClick={addPerson}>Adicionar +</Button>
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
        <div className="flex justify-between">
          <p>Produtos:</p>
          <Button onClick={addProduct}>Adicionar +</Button>
        </div>
        <ul className="flex flex-col gap-8">
          {[...products.values()].map((product) => (
            <ProductInputs
              key={product.id}
              product={product}
              changeProductProp={changeProductProp}
              deleteProduct={deleteProduct}
            />
          ))}
        </ul>
        <p className="text-right">
          Serviço:{" "}
          <Input
            className="w-16 text-right"
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
