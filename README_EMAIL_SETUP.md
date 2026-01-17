# Email Setup Guide

Currently, the contact and appointment forms are set up with API routes, but they need to be configured to actually send emails.

## Current Status

- ✅ API routes created at `/app/api/contact/route.ts` and `/app/api/appointment/route.ts`
- ✅ Forms are connected to these API routes
- ⚠️ Email sending needs to be configured

## Option 1: Using Resend (Recommended for Production)

Resend is a modern email API that works great with Vercel.

### Setup Steps:

1. **Sign up for Resend**: Go to https://resend.com and create an account

2. **Get your API key**: 
   - Go to API Keys section
   - Create a new API key
   - Copy the key

3. **Add API key to environment variables**:
   - Create a `.env.local` file in your project root
   - Add: `RESEND_API_KEY=your_api_key_here`

4. **Install Resend package**:
   ```bash
   npm install resend
   ```

5. **Update the API routes**:
   - Uncomment the Resend code in `/app/api/contact/route.ts`
   - Uncomment the Resend code in `/app/api/appointment/route.ts`
   - Update the `from` email to your verified domain email
   - The `to` email is already set to `jssmakeupstudio@gmail.com`

## Option 2: Using EmailJS (Client-Side, Easier Setup)

EmailJS is a free service that sends emails directly from the browser.

### Setup Steps:

1. **Sign up**: Go to https://www.emailjs.com

2. **Create an email service**:
   - Add a new service (Gmail, Outlook, etc.)
   - Connect your email account

3. **Create email templates** for:
   - Contact form
   - Appointment form

4. **Get your Public Key and Service ID**

5. **Install EmailJS**:
   ```bash
   npm install @emailjs/browser
   ```

6. **Update forms** to use EmailJS instead of API routes

## Option 3: Using SendGrid

Similar to Resend, SendGrid is another popular email service.

## Option 4: Using a Database + Email Service

Store submissions in a database (like Supabase, MongoDB) and send emails via a service.

## Current Behavior

Right now, form submissions are:
- ✅ Being received by the API routes
- ✅ Being logged to the console (check Vercel logs)
- ❌ NOT sending emails yet

## Testing

After setup, test the forms:
1. Fill out the contact form
2. Fill out the appointment form
3. Check your email inbox at `jssmakeupstudio@gmail.com`
4. Check Vercel function logs for any errors

## Need Help?

If you need help setting up any of these options, let me know which one you prefer!

