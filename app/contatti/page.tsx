'use client'
import { useState } from 'react'
import { CheckCircle, Mail, MapPin } from 'lucide-react'

export default function ContattiPage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState({ nome: '', email: '', oggetto: '', messaggio: '' })

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/contatti', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Errore')
      setSubmitted(true)
    } catch {
      setError('Errore nell\'invio. Riprova o scrivi direttamente.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) return (
    <div className="min-h-screen flex items-center justify-center bg-cream-50 pt-20">
      <div className="text-center max-w-lg px-6">
        <CheckCircle className="text-gold mx-auto mb-6" size={56} />
        <h1 className="font-display text-4xl font-medium text-navy-900 mb-4">Messaggio inviato!</h1>
        <p className="font-body text-navy-600 text-lg leading-relaxed">Ti risponderemo entro 24–48 ore.</p>
      </div>
    </div>
  )

  return (
    <>
      <section className="pt-32 pb-12 md:pt-40 md:pb-16 bg-navy-900">
        <div className="container-site">
          <div className="section-label text-gold mb-4">Contatti</div>
          <h1 className="font-display text-5xl md:text-6xl font-light text-cream-50">Scrivici.</h1>
        </div>
      </section>
      <section className="py-16 md:py-24 bg-cream-50">
        <div className="container-site">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2">
              <form onSubmit={submit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="font-body text-sm text-navy-700 block mb-1.5">Nome *</label>
                    <input required value={form.nome} onChange={e => setForm(p => ({ ...p, nome: e.target.value }))} className="w-full border border-cream-300 bg-white px-4 py-3 font-body text-sm text-navy-900 focus:outline-none focus:border-gold" />
                  </div>
                  <div>
                    <label className="font-body text-sm text-navy-700 block mb-1.5">Email *</label>
                    <input required type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} className="w-full border border-cream-300 bg-white px-4 py-3 font-body text-sm text-navy-900 focus:outline-none focus:border-gold" />
                  </div>
                </div>
                <div>
                  <label className="font-body text-sm text-navy-700 block mb-1.5">Oggetto *</label>
                  <input required value={form.oggetto} onChange={e => setForm(p => ({ ...p, oggetto: e.target.value }))} className="w-full border border-cream-300 bg-white px-4 py-3 font-body text-sm text-navy-900 focus:outline-none focus:border-gold" />
                </div>
                <div>
                  <label className="font-body text-sm text-navy-700 block mb-1.5">Messaggio *</label>
                  <textarea required value={form.messaggio} onChange={e => setForm(p => ({ ...p, messaggio: e.target.value }))} rows={6} className="w-full border border-cream-300 bg-white px-4 py-3 font-body text-sm text-navy-900 focus:outline-none focus:border-gold resize-none" />
                </div>
                {error && <p className="text-red-600 text-sm border border-red-200 bg-red-50 px-4 py-3">{error}</p>}
                <button type="submit" disabled={loading} className="btn-gold py-4 px-8">{loading ? 'Invio...' : 'Invia messaggio'}</button>
              </form>
            </div>
            <div className="space-y-6">
              <div className="border border-cream-200 bg-white p-6">
                <div className="flex items-center gap-3 mb-3"><Mail size={18} className="text-gold" /><span className="font-display text-lg font-medium">Email</span></div>
                <a href="mailto:info@viareggio-mon-amour.it" className="font-body text-sm text-gold hover:underline">info@viareggio-mon-amour.it</a>
              </div>
              <div className="border border-cream-200 bg-white p-6">
                <div className="flex items-center gap-3 mb-3"><MapPin size={18} className="text-gold" /><span className="font-display text-lg font-medium">Sede</span></div>
                <p className="font-body text-sm text-navy-600">Comitato Viareggio Mon Amour<br />Viareggio (LU)</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
