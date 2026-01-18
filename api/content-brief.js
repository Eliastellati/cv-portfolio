export default async function handler(req, res) {
  // Permetti chiamate dal tuo frontend
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const N8N_CHAT_URL =
    "https://illy-slangy-lachelle.ngrok-free.dev/webhook/858ae4fe-d2b9-43e4-bfc7-8ca6ef9f6cde/chat";

  try {
    const upstream = await fetch(N8N_CHAT_URL, {
      method: req.method,
      headers: {
        "Content-Type": "application/json",
      },
      // forward body (per POST)
      body: req.method === "GET" ? undefined : JSON.stringify(req.body ?? {}),
    });

    const text = await upstream.text();

    // forward status + content-type
    res.status(upstream.status);
    res.setHeader(
      "Content-Type",
      upstream.headers.get("content-type") || "text/plain"
    );
    return res.send(text);
  } catch (e) {
    return res.status(500).json({
      error: "Proxy error",
      details: e?.message || String(e),
    });
  }
}
