import request from 'supertest';
import app from '../../app';
import { usersRepo } from '../../repositories';

const database = {
  user1: {
    id: 1,
    firstName: 'test',
    lastName: 'user',
    username: 'testuser',
    password_hash:
      '$2b$10$TbpxUM7b7bqnLOb//0qdiuaKkiMXBCOr7D22LxD6CMq1TCqILoQ8m',
    email: 'test@mail.com',
    user_type: 'customer',
    status: 'pending',
    profileImg: 'testuser.jpg'
  },
  user2: {
    id: 2,
    username: 'exampleuser',
    firstName: 'example',
    lastName: 'user',
    password_hash:
      '$2b$10$0KzfvwuP0WjRzV2axKGN3.J1sOnfmAzKR7EU20B0yNhU8JJXcqrsy',
    email: 'example@mail.com',
    user_type: 'customer',
    status: 'pending',
    profileImg: 'example.jpg'
  },
  user3: {
    userId: 3,
    username: 'testadmin',
    firstName: 'test',
    lastName: 'admin',
    password_hash:
      '$2b$10$x820KJGac.Nb5qXJyHSOU.aT9MC3ayZG5dnkiFVDe0RlDIrsioP2W',
    email: 'example2@mail.com',
    user_type: 'admin',
    status: 'pending',
    profileImg: 'admin.jpg'
  },
  user4: {
    id: 4,
    username: 'bigbob26',
    firstName: 'Big',
    lastName: 'Bob',
    password_hash: '$2b$10$Dhsl1MBZOi7ZJB.i0g4aG.RgunUTMJ5DTUEnRZplSxwxdC20dmfwK',
    email: 'bigbob26@gmail.com',
    user_type: 'customer',
    status: 'pending',
    profileImg: 'bobbyboy.jpg'
  },
};
const getUserByUsername = jest.spyOn(usersRepo, 'getUserByUsername');
const getUserByEmail = jest.spyOn(usersRepo, 'getUserByEmail');
const insertNewUser = jest.spyOn(usersRepo, 'insertNewUser');

describe('POST /api/users', () => {
  it('valid registration', (done) => {
    getUserByUsername.mockReturnValue({ results: [], fields: 'somedata' });
    getUserByEmail.mockReturnValueOnce({ results: [], fields: 'somedata' }).mockReturnValueOnce({ results: [database.user4], fields: 'somedata' });
    insertNewUser.mockReturnValue({ results: [], fields: 'somedata' });

    request(app)
      .post('/api/users')
      .set('Accept', 'application/json')
      .send({
        username: 'bigbob26',
        firstName: 'Big',
        lastName: 'Bob',
        password: 'myNameisBob26',       
        email: 'bigbob26@gmail.com',
        profileImg: 'itsBob.jpg'
      })
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
});

describe('POST /api/users', () => {
  it('invalid registration: user error (empty field)', (done) => {
    getUserByUsername.mockReturnValue({ results: [], fields: 'somedata' });
    getUserByEmail.mockReturnValue({ results: [], fields: 'somedata' });

    request(app)
      .post('/api/users')
      .set('Accept', 'application/json')
      .send({})
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
});

describe('POST /api/users', () => {
  it('invalid registration: user error (username already in use)', (done) => {
    getUserByUsername.mockReturnValue({
      results: database.user2,
      fields: 'somedata',
    });

    getUserByEmail.mockReturnValue({
      results: database.user2,
      fields: 'somedata',
    });

    request(app)
      .post('/api/users')
      .set('Accept', 'application/json')
      .send({
        fullName: 'example user',
        username: 'exampleuser',
        email: 'example@mail.com',
        password: 'hhhhhh!!!478',
      })
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
});