import { Link } from '@inertiajs/react'

const AddPlan = () => {
    return (
        <div className="mb-4">
            <Link
                href="/nutrition-plans/create"
                className="bg-blue-600 text-white px-4 py-2 rounded-xl shadow hover:bg-blue-700"
            >
                + Add Plan
            </Link>
        </div>
    )
}

export default AddPlan