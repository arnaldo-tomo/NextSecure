import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: EmailOptions) {
  const from = process.env.EMAIL_FROM || "noreply@nextsecure.dev";

  try {
    await transporter.sendMail({ from, to, subject, html });
    return { success: true };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { success: false, error };
  }
}

export async function sendVerificationEmail(email: string, token: string) {
  const appUrl = process.env.APP_URL || "http://localhost:3000";
  const verifyUrl = `${appUrl}/auth/verify-email?token=${token}`;
  const appName = process.env.APP_NAME || "NextSecure";

  return sendEmail({
    to: email,
    subject: `${appName} — Verify your email`,
    html: `
      <!DOCTYPE html>
      <html>
        <body style="margin:0;padding:0;font-family:Inter,system-ui,sans-serif;background:#f8fafc;">
          <div style="max-width:480px;margin:40px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
            <div style="background:linear-gradient(135deg,#2563eb,#3b82f6);padding:32px;text-align:center;">
              <h1 style="color:#fff;margin:0;font-size:24px;">${appName}</h1>
            </div>
            <div style="padding:32px;">
              <h2 style="margin:0 0 16px;color:#1e293b;">Verify your email</h2>
              <p style="color:#64748b;line-height:1.6;">Click the button below to verify your email address and activate your account.</p>
              <a href="${verifyUrl}" style="display:inline-block;margin:24px 0;padding:12px 32px;background:#2563eb;color:#fff;text-decoration:none;border-radius:8px;font-weight:600;">
                Verify Email
              </a>
              <p style="color:#94a3b8;font-size:13px;">If you didn't create an account, ignore this email.</p>
            </div>
          </div>
        </body>
      </html>
    `,
  });
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const appUrl = process.env.APP_URL || "http://localhost:3000";
  const resetUrl = `${appUrl}/auth/reset-password?token=${token}`;
  const appName = process.env.APP_NAME || "NextSecure";

  return sendEmail({
    to: email,
    subject: `${appName} — Reset your password`,
    html: `
      <!DOCTYPE html>
      <html>
        <body style="margin:0;padding:0;font-family:Inter,system-ui,sans-serif;background:#f8fafc;">
          <div style="max-width:480px;margin:40px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
            <div style="background:linear-gradient(135deg,#2563eb,#3b82f6);padding:32px;text-align:center;">
              <h1 style="color:#fff;margin:0;font-size:24px;">${appName}</h1>
            </div>
            <div style="padding:32px;">
              <h2 style="margin:0 0 16px;color:#1e293b;">Reset your password</h2>
              <p style="color:#64748b;line-height:1.6;">Click the button below to reset your password. This link expires in 1 hour.</p>
              <a href="${resetUrl}" style="display:inline-block;margin:24px 0;padding:12px 32px;background:#2563eb;color:#fff;text-decoration:none;border-radius:8px;font-weight:600;">
                Reset Password
              </a>
              <p style="color:#94a3b8;font-size:13px;">If you didn't request a password reset, ignore this email.</p>
            </div>
          </div>
        </body>
      </html>
    `,
  });
}
