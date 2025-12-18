export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const n8nRes = await fetch(process.env.N8N_LEAD_WEBHOOK, {
      method: "POST",
      headers: {
  "Content-Type": "application/json",
  "x-demo-key": process.env.DEMO_KEY,
},
      body: JSON.stringify(req.body),
    });

    const data = await n8nRes.json();
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json({ error: "Proxy error", detail: String(e) });
  }
}

