export const getStrictnessLevel = (level: number) => {
    if (level == 1) return 'Chill';
    if (level == 2) return 'Balanced';
    if (level == 3) return 'Strict';

    return 'Not specify';
}

export const getRoleById = (role: number, trainer_id: number | null) => {
    if (role == 3 && trainer_id == null) return 'GPF Trainee';
    if (role == 3 && trainer_id != null) return 'Trainee';
    if (role == 2) return 'Trainer';
}

// Utility to convert number to ordinal
export const getOrdinal = (n: number) => {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
};

const getCurrentPage = () => {
    let currentPage = window.location.pathname;
    const currentPageLength = currentPage.split("/").length;
    currentPage = currentPage.split("/")[currentPageLength - 1];

    return currentPage;
}

export default getCurrentPage;