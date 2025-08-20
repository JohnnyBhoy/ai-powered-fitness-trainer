export type Cards = {
    id: number,
    title: string,
    count: trainerCount,
    text: string,
    icon: string,
}

export type Users = {
    first_name: string,
    last_name: string,
    user_name: string,
    email: string,
    role: number,
    trainer: string,
    created_at: string,
    email_verified_at: string,
    id: number,
    is_active: number,
    is_promo: number,
    updated_at: string,
    strictness_level: number;
    trainer_first_name: string | null;
    trainer_last_name: string | null;
    trainer_id: number | null;
}