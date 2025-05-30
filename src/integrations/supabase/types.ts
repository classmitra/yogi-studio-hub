export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      bookings: {
        Row: {
          attended: boolean | null
          booking_date: string
          booking_reference: string
          booking_time: string
          cancellation_reason: string | null
          cancelled_at: string | null
          class_id: string
          created_at: string
          id: string
          payment_amount_cents: number
          payment_status: string
          special_requests: string | null
          status: string
          stripe_payment_intent_id: string | null
          student_email: string
          student_id: string
          student_name: string
          updated_at: string
        }
        Insert: {
          attended?: boolean | null
          booking_date: string
          booking_reference: string
          booking_time: string
          cancellation_reason?: string | null
          cancelled_at?: string | null
          class_id: string
          created_at?: string
          id?: string
          payment_amount_cents?: number
          payment_status?: string
          special_requests?: string | null
          status?: string
          stripe_payment_intent_id?: string | null
          student_email: string
          student_id: string
          student_name: string
          updated_at?: string
        }
        Update: {
          attended?: boolean | null
          booking_date?: string
          booking_reference?: string
          booking_time?: string
          cancellation_reason?: string | null
          cancelled_at?: string | null
          class_id?: string
          created_at?: string
          id?: string
          payment_amount_cents?: number
          payment_status?: string
          special_requests?: string | null
          status?: string
          stripe_payment_intent_id?: string | null
          student_email?: string
          student_id?: string
          student_name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
        ]
      }
      classes: {
        Row: {
          category: string
          created_at: string
          description: string | null
          difficulty_level: string
          duration_minutes: number
          end_date: string | null
          equipment_needed: string[] | null
          id: string
          instructor_id: string
          is_active: boolean | null
          is_recurring: boolean | null
          max_students: number
          meeting_id: string | null
          meeting_password: string | null
          meeting_url: string | null
          price_cents: number
          recurrence_days: number[] | null
          recurrence_pattern: string | null
          start_date: string
          start_time: string
          title: string
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          description?: string | null
          difficulty_level: string
          duration_minutes: number
          end_date?: string | null
          equipment_needed?: string[] | null
          id?: string
          instructor_id: string
          is_active?: boolean | null
          is_recurring?: boolean | null
          max_students?: number
          meeting_id?: string | null
          meeting_password?: string | null
          meeting_url?: string | null
          price_cents?: number
          recurrence_days?: number[] | null
          recurrence_pattern?: string | null
          start_date: string
          start_time: string
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          difficulty_level?: string
          duration_minutes?: number
          end_date?: string | null
          equipment_needed?: string[] | null
          id?: string
          instructor_id?: string
          is_active?: boolean | null
          is_recurring?: boolean | null
          max_students?: number
          meeting_id?: string | null
          meeting_password?: string | null
          meeting_url?: string | null
          price_cents?: number
          recurrence_days?: number[] | null
          recurrence_pattern?: string | null
          start_date?: string
          start_time?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "classes_instructor_id_fkey"
            columns: ["instructor_id"]
            isOneToOne: false
            referencedRelation: "instructors"
            referencedColumns: ["id"]
          },
        ]
      }
      instructors: {
        Row: {
          bio: string | null
          brand_color: string | null
          contact_email: string | null
          contact_phone: string | null
          created_at: string
          google_meet_enabled: boolean | null
          id: string
          is_active: boolean | null
          profile_image_url: string | null
          social_facebook: string | null
          social_instagram: string | null
          social_youtube: string | null
          stripe_account_id: string | null
          studio_logo_url: string | null
          studio_name: string
          subdomain: string
          timezone: string | null
          updated_at: string
          user_id: string
          website_url: string | null
          zoom_api_key: string | null
          zoom_api_secret: string | null
        }
        Insert: {
          bio?: string | null
          brand_color?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          google_meet_enabled?: boolean | null
          id?: string
          is_active?: boolean | null
          profile_image_url?: string | null
          social_facebook?: string | null
          social_instagram?: string | null
          social_youtube?: string | null
          stripe_account_id?: string | null
          studio_logo_url?: string | null
          studio_name: string
          subdomain: string
          timezone?: string | null
          updated_at?: string
          user_id: string
          website_url?: string | null
          zoom_api_key?: string | null
          zoom_api_secret?: string | null
        }
        Update: {
          bio?: string | null
          brand_color?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          google_meet_enabled?: boolean | null
          id?: string
          is_active?: boolean | null
          profile_image_url?: string | null
          social_facebook?: string | null
          social_instagram?: string | null
          social_youtube?: string | null
          stripe_account_id?: string | null
          studio_logo_url?: string | null
          studio_name?: string
          subdomain?: string
          timezone?: string | null
          updated_at?: string
          user_id?: string
          website_url?: string | null
          zoom_api_key?: string | null
          zoom_api_secret?: string | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          booking_id: string | null
          class_id: string | null
          content: string
          created_at: string
          error_message: string | null
          id: string
          notification_type: string
          recipient_email: string
          recipient_name: string | null
          sent_at: string | null
          status: string
          subject: string
        }
        Insert: {
          booking_id?: string | null
          class_id?: string | null
          content: string
          created_at?: string
          error_message?: string | null
          id?: string
          notification_type: string
          recipient_email: string
          recipient_name?: string | null
          sent_at?: string | null
          status?: string
          subject: string
        }
        Update: {
          booking_id?: string | null
          class_id?: string | null
          content?: string
          created_at?: string
          error_message?: string | null
          id?: string
          notification_type?: string
          recipient_email?: string
          recipient_name?: string | null
          sent_at?: string | null
          status?: string
          subject?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount_cents: number
          booking_id: string
          created_at: string
          currency: string
          id: string
          instructor_id: string
          instructor_payout_cents: number
          payment_method: string | null
          platform_fee_cents: number
          processed_at: string | null
          refund_amount_cents: number | null
          refunded_at: string | null
          status: string
          stripe_charge_id: string | null
          stripe_payment_intent_id: string
          student_id: string
        }
        Insert: {
          amount_cents: number
          booking_id: string
          created_at?: string
          currency?: string
          id?: string
          instructor_id: string
          instructor_payout_cents: number
          payment_method?: string | null
          platform_fee_cents?: number
          processed_at?: string | null
          refund_amount_cents?: number | null
          refunded_at?: string | null
          status?: string
          stripe_charge_id?: string | null
          stripe_payment_intent_id: string
          student_id: string
        }
        Update: {
          amount_cents?: number
          booking_id?: string
          created_at?: string
          currency?: string
          id?: string
          instructor_id?: string
          instructor_payout_cents?: number
          payment_method?: string | null
          platform_fee_cents?: number
          processed_at?: string | null
          refund_amount_cents?: number | null
          refunded_at?: string | null
          status?: string
          stripe_charge_id?: string | null
          stripe_payment_intent_id?: string
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_instructor_id_fkey"
            columns: ["instructor_id"]
            isOneToOne: false
            referencedRelation: "instructors"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          first_name: string | null
          id: string
          is_instructor: boolean | null
          last_name: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          first_name?: string | null
          id: string
          is_instructor?: boolean | null
          last_name?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          first_name?: string | null
          id?: string
          is_instructor?: boolean | null
          last_name?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      studio_settings: {
        Row: {
          created_at: string
          id: string
          instructor_id: string
          setting_key: string
          setting_type: string
          setting_value: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          instructor_id: string
          setting_key: string
          setting_type?: string
          setting_value?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          instructor_id?: string
          setting_key?: string
          setting_type?: string
          setting_value?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "studio_settings_instructor_id_fkey"
            columns: ["instructor_id"]
            isOneToOne: false
            referencedRelation: "instructors"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_booking_reference: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
