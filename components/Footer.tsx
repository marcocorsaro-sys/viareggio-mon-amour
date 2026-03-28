import Link from 'next/link'

const footerLinks = {
  campagna: [
    { href: '/chi-sono', label: 'Chi sono' },
    { href: '/programma', label: 'Programma' },
    { href: '/notizie', label: 'Notizie' },
    { href: '/eventi', label: 'Calendario eventi' },
  ],
  partecipa: [
    { href: '/volontari', label: 'Diventa volontario' },
    { href: '/contatti', label: 'Contatti' },
    { href: '/stampa', label: 'Area stampa' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-navy-900 text-cream-200">
      <div className="container-site py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div>
            <div className="font-display text-2xl text-cream-100 mb-1">Marialina Marcucci</div>
            <div className="font-body text-xs tracking-[0.2em] uppercase text-gold mb-4">
              Viareggio Mon Amour
            </div>
            <p className="font-body text-sm text-cream-300 leading-relaxed max-w-xs">
              Lista civica per le elezioni comunali di Viareggio del 24–25 maggio 2026.
            </p>
          </div>

          {/* Links */}
          <div>
            <div className="section-label text-gold mb-5">Campagna</div>
            <ul className="space-y-3">
              {footerLinks.campagna.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="font-body text-sm text-cream-300 hover:text-cream-100 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="section-label text-gold mb-5">Partecipa</div>
            <ul className="space-y-3">
              {footerLinks.partecipa.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="font-body text-sm text-cream-300 hover:text-cream-100 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-navy-700 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="font-body text-xs text-navy-400">
            © 2026 Comitato elettorale "Viareggio Mon Amour" — Tutti i diritti riservati.
          </p>
          <p className="font-body text-xs text-navy-400">
            Elezioni comunali Viareggio · 24–25 maggio 2026
          </p>
        </div>
      </div>
    </footer>
  )
}
