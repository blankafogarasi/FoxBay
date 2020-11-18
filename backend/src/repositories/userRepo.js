import { db } from '../data/connection';

export const usersRepo = {
    async insertNewUser(username, first_name, last_name, hashedPassword, email, profile_img) {
      const sql = 'INSERT INTO users (username, first_name, last_name, password_hash, email, profile_img) VALUES (?, ?, ?, ?, ?, ?);';
      return await db.query(sql, [username, first_name, last_name, hashedPassword, email, profile_img]);
    },
    async getUserByEmail(email) {
      const sql = 'SELECT id, username, first_name as firstName, last_name as lastName, password_hash as passwordHash, email, user_type as userType, status, profile_img as profileImg  FROM users WHERE email=?;';
      return await db.query(sql, [email]);
    },
    async getUserByUsername(username) {
      const sql = 'SELECT id, username, first_name as firstName, last_name as lastName, password_hash as passwordHash, email, user_type as userType, status, profile_img as profileImg FROM users WHERE username=?;';
      return await db.query(sql, [username]);
    },
    async getUserById(userId) {
      const sql = 'SELECT id, username, first_name as firstName, last_name as lastName, password_hash as passwordHash, email, user_type as userType, status, profile_img as profileImg FROM users WHERE id=?;';
      return await db.query(sql, [userId]);
    },
    async getFullName(username) {
      const sql = 'SELECT first_name AS firstName, last_name as lastName FROM users WHERE username=?;';
      return await db.query(sql, [username]);
    },
    async getPassword(username) {
      const sql = 'SELECT password_hash AS passwordHash FROM users WHERE username=?;';
      return await db.query(sql, [username]);
    },
    async getAllUsers() {
      const sql = 'SELECT id, username, first_name as firstName, last_name as lastName, password_hash as passwordHash, email, user_type as userType, status, profile_img as profileImg FROM users';
      return await db.query(sql, []);
    },
};