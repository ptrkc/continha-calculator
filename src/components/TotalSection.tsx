import { useState } from 'react';
import shallow from 'zustand/shallow';
import { Avatar } from '@/components/Avatar';
import { IntegerInput } from '@/components/IntegerInput';
import { Item, ItemsState, useItemsStore } from '@/hooks/useItemsStore';
import { PeopleState, Person, usePeopleStore } from '@/hooks/usePeopleStore';
import { centsToDecimal } from '@/utils/centsToDecimal';

const addTax = (value: number, tax: number) => value + (value * tax) / 100;

const calculateTotalWithTax = (items: Item[], tax: number) => {
  const total = [...items.values()].reduce(
    (prev, curr) => prev + Number(curr.unitPrice) * curr.quantity,
    0,
  );
  return Math.ceil(total + (total * tax) / 100);
};

const calculateAllTotals = (itemsArray: Item[]) => {
  const totals: Partial<Record<string, { item: Item; toPay: number }[]>> = {};
  itemsArray.forEach(item => {
    const itemTotal = item.unitPrice * item.quantity;
    const peopleSharing: string[] = [];
    const peoplePayingCustomValue: string[] = [];
    let totalCustomValue = 0;
    Object.keys(item.sharedBy).forEach(personId => {
      const sharedBy = item.sharedBy[personId];
      if (sharedBy === true) {
        peopleSharing.push(personId);
      } else if (typeof sharedBy === 'number') {
        totalCustomValue += sharedBy;
        peoplePayingCustomValue.push(personId);
      }
    });
    const sharedTotal = Math.ceil(
      (itemTotal - totalCustomValue) / peopleSharing.length,
    );
    peoplePayingCustomValue.forEach(personId => {
      if (totals[personId] === undefined) totals[personId] = [];
      totals[personId]?.push({
        item,
        toPay: item.sharedBy[personId] as number,
      });
    });
    peopleSharing.forEach(personId => {
      if (totals[personId] === undefined) totals[personId] = [];
      totals[personId]?.push({ item, toPay: Math.ceil(sharedTotal) });
    });
  });

  return totals;
};

function PersonTotalCard({
  person,
  personTotals,
}: {
  person: Person;
  personTotals: { item: Item; toPay: number }[];
}) {
  const total = personTotals.reduce((prev, curr) => prev + curr.toPay, 0);
  return (
    <div className="items-center border rounded-xl bg-white p-2 shadow-md font-mono">
      <div className="font-sans flex gap-2 items-center">
        <Avatar person={person} />
        <span className="font-bold">{person.name || person.defaultName}</span>
      </div>
      <div className="py-2">
        {personTotals.map(({ item, toPay }) => (
          <p className="flex items-center whitespace-nowrap" key={item.id}>
            <span>{item.name || item.defaultName}</span>
            <span className="mx-2 h-[1px] bg-current w-full flex justify-center" />
            <span>R$ {centsToDecimal(toPay)}</span>
          </p>
        ))}
      </div>
      <p className="text-right">
        Serviço: R$ {centsToDecimal(Math.ceil((total * 10) / 100))}
      </p>
      <p className="text-right font-bold">
        Total: R$ {centsToDecimal(addTax(total, 10))}
      </p>
    </div>
  );
}

const itemsSelector = (state: ItemsState) => [...state.items.values()];
const peopleSelector = (state: PeopleState) => [...state.people.values()];

export function TotalSection() {
  const [tax, setTax] = useState(10);
  const items = useItemsStore(itemsSelector, shallow);
  const people = usePeopleStore(peopleSelector, shallow);
  const totalsPerPerson = calculateAllTotals(items);
  return (
    <>
      <h2>Total a pagar:</h2>
      <p className="text-right">
        Serviço(%):{' '}
        <IntegerInput
          value={tax}
          onChange={value => setTax(Number(value))}
          buttonsFunction={setTax}
        />
      </p>
      <p className="text-right">
        Total: R$ {centsToDecimal(calculateTotalWithTax(items, tax))}
      </p>
      {people.map(person => {
        const personTotals = totalsPerPerson[person.id] ?? [];
        return (
          <PersonTotalCard
            key={person.id}
            person={person}
            personTotals={personTotals}
          />
        );
      })}
    </>
  );
}
