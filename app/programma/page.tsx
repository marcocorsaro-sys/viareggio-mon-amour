import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Il Programma',
  description: '12 punti concreti con azioni, tempi e coperture verificabili. Il programma di Marialina Marcucci per Viareggio.',
}

const areaColors: Record<string, string> = {
  infrastrutture: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  economia: 'bg-amber-50 text-amber-800 border-amber-200',
  cultura: 'bg-purple-50 text-purple-800 border-purple-200',
  sociale: 'bg-red-50 text-red-800 border-red-200',
  governance: 'bg-blue-50 text-blue-800 border-blue-200',
  ambiente: 'bg-green-50 text-green-800 border-green-200',
}

const points = [
  {
    num: '01', area: 'infrastrutture', title: 'Manutenzione ordinaria: prima i problemi reali',
    intro: 'Prima di parlare di grandi opere, Viareggio ha bisogno che funzioni quello che già esiste. Marciapiedi rotti, illuminazione carente, verde abbandonato.',
    azioni: [
      { testo: 'Piano di ricognizione quartiere per quartiere', tempo: 'entro 60 gg' },
      { testo: 'Fondo manutenzione con rendiconto trimestrale online', tempo: 'entro 6 mesi' },
      { testo: 'App di segnalazione civica con risposta in 15 giorni', tempo: 'entro 1 anno' },
    ],
    perche: '10 anni di gestione della Fondazione Carnevale: sa cosa vuol dire manutenere un patrimonio pubblico.',
  },
  {
    num: '02', area: 'economia', title: 'Porto e nautica: il distretto che può crescere',
    intro: '180 imprese, 2.105 addetti in provincia. Il porto di Viareggio è uno dei distretti nautici più importanti d\'Italia.',
    azioni: [
      { testo: 'Tavolo permanente porto-comune con verbali pubblici', tempo: 'entro 90 gg' },
      { testo: 'Piano concessioni pluriennali certe', tempo: 'entro 1 anno' },
      { testo: 'Riqualificazione area alaggio con fondi PNRR', tempo: 'entro 2 anni' },
    ],
    perche: 'Ex Vicepresidente di Regione: conosce i meccanismi di finanziamento europeo e sa dove trovare le risorse.',
  },
  {
    num: '03', area: 'cultura', title: 'Carnevale: identità, lavoro e futuro',
    intro: 'Il Carnevale non è una festa — è un\'industria che muove milioni di euro e dà lavoro a centinaia di famiglie.',
    azioni: [
      { testo: 'Piano triennale Fondazione con obiettivi di sostenibilità', tempo: 'entro 6 mesi' },
      { testo: 'Accesso stabile ai fondi europei Creative Europe', tempo: 'entro 1 anno' },
      { testo: 'Contratti dignitosi per le maestranze stagionali', tempo: 'entro 1 anno' },
    ],
    perche: '10 anni di presidenza della Fondazione. Conosce ogni contratto, ogni fornitore, ogni problema strutturale.',
  },
  {
    num: '04', area: 'economia', title: 'Turismo: destagionalizzare per vivere tutto l\'anno',
    intro: 'Viareggio vive di estate e fatica il resto dell\'anno. La risposta richiede una strategia di prodotto, non solo eventi.',
    azioni: [
      { testo: 'Strategia turistica annuale su 12 mesi', tempo: 'entro 1 anno' },
      { testo: 'Accordo con tour operator internazionali', tempo: 'entro 2 anni' },
      { testo: 'Incentivi per imprese che prolungano la stagione', tempo: 'entro 1 anno' },
    ],
    perche: 'Ha portato il Carnevale sui media internazionali per 10 anni. Sa costruire un prodotto turistico.',
  },
  {
    num: '05', area: 'sociale', title: 'Anziani e famiglie: nessuno lasciato indietro',
    intro: 'Viareggio ha una popolazione che invecchia. La coesione sociale è la condizione per far funzionare tutto il resto.',
    azioni: [
      { testo: 'Sportello unico per anziani soli', tempo: 'entro 6 mesi' },
      { testo: 'Potenziamento asili nido comunali', tempo: 'entro 2 anni' },
      { testo: 'Tariffe ISEE per servizi culturali e sportivi', tempo: 'entro 1 anno' },
    ],
    perche: 'La visione di sindaca "di tutti" nasce concretamente da qui. È il filo conduttore del tour nei quartieri.',
  },
  {
    num: '06', area: 'economia', title: 'Giovani e lavoro: restare a Viareggio deve convenire',
    intro: 'Troppi giovani viareggini vanno via. La disoccupazione giovanile era al 33,6% nel 2011: un problema strutturale.',
    azioni: [
      { testo: 'Programma "Rimani a Viareggio" per under 35', tempo: 'entro 1 anno' },
      { testo: 'Accordo con ITS Academy nautica e turismo', tempo: 'entro 1 anno' },
      { testo: 'Affitti calmierati per under 35', tempo: 'entro 2 anni' },
    ],
    perche: 'Imprenditrice: sa cosa cercano le aziende e cosa frena le assunzioni.',
  },
  {
    num: '07', area: 'infrastrutture', title: 'Mobilità e traffico: l\'asse di penetrazione e oltre',
    intro: 'Il traffico è il tema che unisce tutti i viareggini. Richiede decisioni coraggiose, non rinvii.',
    azioni: [
      { testo: 'Posizione chiara sull\'asse di penetrazione (tracciato sud stadio)', tempo: 'entro 6 mesi' },
      { testo: 'Parcheggi di attestamento con navette elettriche', tempo: 'entro 2 anni' },
      { testo: 'Potenziamento collegamento Torre del Lago', tempo: 'entro 1 anno' },
    ],
    perche: 'L\'unica candidata ad aver preso posizione pubblica con una proposta tecnica specifica.',
  },
  {
    num: '08', area: 'ambiente', title: 'Ambiente e spiagge: il patrimonio da proteggere',
    intro: 'Il mare e la spiaggia sono il capitale principale di Viareggio. L\'erosione costiera è misurata dall\'ISPRA come problema critico.',
    azioni: [
      { testo: 'Piano anti-erosione costiera con Regione e Capitaneria', tempo: 'entro 2 anni' },
      { testo: 'Balneazione libera qualificata', tempo: 'entro 1 anno' },
      { testo: '500 alberi in 3 anni nelle zone periferiche', tempo: 'entro 3 anni' },
    ],
    perche: 'Tema trasversale: tocca balneatori, residenti e giovani. Unisce tutti i potenziali elettori.',
  },
  {
    num: '09', area: 'sociale', title: 'Sicurezza e decoro: vivere bene anche di notte',
    intro: 'La sicurezza emerge in ogni quartiere periferico. Si risponde con presidio, luce e spazi pubblici vivi.',
    azioni: [
      { testo: 'Potenziamento Polizia Municipale con concorso pubblico', tempo: 'entro 18 mesi' },
      { testo: 'Piano illuminazione zone critiche', tempo: 'entro 1 anno' },
      { testo: 'Riqualificazione aree degradate', tempo: 'entro 2 anni' },
    ],
    perche: 'Ha ascoltato questo tema in ogni quartiere, senza tabù ideologici. Propone risposte, non slogan.',
  },
  {
    num: '10', area: 'governance', title: 'Trasparenza e partecipazione: il comune aperto',
    intro: 'Una sindaca civica ha un dovere in più: rendere conto ai cittadini in modo diretto e continuo.',
    azioni: [
      { testo: 'Rapporto trimestrale pubblico dal primo mese', tempo: 'dal giorno 1' },
      { testo: 'Bilancio partecipato (min. 2% del bilancio)', tempo: 'entro 1 anno' },
      { testo: 'Agenda pubblica della sindaca online', tempo: 'dal giorno 1' },
    ],
    perche: 'La promessa "non rispondo ai partiti" ha senso solo se è verificabile. Questo è la prova concreta.',
  },
  {
    num: '11', area: 'infrastrutture', title: 'Torre del Lago e frazioni: nessun angolo dimenticato',
    intro: 'Le frazioni si sentono periferia. Marialina è già andata due volte a Torre del Lago durante il tour.',
    azioni: [
      { testo: 'Delegato di frazione con budget dedicato', tempo: 'entro 90 gg' },
      { testo: 'Min. 20% bilancio infrastrutturale per le frazioni', tempo: 'entro 1 anno' },
      { testo: 'Festival Puccini: piano di valorizzazione internazionale', tempo: 'entro 2 anni' },
    ],
    perche: 'I voti delle frazioni possono essere decisivi in una corsa a quattro candidate.',
  },
  {
    num: '12', area: 'governance', title: 'Bilancio e risorse: dove troviamo i soldi',
    intro: 'Un programma senza copertura è una lista di desideri. Ogni punto ha una fonte finanziaria identificata.',
    azioni: [
      { testo: 'Ricognizione fondi PNRR non utilizzati dal Comune', tempo: 'entro 30 gg' },
      { testo: 'Ufficio europrogettazione potenziato', tempo: 'entro 6 mesi' },
      { testo: 'Audit spese correnti per identificare sprechi', tempo: 'entro 60 gg' },
    ],
    perche: 'Ha gestito bilanci pubblici in Regione e bilanci misti alla Fondazione. Sa la differenza tra un bando attivabile e uno inaccessibile.',
  },
]

