import { TrainersProps } from "@/types/gpf";

export const trainer: TrainersProps = {
    id: 0,
    first_name: "",
    last_name: "",
    role: 2, // trainer
    trainees: [],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    user_name: "",
    email: "",
    email_verified_at: "",
    trainer_id: null,
    is_active: 0,
    is_promo: 0
};