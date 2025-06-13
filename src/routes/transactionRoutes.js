const express = require('express');
const { authenticate } = require('../middlewares/auth');
const {
  fundAccount,
  payUser,
  getBalance,
  getTransactionHistory
} = require('../controllers/transactionController');

const router = express.Router();

// Protected routes
router.post('/fund', authenticate, fundAccount);
router.post('/pay', authenticate, payUser);
router.get('/bal', authenticate, getBalance);
router.get('/stmt', authenticate, getTransactionHistory);

module.exports = router;
