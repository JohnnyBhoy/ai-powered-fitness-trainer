import Promocode from '@/Components/Registration/Promocode';
import { useUserStore } from '@/stores/useUserStore';
import { Head } from '@inertiajs/react';
import { useEffect } from 'react';

export default function Register({ user_id }: { user_id: number }) {
    //Global state from user Store
    const { setUserId } = useUserStore();

    useEffect(() => {
        setUserId(user_id);
    }, []);


    return (
        <>
            <Head title="Promocode" />
            <Promocode />
        </>
    );
}
