export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  const url = process.env.N8N_CONTACT_WEBHOOK;
  const secret = process.env.N8N_DEMO_SECRET || "";

  if (!url) {
    return res.status(500).json({
      success: false,
      error: "Missing env: N8N_CONTACT_WEBHOOK",
    });
  }

  const { name, email, subject, message, recipientEmail } = req.body;

  // Basic validation
  if (!name || !email || !subject || !message) {
    return res.status(400).json({
      success: false,
      error: "Missing required fields: name, email, subject, message",
    });
  }

  try {
    const r = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-demo-secret": secret,
      },
      body: JSON.stringify({
        name,
        email,
        subject,
        message,
        recipientEmail: recipientEmail || "eliastellatibvb@gmail.com",
        timestamp: new Date().toISOString(),
      }),
    });

    // Handle n8n response
    const text = await r.text();

    let data;
    try {
      data = text ? JSON.parse(text) : {};
    } catch {
      data = { raw: text, note: "Upstream did not return JSON" };
    }

    // Return success if n8n responded with 2xx
    if (r.status >= 200 && r.status < 300) {
      return res.status(200).json({
        success: true,
        message: "Contact form submitted successfully",
        ...data,
      });
    }

    return res.status(r.status).json({
      success: false,
      upstreamStatus: r.status,
      upstreamContentType: r.headers.get("content-type"),
      ...data,
    });
  } catch (e) {
    console.error("Contact form error:", e);
    return res.status(500).json({
      success: false,
      error: "Failed to send message",
      detail: String(e),
    });
  }
}
