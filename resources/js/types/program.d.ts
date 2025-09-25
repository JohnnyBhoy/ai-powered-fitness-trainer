export type Program = {
    id: number;
    program_name: string;
    day: number;
    focus: string;
    warm_up: string;
    workout: string[];
    cool_down: string;
    alignment: string;
    created_at: string | null;
    updated_at: string | null;
};
