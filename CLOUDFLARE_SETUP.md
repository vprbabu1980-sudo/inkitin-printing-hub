# INKITIN v5.4 — Cloudflare deployment

1. Create a Cloudflare account and connect the GitHub repository.
2. Pages project: **inkitin-printing-hub**; production branch: **main**; build command: none; output directory: **/**.
3. Add encrypted environment variable **DATABASE_URL** from Neon. Never commit it.
4. Add an R2 bucket named **inkitin-artworks-private** and bind it to the Pages project as **ARTWORKS**. Keep it private.
5. Add future encrypted secrets: RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET, RAZORPAY_WEBHOOK_SECRET, WHATSAPP_PHONE_NUMBER_ID, WHATSAPP_ACCESS_TOKEN, JWT_SECRET, ADMIN_BOOTSTRAP_SECRET.
6. Keep APP_ENV=test and WHATSAPP_MODE=test until end-to-end testing is complete.

## Current API
GET /api/products
POST /api/quote  {sku, quantity}
POST /api/orders {sku, quantity, customer:{name,email,phone}}
GET /api/admin/orders
GET /api/health

The server calculates prices from PostgreSQL; the browser cannot override unit prices.
