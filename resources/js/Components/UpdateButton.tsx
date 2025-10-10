import { Edit, Loader } from "lucide-react"

const UpdateButton = ({ processing }: { processing: boolean }) => {
    return <button
        className='bg-gray-800 hover:bg-gray-900 text-white font-semibold py-1 px-3 rounded  flex place-items-center gap-2'
    >
        {processing
            ? <><Loader className='animate-spin' /> Saving...</>
            : <><Edit /> Update</>}
    </button>
}

export default UpdateButton