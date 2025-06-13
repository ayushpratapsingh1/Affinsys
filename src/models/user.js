const { readJsonFile, writeJsonFile } = require('../utils/fileStorage');

const USERS_FILE = 'users.json';

class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
    this.balance = 0;
    this.transactions = [];
  }

  static async getUsers() {
    const users = await readJsonFile(USERS_FILE);
    console.log(`Retrieved ${Object.keys(users).length} users from storage`);
    return users;
  }

  static async saveUsers(users) {
    console.log(`Saving ${Object.keys(users).length} users to storage`);
    await writeJsonFile(USERS_FILE, users);
  }

  static async create(username, hashedPassword) {
    const users = await this.getUsers();
    
    const user = {
      username,
      password: hashedPassword,
      balance: 0,
      transactions: []
    };
    
    users[username] = user;
    await this.saveUsers(users);
    
    return user;
  }

  static async findByUsername(username) {
    const users = await this.getUsers();
    return users[username];
  }

  static async exists(username) {
    const users = await this.getUsers();
    return !!users[username];
  }

  static async addTransaction(username, kind, amount, updatedBalance) {
    const users = await this.getUsers();
    const user = users[username];
    
    if (!user) {
      throw new Error('User not found');
    }
    
    const transaction = {
      kind,
      amt: amount,
      updated_bal: updatedBalance,
      timestamp: new Date().toISOString()
    };
    
    if (!user.transactions) {
      user.transactions = [];
    }
    
    user.transactions.push(transaction);
    await this.saveUsers(users);
    
    return transaction;
  }
}

module.exports = User;
