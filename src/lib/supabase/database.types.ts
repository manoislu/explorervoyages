// Minimal Supabase Database types to satisfy middleware import
// Replace or extend with generated types from Supabase if available

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          user_metadata?: any
          created_at?: string
        }
        Insert: {
          id?: string
          email: string
          user_metadata?: any
        }
        Update: {
          email?: string
          user_metadata?: any
        }
      }
      // Add other tables here if needed
    }
    Views: {}
    Functions: {}
    Enums: {}
  }
}