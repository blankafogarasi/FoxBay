import { registrationService } from '../registrationService';
import { usersRepo } from '../../repositories';

const database = {
  user1: {
    id: 1,
    username: 'testuser',
    password_hash: '$2b$10$TbpxUM7b7bqnLOb//0qdiuaKkiMXBCOr7D22LxD6CMq1TCqILoQ8m',
    email: 'test@mail.com',
    user_type: 'customer',
    full_name: 'test user',
    status: 'verified',
  },
};

const spyOnGetUserByUsername = jest.spyOn(usersRepo, 'getUserByUsername');
const spyOnGetUserByEmail = jest.spyOn(usersRepo, 'getUserByEmail');

test('first name field is missing', async () => {
  let thrownError;
  try {
    await registrationService.validateUser('bambiii', undefined, 'bogancs', 'blabla', 'bambi@vuk.hu');
  } catch (err) {
    thrownError = err;
  }
  expect(thrownError).toEqual({ message: "\"firstName\" is required", status: 400 });
});

test('first name is invalid', async () => {
  let thrownError;
  try {
    await registrationService.validateUser('bambiii', 99, 'bogancs', 'blabla', 'bambi@vuk.hu');
  } catch (err) {
    thrownError = err;
  }
  expect(thrownError).toEqual({ message: "\"firstName\" must be a string", status: 400 });
});

test('last name field is missing', async () => {
  let thrownError;
  try {
    await registrationService.validateUser('bambiii', 'bogancs', undefined, 'blabla', 'bambi@vuk.hu');
  } catch (err) {
    thrownError = err;
  }
  expect(thrownError).toEqual({ message: "\"lastName\" is required", status: 400 });
});

test('last name is invalid', async () => {
    let thrownError;
    try {
      await registrationService.validateUser('bambiii', 'bogancs', 99,'blabla', 'bambi@vuk.hu');
    } catch (err) {
      thrownError = err;
    }
    expect(thrownError).toEqual({ message: "\"lastName\" must be a string", status: 400 });
  });


test('username already in use', async () => {
  let thrownError;
  spyOnGetUserByUsername.mockReturnValue({ results: database.user1, fields: 'somedata' });
  try {
    await registrationService.checkUniqueValues('testuser');
  } catch (err) {
    thrownError = err;
  }
  expect(thrownError).toEqual({ message: 'Username is already in use.', status: 400 });
});

test('missing username field', async () => {
  let thrownError;
  spyOnGetUserByUsername.mockReturnValue({ results: [], fields: 'somedata' });
  try {
    await registrationService.validateUser(undefined, 'bogancs', 'vuk','blabla', 'bambi@vuk.hu');
  } catch (err) {
    thrownError = err;
  }
  expect(thrownError).toEqual({ message: "\"username\" is required", status: 400 });
});



test('invalid username', async () => {
  let thrownError;
  spyOnGetUserByUsername.mockReturnValue({ results: [], fields: 'somedata' });
  try {
    await registrationService.validateUser(99, 'bogancs', 'vuk','blabla', 'bambi@vuk.hu');
  } catch (err) {
    thrownError = err;
  }
  expect(thrownError).toEqual({ message: "\"username\" must be a string", status: 400 });
});

test('email already in use', async () => {
  let thrownError;
  spyOnGetUserByEmail.mockReturnValue({ results: database.user1, fields: 'somedata' });
  try {
    await registrationService.checkUniqueValues('testuser2','test@mail.com');
  } catch (err) {
    thrownError = err;
  }
  expect(thrownError).toEqual({ message: 'E-mail is already in use.', status: 400 });
});

test('missing email field', async () => {
  let thrownError;
  spyOnGetUserByEmail.mockReturnValue({ results: [], fields: 'somedata' });
  try {
    await registrationService.validateUser('bambiii', 'bogancs', 'vuk','blablablabla', undefined);
  } catch (err) {
    thrownError = err;
  }
  expect(thrownError).toEqual({ message: "\"email\" is required", status: 400 });
});

test('wrong email format', async () => {
    let thrownError;
    spyOnGetUserByEmail.mockReturnValue({ results: [], fields: 'somedata' });
    try {
      await registrationService.validateUser('bambiii', 'bogancs', 'vuk','blablablabla', 'bambigmail.com');
    } catch (err) {
      thrownError = err;
    }
    expect(thrownError).toEqual({ message: "\"email\" must be a valid email", status: 400 });
  });

test('missing password field', async () => {
  let thrownError;
  try {
    await registrationService.validateUser('bambiii', 'bogancs', 'vuk', undefined, 'bambi@gmail.com');
  } catch (err) {
    thrownError = err;
  }
  expect(thrownError).toEqual({ message: "\"password\" is required", status: 400 });
});

test('password is too short', async () => {
    let thrownError;
    try {
      await registrationService.validateUser('bambiii', 'bogancs', 'vuk', '123', 'bambi@gmail.com');
    } catch (err) {
      thrownError = err;
    }
    expect(thrownError).toEqual({ message: "\"password\" length must be at least 8 characters long", status: 400 });
  });