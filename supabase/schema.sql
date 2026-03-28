-- ============================================================
-- Viareggio Mon Amour — Database schema
-- Eseguire in: Supabase Dashboard > SQL Editor
-- ============================================================

-- Tabella volontari
CREATE TABLE IF NOT EXISTS public.volontari (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  nome          TEXT NOT NULL,
  cognome       TEXT NOT NULL,
  email         TEXT NOT NULL UNIQUE,
  telefono      TEXT,
  quartiere     TEXT,
  disponibilita TEXT[] NOT NULL DEFAULT '{}',
  messaggio     TEXT,
  confermato    BOOLEAN NOT NULL DEFAULT false
);

-- Tabella contatti
CREATE TABLE IF NOT EXISTS public.contatti (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  nome        TEXT NOT NULL,
  email       TEXT NOT NULL,
  oggetto     TEXT NOT NULL,
  messaggio   TEXT NOT NULL,
  letto       BOOLEAN NOT NULL DEFAULT false
);

-- Tabella newsletter
CREATE TABLE IF NOT EXISTS public.newsletter (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  email       TEXT NOT NULL UNIQUE,
  attivo      BOOLEAN NOT NULL DEFAULT true
);

-- ── Row Level Security ────────────────────────────────────────

ALTER TABLE public.volontari ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contatti ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter ENABLE ROW LEVEL SECURITY;

-- Solo il service_role (API backend) può leggere tutti i record
-- Gli utenti anonimi possono solo inserire

CREATE POLICY "Anon insert volontari" ON public.volontari
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Anon insert contatti" ON public.contatti
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Anon insert newsletter" ON public.newsletter
  FOR INSERT TO anon WITH CHECK (true);

-- Service role ha accesso completo (gestito automaticamente da Supabase)

-- ── Indici ───────────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS volontari_email_idx ON public.volontari (email);
CREATE INDEX IF NOT EXISTS volontari_quartiere_idx ON public.volontari (quartiere);
CREATE INDEX IF NOT EXISTS volontari_confermato_idx ON public.volontari (confermato);
CREATE INDEX IF NOT EXISTS contatti_letto_idx ON public.contatti (letto);
CREATE INDEX IF NOT EXISTS contatti_created_idx ON public.contatti (created_at DESC);

-- ── View per dashboard interna ────────────────────────────────

CREATE OR REPLACE VIEW public.stats_campagna AS
SELECT
  (SELECT COUNT(*) FROM public.volontari) AS totale_volontari,
  (SELECT COUNT(*) FROM public.volontari WHERE confermato = true) AS volontari_confermati,
  (SELECT COUNT(*) FROM public.contatti WHERE letto = false) AS messaggi_non_letti,
  (SELECT COUNT(*) FROM public.newsletter WHERE attivo = true) AS iscritti_newsletter;
