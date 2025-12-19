export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Required env
  const webhook = process.env.N8N_LEAD_WEBHOOK;
  if (!webhook) {
    return res.status(500).json({ error: "Missing env: N8N_LEAD_WEBHOOK" });
  }

  try {
    const n8nRes = await fetch(webhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // n8n Webhook Header Auth (your credential header name)
        "x-demo-key": process.env.DEMO_KEY || "",
      },
      body: JSON.stringify(req.body ?? {}),
    });

    // Read as text first to handle empty / non-JSON responses gracefully
    const text = await n8nRes.text();

    // Empty body from n8n (common when Webhook isn't set to respond with JSON)
    if (!text) {
      return res.status(n8nRes.status).json({
        error: "Empty response from n8n",
        hint: "In n8n set Webhook response mode to 'Last node' and add a 'Respond to Webhook' node returning JSON.",
        status: n8nRes.status,
      });
    }

    // Try JSON parse; if fails, return a snippet to debug
    try {
      const data = JSON.parse(text);
      return res.status(n8nRes.status).json(data);
    } catch {
      return res.status(n8nRes.status).json({
        error: "Non-JSON response from n8n",
        status: n8nRes.status,
        raw: text.slice(0, 500),
      });
    }
  } catch (e) {
    return res.status(500).json({ error: "Proxy error", detail: String(e) });
  }
}



