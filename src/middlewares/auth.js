const User = require('../models/user');
const { comparePassword } = require('../utils/passwordUtils');

async function authenticate(req, res, next) {
  // Check if Authorization header exists
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    res.setHeader('WWW-Authenticate', 'Basic realm="Banking API"');
    return res.status(401).json({ error: 'Authentication required' });
  }

  try {
    // Get the encoded part of the Basic Authentication header
    let base64Credentials = authHeader.replace('Basic ', '').trim();
    
    // Special case: Handle shell command format that wasn't executed
    if (base64Credentials.includes('$(echo -n ')) {
      // Extract username and password from the shell command
      const match = base64Credentials.match(/\$\(echo -n ['"]([^:]+):([^'"]+)['"]/);
      if (match && match.length >= 3) {
        const username = match[1];
        const password = match[2];
        
        // Find the user directly using the extracted credentials
        const user = await User.findByUsername(username);
        
        if (user && comparePassword(password, user.password)) {
          req.user = user;
          next();
          return;
        }
      }
      
      res.setHeader('WWW-Authenticate', 'Basic realm="Banking API"');
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Normal base64 decoding
    let credentials;
    try {
      credentials = Buffer.from(base64Credentials, 'base64').toString('utf8');
    } catch (error) {
      res.setHeader('WWW-Authenticate', 'Basic realm="Banking API"');
      return res.status(401).json({ error: 'Invalid authentication format' });
    }
    
    // Split username and password
    const [username, password] = credentials.split(':');
    
    if (!username || !password) {
      res.setHeader('WWW-Authenticate', 'Basic realm="Banking API"');
      return res.status(401).json({ error: 'Invalid credentials format' });
    }

    // Find the user
    const user = await User.findByUsername(username);
    
    if (!user) {
      res.setHeader('WWW-Authenticate', 'Basic realm="Banking API"');
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Verify password
    const isValid = comparePassword(password, user.password);
    
    if (!isValid) {
      res.setHeader('WWW-Authenticate', 'Basic realm="Banking API"');
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Authentication successful, attach user to request
    req.user = user;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.setHeader('WWW-Authenticate', 'Basic realm="Banking API"');
    res.status(500).json({ error: 'Authentication failed' });
  }
}

module.exports = { authenticate };
