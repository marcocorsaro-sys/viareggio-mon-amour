# Viareggio Mon Amour — Sito ufficiale campagna

Sito ufficiale della campagna di **Marialina Marcucci** per le elezioni comunali di Viareggio (24–25 maggio 2026).

**Stack:** Next.js 14 · TypeScript · Tailwind CSS · Sanity.io · Supabase · Vercel

---

## Avvio rapido

```bash
npm install
npm run dev          # http://localhost:3000
npm run sanity       # Sanity Studio → http://localhost:3333
```

Le credenziali sono già nel file `.env.local` incluso.

---

## Deploy su Vercel

1. Pusha su GitHub (branch `main`)
2. Importa il repo su **vercel.com** → seleziona `marcocorsaro-sys/viareggio-mon-amour`
3. Le env vars sono già configurate nel progetto Vercel `viareggio-mon-amour`
4. Clicca **Deploy** → sito live in ~3 minuti

**Nota:** usa `next.config.mjs` (non `.ts`) — già corretto in questa versione.

---

## Struttura

```
app/
├── page.tsx                 → Home
├── chi-sono/                → Profilo candidata
├── programma/               → 12 punti programma
├── notizie/                 → Lista + [slug] articolo
├── eventi/                  → Calendario
├── volontari/               → Form iscrizione → Supabase
├── contatti/                → Form contatto → Supabase
├── stampa/                  → Comunicati
├── not-found.tsx
└── api/
    ├── volontari/route.ts   → POST → Supabase
    └── contatti/route.ts    → POST → Supabase

components/
├── Navbar.tsx
└── Footer.tsx

lib/
├── sanity.ts                → Client + urlFor + sanityFetch
├── supabase.ts              → Browser + admin client
├── queries.ts               → GROQ queries
├── types.ts                 → TypeScript types
└── database.types.ts        → Supabase generated types

sanity/schemaTypes/
├── news.ts                  → Schema notizie
└── evento.ts                → Schema eventi + comunicati

supabase/schema.sql          → CREATE TABLE + RLS + indici
```

---

## Servizi configurati

| Servizio | Dettaglio |
|---|---|
| **Sanity** | Project ID: `vvgigrr4` · Dataset: `production` |
| **Supabase** | Project: `kviwyswvmygxkngfssqz` · Region: eu-west-2 |
| **Vercel** | Team: `marco-corsaros-projects` |
| **GitHub** | `marcocorsaro-sys/viareggio-mon-amour` |

---

## Aggiungere contenuti

**Notizie ed eventi** → Studio Sanity: `npm run sanity` oppure dopo il deploy su `tuodominio/studio`

**Volontari iscritti** → Dashboard Supabase → Table Editor → tabella `volontari`
