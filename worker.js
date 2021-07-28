import faker from 'faker';

let state = { items: [] };
Array.from({ length: 10000 }).map(x => {
  state.items.push({
    id: faker.datatype.uuid(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    description: faker.lorem.paragraph(),
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent()
  });
});

const reduce = text => {
  state = { ...state, text };
  return state;
};

addEventListener('message', event => {
  postMessage(reduce(event.data));
});
