# Setup Guide for Cloudflare KV Migration

## 1. Create KV Namespace

First, create a KV namespace using Wrangler:

```bash
cd server
npx wrangler kv:namespace create "DATABASE"
```

This will output something like:
```
🌀 Creating namespace with title "server-DATABASE"
✨ Success!
Add the following to your configuration file:
kv_namespaces = [
	{ binding = "KV", id = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" }
]
```

## 2. Update Configuration

Copy the `id` from the output above and update `wrangler.jsonc`:

```json
{
  "kv_namespaces": [
    {
      "binding": "KV",
      "id": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"  // Replace with your actual ID
    }
  ]
}
```

## 3. Create an Admin User

Start your development server:
```bash
npm run dev
```

Then create an admin user using the new endpoint:
```bash
curl -X POST http://localhost:8787/admin/create \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123"}'
```

## 4. Test the API

### Test Login:
```bash
curl -X POST http://localhost:8787/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123"}'
```

### Test Enquiry Creation:
```bash
curl -X POST http://localhost:8787/enquiry \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "phoneNumber": "1234567890", "emailId": "john@example.com", "subject": "Course Enquiry"}'
```

### Test Getting All Enquiries:
```bash
curl http://localhost:8787/admin/getall
```

## 5. Deploy to Production

When ready to deploy:
```bash
npm run deploy
```

## Notes

- The `/admin/create` endpoint is for setup only. Consider removing it in production.
- All data is now stored in Cloudflare KV instead of MongoDB.
- KV is eventually consistent, so there might be slight delays in data propagation.
- The UUID generation uses `crypto.randomUUID()` in production and a fallback for local development. 