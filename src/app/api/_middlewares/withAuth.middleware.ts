import { auth } from '@/server/auth'
import { NextRequest, NextResponse } from 'next/server'

type Session = NonNullable<Awaited<ReturnType<typeof auth.api.getSession>>>

type AuthedHandler = (
  request: NextRequest,
  auth: { user: Session['user']; session: Session['session'] }
) => Promise<NextResponse>

export const withAuth = (handler: AuthedHandler) => {
  return async (req: NextRequest) => {
    const session = await auth.api.getSession({
      headers: req.headers,
    })

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    return handler(req, {
      user: session.user,
      session: session.session,
    })
  }
}
