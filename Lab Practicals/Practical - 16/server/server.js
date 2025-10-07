import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Email validation helper
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Configure NodeMailer transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    tls: {
      rejectUnauthorized: false
    }
  });
};

// Contact form route
app.post('/api/contact', async (req, res) => {
  try {
    const { fullName, email, subject, message } = req.body;

    // Validation
    if (!fullName || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required.'
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.'
      });
    }

    // Create transporter
    const transporter = createTransporter();
    
    // Verify connection
    await transporter.verify();
    console.log('✅ SMTP connection verified');

    // Email 1: Notification to portfolio owner
    const ownerNotificationOptions = {
      from: `"Portfolio Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `🚀 New Portfolio Inquiry: ${subject}`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Contact Form Submission</title>
          <style>
            body { 
              margin: 0; 
              padding: 20px; 
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
              background-color: #f8fafc;
              line-height: 1.6;
            }
            .container { 
              max-width: 600px; 
              margin: 0 auto; 
              background: white; 
              border-radius: 16px; 
              overflow: hidden;
              box-shadow: 0 10px 25px rgba(0,0,0,0.1);
            }
            .header { 
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
              color: white; 
              padding: 40px 30px; 
              text-align: center;
            }
            .header h1 { 
              margin: 0; 
              font-size: 28px; 
              font-weight: 600;
              text-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            .header p { 
              margin: 10px 0 0 0; 
              opacity: 0.9; 
              font-size: 16px;
            }
            .content { 
              padding: 40px 30px; 
            }
            .field-group { 
              margin-bottom: 25px; 
              border-left: 4px solid #667eea;
              padding-left: 20px;
            }
            .field-label { 
              font-weight: 600; 
              color: #374151; 
              font-size: 14px; 
              text-transform: uppercase; 
              letter-spacing: 0.5px;
              margin-bottom: 5px;
              display: block;
            }
            .field-value { 
              color: #1f2937; 
              font-size: 16px; 
              margin: 0;
              word-wrap: break-word;
            }
            .message-field { 
              background: #f8fafc; 
              border-radius: 12px; 
              padding: 20px; 
              border-left: 4px solid #667eea;
              margin-top: 10px;
            }
            .footer { 
              background: #f8fafc; 
              padding: 30px; 
              text-align: center; 
              color: #6b7280; 
              font-size: 14px;
              border-top: 1px solid #e5e7eb;
            }
            .timestamp { 
              background: #667eea; 
              color: white; 
              padding: 10px 20px; 
              border-radius: 25px; 
              display: inline-block; 
              font-size: 12px;
              font-weight: 500;
              margin-top: 10px;
            }
            .action-button {
              display: inline-block;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 12px 24px;
              text-decoration: none;
              border-radius: 8px;
              font-weight: 600;
              margin: 20px 10px 0 0;
              box-shadow: 0 4px 6px rgba(102, 126, 234, 0.2);
            }
            @media (max-width: 600px) {
              .container { margin: 10px; }
              .header, .content, .footer { padding: 20px; }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>💼 New Contact Inquiry</h1>
              <p>Someone is interested in working with you!</p>
            </div>
            
            <div class="content">
              <div class="field-group">
                <span class="field-label">👤 Full Name</span>
                <p class="field-value">${fullName}</p>
              </div>
              
              <div class="field-group">
                <span class="field-label">📧 Email Address</span>
                <p class="field-value">
                  <a href="mailto:${email}" style="color: #667eea; text-decoration: none; font-weight: 500;">${email}</a>
                </p>
              </div>
              
              <div class="field-group">
                <span class="field-label">📋 Subject</span>
                <p class="field-value">${subject}</p>
              </div>
              
              <div class="field-group">
                <span class="field-label">💬 Message</span>
                <div class="message-field">
                  <p class="field-value" style="margin: 0; white-space: pre-wrap;">${message}</p>
                </div>
              </div>

              <div style="text-align: center; margin-top: 30px;">
                <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}" class="action-button">
                  ✉️ Reply Now
                </a>
                <a href="mailto:${email}" class="action-button">
                  📞 Start Conversation
                </a>
              </div>
            </div>
            
            <div class="footer">
              <p><strong>📍 Received via Portfolio Contact Form</strong></p>
              <div class="timestamp">
                🕒 ${new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
              <p style="margin-top: 15px; font-size: 12px; opacity: 0.7;">
                This email was automatically generated from your portfolio website contact form.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
🚀 NEW PORTFOLIO CONTACT INQUIRY

👤 CONTACT DETAILS:
Name: ${fullName}
Email: ${email}
Subject: ${subject}

💬 MESSAGE:
${message}

📊 DETAILS:
• Received: ${new Date().toLocaleString()}
• Source: Portfolio Contact Form

🎯 REPLY TO: ${email}
      `
    };

    // Email 2: Confirmation to the user who submitted the form
    const userConfirmationOptions = {
      from: `"Portfolio Team" <${process.env.EMAIL_USER}>`,
      to: email, // Send to the user's email
      subject: `✅ Thank you for your message, ${fullName}!`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Message Confirmation</title>
          <style>
            body { 
              margin: 0; 
              padding: 20px; 
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
              background-color: #f8fafc;
              line-height: 1.6;
            }
            .container { 
              max-width: 600px; 
              margin: 0 auto; 
              background: white; 
              border-radius: 16px; 
              overflow: hidden;
              box-shadow: 0 10px 25px rgba(0,0,0,0.1);
            }
            .header { 
              background: linear-gradient(135deg, #10b981 0%, #059669 100%); 
              color: white; 
              padding: 40px 30px; 
              text-align: center;
            }
            .header h1 { 
              margin: 0; 
              font-size: 28px; 
              font-weight: 600;
              text-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            .header p { 
              margin: 10px 0 0 0; 
              opacity: 0.9; 
              font-size: 16px;
            }
            .content { 
              padding: 40px 30px; 
            }
            .highlight-box { 
              background: #f0fdf4; 
              border-left: 4px solid #10b981;
              padding: 20px;
              margin: 20px 0;
              border-radius: 8px;
            }
            .footer { 
              background: #f8fafc; 
              padding: 30px; 
              text-align: center; 
              color: #6b7280; 
              font-size: 14px;
              border-top: 1px solid #e5e7eb;
            }
            .timestamp { 
              background: #10b981; 
              color: white; 
              padding: 10px 20px; 
              border-radius: 25px; 
              display: inline-block; 
              font-size: 12px;
              font-weight: 500;
              margin-top: 10px;
            }
            @media (max-width: 600px) {
              .container { margin: 10px; }
              .header, .content, .footer { padding: 20px; }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✅ Message Received!</h1>
              <p>Thank you for reaching out, ${fullName}!</p>
            </div>
            
            <div class="content">
              <p style="font-size: 18px; color: #374151; margin-bottom: 20px;">
                Hi <strong>${fullName}</strong>,
              </p>
              
              <p style="color: #6b7280; margin-bottom: 20px;">
                Thank you for contacting me through my portfolio website. I've received your message and will get back to you as soon as possible.
              </p>
              
              <div class="highlight-box">
                <h3 style="margin: 0 0 10px 0; color: #059669;">📋 Your Message Summary:</h3>
                <p style="margin: 5px 0;"><strong>Subject:</strong> ${subject}</p>
                <p style="margin: 5px 0;"><strong>Message:</strong> ${message.substring(0, 100)}${message.length > 100 ? '...' : ''}</p>
              </div>
              
              <p style="color: #6b7280; margin: 20px 0;">
                🕒 <strong>Expected Response Time:</strong> I typically respond within 24-48 hours during business days.
              </p>
              
              <p style="color: #6b7280; margin: 20px 0;">
                If you have any urgent questions or need to add additional information, feel free to reply to this email.
              </p>
              
              <p style="color: #374151; margin-top: 30px;">
                Best regards,<br>
                <strong>Meet Patel</strong><br>
                <span style="color: #6b7280;">Full Stack Developer</span>
              </p>
            </div>
            
            <div class="footer">
              <p><strong>📧 Auto-Generated Confirmation Email</strong></p>
              <div class="timestamp">
                🕒 ${new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
              <p style="margin-top: 15px; font-size: 12px; opacity: 0.7;">
                This is an automated confirmation email. Please do not reply to this message.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
✅ MESSAGE RECEIVED - CONFIRMATION

Hi ${fullName},

Thank you for contacting me through my portfolio website. I've received your message and will get back to you as soon as possible.

📋 YOUR MESSAGE SUMMARY:
Subject: ${subject}
Message: ${message}

🕒 EXPECTED RESPONSE TIME: 
I typically respond within 24-48 hours during business days.

If you have any urgent questions or need to add additional information, feel free to reply to this email.

Best regards,
Meet Patel
Full Stack Developer

---
This is an automated confirmation email.
Sent: ${new Date().toLocaleString()}
      `
    };

    // Send both emails
    console.log('📧 Sending notification email to portfolio owner...');
    const ownerEmailInfo = await transporter.sendMail(ownerNotificationOptions);
    
    console.log('📧 Sending confirmation email to user...');
    const userEmailInfo = await transporter.sendMail(userConfirmationOptions);

    console.log(`✅ Emails sent successfully!`);
    console.log(`� Owner notification sent - Message ID: ${ownerEmailInfo.messageId}`);
    console.log(`� User confirmation sent to: ${email} - Message ID: ${userEmailInfo.messageId}`);
    console.log(`📋 Subject: ${subject}`);
    console.log(`👤 From: ${fullName} (${email})`);

    res.status(200).json({
      success: true,
      message: 'Email sent successfully! Thank you for your message. You should receive a confirmation email shortly.',
      messageId: ownerEmailInfo.messageId,
      confirmationSent: true
    });

  } catch (error) {
    console.error('❌ Email sending failed:', error);
    
    let errorMessage = 'Failed to send email. Please try again later.';
    let statusCode = 500;
    
    if (error.code === 'EAUTH' || error.responseCode === 535) {
      errorMessage = 'Email authentication failed. Please check your credentials.';
      statusCode = 401;
    } else if (error.code === 'ENOTFOUND' || error.code === 'ECONNECTION') {
      errorMessage = 'Network connection failed. Please check your internet connection.';
      statusCode = 503;
    }
    
    res.status(statusCode).json({
      success: false,
      message: errorMessage
    });
  }
});

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'Server is running!',
    timestamp: new Date().toISOString(),
    port: PORT
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📧 Email configured for: ${process.env.EMAIL_USER}`);
  console.log(`⚡ Ready to receive contact form submissions!`);
});