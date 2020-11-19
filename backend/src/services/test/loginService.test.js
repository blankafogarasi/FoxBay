import { usersRepo } from '../../repositories';
import { loginService } from '../loginService';

const database = {
  user1: {
    id: 1,
    username: 'Misizon',
    fullName: 'Battya',
    password: 'jelszohaver',
    passwordHash: '$2b$10$oZp2vJU6DtX0ODZ8omhL4eUn/Qc0XxNCr.PRCRDLMGTAOL7la2mW.',
    email: 'test@mail.com',
    userType: 'customer',
  },
};

const spyOnGetUserByUsername = jest.spyOn(usersRepo, 'getUserByUsername');
const spyOnGetFullName = jest.spyOn(usersRepo, 'getFullName');
const spyUser = jest.spyOn(usersRepo, 'getUserByUsername');
const spyOnGetPassword = jest.spyOn(usersRepo, 'getPassword');

test('login successfully', async () => {
  spyOnGetUserByUsername.mockReturnValue({
    results:
      [database.user1],
  });
  spyOnGetPassword.mockReturnValue({
    results:
    [database.user1],
  });
  spyOnGetFullName.mockReturnValue({
    results:
    [database.user1.fullName],
  });

  await loginService.loginUser(database.user1.username, database.user1.password);
  expect(200);
});

test('should give an error if user nonexistent', async () => {
  spyOnGetUserByUsername.mockReturnValue({ results: [] });
  try {
    await loginService.loginUser('stranger', 'jelszohaver');
  } catch (e) {
    expect(e).toEqual({
      message: 'No such user!',
      status: 400,
    });
  }
});

test('should give an error if password wrong', async () => {
  spyUser.mockReturnValue({
    results:
    [database.user1],
  });
  spyOnGetPassword.mockReturnValue({ results: [{ passwordHash: 'asdfg' }] });
  try {
    await loginService.loginUser('Misizon', 'wrongpassword');
  } catch (e) {
    expect(e).toEqual({
      message: 'Username and password do not match!',
      status: 400,
    });
  }
});
