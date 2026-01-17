# Setup Instructions - Email Configuration

## ✅ What's Already Done

- ✅ Resend package installed
- ✅ API routes created and configured
- ✅ Forms connected to API routes
- ✅ Resend code uncommented and ready

## 🔧 What You Need to Do Now

### Step 1: Add Your Resend API Key

1. **Create `.env.local` file** in your project root (same folder as `package.json`)

2. **Add your Resend API key**:
   ```
   RESEND_API_KEY=re_your_actual_api_key_here
   ```
   Replace `re_your_actual_api_key_here` with your actual Resend API key.

3. **Important**: 
   - Never commit `.env.local` to git (it's already in `.gitignore`)
   - For Vercel deployment, add this as an environment variable in Vercel dashboard

### Step 2: Set Up "From" Email Address

You have two options:

#### Option A: Use Resend's Test Domain (Quick Start)
- The code is already set to use `onboarding@resend.dev`
- This works immediately for testing
- **Note**: Emails from this address may go to spam

#### Option B: Verify Your Own Domain (Recommended for Production)

1. Go to Resend Dashboard → Domains
2. Add your domain (e.g., `yourdomain.com`)
3. Add the DNS records Resend provides
4. Wait for verification (usually a few minutes)
5. Update the `from` email in both API files:
   - `app/api/contact/route.ts`: Change `onboarding@resend.dev` to `contact@yourdomain.com`
   - `app/api/appointment/route.ts`: Change `onboarding@resend.dev` to `appointments@yourdomain.com`

### Step 3: Test It!

1. **Run your development server**:
   ```bash
   npm run dev
   ```

2. **Test the contact form**:
   - Go to `/contact`
   - Fill out and submit the form
   - Check `jssmakeupstudio@gmail.com` inbox

3. **Test the appointment form**:
   - Go to `/appointment`
   - Fill out and submit the form
   - Check `jssmakeupstudio@gmail.com` inbox

### Step 4: Deploy to Vercel

1. **Add environment variable in Vercel**:
   - Go to your Vercel project dashboard
   - Settings → Environment Variables
   - Add: `RESEND_API_KEY` = `your_api_key_here`
   - Redeploy your site

## 📧 EmailJS Alternative (If You Prefer)

Since you also created EmailJS templates, here's how to use EmailJS instead:

1. **Install EmailJS** (already installed):
   ```bash
   npm install @emailjs/browser
   ```

2. **Get your EmailJS credentials**:
   - Public Key
   - Service ID
   - Template ID for Contact form
   - Template ID for Appointment form

3. **Update the forms** to use EmailJS instead of API routes

**Note**: EmailJS sends emails from the client-side (browser), while Resend sends from the server-side (more secure and reliable).

## 🐛 Troubleshooting

### Emails not arriving?
1. Check spam folder
2. Check Vercel function logs for errors
3. Verify your API key is correct
4. Make sure the `from` email is verified in Resend

### Getting errors?
- Check the browser console
- Check Vercel function logs
- Verify `RESEND_API_KEY` is set correctly

## 📝 Current Configuration

- **Contact emails go to**: `jssmakeupstudio@gmail.com`
- **Appointment emails go to**: `jssmakeupstudio@gmail.com`
- **From email**: `onboarding@resend.dev` (test domain)

You can change the recipient email in the API files if needed.

