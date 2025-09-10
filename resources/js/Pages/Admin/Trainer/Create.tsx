import CreateTrainerForm from '@/Components/Admin/Trainer/Create/CreateTrainerForm'
import Authenticated from '@/Pages/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'

const Create = () => {
    return (
        <Authenticated>
            <Head title='Create Trainer' />
            <CreateTrainerForm />
        </Authenticated>
    )
}

export default Create