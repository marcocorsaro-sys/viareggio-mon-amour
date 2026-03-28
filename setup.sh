#!/usr/bin/env bash
# =============================================================
# setup.sh — Viareggio Mon Amour · Deploy automatico completo
# Esegui: chmod +x setup.sh && ./setup.sh
# =============================================================
set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

log()  { echo -e "${GREEN}✓ $1${NC}"; }
warn() { echo -e "${YELLOW}⚠ $1${NC}"; }
err()  { echo -e "${RED}✗ $1${NC}"; exit 1; }
ask()  { echo -e "${YELLOW}→ $1${NC}"; read -r REPLY; echo "$REPLY"; }

echo ""
echo "╔══════════════════════════════════════════════════════╗"
echo "║   Viareggio Mon Amour — Setup automatico            ║"
echo "║   GitHub · Vercel · Sanity · Supabase               ║"
echo "╚══════════════════════════════════════════════════════╝"
echo ""

# ── PREREQUISITI ─────────────────────────────────────────────
command -v node >/dev/null || err "Node.js non trovato. Installa da https://nodejs.org"
command -v npm  >/dev/null || err "npm non trovato."
command -v git  >/dev/null || err "git non trovato."

NODE_VER=$(node -v | cut -d. -f1 | tr -d v)
[ "$NODE_VER" -ge 18 ] || err "Node.js 18+ richiesto (hai $(node -v))"

log "Prerequisiti OK (Node $(node -v), npm $(npm -v), git $(git --version | awk '{print $3}'))"

# ── GITHUB CLI ────────────────────────────────────────────────
if ! command -v gh &>/dev/null; then
  warn "GitHub CLI (gh) non trovato."
  echo "  Installa da: https://cli.github.com"
  echo "  macOS:  brew install gh"
  echo "  Ubuntu: sudo apt install gh"
  echo ""
  warn "Premo INVIO per continuare senza GitHub CLI (push manuale)..."
  read -r
  SKIP_GH=true
else
  log "GitHub CLI trovato: $(gh --version | head -1)"
  SKIP_GH=false
fi

# ── CARTELLA PROGETTO ─────────────────────────────────────────
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

if [ ! -f "package.json" ]; then
  err "Esegui questo script dalla root del progetto (dove c'è package.json)"
fi
log "Cartella progetto: $SCRIPT_DIR"

# ── INSTALLA DIPENDENZE ───────────────────────────────────────
echo ""
echo "📦 Installazione dipendenze npm..."
npm install
log "npm install completato"

# ── GIT SETUP ────────────────────────────────────────────────
echo ""
echo "🔧 Configurazione Git..."

if [ ! -d ".git" ]; then
  git init
  git branch -m main
fi

git add -A
git diff --cached --quiet || git commit -m "feat: initial project setup" 2>/dev/null || true
log "Repository git pronto (branch: main)"

# ── GITHUB REPO ───────────────────────────────────────────────
echo ""
echo "🐙 GitHub Repository..."

if [ "$SKIP_GH" = false ]; then
  # Check GitHub auth
  if ! gh auth status &>/dev/null; then
    echo ""
    warn "Non sei autenticato con GitHub CLI."
    echo "Esegui: gh auth login"
    echo "Poi riesegui questo script."
    exit 1
  fi

  GH_USER=$(gh api user --jq .login)
  log "GitHub user: $GH_USER"

  REPO_NAME="viareggio-mon-amour"
  REPO_FULL="$GH_USER/$REPO_NAME"

  # Check if repo already exists
  if gh repo view "$REPO_FULL" &>/dev/null 2>&1; then
    warn "Il repo $REPO_FULL esiste già."
    REMOTE_URL="https://github.com/$REPO_FULL.git"
  else
    echo "Creo il repository GitHub privato..."
    gh repo create "$REPO_NAME" \
      --private \
      --description "Sito ufficiale campagna Marialina Marcucci — Sindaca di Viareggio 2026" \
      --source=. \
      --remote=origin \
      --push
    REMOTE_URL="https://github.com/$REPO_FULL.git"
    log "Repository creato: https://github.com/$REPO_FULL"
  fi

  # Push
  git remote set-url origin "$REMOTE_URL" 2>/dev/null || git remote add origin "$REMOTE_URL"
  git push -u origin main --force
  log "Codice pushato su GitHub: https://github.com/$REPO_FULL"

  GITHUB_URL="https://github.com/$REPO_FULL"
else
  echo ""
  warn "Crea manualmente il repo su https://github.com/new"
  echo "Poi esegui:"
  echo "  git remote add origin https://github.com/TUO_USERNAME/viareggio-mon-amour.git"
  echo "  git push -u origin main"
  GITHUB_URL="https://github.com/TUO_USERNAME/viareggio-mon-amour"
fi

# ── VERCEL CLI ────────────────────────────────────────────────
echo ""
echo "▲ Vercel Deploy..."

if ! command -v vercel &>/dev/null; then
  echo "Installo Vercel CLI..."
  npm install -g vercel
fi
log "Vercel CLI: $(vercel --version)"

echo ""
warn "Per fare il deploy su Vercel devi autenticarti:"
echo "  vercel login"
echo ""
echo "Poi esegui il deploy con:"
echo "  vercel --prod"
echo ""
echo "Oppure collega il progetto via Dashboard:"
echo "  https://vercel.com/new"

# ── SANITY ────────────────────────────────────────────────────
echo ""
echo "🟢 Sanity CMS..."

if ! command -v sanity &>/dev/null; then
  echo "Installo Sanity CLI..."
  npm install -g sanity@latest
fi

echo ""
warn "Crea il progetto Sanity su https://sanity.io/manage"
echo "Poi copia il projectId nel file .env.local:"
echo "  NEXT_PUBLIC_SANITY_PROJECT_ID=il_tuo_project_id"
echo ""
echo "Crea un token API (read) su sanity.io/manage → API → Tokens:"
echo "  SANITY_API_TOKEN=il_tuo_token"

# ── SUPABASE ──────────────────────────────────────────────────
echo ""
echo "⚡ Supabase..."

echo ""
warn "1. Crea un progetto su https://app.supabase.com"
echo "2. Vai su SQL Editor ed esegui: supabase/schema.sql"
echo "3. Copia le credenziali in .env.local:"
echo "   NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co"
echo "   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ..."
echo "   SUPABASE_SERVICE_ROLE_KEY=eyJ..."

# ── .ENV.LOCAL ────────────────────────────────────────────────
echo ""
echo "📄 File .env.local..."

if [ ! -f ".env.local" ]; then
  cp .env.example .env.local
  log "Creato .env.local da .env.example"
  warn "Apri .env.local e compila tutte le variabili prima di fare il deploy."
else
  warn ".env.local già esiste — verificane il contenuto."
fi

# ── SUMMARY ───────────────────────────────────────────────────
echo ""
echo "╔══════════════════════════════════════════════════════╗"
echo "║   Setup completato! Prossimi passi:                 ║"
echo "╚══════════════════════════════════════════════════════╝"
echo ""
[ "$SKIP_GH" = false ] && echo "  ✓ GitHub: $GITHUB_URL"
echo "  → Configura .env.local con le credenziali"
echo "  → Crea progetto Sanity: https://sanity.io/manage"
echo "  → Crea progetto Supabase: https://app.supabase.com"
echo "  → Esegui schema SQL: supabase/schema.sql"
echo "  → Deploy: vercel --prod"
echo ""
echo "  Documentazione completa: README.md"
echo ""
