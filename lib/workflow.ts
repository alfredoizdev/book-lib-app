import { Client as WorkflowClient } from '@upstash/workflow'
import { Client as QStashClient, resend } from '@upstash/qstash'
import config from '@/lib/config'

export const workflowClient = new WorkflowClient({
  baseUrl: config.env.upsthash.qstahsUrl,
  token: config.env.upsthash.qstahsToken,
})

const qstashClient = new QStashClient({
  token: config.env.upsthash.qstahsToken,
})

export const sendEmail = async ({
  email,
  subject,
  message,
}: {
  email: string
  subject: string
  message: string
}) => {
  try {
    await qstashClient.publishJSON({
      api: {
        name: 'email',
        provider: resend({ token: config.env.resendToken }),
      },
      body: {
        from: 'Alfredo dev <contact@alfredodev.pro>',
        to: [email],
        subject,
        html: message,
      },
    })
    console.log('Email sent successfully')
  } catch (error) {
    console.error('Error sending email:', error)
    throw new Error('Failed to send email') // Puedes personalizar este mensaje
  }
}
