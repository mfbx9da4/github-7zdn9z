import faker from 'faker';

let state = { items: [] };
Array.from({ length: 5000 }).map(x => {
  state.items.push({
    id: faker.datatype.uuid(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    description: faker.lorem.paragraph(),
    dob: faker.dob()
  });
});

const reduce = text => {
  state = { ...state, text };
  return state;
};

addEventListener('message', event => {
  postMessage(reduce(event.data));
});
