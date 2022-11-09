import { PropsWithChildren, useState } from "react";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { usePeople, Person } from "@hooks/usePeople";
import { useProducts, Product } from "@hooks/useProducts";
import { formatCurrency } from "@utils/formatCurrency";
import { cn } from "@utils/classnames";
import { currencyInput } from "@utils/currencyInput";

const PersonAvatar = ({ person }: { person: Person }) => {
  const nameToUse = person.name.trim() || person.defaultName;
  const splitName = nameToUse.split(/\s+/);
  const abbreviation =
    splitName.length > 1 && splitName[1]
      ? `${splitName[0][0]}${splitName[1][0]}`
      : nameToUse.slice(0, 2);
  return (
    <span
      className={cn(
        "shrink-0 rounded-full w-8 h-8 flex overflow-hidden justify-center items-center text-white",
        person.color
      )}
    >
      <span>{abbreviation}</span>
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
  return (
    <li className="flex gap-2 items-center">
      <PersonAvatar person={person} />

      <Input
        className="w-full"
        value={person.name}
        placeholder={person.defaultName}
        onChange={(event) =>
          changePersonProp(person, "name", event.target.value.toUpperCase())
        }
      />
      <Button className="bg-red-700" onClick={() => deletePerson(person.id)}>
        X
      </Button>
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
          placeholder="Produto"
          value={product.name}
          onChange={(event) =>
            changeProductProp(product, "name", event.target.value)
          }
        />
        <div className="flex justify-between">
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
      </div>
      <div className="whitespace-nowrap ">
        <Button
          className="bg-red-700"
          onClick={() => deleteProduct(product.id)}
        >
          X
        </Button>
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
