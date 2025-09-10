import { Link } from "@inertiajs/react"
import { Dumbbell, FileBarChart2, PlusCircle, Settings } from "lucide-react"

const QuickActions = () => {
    return (
        <div className="bg-white rounded-xl shadow-sm border p-4 flex flex-wrap gap-4 justify-between hover:shadow-md transition">
            <Link
                href="/admin/trainers/create"
                className="flex items-center gap-2 px-4 py-2 text-sm bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100"
            >
                <PlusCircle className="w-4 h-4" /> Add Trainer
            </Link>
            <Link
                href="/admin/reports"
                className="flex items-center gap-2 px-4 py-2 text-sm bg-green-50 text-green-700 rounded-lg hover:bg-green-100"
            >
                <FileBarChart2 className="w-4 h-4" /> Generate Reports
            </Link>
            <Link
                href="/admin/programs"
                className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100"
            >
                <Dumbbell className="w-4 h-4" /> Manage Programs
            </Link>
            <Link
                href="/admin/settings"
                className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100"
            >
                <Settings className="w-4 h-4" /> Settings
            </Link>
        </div>
    )
}

export default QuickActions