import "@supabase/functions-js/edge-runtime.d.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!;
const YOUR_EMAIL = "yuki.morales@proton.me";

interface WebhookPayload {
  type: "INSERT";
  table: string;
  record: {
    id: string;
    content: string;
    created_at: string;
  };
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleString("en-US", {
    timeZone: "Asia/Singapore",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function buildEmailHtml(content: string, date: string): string {
  const formattedDate = formatDate(date);

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin: 0; padding: 0; background-color: #1c1b16; font-family: 'Georgia', 'Times New Roman', serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #1c1b16; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="480" cellpadding="0" cellspacing="0" style="max-width: 480px; width: 100%;">

          <!-- Header -->
          <tr>
            <td align="center" style="padding-bottom: 32px;">
              <div style="width: 56px; height: 56px; border-radius: 50%; background-color: rgba(201, 140, 75, 0.1); border: 1px solid rgba(201, 140, 75, 0.2); line-height: 56px; text-align: center; font-size: 24px;">
                💬
              </div>
            </td>
          </tr>

          <!-- Title -->
          <tr>
            <td align="center" style="padding-bottom: 8px;">
              <h1 style="margin: 0; font-size: 28px; font-weight: 400; color: #e4bb7d; font-style: italic;">
                New Anonymous Message
              </h1>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding-bottom: 32px;">
              <p style="margin: 0; font-size: 14px; color: rgba(201, 140, 75, 0.4);">
                Someone sent you a message on your sayout page
              </p>
            </td>
          </tr>

          <!-- Message Card -->
          <tr>
            <td style="background-color: rgba(201, 140, 75, 0.05); border: 1px solid rgba(201, 140, 75, 0.15); border-radius: 16px; padding: 32px;">
              <p style="margin: 0; font-size: 18px; line-height: 1.7; color: #d9bd96; white-space: pre-wrap;">${content}</p>
            </td>
          </tr>

          <!-- Timestamp -->
          <tr>
            <td align="center" style="padding-top: 24px; padding-bottom: 32px;">
              <p style="margin: 0; font-size: 12px; color: rgba(201, 140, 75, 0.3); letter-spacing: 0.05em;">
                Received on ${formattedDate}
              </p>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding-bottom: 24px;">
              <div style="height: 1px; background-color: rgba(201, 140, 75, 0.1);"></div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center">
              <p style="margin: 0; font-size: 12px; color: rgba(201, 140, 75, 0.2);">
                From your sayout page · uryukim.github.io/sayout
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

Deno.serve(async (req) => {
  const payload: WebhookPayload = await req.json();

  // Only process INSERT events
  if (payload.type !== "INSERT") {
    return new Response(JSON.stringify({ message: "Ignored" }), { status: 200 });
  }

  const { content, created_at } = payload.record;

  // Send email via Resend
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: "Sayout <onboarding@resend.dev>",
      to: [YOUR_EMAIL],
      subject: "💬 New anonymous message on Sayout",
      html: buildEmailHtml(content, created_at),
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    console.error("Resend error:", data);
    return new Response(JSON.stringify({ error: data }), { status: 500 });
  }

  return new Response(JSON.stringify({ success: true, id: data.id }), {
    status: 200,
  });
});
