import nodemailer from 'nodemailer';

/**
 * Create Nodemailer transporter (uses SMTP if configured, else fallback mock)
 */
const createTransporter = () => {
  if (process.env.EMAIL_HOST && process.env.EMAIL_USER) {
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT, 10) || 587,
      secure: process.env.EMAIL_PORT === '465',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  // Fallback logger transporter for development/testing
  return {
    sendMail: async (options) => {
      console.log(`[Email Service Simulation] Sent to: ${options.to} | Subject: ${options.subject}`);
      return { messageId: 'simulated_email_id' };
    },
  };
};

const transporter = createTransporter();

export const emailService = {
  /**
   * Send email notification when candidate applies
   */
  sendApplicationSubmittedEmail: async ({ to, jobTitle, candidateName }) => {
    try {
      await transporter.sendMail({
        from: '"InternHub Platform" <no-reply@internhub.com>',
        to,
        subject: `New Candidate Application for ${jobTitle}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; rounded: 8px;">
            <h2 style="color: #0c93e4;">InternHub Recruitment Update</h2>
            <p>Hello,</p>
            <p><strong>${candidateName}</strong> has just submitted an application for your job posting: <strong>${jobTitle}</strong>.</p>
            <p>You can review their profile and resume directly in your employer applicant dashboard.</p>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
            <p style="font-size: 12px; color: #64748b;">This is an automated notification from the InternHub platform.</p>
          </div>
        `,
      });
    } catch (err) {
      console.error(`[Email Service Error] Failed to send email: ${err.message}`);
    }
  },

  /**
   * Send email notification when application status changes
   */
  sendStatusUpdatedEmail: async ({ to, jobTitle, newStatus }) => {
    try {
      await transporter.sendMail({
        from: '"InternHub Platform" <no-reply@internhub.com>',
        to,
        subject: `Application Status Updated: ${jobTitle}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; rounded: 8px;">
            <h2 style="color: #0c93e4;">Application Status Update</h2>
            <p>Hello,</p>
            <p>Your application status for <strong>${jobTitle}</strong> has been updated to: <span style="font-weight: bold; color: #0275c3;">${newStatus}</span>.</p>
            <p>Log in to your InternHub student dashboard to track your recruitment progress.</p>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
            <p style="font-size: 12px; color: #64748b;">This is an automated notification from the InternHub platform.</p>
          </div>
        `,
      });
    } catch (err) {
      console.error(`[Email Service Error] Failed to send email: ${err.message}`);
    }
  },
};
