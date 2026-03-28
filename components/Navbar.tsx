'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/chi-sono', label: 'Chi sono' },
  { href: '/programma', label: 'Programma' },
  { href: '/notizie', label: 'Notizie' },
  { href: '/eventi', label: 'Eventi' },
  { href: '/stampa', label: 'Stampa' },
]

export function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-cream-50/95 backdrop-blur-sm border-b border-cream-300 shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container-site flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link href="/" className="flex flex-col leading-tight group">
          <span className="font-display text-xl font-500 text-navy-900 group-hover:text-gold transition-colors">
            Marialina Marcucci
          </span>
          <span className="font-body text-xs tracking-[0.15em] uppercase text-gold">
            Viareggio Mon Amour
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link transition-all ${
                pathname === link.href
                  ? 'text-navy-900 border-b border-gold'
                  : ''
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/volontari" className="btn-gold text-sm py-2.5 px-5">
            Diventa volontario
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-navy-800"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Chiudi menu' : 'Apri menu'}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 bg-cream-50 border-t border-cream-200 ${
          open ? 'max-h-screen' : 'max-h-0'
        }`}
      >
        <nav className="container-site py-6 flex flex-col gap-5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`font-body text-base ${
                pathname === link.href ? 'text-navy-900 font-500' : 'text-navy-600'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/volontari"
            onClick={() => setOpen(false)}
            className="btn-gold mt-2 justify-center"
          >
            Diventa volontario
          </Link>
        </nav>
      </div>
    </header>
  )
}
