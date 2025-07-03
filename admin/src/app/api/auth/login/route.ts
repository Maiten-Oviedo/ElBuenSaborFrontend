import { cookies } from 'next/headers'

export async function POST(req: Request) {
  const { email, password, tipoLogin } = await req.json()

  const response = await fetch('http://localhost:8080/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, tipoLogin }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    return new Response(errorText || 'Credenciales inválidas', {
      status: response.status,
    })
  }

  const data = await response.json()
  const token = data.token
  const user = data.user

  if (!token || !user) {
    return new Response('Credenciales inválidas', { status: 401 })
  }
  
  //set de Cookie
  (await cookies()).set('token', token, {
    httpOnly: true,
    secure: false,            // solo true en producción con HTTPS
    path: '/',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24,    // 1 día
  })

  // Devolver solo el usuario
  return Response.json({ user })
}
