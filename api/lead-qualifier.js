export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  // Supporta entrambi i nomi: usa quello che hai su Vercel
  const url =
    process.env.N8N_LEAD_WEBHOOK ||
    process.env.N8N_LEAD_QUALIFIER_URL;

  const secret = process.env.N8N_DEMO_SECRET || "";

  if (!url) {
    return res.status(500).json({
      ok: false,
      error: "Missing env: N8N_LEAD_WEBHOOK (or N8N_LEAD_QUALIFIER_URL)",
    });
  }

  try {
    const r = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-demo-secret": secret,
      },
      body: JSON.stringify(req.body ?? {}),
    });

    // NON usare r.json() diretto: n8n può rispondere vuoto / HTML / testo
    const text = await r.text();

    let data;
    try {
      data = text ? JSON.parse(text) : {};
    } catch {
      data = { raw: text, note: "Upstream did not return JSON" };
    }

    return res.status(r.status).json({
      upstreamStatus: r.status,
      upstreamContentType: r.headers.get("content-type"),
      ...data,
    });
  } catch (e) {
    return res.status(500).json({ ok: false, error: "Proxy error", detail: String(e) });
  }
}
