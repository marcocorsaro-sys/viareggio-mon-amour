export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      volontari: {
        Row: {
          id: string
          created_at: string
          nome: string
          cognome: string
          email: string
          telefono: string | null
          quartiere: string | null
          disponibilita: string[]
          messaggio: string | null
          confermato: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          nome: string
          cognome: string
          email: string
          telefono?: string | null
          quartiere?: string | null
          disponibilita?: string[]
          messaggio?: string | null
          confermato?: boolean
        }
        Update: Partial<Database['public']['Tables']['volontari']['Insert']>
        Relationships: []
      }
      contatti: {
        Row: {
          id: string
          created_at: string
          nome: string
          email: string
          oggetto: string
          messaggio: string
          letto: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          nome: string
          email: string
          oggetto: string
          messaggio: string
          letto?: boolean
        }
        Update: Partial<Database['public']['Tables']['contatti']['Insert']>
        Relationships: []
      }
      newsletter: {
        Row: {
          id: string
          created_at: string
          email: string
          attivo: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          email: string
          attivo?: boolean
        }
        Update: Partial<Database['public']['Tables']['newsletter']['Insert']>
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}
