import { render } from '@react-email/render'
import VerifyEmailTemplate from './templates/verify-emails.template'
import { resend } from '../provider/resend.provider'

type SendVerificationEmailParams = {
  to: string
  verificationUrl: string
}

export const sendVerificationEmail = async ({
  to,
  verificationUrl,
}: SendVerificationEmailParams) => {
  const html = await render(
    <VerifyEmailTemplate verificationUrl={verificationUrl} />,
  )

  const { data, error } = await resend.emails.send({
    from: 'Noreply <noreply@mmarceniuk.dev>',
    to,
    subject: 'Verifique seu endereço de e-mail',
    html,
  })

  if (error) throw new Error(error.message)
  return data
}
