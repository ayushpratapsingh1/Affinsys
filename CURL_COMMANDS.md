# Banking API CURL Commands

## User Management

### Register a New User (Create)
```bash
curl -X POST http://localhost:3000/register \
  -H "Content-Type: application/json" \
  -d '{"username": "ashu", "password": "hunter2"}'
```

## Account Operations (all require Basic Auth)

### Fund Your Account (Update)
```bash
curl -X POST http://localhost:3000/fund \
  -H "Content-Type: application/json" \
  -H "Authorization: Basic $(echo -n 'ashu:hunter2' | base64)" \
  -d '{"amt": 10000}'
```

For Windows PowerShell:
```powershell
$auth = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes("ashu:hunter2"))
curl -X POST http://localhost:3000/fund -H "Content-Type: application/json" -H "Authorization: Basic $auth" -d "{\"amt\": 10000}"
```

### Pay Another User (Update)
```bash
curl -X POST http://localhost:3000/pay \
  -H "Content-Type: application/json" \
  -H "Authorization: Basic $(echo -n 'ashu:hunter2' | base64)" \
  -d '{"to": "priya", "amt": 100}'
```

### Check Balance (Read)
```bash
# Default currency (INR)
curl -X GET http://localhost:3000/bal \
  -H "Authorization: Basic $(echo -n 'ashu:hunter2' | base64)"

# Specific currency
curl -X GET "http://localhost:3000/bal?currency=USD" \
  -H "Authorization: Basic $(echo -n 'ashu:hunter2' | base64)"
```

### View Transaction History (Read)
```bash
curl -X GET http://localhost:3000/stmt \
  -H "Authorization: Basic $(echo -n 'ashu:hunter2' | base64)"
```

## Notes on Base64 Encoding

The Basic Authentication header requires base64-encoded credentials in the format `username:password`.

- Linux/Mac: `echo -n 'ashu:hunter2' | base64`
- Windows PowerShell: `[Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes("ashu:hunter2"))`
- Windows Command Prompt: Use a pre-encoded string - 'YXNodTpodW50ZXIy'

## Testing with Pre-encoded Credentials

For testing, you can directly use the Base64-encoded string:
```bash
curl -X GET http://localhost:3000/bal -H "Authorization: Basic YXNodTpodW50ZXIy"
```
