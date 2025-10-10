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