# Banking API

A RESTful API for banking operations with user authentication, balance management, and transaction history.

## API Endpoints

### User Registration
- `POST /register` - Register a new user

### Account Management (requires Basic Auth)
- `POST /fund` - Add funds to your account
- `POST /pay` - Pay another user
- `GET /bal` - Check your balance (with optional currency conversion)
- `GET /stmt` - View transaction history

## Setup Instructions

### Local Development
```bash
npm install
npm run dev
```

### Docker Deployment
```bash
docker-compose up -d
```

## Example Requests

### Register a new user
```bash
curl -X POST http://localhost:3000/register \
  -H "Content-Type: application/json" \
  -d '{"username": "ashu", "password": "hunter2"}'
```

### Fund your account
```bash
curl -X POST http://localhost:3000/fund \
  -H "Content-Type: application/json" \
  -H "Authorization: Basic $(echo -n 'ashu:hunter2' | base64)" \
  -d '{"amt": 10000}'
```
