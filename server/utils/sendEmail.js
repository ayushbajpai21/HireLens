import { Resend } from 'resend';

/**
 * Utility to send transactional emails via Resend.
 * Falls back to development console logging if RESEND_API_KEY is not configured yet.
 */
export const sendEmail = async ({ to, subject, html, text }) => {
  try {
    const apiKey = process.env.RESEND_API_KEY;

    if (apiKey && apiKey.startsWith('re_') && apiKey !== 're_your_resend_api_key_here') {
      const resend = new Resend(apiKey);
      const fromEmail = process.env.RESEND_FROM || 'AI Career Copilot <onboarding@resend.dev>';

      const data = await resend.emails.send({
        from: fromEmail,
        to: Array.isArray(to) ? to : [to],
        subject,
        html,
        text
      });

      console.log(`[Resend] Email successfully sent to ${to}. Email ID: ${data.id || data.data?.id}`);
      return data;
    } else {
      // Development console fallback
      console.log('--------------------------------------------------');
      console.log('[RESEND EMAIL NOTIFICATION - DEV MODE]');
      console.log(`To: ${to}`);
      console.log(`Subject: ${subject}`);
      console.log(`Content:\n${text || html}`);
      console.log('--------------------------------------------------');
      console.log('[INFO] To send live emails to real inboxes, add your RESEND_API_KEY in server/.env');
      return { id: 'dev-simulated-id', simulated: true };
    }
  } catch (error) {
    console.error('[Resend Error]:', error.message);
    throw new Error(`Failed to send email via Resend: ${error.message}`);
  }
};
