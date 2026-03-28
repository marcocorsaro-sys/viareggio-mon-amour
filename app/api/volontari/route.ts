import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase'
import { z } from 'zod'

const schema = z.object({
  nome: z.string().min(2),
  cognome: z.string().min(2),
  email: z.string().email(),
  telefono: z.string().optional(),
  quartiere: z.string().optional(),
  disponibilita: z.array(z.string()).min(1),
  messaggio: z.string().optional(),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const data = schema.parse(body)

    const supabase = createAdminClient()

    // Check for duplicate email
    const { data: existing } = await supabase
      .from('volontari')
      .select('id')
      .eq('email', data.email)
      .single()

    if (existing) {
      return NextResponse.json(
        { error: 'Questa email è già registrata.' },
        { status: 409 }
      )
    }

    const { error } = await supabase.from('volontari').insert({
      nome: data.nome,
      cognome: data.cognome,
      email: data.email,
      telefono: data.telefono ?? null,
      quartiere: data.quartiere ?? null,
      disponibilita: data.disponibilita,
      messaggio: data.messaggio ?? null,
    })

    if (error) throw error

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Dati non validi', details: err.errors }, { status: 400 })
    }
    console.error('Volontari API error:', err)
    return NextResponse.json({ error: 'Errore interno' }, { status: 500 })
  }
}
