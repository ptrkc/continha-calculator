import create from 'zustand';

export interface Person {
  defaultName: string;
  name: string;
  color: string;
  id: string;
}

const COLORS = [
  'red',
  'yellow',
  'lime',
  'blue',
  'purple',
  'pink',
  'orange',
  'emerald',
  'cyan',
  'fuchsia',
];

export interface PeopleState {
  _counter: number;
  people: Map<string, Person>;
  deletePerson: (id: string) => void;
  addPerson: () => void;
  changePersonProp: (person: Person, propKey: string, newValue: string) => void;
}

const _changePersonProp = (
  state: PeopleState,
  person: Person,
  propKey: string,
  newValue: string,
) => ({
  people: new Map(state.people).set(person.id, {
    ...person,
    [propKey]: newValue,
  }),
});

const _addPerson = (state: PeopleState) => {
  const currentCounter = state._counter + 1;
  const id = `person-${currentCounter}`;
  return {
    _counter: currentCounter,
    people: new Map([
      ...state.people,
      [
        id,
        {
          defaultName:
            currentCounter > 9
              ? `${currentCounter}`
              : `PESSOA ${currentCounter}`,
          name: '',
          color: COLORS[state._counter % COLORS.length],
          id,
        },
      ],
    ]),
  };
};

const _deletePerson = (state: PeopleState, id: string) => {
  const newPeople = new Map([...state.people]);
  newPeople.delete(id);
  return {
    people: newPeople,
    _counter: newPeople.size === 0 ? 0 : state._counter,
  };
};

export const usePeopleStore = create<PeopleState>(set => ({
  _counter: 2,
  people: new Map([
    [
      'person-1',
      {
        defaultName: 'PESSOA 1',
        name: '',
        color: COLORS[0],
        id: 'person-1',
      },
    ],
    [
      'person-2',
      {
        defaultName: 'PESSOA 2',
        name: '',
        color: COLORS[1],
        id: 'person-2',
      },
    ],
  ]),
  deletePerson: id => set(state => _deletePerson(state, id)),
  addPerson: () => set(_addPerson),
  changePersonProp: (person, propKey, newValue) => {
    set(state => _changePersonProp(state, person, propKey, newValue));
  },
}));
