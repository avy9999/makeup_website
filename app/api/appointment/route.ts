import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { name, email, phone, service, customService, date, time, message, recaptchaToken } = body

        // Check if required environment variables are set
        if (!process.env.RESEND_API_KEY) {
            console.error('RESEND_API_KEY environment variable is not set')
            return NextResponse.json(
                { error: 'Email service not configured. Please contact administrator.' },
                { status: 500 }
            )
        }

        // Verify reCAPTCHA
        if (!recaptchaToken) {
            return NextResponse.json(
                { error: 'reCAPTCHA verification required' },
                { status: 400 }
            )
        }

        if (!process.env.RECAPTCHA_SECRET_KEY) {
            console.error('RECAPTCHA_SECRET_KEY environment variable is not set')
            return NextResponse.json(
                { error: 'reCAPTCHA service not configured. Please contact administrator.' },
                { status: 500 }
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
        if (!name || !email || !phone || !service || !date || !time) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            )
        }

        // Validate custom service if External is selected
        if (service === 'External' && !customService) {
            return NextResponse.json(
                { error: 'Please specify the service you need' },
                { status: 400 }
            )
        }

        // Here you can integrate with an email service
        // Option 1: Send email using your email service (Resend, SendGrid, etc.)
        // Option 2: Store in a database
        // Option 3: Send to a webhook/third-party service

        // Log the submission for debugging
        const serviceName = service === 'External' ? customService : service

        console.log('Appointment Request:', {
            name,
            email,
            phone,
            service: serviceName,
            date,
            time,
            message,
            timestamp: new Date().toISOString(),
        })

        // Send email using Resend
        try {
            const resend = new Resend(process.env.RESEND_API_KEY)

            await resend.emails.send({
                from: 'onboarding@resend.dev', // Use Resend's test domain, or your verified domain
                to: 'jssmakeupstudio@gmail.com',
                subject: `New Appointment Request - ${serviceName}`,
                html: `
        <h2>New Appointment Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Service:</strong> ${serviceName}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time:</strong> ${time}</p>
        <p><strong>Additional Notes:</strong> ${message || 'None'}</p>
      `,
            })
        } catch (emailError) {
            console.error('Failed to send email:', emailError)
            // Return success anyway since we logged the submission
            return NextResponse.json(
                { message: 'Appointment request received but email delivery failed. Please try again later or contact us directly.' },
                { status: 200 }
            )
        }

        return NextResponse.json(
            { message: 'Appointment request submitted successfully' },
            { status: 200 }
        )
    } catch (error) {
        console.error('Error processing appointment request:', error)
        return NextResponse.json(
            { error: 'Failed to submit appointment request' },
            { status: 500 }
        )
    }
}

