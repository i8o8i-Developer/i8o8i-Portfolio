import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only Allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    const { name, email, message } = req.body;

    // Validate Input
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Missing Required Fields' });
    }

    // Validate Email Format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: 'Invalid Email Address' });
    }

    // Sanitize Input
    const sanitizedName = name.trim();
    const sanitizedEmail = email.trim();
    const sanitizedMessage = message.trim();

    // Validate SMTP Configuration
    const smtpTo = process.env.SMTP_TO || process.env.SMTP_USERNAME;
    if (!process.env.SMTP_USERNAME || !process.env.SMTP_PASSWORD || !process.env.SMTP_FROM || !smtpTo) {
      return res.status(500).json({ 
        success: false, 
        message: 'SMTP Configuration Is Incomplete. Please Check Your .env File.' 
      });
    }

    // Create Transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Admin Email Template (Professional Graphic Design with Inline Styles)
    const adminEmailHtml = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 40px 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Courier New', monospace; line-height: 1.6; color: #1f2937; background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 650px; margin: 0 auto; background: #ffffff; border: 2px solid #e5e7eb; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);">
        <!-- Top Border -->
        <tr>
            <td style="height: 4px; background: linear-gradient(90deg, #10b981, #059669, #10b981);"></td>
        </tr>
        
        <!-- Header -->
        <tr>
            <td style="background: linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%); color: #ffffff; padding: 50px 30px; text-align: center;">
                <h2 style="margin: 10px 0; font-size: 28px; font-weight: 900; text-transform: uppercase; letter-spacing: 3px; text-shadow: 2px 2px 4px rgba(0,0,0,0.1);">NEW CONTACT FORM SUBMISSION</h2>
                <p style="margin: 10px 0 0 0; font-size: 13px; opacity: 0.95; font-weight: 600; letter-spacing: 1px;">Portfolio Contact System</p>
            </td>
        </tr>
        
        <!-- Content -->
        <tr>
            <td style="background: linear-gradient(180deg, #ffffff 0%, #f9fafb 100%); padding: 40px 30px;">
                <!-- Name Field -->
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 25px; background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%); border-left: 4px solid #10b981; border-radius: 8px; border: 1px solid #e5e7eb;">
                    <tr>
                        <td style="padding: 20px;">
                            <div style="font-weight: 900; color: #059669; font-size: 13px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 12px;">◆ NAME</div>
                            <div style="color: #374151; font-size: 15px; word-wrap: break-word; line-height: 1.8; padding-left: 18px;">${sanitizedName}</div>
                        </td>
                    </tr>
                </table>
                
                <!-- Email Field -->
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 25px; background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%); border-left: 4px solid #10b981; border-radius: 8px; border: 1px solid #e5e7eb;">
                    <tr>
                        <td style="padding: 20px;">
                            <div style="font-weight: 900; color: #059669; font-size: 13px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 12px;">◆ EMAIL</div>
                            <div style="color: #374151; font-size: 15px; word-wrap: break-word; line-height: 1.8; padding-left: 18px;"><a href="mailto:${sanitizedEmail}" style="color: #10b981; text-decoration: none;">${sanitizedEmail}</a></div>
                        </td>
                    </tr>
                </table>
                
                <!-- Message Field -->
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 25px; background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-left: 4px solid #3b82f6; border-radius: 8px; border: 1px solid #bfdbfe;">
                    <tr>
                        <td style="padding: 20px;">
                            <div style="font-weight: 900; color: #2563eb; font-size: 13px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 12px;">◆ MESSAGE</div>
                            <div style="color: #374151; font-size: 15px; word-wrap: break-word; line-height: 1.8; padding-left: 18px;">${sanitizedMessage.replace(/\n/g, '<br>')}</div>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        
        <!-- Footer -->
        <tr>
            <td style="background: #f9fafb; padding: 30px 20px; text-align: center; border-top: 1px solid #e5e7eb;">
                <div style="color: #059669; font-weight: 700; font-size: 14px; margin-bottom: 10px; letter-spacing: 1px;">⏰ Received: ${new Date().toLocaleString('en-US', { 
                  year: 'numeric', 
                  month: '2-digit', 
                  day: '2-digit', 
                  hour: '2-digit', 
                  minute: '2-digit', 
                  second: '2-digit',
                  hour12: false
                })}</div>
                <div style="color: #6b7280; font-size: 12px; margin-top: 10px;">Automated Portfolio Contact Notification System v2.0</div>
            </td>
        </tr>
    </table>
