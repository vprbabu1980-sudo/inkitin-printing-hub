import { onRequestGet as products } from "./functions/api/products.js";
import { onRequestPost as quote } from "./functions/api/quote.js";
import { onRequestPost as orders } from "./functions/api/orders.js";
import { onRequestGet as adminOrders } from "./functions/api/admin/orders.js";

function withCors(response) {
  const h = new Headers(response.headers);
  h.set("access-control-allow-origin", "*");
  h.set("access-control-allow-headers", "content-type");
  return new Response(response.body, {status: response.status, headers: h});
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    try {
      if (url.pathname === "/api/health") {
        const ok = Boolean(env.DATABASE_URL);
        return Response.json({ok, databaseConfigured: ok, environment: env.APP_ENV || "test", version: "5.4.1"});
      }
      if (url.pathname === "/api/products" && request.method === "GET") return withCors(await products({request,env,ctx}));
      if (url.pathname === "/api/quote" && request.method === "POST") return withCors(await quote({request,env,ctx}));
      if (url.pathname === "/api/orders" && request.method === "POST") return withCors(await orders({request,env,ctx}));
      if (url.pathname === "/api/admin/orders" && request.method === "GET") return withCors(await adminOrders({request,env,ctx}));
      return env.ASSETS.fetch(request);
    } catch (e) {
      return Response.json({error:"Internal server error"}, {status:500});
    }
  }
};
