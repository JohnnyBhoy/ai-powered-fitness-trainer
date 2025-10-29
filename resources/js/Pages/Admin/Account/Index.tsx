import Authenticated from '@/Pages/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import { Hammer } from 'lucide-react'
import React from 'react'

export default function Index() {
    return (
        <Authenticated>
            <Head title='Account Settings' />
            <div className="flex place-items-center justify-center my-[10%]">
                <Hammer className='dark:text-white/90 animate-bounce' size={96} />
                <h1 className='text-5xl dark:text-white/90'>This page is under development...</h1>
            </div>
        </Authenticated>
    )
}
