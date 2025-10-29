import { useTraineeStore } from '@/stores/useTraineeStore';

export default function TableFooter() {
    // Global states
    const {
        page,
        setPageNumber,
    } = useTraineeStore();


    return (
        <div className="border border-t-0 rounded-b-xl border-gray-100 py-4 pl-[18px] pr-4 dark:border-white/[0.05]">
            <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between">
                <div className="pb-3 xl:pb-0">
                    <p className="pb-3 text-sm font-medium text-center text-gray-500 border-b border-gray-100 dark:border-gray-800 dark:text-gray-400 xl:border-b-0 xl:pb-0 xl:text-left">
                        Showing {page.from} to {page.to} of {page.total} entries
                    </p>
                </div>
                <div className="flex items-center justify-center">
                    <button
                        className="mr-2.5 flex items-center h-10 justify-center rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-gray-700 shadow-theme-xs hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] text-sm"
                        onClick={() =>
                            setPageNumber(page.currentPage == 1 ? 1 : page.currentPage - 1)
                        }
                    >
                        Previous
                    </button>
                    <button
                        onClick={() =>
                            setPageNumber(
                                page.currentPage == page.lastPage
                                    ? page.currentPage
                                    : page.currentPage + 1
                            )
                        }
                        className="ml-2.5 flex items-center justify-center rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-gray-700 shadow-theme-xs text-sm hover:bg-gray-50 h-10 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]">
                        Next
                    </button>
                </div>
            </div>
        </div>
    )
}
