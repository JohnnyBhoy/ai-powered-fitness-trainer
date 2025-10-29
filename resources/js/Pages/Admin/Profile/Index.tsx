import UserAddressCard from '@/Components/UserProfile/UserAddressCard'
import UserInfoCard from '@/Components/UserProfile/UserInfoCard'
import UserMetaCard from '@/Components/UserProfile/UserMetaCard'
import Authenticated from '@/Pages/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'

export default function Index() {
    return (
        <Authenticated>
            <Head title='Profile Settings' />
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
                <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
                    Profile
                </h3>
                <div className="space-y-6">
                    <UserMetaCard />
                    <UserInfoCard />
                    <UserAddressCard />
                </div>
            </div>
        </Authenticated>
    )
}
