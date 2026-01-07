import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    // Validate the input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Send email using Resend
    const data = await resend.emails.send({
      from: 'CodeBridgeX Contact Form <onboarding@resend.dev>', // This will change once you verify your domain
      to: ['codebridgex@gmail.com'],
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background: linear-gradient(135deg, #FF5722 0%, #FF6B35 100%);
                color: white;
                padding: 30px;
                border-radius: 10px 10px 0 0;
                text-align: center;
              }
              .content {
                background: #ffffff;
                border: 1px solid #e0e0e0;
                border-top: none;
                padding: 30px;
                border-radius: 0 0 10px 10px;
              }
              .field {
                margin-bottom: 20px;
              }
              .label {
                font-weight: 600;
                color: #FF5722;
                font-size: 14px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                margin-bottom: 5px;
              }
              .value {
                color: #333;
                font-size: 16px;
                padding: 10px;
                background: #f5f5f5;
                border-radius: 5px;
                border-left: 3px solid #FF5722;
              }
              .message-box {
                background: #f5f5f5;
                padding: 15px;
                border-radius: 5px;
                border-left: 3px solid #FF5722;
                white-space: pre-wrap;
                word-wrap: break-word;
              }
              .footer {
                text-align: center;
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #e0e0e0;
                color: #999;
                font-size: 12px;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1 style="margin: 0; font-size: 24px;">🚀 New Contact Form Submission</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">CodeBridgeX Website</p>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">👤 Name</div>
                <div class="value">${name}</div>
              </div>
              
              <div class="field">
                <div class="label">📧 Email</div>
                <div class="value"><a href="mailto:${email}" style="color: #FF5722; text-decoration: none;">${email}</a></div>
              </div>
              
              <div class="field">
                <div class="label">💬 Message</div>
                <div class="message-box">${message}</div>
              </div>
              
              <div class="footer">
                This email was sent from your CodeBridgeX contact form
              </div>
            </div>
          </body>
        </html>
      `,
    });

    return NextResponse.json(
      { success: true, data },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
