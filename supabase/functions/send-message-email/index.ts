import "@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!;
const TURNSTILE_SECRET_KEY = Deno.env.get("TURNSTILE_SECRET_KEY")!;
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const YOUR_EMAIL = "yuki.morales@proton.me";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

async function verifyCaptcha(token: string): Promise<boolean> {
  const res = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: TURNSTILE_SECRET_KEY,
        response: token,
      }),
    }
  );
  const data = await res.json();
  return data.success === true;
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
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
  }

  try {
    const { content, captcha_token } = await req.json();

    // Validate input
    if (!content || typeof content !== "string" || content.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: "Message is required." }),
        { status: 400, headers: CORS_HEADERS }
      );
    }

    if (content.trim().length > 1000) {
      return new Response(
        JSON.stringify({ error: "Message must be under 1000 characters." }),
        { status: 400, headers: CORS_HEADERS }
      );
    }

    // Verify captcha
    if (!captcha_token) {
      return new Response(
        JSON.stringify({ error: "Captcha verification required." }),
        { status: 400, headers: CORS_HEADERS }
      );
    }

    const captchaValid = await verifyCaptcha(captcha_token);
    if (!captchaValid) {
      return new Response(
        JSON.stringify({ error: "Captcha verification failed." }),
        { status: 403, headers: CORS_HEADERS }
      );
    }

    // Insert into database (server-side with service role)
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const { data: record, error: dbError } = await supabase
      .from("messages")
      .insert({ content: content.trim() })
      .select()
      .single();

    if (dbError) {
      console.error("DB error:", dbError);
      return new Response(
        JSON.stringify({ error: "Failed to save message." }),
        { status: 500, headers: CORS_HEADERS }
      );
    }

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
        html: buildEmailHtml(record.content, record.created_at),
      }),
    });

    const emailData = await res.json();

    if (!res.ok) {
      console.error("Resend error:", emailData);
      // Message saved, email failed — not critical
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: CORS_HEADERS }
    );
  } catch (err) {
    console.error("Unexpected error:", err);
    return new Response(
      JSON.stringify({ error: "Something went wrong." }),
      { status: 500, headers: CORS_HEADERS }
    );
  }
});
