import { FormTitleProps } from "@/types/form"
import { ArrowLeft } from "lucide-react"

function FormTitle({ title, action }: FormTitleProps) {
    return (
        <div className="flex justify-between place-items-center bg-black dark:bg-gray-800 p-4 rounded-t-lg text-gray-300">
            <h2 className="text-2xl font-semibold text-center dark:text-gray-300">
                {title}
            </h2>
            <button
                type="button"
                className='flex place-items-center gap-1 font-bold dark:text-gray-200'
                onClick={action}
            >
                <ArrowLeft /> back
            </button>
        </div>

    )
}

export default FormTitle