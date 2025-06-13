const User = require('./user');

class Transaction {
  static async fundAccount(username, amount) {
    const user = await User.findByUsername(username);
    if (!user) {
      throw new Error('User not found');
    }

    user.balance += amount;
    
    const users = await User.getUsers();
    users[username] = user;
    await User.saveUsers(users);
    
    const transaction = await User.addTransaction(username, 'credit', amount, user.balance);
    
    return { balance: user.balance, transaction };
  }

  static async payUser(fromUsername, toUsername, amount) {
    const users = await User.getUsers();
    const sender = users[fromUsername];
    const recipient = users[toUsername];

    if (!sender) {
      throw new Error('Sender not found');
    }

    if (!recipient) {
      throw new Error('Recipient not found');
    }

    if (sender.balance < amount) {
      throw new Error('Insufficient funds');
    }

    sender.balance -= amount;
    recipient.balance += amount;

    await User.saveUsers(users);

    await User.addTransaction(fromUsername, 'debit', amount, sender.balance);
    await User.addTransaction(toUsername, 'credit', amount, recipient.balance);

    return { balance: sender.balance };
  }
}

module.exports = Transaction;
