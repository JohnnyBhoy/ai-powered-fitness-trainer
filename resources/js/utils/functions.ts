import { usePage } from "@inertiajs/react";

export const getRole = () => {
    return usePage().props.auth.user.role;
}

