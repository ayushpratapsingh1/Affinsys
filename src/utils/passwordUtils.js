const crypto = require('crypto');

// Instead of bcrypt, use crypto (built into Node.js)
function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
}

function comparePassword(password, storedHash) {
  try {
    const [salt, hash] = storedHash.split(':');
    const calculatedHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return calculatedHash === hash;
  } catch (error) {
    console.error('Error comparing passwords:', error);
    return false;
  }
}

module.exports = {
  hashPassword,
  comparePassword
};
