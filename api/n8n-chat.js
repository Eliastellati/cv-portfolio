export default async function handler(req, res) {
  // Preflight
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") return res.status(200).end();

  const N8N_CHAT_URL = process.env.N8N_CHAT_URL;
  if (!N8N_CHAT_URL) {
    return res.status(500).json({ ok: false, error: "Missing env: N8N_CHAT_URL" });
  }

  try {
    const upstream = await fetch(N8N_CHAT_URL, {
      method: req.method,
      headers: { "Content-Type": "application/json" },
      body: req.method === "GET" ? undefined : JSON.stringify(req.body ?? {}),
    });

    const text = await upstream.text();
    res.status(upstream.status);
    res.setHeader("Content-Type", upstream.headers.get("content-type") || "text/plain");
    return res.send(text);
  } catch (e) {
    return res.status(500).json({ ok: false, error: "Proxy error", details: String(e) });
  }
}
