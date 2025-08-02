export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      countries: {
        Row: {
          code: string
          created_at: string | null
          id: number
          name: string
          updated_at: string | null
        }
        Insert: {
          code: string
          created_at?: string | null
          id?: number
          name: string
          updated_at?: string | null
        }
        Update: {
          code?: string
          created_at?: string | null
          id?: number
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      founders: {
        Row: {
          company_name: string | null
          created_at: string | null
          funding_stage: string | null
          id: string
          industry: string | null
          member_id: string
          startup_stage: string | null
          team_size: number | null
          updated_at: string | null
        }
        Insert: {
          company_name?: string | null
          created_at?: string | null
          funding_stage?: string | null
          id?: string
          industry?: string | null
          member_id: string
          startup_stage?: string | null
          team_size?: number | null
          updated_at?: string | null
        }
        Update: {
          company_name?: string | null
          created_at?: string | null
          funding_stage?: string | null
          id?: string
          industry?: string | null
          member_id?: string
          startup_stage?: string | null
          team_size?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "founders_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
        ]
      }
      investor_interest_submissions: {
        Row: {
          additional_questions: string | null
          company: string
          created_at: string
          email: string
          first_name: string
          id: string
          investor_type: string
          last_name: string
          phone: string | null
          title: string
          updated_at: string
        }
        Insert: {
          additional_questions?: string | null
          company: string
          created_at?: string
          email: string
          first_name: string
          id?: string
          investor_type: string
          last_name: string
          phone?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          additional_questions?: string | null
          company?: string
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          investor_type?: string
          last_name?: string
          phone?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      investors: {
        Row: {
          created_at: string | null
          id: string
          investment_focus: string | null
          investor_type: string
          member_id: string
          portfolio_size: number | null
          preferred_stages: string | null
          ticket_size_max: number | null
          ticket_size_min: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          investment_focus?: string | null
          investor_type: string
          member_id: string
          portfolio_size?: number | null
          preferred_stages?: string | null
          ticket_size_max?: number | null
          ticket_size_min?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          investment_focus?: string | null
          investor_type?: string
          member_id?: string
          portfolio_size?: number | null
          preferred_stages?: string | null
          ticket_size_max?: number | null
          ticket_size_min?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "investors_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
        ]
      }
      member_subscriptions: {
        Row: {
          created_at: string | null
          end_date: string | null
          id: string
          is_active: boolean | null
          member_id: string
          payment_intent_id: string | null
          start_date: string
          status: string
          tier_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          member_id: string
          payment_intent_id?: string | null
          start_date: string
          status?: string
          tier_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          member_id?: string
          payment_intent_id?: string | null
          start_date?: string
          status?: string
          tier_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "member_subscriptions_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "member_subscriptions_payment_intent_id_fkey"
            columns: ["payment_intent_id"]
            isOneToOne: false
            referencedRelation: "payment_intents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "member_subscriptions_tier_id_fkey"
            columns: ["tier_id"]
            isOneToOne: false
            referencedRelation: "tiers"
            referencedColumns: ["id"]
          },
        ]
      }
      members: {
        Row: {
          country_id: number | null
          created_at: string | null
          email: string
          first_name: string
          id: string
          is_active: boolean | null
          last_name: string
          linkedin_url: string | null
          phone: string | null
          stripe_customer_id: string | null
          updated_at: string | null
          user_type: Database["public"]["Enums"]["user_type"]
          website_url: string | null
        }
        Insert: {
          country_id?: number | null
          created_at?: string | null
          email: string
          first_name: string
          id?: string
          is_active?: boolean | null
          last_name: string
          linkedin_url?: string | null
          phone?: string | null
          stripe_customer_id?: string | null
          updated_at?: string | null
          user_type: Database["public"]["Enums"]["user_type"]
          website_url?: string | null
        }
        Update: {
          country_id?: number | null
          created_at?: string | null
          email?: string
          first_name?: string
          id?: string
          is_active?: boolean | null
          last_name?: string
          linkedin_url?: string | null
          phone?: string | null
          stripe_customer_id?: string | null
          updated_at?: string | null
          user_type?: Database["public"]["Enums"]["user_type"]
          website_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "members_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
        ]
      }
      partners: {
        Row: {
          additional_information: string | null
          company_name: string
          company_size: string | null
          company_type: string | null
          created_at: string | null
          expected_partnership_model: string | null
          id: string
          member_id: string
          partnership_goals: string[] | null
          partnership_interest:
            | Database["public"]["Enums"]["partnership_interest"]
            | null
          partnership_type:
            | Database["public"]["Enums"]["partnership_type"]
            | null
          services_offered: string | null
          updated_at: string | null
          years_experience: number | null
        }
        Insert: {
          additional_information?: string | null
          company_name: string
          company_size?: string | null
          company_type?: string | null
          created_at?: string | null
          expected_partnership_model?: string | null
          id?: string
          member_id: string
          partnership_goals?: string[] | null
          partnership_interest?:
            | Database["public"]["Enums"]["partnership_interest"]
            | null
          partnership_type?:
            | Database["public"]["Enums"]["partnership_type"]
            | null
          services_offered?: string | null
          updated_at?: string | null
          years_experience?: number | null
        }
        Update: {
          additional_information?: string | null
          company_name?: string
          company_size?: string | null
          company_type?: string | null
          created_at?: string | null
          expected_partnership_model?: string | null
          id?: string
          member_id?: string
          partnership_goals?: string[] | null
          partnership_interest?:
            | Database["public"]["Enums"]["partnership_interest"]
            | null
          partnership_type?:
            | Database["public"]["Enums"]["partnership_type"]
            | null
          services_offered?: string | null
          updated_at?: string | null
          years_experience?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "partners_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_intents: {
        Row: {
          amount: number
          created_at: string | null
          currency: string
          id: string
          member_id: string | null
          metadata: Json | null
          status: string
          stripe_payment_intent_id: string
          tier_id: string | null
          updated_at: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          currency?: string
          id?: string
          member_id?: string | null
          metadata?: Json | null
          status: string
          stripe_payment_intent_id: string
          tier_id?: string | null
          updated_at?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          currency?: string
          id?: string
          member_id?: string | null
          metadata?: Json | null
          status?: string
          stripe_payment_intent_id?: string
          tier_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payment_intents_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payment_intents_tier_id_fkey"
            columns: ["tier_id"]
            isOneToOne: false
            referencedRelation: "tiers"
            referencedColumns: ["id"]
          },
        ]
      }
      tiers: {
        Row: {
          created_at: string | null
          currency: string
          description: string | null
          display_price: string
          features: string[] | null
          id: string
          is_active: boolean | null
          name: string
          original_price: number | null
          price: number
          updated_at: string | null
          user_types: Database["public"]["Enums"]["user_type"][]
        }
        Insert: {
          created_at?: string | null
          currency?: string
          description?: string | null
          display_price: string
          features?: string[] | null
          id: string
          is_active?: boolean | null
          name: string
          original_price?: number | null
          price?: number
          updated_at?: string | null
          user_types?: Database["public"]["Enums"]["user_type"][]
        }
        Update: {
          created_at?: string | null
          currency?: string
          description?: string | null
          display_price?: string
          features?: string[] | null
          id?: string
          is_active?: boolean | null
          name?: string
          original_price?: number | null
          price?: number
          updated_at?: string | null
          user_types?: Database["public"]["Enums"]["user_type"][]
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_member_with_validation: {
        Args: {
          p_user_type: string
          p_email: string
          p_first_name: string
          p_last_name: string
          p_phone?: string
          p_country_id?: number
          p_linkedin_url?: string
          p_website_url?: string
        }
        Returns: string
      }
      get_current_user_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      partnership_interest:
        | "early-partnership-membership"
        | "sponsor-project"
        | "standard-partnership"
      partnership_type:
        | "incubator-accelerator"
        | "software-technology"
        | "large-corporation"
        | "event-organizer"
        | "professional-services"
        | "venture-capital"
        | "educational-institution"
        | "other"
      user_type: "founder" | "partner" | "investor"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      partnership_interest: [
        "early-partnership-membership",
        "sponsor-project",
        "standard-partnership",
      ],
      partnership_type: [
        "incubator-accelerator",
        "software-technology",
        "large-corporation",
        "event-organizer",
        "professional-services",
        "venture-capital",
        "educational-institution",
        "other",
      ],
      user_type: ["founder", "partner", "investor"],
    },
  },
} as const
