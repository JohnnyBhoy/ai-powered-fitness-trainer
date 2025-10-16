import { Edit, Loader } from "lucide-react"

const UpdateButton = ({ processing }: { processing: boolean }) => {
    return <button
        className='bg-gray-800 hover:bg-gray-900 text-white font-semibold py-1 px-3 rounded  flex place-items-center gap-1'
    >
        {processing
            ? <><Loader className='animate-spin' /> Saving...</>
            : <><Edit size={18} /> Update</>}
    </button>
}

export default UpdateButton