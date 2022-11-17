import { useCallback, useState } from 'react';
import shallow from 'zustand/shallow';
import { Avatar } from '@/components/Avatar';
import { IntegerInput } from '@/components/IntegerInput';
import { Item, ItemsState, useItemsStore } from '@/hooks/useItemsStore';
import { PeopleState, usePeopleStore } from '@/hooks/usePeopleStore';
import { centsToDecimal } from '@/utils/centsToDecimal';

const addTax = (value: number, tax: number) =>
  Math.ceil(value + (value * tax) / 100);

const calculateTotal = (items: Item[]) => {
  return [...items.values()].reduce(
    (prev, curr) => prev + Number(curr.unitPrice) * curr.quantity,
    0,
  );
};

const calculateTotalsPerPerson = (peopleIds: string[], itemsArray: Item[]) => {
  const totalsPerPerson: Record<
    string,
    {
      personId: string;
      totalToPay: number;
      items: { item: Item; toPay: number }[];
    }
  > = peopleIds.reduce(
    (acc, personId) => ({
      ...acc,
      [personId]: {
        personId: personId,
        totalToPay: 0,
        items: [],
      },
    }),
    {},
  );
  itemsArray.forEach(item => {
    const itemTotal = item.unitPrice * item.quantity;
    const peopleSharing: string[] = [];
    let totalCustomValue = 0;
    Object.keys(item.sharedBy).forEach(personId => {
      const sharedBy = item.sharedBy[personId];
      if (sharedBy === true) {
        peopleSharing.push(personId);
      } else if (typeof sharedBy === 'number') {
        totalsPerPerson[personId].items.push({
          item,
          toPay: sharedBy,
        });
        totalsPerPerson[personId].totalToPay += sharedBy;
        totalCustomValue += sharedBy;
      }
    });
    const sharedTotal = Math.ceil(
      (itemTotal - totalCustomValue) / peopleSharing.length,
    );
    peopleSharing.forEach(personId => {
      totalsPerPerson[personId].items.push({
        item,
        toPay: sharedTotal,
      });
      totalsPerPerson[personId].totalToPay += sharedTotal;
    });
  });

  return totalsPerPerson;
};

function PersonTotalCard({
  personTotals,
  tax,
}: {
  personTotals: {
    personId: string;
    totalToPay: number;
    items: { item: Item; toPay: number }[];
  };
  tax: number;
}) {
  const { items, totalToPay, personId } = personTotals;
  const person = usePeopleStore(
    useCallback(state => state.people.get(personId), [personId]),
    shallow,
  );
  if (!person) {
    console.log("received a personId that doesn't exist, shouldn't happen");
    return null;
  }
  return (
    <div className="items-center border rounded-xl bg-white p-2 shadow-md font-mono">
      <div className="font-sans flex gap-2 items-center">
        <Avatar person={person} />
        <span className="font-bold">{person.name || person.defaultName}</span>
      </div>
      <div className="py-2">
        {items.map(({ item, toPay }) => (
          <p
            className="flex items-center justify-between overflow-hidden"
            key={item.id}
          >
            <span className="whitespace-nowrap text-ellipsis overflow-hidden">
              {item.name || item.defaultName}
            </span>
            <span className="grow mx-2 h-[1px] bg-current min-w-[20px]" />
            <span className="whitespace-nowrap">
              R$ {centsToDecimal(toPay)}
            </span>
          </p>
        ))}
      </div>
      <p className="text-right">Total: R$ {centsToDecimal(totalToPay)}</p>
      <p className="text-right font-bold">
        Total + {tax}%: R$ {centsToDecimal(addTax(totalToPay, tax))}
      </p>
    </div>
  );
}

const itemsSelector = (state: ItemsState) => [...state.items.values()];
const peopleSelector = (state: PeopleState) => [...state.people.keys()];

const calculateAmountAssigned = (
  totalsPerPerson: ReturnType<typeof calculateTotalsPerPerson>,
) => {
  const people = Object.values(totalsPerPerson);
  return people.reduce((prev, curr) => prev + curr.totalToPay, 0);
};

export function TotalSection() {
  const [tax, setTax] = useState(10);
  const items = useItemsStore(itemsSelector, shallow);
  const peopleIds = usePeopleStore(peopleSelector, shallow);
  const totalWithoutTax = calculateTotal(items);
  const totalWithTax = addTax(calculateTotal(items), tax);
  const totalsPerPerson = calculateTotalsPerPerson(peopleIds, items);
  const amountAssignedWithTax = addTax(
    calculateAmountAssigned(totalsPerPerson),
    tax,
  );
  return (
    <div className="flex flex-col gap-2">
      <h2>Total a pagar:</h2>
      <div className="flex flex-col items-end gap-2">
        <p>Total: R$ {centsToDecimal(totalWithoutTax)}</p>
        <p className="flex justify-end items-center gap-2">
          Taxa de serviço (%):{' '}
          <IntegerInput
            value={tax}
            onChange={value => setTax(Number(value))}
            buttonsFunction={setTax}
          />
        </p>
        <p className="font-bold ">
          Total + {tax}%: R$ {centsToDecimal(totalWithTax)}
        </p>
        {totalWithTax > amountAssignedWithTax && (
          <p className="font-bold  text-red-600">
            Falta dividir: R${' '}
            {centsToDecimal(totalWithTax - amountAssignedWithTax)}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-4">
        {[...Object.values(totalsPerPerson)].map(personTotals => (
          <PersonTotalCard
            key={personTotals.personId}
            personTotals={personTotals}
            tax={tax}
          />
        ))}
      </div>
    </div>
  );
}
