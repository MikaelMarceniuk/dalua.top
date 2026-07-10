import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
  Button,
} from 'react-email'
import tailwindConfig from './tailwind.config'

interface VerifyEmailTemplateProps {
  verificationUrl: string
}

export const VerifyEmailTemplate: React.FC<VerifyEmailTemplateProps> = ({
  verificationUrl,
}) => {
  return (
    <Html>
      <Head />
      <Tailwind config={tailwindConfig}>
        <Body className="bg-white font-sans text-[#212121]">
          <Preview>Dalua.top - Verificação de E-mail</Preview>
          <Container className="mx-auto bg-[#eee] p-5">
            <Section className="bg-white">
              <Section className="px-8.75 py-6.25">
                <Heading className="mb-3.75 text-[20px] font-bold text-[#333]">
                  Verifique seu endereço de e-mail
                </Heading>
                <Text className="mx-0 mt-6 mb-3.5 text-sm leading-6 text-[#333]">
                  Obrigado por iniciar o processo de criação de conta na
                  Dalua.top. Queremos garantir que é realmente você. Por favor,
                  insira o seguinte código de verificação quando solicitado. Se
                  você não tentou criar uma conta, pode ignorar esta mensagem
                  com segurança.
                </Text>

                <Section className="my-6 flex flex-col items-center justify-center text-center">
                  <Button
                    className="box-border w-full rounded-lg bg-[#333] px-3 py-3 text-center font-semibold text-white"
                    href={verificationUrl}
                  >
                    Verificar email
                  </Button>

                  <Text className="m-0 text-[12px] text-muted-foreground">
                    (Este link é válido por 5 minutos)
                  </Text>
                </Section>
              </Section>
              <Hr />
              <Section className="px-8.75 py-6.25">
                <Text className="m-0 text-sm text-[#333]">
                  A Dalua.top nunca enviará e-mails solicitando que você informe
                  ou verifique sua senha, número de cartão de crédito ou dados
                  bancários.
                </Text>
              </Section>
            </Section>
            <Text className="mx-0 my-6 px-5 py-0 text-[12px] text-muted-foreground">
              Esta mensagem foi produzida e distribuída por Dalua.top. © 2026,
              Dalua.top. Todos os direitos reservados.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

// VerifyEmailTemplate.PreviewProps = {
//   verificationUrl: '',
// } satisfies VerifyEmailTemplateProps

export default VerifyEmailTemplate
