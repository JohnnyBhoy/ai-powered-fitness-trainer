import Guest from '@/Layouts/GuestLayout';
import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';

export default function Welcome({
    auth,
    laravelVersion,
    phpVersion,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
    const handleImageError = () => {
        document
            .getElementById('screenshot-container')
            ?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document
            .getElementById('docs-card-content')
            ?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    return (
        <Guest>
            <Head title="Welcome" />
            <div className="flex items-center">
                <h1 className='text-center text-xl'>This is a homepage, modify this at "resources/js/Page/Welcome.tsx"</h1>
            </div>
        </Guest>
    );
}
