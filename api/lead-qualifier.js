export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const url = process.env.N8N_LEAD_QUALIFIER_URL; // es: https://.../webhook/lead-qualifier
  const secret = process.env.N8N_DEMO_SECRET;

  if (!url) return res.status(500).json({ ok: false, error: "Missing N8N_LEAD_QUALIFIER_URL" });

  try {
    const r = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-demo-secret": secret || "",
      },
      body: JSON.stringify(req.body),
    });

    const data = await r.json().catch(() => ({}));
    return res.status(r.status).json(data);
  } catch (e) {
    return res.status(500).json({ ok: false, error: "Proxy failed" });
  }
}
