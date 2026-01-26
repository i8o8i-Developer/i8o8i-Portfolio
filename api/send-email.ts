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
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Iceberg&family=Silkscreen:wght@400;700&display=swap" rel="stylesheet">
    <style>
        /* Responsive email styles */
        body { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; margin:0; padding: 20px 12px; }
        .email-container { max-width: 600px; margin: 0 auto; width: 100% !important; box-sizing: border-box; }
        table { width: 100%; border-collapse: separate; mso-table-lspace:0pt; mso-table-rspace:0pt; }
        td { box-sizing: border-box; word-wrap: break-word; overflow-wrap: anywhere; }
        .header-td { padding: 28px 20px !important; text-align: center; }
        .content { padding: 20px 16px !important; }
        .footer-td { padding: 16px 12px !important; text-align: center; }
        .btn { padding: 12px 20px !important; display: inline-block; text-decoration: none; white-space: normal; overflow-wrap: anywhere; word-break: break-word; }
        .message { word-break: break-word; overflow-wrap: anywhere; white-space: normal; }
        /* Make elements use border-box and constrain images */
        .email-container, .content, .header-td, .footer-td, .message { box-sizing: border-box; }
        img { max-width: 100%; height: auto; display: block; }
        a { color: inherit; word-break: break-word; overflow-wrap: anywhere; }
        @media only screen and (max-width:480px) {
            h1 { font-size: 20px !important; line-height: 1.2 !important; }
            .header-td { padding: 20px 12px !important; }
            .content { padding: 16px 12px !important; }
            .footer-td { padding: 12px !important; }
            .btn { padding: 12px 16px !important; display: block !important; width: 100% !important; box-sizing: border-box !important; }
            .message { font-size: 15px !important; line-height: 1.6 !important; }
        }
        /* (<=360px) */
        @media only screen and (max-width:360px) {
            body { padding: 12px 8px !important; }
            h1 { font-size: 18px !important; }
            .header-td { padding: 12px 10px !important; }
            .content { padding: 12px 10px !important; }
            .footer-td { padding: 8px 10px !important; }
            .btn { padding: 10px 12px !important; font-size: 13px !important; }
            .message { font-size: 14px !important; line-height: 1.5 !important; }
        }
    </style>
</head>
<body style="margin: 0; padding: 20px 12px; font-family: 'Iceberg', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #e5e7eb; background: #000000;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" class="email-container" style="max-width: 600px; margin: 0 auto; background: #0a0a0a; border: 2px solid #10b981; border-radius: 8px; overflow: hidden;">
        <!-- Header -->
        <tr>
            <td class="header-td" style="background: linear-gradient(135deg, #000000 0%, #0a0a0a 100%); border-bottom: 3px solid #10b981; padding: 40px 30px; text-align: center;">
                <h1 style="margin: 0; font-size: 24px; font-weight: 700; color: #10b981; font-family: 'Silkscreen', 'Arial Black', Impact, 'Segoe UI', Tahoma, Arial, sans-serif; text-transform: uppercase; letter-spacing: 2px;">New Contact Message</h1>
                <p style="margin: 12px 0 0 0; font-size: 13px; color: #6b7280; font-family: 'Iceberg', sans-serif; letter-spacing: 1px;">Serverless Contact API • v1.0</p>
            </td>
        </tr>
        
        <!-- Content -->
        <tr>
            <td class="content" style="padding: 40px 30px; background: #0a0a0a;">
                <!-- Name -->
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 24px;">
                    <tr>
                        <td style="padding-bottom: 10px;">
                            <span style="font-size: 11px; font-weight: 700; color: #10b981; text-transform: uppercase; letter-spacing: 1.5px; font-family: 'Silkscreen', sans-serif;">NAME</span>
                        </td>
                    </tr>
                    <tr>
                        <td style="background: #000000; padding: 18px; border-left: 4px solid #10b981; border: 1px solid #1f2937;">
                            <div class="message" style="color: #f9fafb; font-size: 16px; font-family: 'Iceberg', sans-serif;">${sanitizedName}</div>
                        </td>
                    </tr>
                </table>
                
                <!-- Email -->
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 24px;">
                    <tr>
                        <td style="padding-bottom: 10px;">
                            <span style="font-size: 11px; font-weight: 700; color: #10b981; text-transform: uppercase; letter-spacing: 1.5px; font-family: 'Silkscreen', sans-serif;">Email Address</span>
                        </td>
                    </tr>
                    <tr>
                        <td style="background: #000000; padding: 18px; border-left: 4px solid #10b981; border: 1px solid #1f2937;">
                            <a href="mailto:${sanitizedEmail}" style="color: #10b981; font-size: 16px; text-decoration: underline; font-family: 'Iceberg', sans-serif;">${sanitizedEmail}</a>
                        </td>
                    </tr>
                </table>
                
                <!-- Message -->
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 24px;">
                    <tr>
                        <td style="padding-bottom: 10px;">
                            <span style="font-size: 11px; font-weight: 700; color: #3b82f6; text-transform: uppercase; letter-spacing: 1.5px; font-family: 'Silkscreen', sans-serif;">Message</span>
                        </td>
                    </tr>
                    <tr>
                        <td style="background: #000000; padding: 20px; border-left: 4px solid #3b82f6; border: 1px solid #1e3a8a;">
                            <div class="message" style="color: #93c5fd; font-size: 15px; line-height: 1.8; font-family: 'Iceberg', sans-serif;">${sanitizedMessage.replace(/\n/g, '<br>')}</div>
                        </td>
                    </tr>
                </table>
                
                <!-- Quick Actions -->
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top: 32px;">
                    <tr>
                        <td style="text-align: center;">
                            <a href="mailto:${sanitizedEmail}" class="btn" style="display: inline-block; padding: 14px 36px; background: #10b981; color: #000000; text-decoration: none; font-weight: 700; font-size: 14px; font-family: 'Silkscreen', sans-serif; text-transform: uppercase; letter-spacing: 1px; border: 2px solid #10b981; transition: all 0.3s;">Reply to ${sanitizedName}</a>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        
        <!-- Footer -->
        <tr>
            <td class="footer-td" style="background: #000000; padding: 24px 30px; text-align: center; border-top: 2px solid #1f2937;">
                <div style="color: #10b981; font-weight: 600; font-size: 12px; margin-bottom: 8px; font-family: 'Silkscreen', sans-serif;">${new Date().toLocaleString('en-IN', { 
                  timeZone: 'Asia/Kolkata',
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric', 
                  hour: '2-digit', 
                  minute: '2-digit',
                  second: '2-digit',
                  hour12: true
                })} IST</div>
                <div style="color: #6b7280; font-size: 11px; font-family: 'Iceberg', sans-serif;">Automated Message Delivery • API Gateway</div>
            </td>
        </tr>
    </table>
