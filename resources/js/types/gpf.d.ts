export type GpfTraineeProps = {
  id: number;
  user_id: number;
  trainer_id: number | null;

  first_name: string;
  last_name: string;
  user_name: string;
  email: string;
  email_verified_at: string;
  phone_number: string;
  password: string;
  remember_token: string;

  age: number;
  sex: "male" | "female" | string; // restrict if you only allow M/F
  city: string;
  state: string;

  fitness_level: string;
  goal: string;
  goal_weight: number;
  current_weight: number;
  current_struggles: string;
  past_obstacles: string;
  food_allergies: string;
  why: string;
  equipment_access: string;
  strictness_level: number;

  role: number; // 1=Admin, 2=Trainer, 3=Trainee?
  is_active: number; // you can switch to boolean if API returns 0/1
  is_promo: number;

  created_at: string;
  updated_at: string;
};
