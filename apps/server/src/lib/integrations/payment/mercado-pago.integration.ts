import { ApiKeyIntegrationProvider } from '../interfaces/api-key-provider.interface'
import axios, { AxiosError } from 'axios'

export const mercadoPagoProvider: ApiKeyIntegrationProvider = {
  provider: 'mercado_pago',

  validateCredentials: async (credentials) => {
    const accessToken = credentials['access_token']

    if (!accessToken) {
      return { isValid: false, error: 'access_token is required' }
    }

    try {
      await axios.get('https://api.mercadopago.com/users/me', {
        headers: { Authorization: `Bearer ${accessToken}` },
      })

      return { isValid: true }
    } catch (e) {
      if (e instanceof AxiosError) {
        return { isValid: false, error: e.message }
      }
      return { isValid: false, error: 'An unknown error occurred' }
    }
  },
}
