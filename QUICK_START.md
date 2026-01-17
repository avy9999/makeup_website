# Quick Start - Get Emails Working in 2 Minutes! 🚀

## Step 1: Create `.env.local` file

In your project root folder, create a file named `.env.local` and add:

```
RESEND_API_KEY=re_your_api_key_here
```

**Replace `re_your_api_key_here` with your actual Resend API key.**

## Step 2: Test It!

1. Run: `npm run dev`
2. Go to http://localhost:3000/contact
3. Fill out and submit the form
4. Check `jssmakeupstudio@gmail.com` inbox (check spam too!)

## Step 3: Deploy to Vercel

1. Push your code to GitHub
2. In Vercel dashboard → Your Project → Settings → Environment Variables
3. Add: `RESEND_API_KEY` = `your_api_key_here`
4. Redeploy

## That's it! 🎉

Your forms will now send emails to `jssmakeupstudio@gmail.com`

---

**Note**: Currently using `onboarding@resend.dev` as the sender (Resend's test domain). 
For production, verify your own domain in Resend dashboard for better deliverability.

