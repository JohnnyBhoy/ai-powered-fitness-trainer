export interface User {
    id: number;
    first_name: string;
    last_name: string;
    user_name: string;
    email: string;
    email_verified_at?: string;
    created_at: string;
    is_active: number;
    is_promo: number;
    trainer_id: number | null;
    role: number | null;
    strictness_level: number;
    trainer_first_name: string,
    trainer_last_name: string,
    current_weight: number,
    goal_weight: number,
    city: string,
    state: string,
    age: number,
    equipment_access: string,
    food_allergies: string,
    sex: string,
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
};
