import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'tu-clave-secreta'
)

const restrictions: Record<string, string[]> = {
  '/clientes': ['COCINERO', 'CAJERO', 'DELIVERY'],
  '/control-stock': ['CAJERO', 'DELIVERY'],
  '/empleados': ['COCINERO', 'CAJERO', 'DELIVERY'],
  '/estadisticas': ['COCINERO', 'CAJERO', 'DELIVERY'],
  '/insumos': ['CAJERO', 'DELIVERY'],
  '/mi-perfil': ['DELIVERY'],
  '/nueva-compra': ['CAJERO', 'DELIVERY'],
  '/ordenes-diarias': [],
  '/productos': ['CAJERO', 'DELIVERY'],
}

interface JWTPayload {
  sub: string
  authorities: string[]
  iat: number
  exp: number
}

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  try {
    const { payload } = await jwtVerify<JWTPayload>(token, SECRET)

    const authorities = payload.authorities
    const rol = authorities[0]?.replace('ROLE_', '')

    const path = new URL(request.url).pathname

    for (const [route, deniedRoles] of Object.entries(restrictions)) {
      if (path.startsWith(route) && deniedRoles.includes(rol)) {
        return NextResponse.redirect(new URL('/unauthorized', request.url))
      }
    }

    return NextResponse.next()
  } catch (err) {
    console.error('JWT verification failed', err)
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: [
    '/clientes/:path*',
    '/control-stock/:path*',
    '/empleados/:path*',
    '/estadisticas/:path*',
    '/insumos/:path*',
    '/mi-perfil/:path*',
    '/nueva-compra/:path*',
    '/ordenes-diarias/:path*',
    '/productos/:path*',
  ],
}
