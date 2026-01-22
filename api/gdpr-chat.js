export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const N8N_GDPR_WEBHOOK = 
    process.env.N8N_GDPR_WEBHOOK || 
    "https://illy-slangy-lachelle.ngrok-free.dev/webhook/portfolio-chat";

  try {
    const upstream = await fetch(N8N_GDPR_WEBHOOK, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body ?? {}),
    });

    const text = await upstream.text();

    let data;
    try {
      data = text ? JSON.parse(text) : {};
    } catch {
      data = { response: text };
    }

    res.status(upstream.status);
    res.setHeader(
      "Content-Type",
      upstream.headers.get("content-type") || "application/json"
    );
    
    return res.json({
      ok: true,
      upstreamStatus: upstream.status,
      ...data,
    });
  } catch (e) {
    console.error("GDPR Chat proxy error:", e);
    return res.status(500).json({
      ok: false,
      error: "Proxy error",
      details: e?.message || String(e),
    });
  }
}