'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CheckCircle, Users, Clock, MapPin } from 'lucide-react'

const schema = z.object({
  nome: z.string().min(2, 'Inserisci il tuo nome'),
  cognome: z.string().min(2, 'Inserisci il tuo cognome'),
  email: z.string().email('Email non valida'),
  telefono: z.string().optional(),
  quartiere: z.string().optional(),
  disponibilita: z.array(z.string()).min(1, 'Seleziona almeno una disponibilità'),
  messaggio: z.string().optional(),
})

type FormData = z.infer<typeof schema>

const disponibilitaOptions = [
  { value: 'porta_a_porta', label: 'Porta a porta' },
  { value: 'eventi', label: 'Presidio eventi' },
  { value: 'social', label: 'Social media' },
  { value: 'logistica', label: 'Logistica e trasporti' },
  { value: 'giorno_voto', label: 'Giorno del voto' },
]

const quartieriOptions = [
  'Centro storico', 'Lungomare', 'Migliarina', 'Darsena', 'Porto',
  'Marco Polo / Varignano', 'Bicchio', 'Terminetto', 'Torre del Lago',
]

const benefits = [
  { icon: Users, title: 'Fai parte di qualcosa di vero', desc: 'Una campagna civica costruita dai cittadini, non dai partiti.' },
  { icon: MapPin, title: 'Lavora nel tuo quartiere', desc: 'Ogni volontario opera nella zona che conosce meglio.' },
  { icon: Clock, title: 'Quando puoi, quanto puoi', desc: 'Scegli tu i giorni e le attività che ti si addicono.' },
]

export default function VolontariPage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { disponibilita: [] },
  })

  const selectedDisponibilita = watch('disponibilita') ?? []

  const toggleDisponibilita = (value: string) => {
    const current = selectedDisponibilita
    if (current.includes(value)) {
      setValue('disponibilita', current.filter(v => v !== value))
    } else {
      setValue('disponibilita', [...current, value])
    }
  }

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/volontari', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Errore nell\'invio')
      setSubmitted(true)
    } catch {
      setError('Si è verificato un errore. Riprova o contattaci direttamente.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream-50 pt-20">
        <div className="text-center max-w-lg px-6">
          <CheckCircle className="text-gold mx-auto mb-6" size={56} />
          <h1 className="font-display text-4xl font-400 text-navy-900 mb-4">Grazie!</h1>
          <p className="font-body text-navy-600 text-lg leading-relaxed">
            La tua iscrizione è stata ricevuta. Ti contatteremo entro 24–48 ore
            con tutte le informazioni per iniziare. Viareggio Mon Amour.
          </p>
        </div>
      </div>
    )
  }

  return (
    <>
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-navy-900">
        <div className="container-site">
          <div className="section-label text-gold mb-4">Partecipa</div>
          <h1 className="font-display text-5xl md:text-6xl font-300 text-cream-50 max-w-2xl leading-tight">
            Diventa volontario.<br />
            <em className="text-gold not-italic">Viareggio ha bisogno di te.</em>
          </h1>
        </div>
      </section>

      <section className="py-16 bg-cream-100 border-b border-cream-200">
        <div className="container-site grid md:grid-cols-3 gap-8">
          {benefits.map((b) => (
            <div key={b.title} className="flex gap-5">
              <b.icon className="text-gold shrink-0 mt-1" size={24} />
              <div>
                <h3 className="font-display text-lg font-500 text-navy-900 mb-1">{b.title}</h3>
                <p className="font-body text-sm text-navy-600">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 md:py-28 bg-cream-50">
        <div className="container-site max-w-2xl">
          <h2 className="font-display text-3xl font-400 text-navy-900 mb-2">Iscriviti</h2>
          <div className="divider-gold" />

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-8">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="font-body text-sm text-navy-700 block mb-1.5">Nome *</label>
                <input {...register('nome')} className="w-full border border-cream-300 bg-white px-4 py-3 font-body text-sm text-navy-900 focus:outline-none focus:border-gold transition-colors" />
                {errors.nome && <p className="text-red-600 text-xs mt-1">{errors.nome.message}</p>}
              </div>
              <div>
                <label className="font-body text-sm text-navy-700 block mb-1.5">Cognome *</label>
                <input {...register('cognome')} className="w-full border border-cream-300 bg-white px-4 py-3 font-body text-sm text-navy-900 focus:outline-none focus:border-gold transition-colors" />
                {errors.cognome && <p className="text-red-600 text-xs mt-1">{errors.cognome.message}</p>}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="font-body text-sm text-navy-700 block mb-1.5">Email *</label>
                <input {...register('email')} type="email" className="w-full border border-cream-300 bg-white px-4 py-3 font-body text-sm text-navy-900 focus:outline-none focus:border-gold transition-colors" />
                {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <label className="font-body text-sm text-navy-700 block mb-1.5">Telefono</label>
                <input {...register('telefono')} type="tel" className="w-full border border-cream-300 bg-white px-4 py-3 font-body text-sm text-navy-900 focus:outline-none focus:border-gold transition-colors" />
              </div>
            </div>

            <div>
              <label className="font-body text-sm text-navy-700 block mb-1.5">Quartiere di residenza</label>
              <select {...register('quartiere')} className="w-full border border-cream-300 bg-white px-4 py-3 font-body text-sm text-navy-900 focus:outline-none focus:border-gold transition-colors">
                <option value="">Seleziona...</option>
                {quartieriOptions.map(q => <option key={q} value={q}>{q}</option>)}
              </select>
            </div>

            <div>
              <label className="font-body text-sm text-navy-700 block mb-3">Disponibilità * (seleziona tutto ciò che ti interessa)</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {disponibilitaOptions.map(opt => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => toggleDisponibilita(opt.value)}
                    className={`px-4 py-2.5 text-sm font-body border transition-colors text-left ${
                      selectedDisponibilita.includes(opt.value)
                        ? 'border-gold bg-gold/10 text-navy-900'
                        : 'border-cream-300 bg-white text-navy-600 hover:border-gold'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              {errors.disponibilita && <p className="text-red-600 text-xs mt-1">{errors.disponibilita.message}</p>}
            </div>

            <div>
              <label className="font-body text-sm text-navy-700 block mb-1.5">Messaggio (opzionale)</label>
              <textarea {...register('messaggio')} rows={4} className="w-full border border-cream-300 bg-white px-4 py-3 font-body text-sm text-navy-900 focus:outline-none focus:border-gold transition-colors resize-none" placeholder="Hai competenze specifiche? Vuoi dirci qualcosa?" />
            </div>

            {error && <p className="text-red-600 text-sm border border-red-200 bg-red-50 px-4 py-3">{error}</p>}

            <button type="submit" disabled={loading} className="btn-gold w-full justify-center py-4">
              {loading ? 'Invio in corso...' : 'Iscrivimi come volontario'}
            </button>
          </form>
        </div>
      </section>
    </>
  )
}
