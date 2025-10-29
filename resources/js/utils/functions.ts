import { usePage } from "@inertiajs/react";

export const getRole = () => {
    return usePage().props.auth.user.role;
}

export const formatCityAndState = (city: string, state: string) => {
    return `${city?.substring(0, 15)}, ${state?.substring(0, 15)}`;
}

export const jsonFormatter = (data: string) => {
    const start = data?.indexOf('[');
    const end = data?.indexOf(']');

    return data?.slice(start, end + 1);
}
