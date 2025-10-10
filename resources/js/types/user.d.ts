export type User = {
  first_name: string,
  last_name: string,
  email: string,
  user_name: string,
  role: number,
  is_active: number,
  is_promo: number,
  trainer_id: number | null,
  email_verified_at: string | null,
  created_at: string,
}