</body>
</html>
    `;

    // Confirmation Email Template (For Sender - With Inline Styles)
    const confirmationEmailHtml = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Iceberg&family=Silkscreen:wght@400;700&display=swap" rel="stylesheet">
    <style>
        /* Responsive email styles */
        body { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; margin:0; padding: 20px 12px; }
        .email-container { max-width: 600px; margin: 0 auto; width: 100% !important; box-sizing: border-box; }
        table { width: 100%; border-collapse: separate; mso-table-lspace:0pt; mso-table-rspace:0pt; }
        td { box-sizing: border-box; word-wrap: break-word; overflow-wrap: anywhere; }
        .header-td { padding: 28px 20px !important; text-align: center; }
        .content { padding: 20px 16px !important; }
        .footer-td { padding: 16px 12px !important; text-align: center; }
        .btn { padding: 12px 20px !important; display: inline-block; text-decoration: none; white-space: normal; overflow-wrap: anywhere; word-break: break-word; }
        .message { word-break: break-word; overflow-wrap: anywhere; white-space: normal; }
        /* Make elements use border-box and constrain images */
        .email-container, .content, .header-td, .footer-td, .message { box-sizing: border-box; }
        img { max-width: 100%; height: auto; display: block; }
        a { color: inherit; word-break: break-word; overflow-wrap: anywhere; }
        @media only screen and (max-width:480px) {
            h1 { font-size: 20px !important; line-height: 1.2 !important; }
            .header-td { padding: 20px 12px !important; }
            .content { padding: 16px 12px !important; }
            .footer-td { padding: 12px !important; }
            .btn { padding: 12px 16px !important; display: block !important; width: 100% !important; box-sizing: border-box !important; }
            .message { font-size: 15px !important; line-height: 1.6 !important; }
        }
        /* (<=360px) */
        @media only screen and (max-width:360px) {
            body { padding: 12px 8px !important; }
            h1 { font-size: 18px !important; }
            .header-td { padding: 12px 10px !important; }
            .content { padding: 12px 10px !important; }
            .footer-td { padding: 8px 10px !important; }
            .btn { padding: 10px 12px !important; font-size: 13px !important; }
            .message { font-size: 14px !important; line-height: 1.5 !important; }
        }
    </style>
</head>
<body style="margin: 0; padding: 20px 12px; font-family: 'Iceberg', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.7; color: #e5e7eb; background: #000000;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" class="email-container" style="max-width: 600px; margin: 0 auto; background: #0a0a0a; border: 2px solid #10b981; border-radius: 8px; overflow: hidden;">
        <!-- Header -->
        <tr>
            <td class="header-td" style="background: linear-gradient(135deg, #000000 0%, #0a0a0a 100%); border-bottom: 3px solid #10b981; padding: 50px 30px; text-align: center;">
                <h1 style="margin: 0; font-size: 32px; font-weight: 700; color: #10b981; font-family: 'Silkscreen', 'Arial Black', Impact, 'Segoe UI', Tahoma, Arial, sans-serif; text-transform: uppercase; letter-spacing: 2px;">Message Received!</h1>
                <p style="margin: 12px 0 0 0; font-size: 14px; color: #6b7280; font-family: 'Iceberg', sans-serif;">Thank You For Reaching Out</p>
            </td>
        </tr>
        
        <!-- Content -->
        <tr>
            <td class="content" style="padding: 40px 30px; background: #0a0a0a;">
                <!-- Greeting -->
                <p style="font-size: 16px; margin: 0 0 20px 0; color: #e5e7eb; font-family: 'Iceberg', sans-serif;">
                    Hi <strong style="color: #10b981; font-family: 'Silkscreen', sans-serif;">${sanitizedName}</strong>,
                </p>
                
                <p style="font-size: 15px; margin: 0 0 25px 0; color: #9ca3af; line-height: 1.8; font-family: 'Iceberg', sans-serif;">
                    I've Successfully Received Your Message And Will Get Back To You As Soon As Possible.
                </p>
                
                <!-- Divider -->
                <div style="height: 2px; background: linear-gradient(90deg, transparent, #10b981, transparent); margin: 30px 0;"></div>
                
                <!-- Message Preview -->
                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                        <td style="padding-bottom: 12px;">
                            <span style="font-size: 11px; font-weight: 700; color: #3b82f6; text-transform: uppercase; letter-spacing: 1.5px; font-family: 'Silkscreen', sans-serif;">Your Message</span>
                        </td>
                    </tr>
                    <tr>
                        <td style="background: #000000; padding: 20px; border-left: 4px solid #3b82f6; border: 1px solid #1e3a8a;">
                            <div class="message" style="color: #93c5fd; font-size: 14px; line-height: 1.8; font-style: italic; font-family: 'Iceberg', sans-serif;">${sanitizedMessage.replace(/\n/g, '<br>')}</div>
                        </td>
                    </tr>
                </table>
                
                <!-- Response Time Box -->
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 25px 0;">
                    <tr>
                        <td style="background: #000000; padding: 24px; border: 2px solid #3b82f6; text-align: center;">
                            <div style="color: #3b82f6; font-weight: 600; font-size: 12px; font-family: 'Silkscreen', sans-serif; text-transform: uppercase; letter-spacing: 1px;">Typical Response Time</div>
                            <div style="color: #10b981; font-weight: 700; font-size: 18px; margin-top: 8px; font-family: 'Silkscreen', sans-serif;">24-48 Hours</div>
                        </td>
                    </tr>
                </table>
                
                <p style="font-size: 14px; margin: 25px 0; color: #6b7280; line-height: 1.7; font-family: 'Iceberg', sans-serif;">
                    If You Need Immediate Assistance, Feel Free To Connect With Me On Other Platforms.
                </p>
                
                <!-- Divider -->
                <div style="height: 2px; background: linear-gradient(90deg, transparent, #10b981, transparent); margin: 30px 0;"></div>
                
                <!-- Signature -->
                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                        <td>
                            <p style="color: #6b7280; margin: 0 0 8px 0; font-size: 14px; font-family: 'Iceberg', sans-serif;">Best Regards,</p>
                            <div style="font-size: 20px; color: #10b981; font-weight: 700; margin: 8px 0; font-family: 'Silkscreen', sans-serif; letter-spacing: 1px;">Anubhav Chaurasia</div>
                            <div style="color: #6b7280; font-size: 13px; font-family: 'Iceberg', sans-serif;">Backend Developer</div>
                        </td>
                    </tr>
                </table>
                
                <!-- Social Links -->
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top: 25px;">
                    <tr>
                        <td style="text-align: center;">
                            <a href="https://linkedin.com/in/anubhav16o8" class="btn" style="display: inline-block; margin: 0 6px; padding: 10px 20px; background: #000000; border: 2px solid #10b981; color: #10b981; text-decoration: none; font-size: 12px; font-weight: 700; font-family: 'Silkscreen', sans-serif; text-transform: uppercase; letter-spacing: 1px;">LinkedIn</a>
                            <a href="https://github.com/i8o8i-Developer" class="btn" style="display: inline-block; margin: 0 6px; padding: 10px 20px; background: #000000; border: 2px solid #10b981; color: #10b981; text-decoration: none; font-size: 12px; font-weight: 700; font-family: 'Silkscreen', sans-serif; text-transform: uppercase; letter-spacing: 1px;">GitHub</a>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        
        <!-- Footer -->
        <tr>
            <td class="footer-td" style="background: #000000; padding: 30px 20px; text-align: center; border-top: 2px solid #1f2937;">
                <div style="color: #6b7280; font-size: 12px; line-height: 1.6; margin: 5px 0; font-family: 'Iceberg', sans-serif;">This Is An Automated Confirmation From The Serverless Contact API.</div>
                <div style="color: #6b7280; font-size: 12px; line-height: 1.6; margin: 5px 0; font-family: 'Iceberg', sans-serif;">Your Message Has Been Securely Received And Logged.</div>
                <div style="color: #ef4444; font-weight: 600; margin-top: 12px; font-size: 11px; font-family: 'Silkscreen', sans-serif; text-transform: uppercase; letter-spacing: 1px;">Please Do Not Reply To This Email</div>
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