</body>
</html>
    `;

    // Confirmation Email Template (For Sender - with Inline Styles)
    const confirmationEmailHtml = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 40px 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Courier New', monospace; line-height: 1.7; color: #1f2937; background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 650px; margin: 0 auto; background: #ffffff; border: 2px solid #e5e7eb; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);">
        <!-- Top Border -->
        <tr>
            <td style="height: 4px; background: linear-gradient(90deg, #10b981, #3b82f6, #10b981);"></td>
        </tr>
        
        <!-- Header -->
        <tr>
            <td style="background: linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%); color: #ffffff; padding: 60px 30px; text-align: center;">
                <h2 style="margin: 10px 0; font-size: 32px; font-weight: 900; letter-spacing: 2px; text-shadow: 2px 2px 4px rgba(0,0,0,0.1);">Message Received!</h2>
            </td>
        </tr>
        
        <!-- Content -->
        <tr>
            <td style="background: linear-gradient(180deg, #ffffff 0%, #f9fafb 100%); padding: 40px 30px;">
                <!-- Greeting -->
                <p style="font-size: 18px; margin: 0 0 25px 0; color: #374151;">
                    Hi <span style="color: #059669; font-weight: 900;">${sanitizedName}</span>,
                </p>
                
                <!-- Thank You Message -->
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 25px 0; background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%); border-left: 4px solid #10b981; border-radius: 8px; border: 1px solid #e5e7eb;">
                    <tr>
                        <td style="padding: 25px;">
                            <p style="margin: 0; color: #374151;">Thank You For Reaching Out! I've Received Your Message And Will Get Back To You As Soon As Possible.</p>
                        </td>
                    </tr>
                </table>
                
                <!-- Divider -->
                <div style="height: 2px; background: linear-gradient(90deg, transparent, #10b981, transparent); margin: 30px 0;"></div>
                
                <!-- Message Preview -->
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 25px 0; background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-left: 4px solid #3b82f6; border-radius: 8px; border: 1px solid #bfdbfe;">
                    <tr>
                        <td style="padding: 25px;">
                            <div style="font-weight: 900; color: #2563eb; font-size: 13px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 15px;">📝 YOUR MESSAGE</div>
                            <div style="color: #1e3a8a; font-size: 15px; line-height: 1.8; font-style: italic;">${sanitizedMessage.replace(/\n/g, '<br>')}</div>
                        </td>
                    </tr>
                </table>
                
                <!-- Response Time -->
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 25px 0; background: linear-gradient(135deg, #eff6ff, #dbeafe); padding: 20px; border-radius: 8px; border: 1px solid #bfdbfe;">
                    <tr>
                        <td style="text-align: center;">
                            <span style="font-size: 24px;">⏱️</span>
                            <span style="color: #2563eb; font-weight: 700; font-size: 14px; margin-left: 10px;">Typical Response Time: 24-48 Hours</span>
                        </td>
                    </tr>
                </table>
                
                <!-- Info Section -->
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 25px 0; background: #f9fafb; border-radius: 8px; border: 1px solid #e5e7eb;">
                    <tr>
                        <td style="padding: 20px;">
                            <p style="margin: 0; color: #4b5563;">I Typically Respond Within 24-48 Hours. If You Need Immediate Assistance, Feel Free To Connect With Me On Other Platforms.</p>
                        </td>
                    </tr>
                </table>
                
                <!-- Divider -->
                <div style="height: 2px; background: linear-gradient(90deg, transparent, #10b981, transparent); margin: 30px 0;"></div>
                
                <!-- Signature -->
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 25px 0; text-align: center;">
                    <tr>
                        <td>
                            <p style="color: #9ca3af; margin: 0 0 10px 0;">Best regards,</p>
                            <div style="font-size: 20px; color: #10b981; font-weight: 900; margin: 10px 0; letter-spacing: 1px;">Anubhav Chaurasia</div>
                            <div style="color: #6b7280; font-size: 14px; font-weight: 600; letter-spacing: 1px;">Backend Developer</div>
                        </td>
                    </tr>
                </table>
                
                <!-- Social Links -->
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top: 20px;">
                    <tr>
                        <td style="text-align: center;">
                            <a href="https://linkedin.com/in/anubhav16o8" style="display: inline-block; margin: 5px; padding: 10px 20px; background: linear-gradient(135deg, #f9fafb, #f3f4f6); border: 2px solid #e5e7eb; border-radius: 6px; color: #059669; text-decoration: none; font-size: 13px; font-weight: 700;">💼 LinkedIn</a>
                            <a href="https://github.com/i8o8i-Developer" style="display: inline-block; margin: 5px; padding: 10px 20px; background: linear-gradient(135deg, #f9fafb, #f3f4f6); border: 2px solid #e5e7eb; border-radius: 6px; color: #059669; text-decoration: none; font-size: 13px; font-weight: 700;">💻 GitHub</a>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        
        <!-- Footer -->
        <tr>
            <td style="background: #0a0a0a; padding: 30px 20px; text-align: center; border-top: 1px solid #2a2a2a;">
                <div style="font-size: 32px; margin-bottom: 10px;">🤖</div>
                <div style="color: #6b7280; font-size: 12px; line-height: 1.6; margin: 5px 0;">This Is An Automated Confirmation From The Portfolio Contact System.</div>
                <div style="color: #6b7280; font-size: 12px; line-height: 1.6; margin: 5px 0;">Your Message Has Been Securely Received And Logged.</div>
                <div style="color: #ef4444; font-weight: 700; margin-top: 15px; font-size: 12px;">⚠️ Please Do Not Reply To This Email.</div>
            </td>
        </tr>
    </table>
</body>
</html>
    `;

    // Email Options for Admin
    const adminMailOptions = {
      from: `"${process.env.SMTP_FROM_NAME || 'Portfolio Contact Form'}" <${process.env.SMTP_FROM}>`,
      to: smtpTo,
      replyTo: sanitizedEmail,
      subject: `New Contact Form Submission from ${sanitizedName}`,
      html: adminEmailHtml,
    };

    // Send Email To Admin
    await transporter.sendMail(adminMailOptions);

    // Send Confirmation Email To Sender
    let confirmationSent = false;
    try {
      const confirmMailOptions = {
        from: `"${process.env.SMTP_FROM_NAME || 'Portfolio Contact Form'}" <${process.env.SMTP_FROM}>`,
        to: sanitizedEmail,
        replyTo: process.env.SMTP_FROM,
        subject: 'Thank You For Contacting Me!',
        html: confirmationEmailHtml,
      };
      
      await transporter.sendMail(confirmMailOptions);
      confirmationSent = true;
    } catch (confirmError) {
      console.error('Confirmation Email Error:', confirmError);
    }

    return res.status(200).json({ 
      success: true, 
      message: `Email Sent Successfully${confirmationSent ? ' - Confirmation Sent' : ''}`
    });
  } catch (error) {
    console.error('Email Error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed To Send Email. Please Check SMTP Configuration.' 
    });
  }
}