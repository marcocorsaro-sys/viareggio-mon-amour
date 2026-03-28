import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase'
import { z } from 'zod'

const schema = z.object({
  nome: z.string().min(2),
  email: z.string().email(),
  oggetto: z.string().min(3),
  messaggio: z.string().min(10),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const data = schema.parse(body)

    const supabase = createAdminClient()

    const { error } = await supabase.from('contatti').insert({
      nome: data.nome,
      email: data.email,
      oggetto: data.oggetto,
      messaggio: data.messaggio,
    })

    if (error) throw error

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Dati non validi' }, { status: 400 })
    }
    console.error('Contatti API error:', err)
    return NextResponse.json({ error: 'Errore interno' }, { status: 500 })
  }
}
