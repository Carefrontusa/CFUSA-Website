const allowedKinds = new Set(["Contact", "Become a partner", "Refer a business"]);
const max = (value, limit = 4000) => typeof value === "string" ? value.trim().slice(0, limit) : "";
const emailValid = value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export default async (request) => {
  if (request.method !== "POST") return new Response("Method not allowed", { status: 405 });
  try {
    const data = await request.json();
    if (!data || typeof data !== "object") throw new Error("Invalid request.");
    if (max(data.website)) return Response.json({ ok: true });
    const lead = {
      id: `carefront-netlify-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      submittedAt: new Date().toISOString(),
      kind: max(data.kind, 60),
      name: max(data.name, 200),
      phone: max(data.phone, 50),
      email: max(data.email, 200),
      employees: max(data.employees, 80),
      topic: max(data.topic, 200),
      message: max(data.message),
      referralName: max(data.referralName, 200),
      referralPhone: max(data.referralPhone, 50),
      referralEmail: max(data.referralEmail, 200),
      referralCompany: max(data.referralCompany, 200),
    };
    if (!allowedKinds.has(lead.kind) || !lead.name || !lead.phone || !emailValid(lead.email) || !lead.employees || !lead.topic) throw new Error("Please complete the required fields.");
    if (lead.kind === "Refer a business" && (!lead.referralName || !lead.referralPhone || !emailValid(lead.referralEmail) || !lead.referralCompany)) throw new Error("Please complete the referral details.");
    const endpoint = process.env.LEAD_WEBHOOK_URL;
    const secret = process.env.LEAD_WEBHOOK_SECRET;
    if (!endpoint || !secret) throw new Error("Lead automation is not configured yet.");
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    const response = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ secret, lead }), signal: controller.signal, redirect: "follow" });
    clearTimeout(timeout);
    if (!response.ok) throw new Error("We could not send your request. Please try again.");
    return Response.json({ ok: true });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "We could not send your request. Please try again." }, { status: 400 });
  }
};
