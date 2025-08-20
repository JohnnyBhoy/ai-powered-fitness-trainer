export const getStrictnessLevel = (level:  number ) => {
    if(level == 1) return 'Chill';
    if(level == 2) return 'Balanced';
    if(level == 3) return 'Strict';

    return 'Not specify';
}

export const getRoleById = (role: number, trainer_id: number | null) => {
    if(role == 3 && trainer_id == null) return 'GPF Trainee';
    if(role == 3 && trainer_id != null) return 'Trainee';
    if(role == 2) return 'Trainer';
}