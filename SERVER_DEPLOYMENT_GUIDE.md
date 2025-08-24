# Server Deployment Guide

## Deploying the Server with Ad Campaign Endpoints

The ad campaign system requires the server to be deployed with the new endpoints. Here's how to deploy:

### 1. Navigate to Server Directory
```bash
cd server
```

### 2. Install Dependencies (if not already done)
```bash
npm install
```

### 3. Deploy to Cloudflare Workers
```bash
npx wrangler deploy
```

### 4. Verify Deployment
After deployment, test the endpoints:

#### Test Public Endpoint (should work without auth):
```bash
curl https://server.mukulsharma1602.workers.dev/ad-campaigns/active
```

#### Test Admin Endpoint (requires auth):
```bash
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     https://server.mukulsharma1602.workers.dev/admin/ad-campaigns
```

### 5. Environment Variables
Make sure these are set in your Cloudflare Workers environment:
- `JWT_SECRET` - Your JWT secret key
- `PLUNK_API_KEY` - For email notifications
- `NOTIFICATION_EMAIL` - Email for notifications

### 6. KV Namespace
Ensure your KV namespace is properly configured in `wrangler.toml`:
```toml
[[kv_namespaces]]
binding = "KV"
id = "your-kv-namespace-id"
```

## Troubleshooting

### If you get 404 errors:
1. Check that the server was deployed successfully
2. Verify the endpoint URLs are correct
3. Ensure the server code includes the ad campaign endpoints

### If you get authentication errors:
1. Check that JWT_SECRET is set correctly
2. Verify the token is being sent in the Authorization header
3. Ensure the token hasn't expired

### If KV operations fail:
1. Check that the KV namespace is properly configured
2. Verify the KV binding in wrangler.toml
3. Ensure the KV namespace exists and is accessible

## New Endpoints Added

The following endpoints were added to the server:

- `POST /admin/ad-campaigns` - Create new campaign
- `GET /admin/ad-campaigns` - Get all campaigns
- `GET /ad-campaigns/active` - Get active campaign for public display
- `PATCH /admin/ad-campaigns/:id` - Update campaign
- `DELETE /admin/ad-campaigns/:id` - Delete campaign

All admin endpoints require JWT authentication. 