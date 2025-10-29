import { ChevronsUpDown } from 'lucide-react'

export default function TrialProgramTableHead() {
    return (
        <thead>
            <tr>
                {['Day', 'Alignment', 'Focus', 'Warm-up', 'Workout', 'Cooldown', 'Action'].map((head, i) => (
                    <th
                        key={i}
                        className=" px-4 py-3 border border-gray-100 dark:border-white/[0.05]">
                        <div className="flex items-center justify-between cursor-pointer">
                            <div className="gap-3">
                                <span className="font-medium text-gray-700 text-theme-xs dark:text-gray-400">
                                    {head}
                                </span>
                            </div>
                            <button className="flex flex-col gap-0.5" onClick={() => { }}>
                                <ChevronsUpDown size={18} className='dark:text-gray-700'
                                />
                            </button>
                        </div>
                    </th>
                ))}
            </tr>
        </thead>
    )
}
