import { Trash2, Pencil } from "lucide-react"

type ActionButtonProps = {
    handleRemoveTrainee: () => void,
    handleOpen: () => void,
}

const ActionButton = ({ handleRemoveTrainee, handleOpen }: ActionButtonProps) => {
    return (<div className="flex items-center w-full gap-3">
        <button className="text-gray-500 hover:text-error-500 dark:text-gray-400 dark:hover:text-error-500">
            <Trash2 size={16} onClick={handleRemoveTrainee} />
        </button>
        <button className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white/90">
            <Pencil size={16} onClick={handleOpen} />
        </button>
    </div>)
}

export default ActionButton;