export default function ProgrammaPage() {
  return (
    <>
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-navy-900">
        <div className="container-site">
          <div className="section-label text-gold mb-4">Il programma</div>
          <h1 className="font-display text-5xl md:text-7xl font-300 text-cream-50 max-w-3xl leading-tight mb-6">
            12 punti concreti.<br />
            <em className="text-gold not-italic">Con tempi reali.</em>
          </h1>
          <p className="font-body text-cream-300 text-lg max-w-2xl leading-relaxed">
            Ogni punto ha azioni specifiche, tempistiche dichiarate e una fonte finanziaria identificata.
            Un programma senza copertura è una lista di desideri.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-cream-50">
        <div className="container-site">
          <div className="space-y-6">
            {points.map((p) => (
              <details key={p.num} className="group border border-cream-300 bg-white open:border-gold transition-colors">
                <summary className="flex items-center gap-6 px-8 py-6 cursor-pointer list-none hover:bg-cream-50 transition-colors">
                  <span className="font-display text-4xl font-300 text-cream-300 group-open:text-gold transition-colors min-w-[56px]">
                    {p.num}
                  </span>
                  <div className="flex-1 min-w-0">
                    <span className={`inline-block text-xs font-body font-500 px-2.5 py-0.5 border rounded mb-2 ${areaColors[p.area]}`}>
                      {p.area}
                    </span>
                    <h2 className="font-display text-xl md:text-2xl font-400 text-navy-900 group-open:text-gold transition-colors">
                      {p.title}
                    </h2>
                  </div>
                  <div className="text-gold text-xl font-300 shrink-0 transition-transform group-open:rotate-45">+</div>
                </summary>

                <div className="px-8 pb-8 border-t border-cream-200">
                  <p className="font-body text-navy-600 leading-relaxed mt-6 mb-6 max-w-2xl">
                    {p.intro}
                  </p>

                  <h3 className="font-body text-xs uppercase tracking-widest text-gold mb-4">Azioni concrete</h3>
                  <div className="space-y-3 mb-6">
                    {p.azioni.map((a, i) => (
                      <div key={i} className="flex items-start gap-4">
                        <span className="text-gold mt-1 text-sm shrink-0">→</span>
                        <span className="font-body text-sm text-navy-700 flex-1">{a.testo}</span>
                        <span className="font-mono text-xs bg-cream-100 text-navy-500 px-2.5 py-1 shrink-0 border border-cream-300">{a.tempo}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-l-2 border-gold pl-4 bg-cream-50 p-4">
                    <div className="font-body text-xs text-gold uppercase tracking-wide mb-1">Perché solo Marialina</div>
                    <p className="font-body text-sm text-navy-600 italic">{p.perche}</p>
                  </div>
                </div>
              </details>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link href="/volontari" className="btn-gold">
              Sostieni il programma — diventa volontario <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
