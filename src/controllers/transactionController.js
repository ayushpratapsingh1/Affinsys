const Transaction = require('../models/transaction');
const { convertCurrency } = require('../services/currencyService');

async function fundAccount(req, res, next) {
  try {
    const { amt } = req.body;
    const username = req.user.username;

    if (!amt || typeof amt !== 'number' || amt <= 0) {
      return res.status(400).json({ error: 'Valid amount is required' });
    }

    const result = await Transaction.fundAccount(username, amt);
    res.json({ balance: result.balance });
  } catch (error) {
    next(error);
  }
}

async function payUser(req, res, next) {
  try {
    const { to, amt } = req.body;
    const fromUsername = req.user.username;

    if (!to || !amt || typeof amt !== 'number' || amt <= 0) {
      return res.status(400).json({ error: 'Valid recipient and amount are required' });
    }

    if (to === fromUsername) {
      return res.status(400).json({ error: 'Cannot pay yourself' });
    }

    const result = await Transaction.payUser(fromUsername, to, amt);
    res.json({ balance: result.balance });
  } catch (error) {
    next(error);
  }
}

async function getBalance(req, res, next) {
  try {
    const { currency = 'INR' } = req.query;
    const user = req.user;

    const convertedBalance = await convertCurrency(user.balance, currency);
    res.json({ balance: convertedBalance });
  } catch (error) {
    next(error);
  }
}

async function getTransactionHistory(req, res, next) {
  try {
    const user = req.user;
    res.json(user.transactions || []);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  fundAccount,
  payUser,
  getBalance,
  getTransactionHistory
};
