import { usePage } from "@inertiajs/react";

export class User {
    readonly user = usePage().props.auth.user;

    getId = () => this.user.id;

    getName = () => `${this.user.first_name} ${this.user.last_name}`

    getRole = () => this.user.role;

    getTrainerId = () => this.user.trainer_id;

    getEmail = () => {
        return this.user.email
    };

    getIsActive = () => this.user.is_active;

    getIsPromo = () => this.user.is_promo;
}