import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  const data = await request.json()

  console.log(data)

  cookies().set('theme', data.theme)

  return NextResponse.json({ ok: true })
}
