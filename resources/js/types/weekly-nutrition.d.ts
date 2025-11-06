export type WeeklyNutrition = {
    user_id: number;
    plan_name: string;
    week_number: number;
    day_number: number;
    meal_type: string;
    meal_name: string;
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    food_items: string[];
    notes?: string; // optional
}

export type Plan = {
    id: number;
    user_id: number;
    first_name: string;
    last_name: string;
    email: string;
    week_number: number;
    nutrition_plan: any;
    created_at: string;
}