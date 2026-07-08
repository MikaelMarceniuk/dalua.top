export type PaymentCreatedBody = {
  action: 'payment.created' | 'payment.updated'
  api_version: 'v1'
  data: {
    id: string
  }
  date_created: string
  id: number
  live_mode: boolean
  type: 'payment'
  user_id: string
}
