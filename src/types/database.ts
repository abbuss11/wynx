export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

type JsonTable = {
  Row: { id: string; data: Json; created_at: string };
  Insert: { id: string; data: Json; created_at?: string };
  Update: { id?: string; data?: Json; created_at?: string };
  Relationships: [];
};

export type Database = {
  __InternalSupabase: { PostgrestVersion: '14.18' };
  public: {
    Tables: {
      admin_users: {
        Row: { user_id: string; display_name: string; created_at: string };
        Insert: { user_id: string; display_name?: string; created_at?: string };
        Update: { user_id?: string; display_name?: string; created_at?: string };
        Relationships: [];
      };
      site_quotes: JsonTable;
      site_clients: JsonTable;
      site_blog_posts: JsonTable;
      site_projects: JsonTable;
      site_settings: {
        Row: { id: number; data: Json; updated_at: string };
        Insert: { id: number; data: Json; updated_at?: string };
        Update: { id?: number; data?: Json; updated_at?: string };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      convert_wynx_quote_to_client: {
        Args: { p_client_data: Json; p_client_id: string; p_quote_id: string };
        Returns: undefined;
      };
      is_wynx_admin: { Args: Record<PropertyKey, never>; Returns: boolean };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
