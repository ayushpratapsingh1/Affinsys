function errorHandler(err, req, res, next) {
  console.error(err.stack);

  if (err.message === 'Insufficient funds') {
    return res.status(400).json({ error: 'Insufficient funds' });
  }

  if (err.message === 'User not found' || err.message === 'Recipient not found') {
    return res.status(400).json({ error: err.message });
  }

  if (err.message === 'Failed to convert currency') {
    return res.status(503).json({ error: 'Currency conversion service unavailable' });
  }

  res.status(500).json({ error: 'Something went wrong' });
}

module.exports = { errorHandler };
