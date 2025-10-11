import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { Button, CardHeader, Input, Tab, Tabs, TabsHeader, Typography } from '@material-tailwind/react'
import { ChevronLeft, ChevronRight } from 'react-bootstrap-icons'

type TableHeaderProps = {
    perPage: number,
    setPerPage: CallableFunction,
    pageNumber: number,
    setPageNumber: CallableFunction,
    page: {
        total: number,
        currentPage: number,
        lastPage: number,
        from: number,
        to: number,
    },
    TABS: {
        label: string,
        value: number,
    }[],
    filter: string,
    setFilter: CallableFunction,
    setStrictnessLevel: CallableFunction,
    traineeType: string,
}

const TableHeader = ({ perPage, setPerPage, pageNumber, setPageNumber, page, TABS, filter, setFilter, setStrictnessLevel, traineeType }: TableHeaderProps) => {
    return (
        <CardHeader
            floated={false}
            shadow={false}
            className="rounded-none bg-white text-gray-900 dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-950 dark:text-gray-100 transition-colors duration-300 border-b border-gray-200 dark:border-gray-800"
        >
            <div className="mb-3 flex flex-col md:flex-row items-center justify-between gap-6">
                {/* Title Section */}
                <div>
                    <Typography
                        variant="h5"
                        className="text-gray-900 dark:text-gray-100 font-semibold tracking-tight"
                    >
                        {traineeType} Trainees List
                    </Typography>
                    <Typography className="mt-1 text-sm font-normal text-gray-600 dark:text-gray-400">
                        See information about all members under GoPeakFit
                    </Typography>
                </div>

                {/* Controls */}
                <div className="flex flex-col sm:flex-row gap-2 items-center">
                    <select
                        name="strictness-level"
                        id="strictness-level"
                        className="rounded-lg border border-slate-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm px-2 py-1 focus:ring-2 focus:ring-blue-500 outline-none transition w-[3.5rem]"
                        onChange={(e: any) => setPerPage(e.target.value)}
                    >
                        <option value={perPage}>{perPage}</option>
                        <option value={10}>10</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                        {page?.total > 100 && <option value={page.total}>All</option>}
                    </select>

                    <Button
                        variant="outlined"
                        size="sm"
                        onClick={() =>
                            setPageNumber(page.currentPage == 1 ? 1 : page.currentPage - 1)
                        }
                        className="border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                    >
                        <ChevronLeft />
                    </Button>

                    <Button
                        variant="outlined"
                        size="sm"
                        onClick={() =>
                            setPageNumber(
                                page.currentPage == page.lastPage
                                    ? page.currentPage
                                    : page.currentPage + 1
                            )
                        }
                        className="border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                    >
                        <ChevronRight />
                    </Button>
                </div>
            </div>

            {/* Tabs and Info Row */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <Tabs
                    value={0}
                    className="w-full md:w-max transition-colors duration-300"
                >
                    <TabsHeader
                        className="bg-white dark:bg-gray-900 dark:text-gray-100 rounded-xl border border-gray-200 dark:border-gray-700 transition-colors duration-300"
                    >
                        {TABS.map(({ label, value }) => (
                            <Tab
                                key={value}
                                value={value}
                                onClick={() => setStrictnessLevel(value)}
                                className={`
              px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200
              hover:bg-blue-50 dark:hover:bg-gray-800 
              data-[state=active]:bg-blue-500 data-[state=active]:text-white 
              dark:data-[state=active]:bg-blue-600 dark:data-[state=active]:text-white
            `}
                            >
                                {label}
                            </Tab>
                        ))}
                    </TabsHeader>
                </Tabs>

                <div className="flex flex-col md:flex-row items-center gap-3">
                    <Typography
                        variant="small"
                        className="font-normal text-gray-700 dark:text-gray-300"
                    >
                        Showing {page.from}-{page.to} of {page.total} Trainees
                    </Typography>

                    <Typography
                        variant="small"
                        className="font-normal text-gray-700 dark:text-gray-300"
                    >
                        Page {page.currentPage} of {page.lastPage}
                    </Typography>
                </div>

                <div className="w-full md:w-72">
                    <Input
                        value={filter}
                        onChange={(e: any) => setFilter(e.target.value)}
                        label="Search"
                        icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                        className="dark:[&>div>input]:bg-gray-800 dark:[&>div>input]:text-gray-100 dark:[&>label]:text-gray-400"
                    />
                </div>
            </div>
        </CardHeader>
    )
}

export default TableHeader