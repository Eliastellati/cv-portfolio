# Contact Form Setup Guide

## Overview
The contact form is now functional and uses n8n to send email notifications when someone submits the form.

## Setup Steps

### 1. Create n8n Workflow

1. Log in to your n8n instance
2. Create a new workflow called "Contact Form Handler"
3. Add the following nodes:

#### Webhook Node (Trigger)
- **Method**: POST
- **Path**: `/contact-form` (or your preferred path)
- **Authentication**: None (we're using custom header authentication)
- **Response Mode**: Respond on last node

#### Function Node (Optional - for validation)
```javascript
// Validate and format the incoming data
const { name, email, subject, message, recipientEmail, timestamp } = $json;

// Basic validation
if (!name || !email || !subject || !message) {
  throw new Error('Missing required fields');
}

return {
  json: {
    name,
    email,
    subject,
    message,
    recipientEmail: recipientEmail || 'eliastellatibvb@gmail.com',
    timestamp: timestamp || new Date().toISOString(),
  }
};
```

#### Email Node (Send Email)
Configure the email node with your preferred email service:
- **From Email**: Your verified sender email
- **To Email**: `{{ $json.recipientEmail }}`
- **Subject**: `New Contact Form: {{ $json.subject }}`
- **Text/HTML**:
```
New contact form submission from your portfolio:

Name: {{ $json.name }}
Email: {{ $json.email }}
Subject: {{ $json.subject }}

Message:
{{ $json.message }}

---
Submitted at: {{ $json.timestamp }}
```

#### Respond to Webhook Node
- **Status Code**: 200
- **Body**:
```json
{
  "success": true,
  "message": "Email sent successfully"
}
```

### 2. Get Webhook URL

1. Activate your workflow in n8n
2. Click on the Webhook node
3. Copy the **Production URL**
4. It should look like: `https://your-n8n-instance.com/webhook/contact-form`

### 3. Configure Environment Variables

#### For Local Development
Create a `.env` file in your project root:
```env
N8N_CONTACT_WEBHOOK=https://your-n8n-instance.com/webhook/contact-form
N8N_DEMO_SECRET=your_optional_secret_key
```

#### For Vercel Deployment
1. Go to your Vercel project settings
2. Navigate to "Environment Variables"
3. Add the following variables:
   - `N8N_CONTACT_WEBHOOK`: Your n8n webhook URL
   - `N8N_DEMO_SECRET`: Optional secret key for additional security

### 4. Test the Form

1. Fill out the contact form on your website
2. Submit the form
3. Check that:
   - You see a success message on the website
   - You receive an email at eliastellatibvb@gmail.com
   - The n8n workflow execution shows as successful

## Email Service Options

You can use any of these email services in your n8n workflow:

### Option 1: Gmail (Easiest)
- Use Gmail node in n8n
- Create an "App Password" in your Google account
- Configure the Gmail node with your credentials

### Option 2: SendGrid
- Sign up for SendGrid (free tier available)
- Get API key
- Use HTTP Request node or SendGrid node

### Option 3: Resend
- Sign up for Resend
- Get API key
- Use HTTP Request node

### Option 4: SMTP
- Use any SMTP server
- Configure Email Send node with SMTP credentials

## Security Notes

1. **Rate Limiting**: Consider adding rate limiting to prevent spam
2. **CAPTCHA**: For production, consider adding reCAPTCHA or similar
3. **Validation**: The API endpoint validates required fields
4. **Secret Header**: Optional `x-demo-secret` header for basic authentication

## Troubleshooting

### Form submission fails
1. Check browser console for error messages
2. Verify `N8N_CONTACT_WEBHOOK` is set correctly
3. Check n8n workflow is active
4. Check n8n execution logs for errors

### Email not received
1. Check spam folder
2. Verify email service credentials in n8n
3. Check n8n workflow execution completed successfully
4. Verify recipient email is correct

### 500 Error
1. Check that `N8N_CONTACT_WEBHOOK` environment variable is set
2. Verify the webhook URL is accessible
3. Check n8n instance is running

## API Endpoint Details

**Endpoint**: `/api/contact`
**Method**: POST
**Content-Type**: application/json

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "I'd like to discuss...",
  "recipientEmail": "eliastellatibvb@gmail.com"
}
```

**Success Response** (200):
```json
{
  "success": true,
  "message": "Contact form submitted successfully"
}
```

**Error Response** (400/500):
```json
{
  "success": false,
  "error": "Error message here"
}
```
