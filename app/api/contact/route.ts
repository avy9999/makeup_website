import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { name, email, phone, subject, message, recaptchaToken } = body

        // Verify reCAPTCHA
        if (!recaptchaToken) {
            return NextResponse.json(
                { error: 'reCAPTCHA verification required' },
                { status: 400 }
            )
        }

        const recaptchaResponse = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`, {
            method: 'POST',
        })

        const recaptchaData = await recaptchaResponse.json()

        if (!recaptchaData.success) {
            return NextResponse.json(
                { error: 'reCAPTCHA verification failed' },
                { status: 400 }
            )
        }

        // Validate required fields
        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            )
        }

        // Here you can integrate with an email service
        // Option 1: Send email using your email service (Resend, SendGrid, etc.)
        // Option 2: Store in a database
        // Option 3: Send to a webhook/third-party service

        // For now, we'll log it and you can configure email sending
        console.log('Contact Form Submission:', {
            name,
            email,
            phone,
            subject,
            message,
            timestamp: new Date().toISOString(),
        })


        const resend = new Resend(process.env.RESEND_API_KEY)

        await resend.emails.send({
            from: 'onboarding@resend.dev', // Use Resend's test domain, or your verified domain
            to: 'jssmakeupstudio@gmail.com',
            subject: `Contact Form: ${subject}`,
            html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
        })


        return NextResponse.json(
            { message: 'Message sent successfully' },
            { status: 200 }
        )
    } catch (error) {
        console.error('Error processing contact form:', error)
        return NextResponse.json(
            { error: 'Failed to send message' },
            { status: 500 }
        )
    }
}

