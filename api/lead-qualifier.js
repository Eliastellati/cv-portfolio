export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const webhook = process.env.N8N_LEAD_WEBHOOK;
  if (!webhook) return res.status(500).json({ error: "Missing env: N8N_LEAD_WEBHOOK" });

  try {
    const n8nRes = await fetch(webhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-demo-key": process.env.DEMO_KEY || "",
      },
      body: JSON.stringify(req.body),
    });

    const data = await n8nRes.json();
    return res.status(n8nRes.status).json(data);
  } catch (e) {
    return res.status(500).json({ error: "Proxy error", detail: String(e) });
  }
}


