import Elysia from 'elysia'
import { authPlugin } from '@/plugins/auth.plugin'
import { Role } from '@/types/roles.type'

export const rolePlugin = new Elysia({ name: 'role-guard' })
  .use(authPlugin)
  .macro({
    roles: (allowedRoles: Role | Role[]) => ({
      auth: true,
      resolve: ({ status, user }) => {
        const roles = Array.isArray(allowedRoles)
          ? allowedRoles
          : [allowedRoles]
        const userRole = user.role as Role | undefined

        if (!userRole || !roles.includes(userRole)) {
          return status(403, { message: 'Forbidden: insufficient role' })
        }
      },
    }),
  })
