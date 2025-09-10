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
        from:number,
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
        <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-3 flex items-center justify-between gap-6">
                <div>
                    <Typography variant="h5" color="blue-gray">
                        {traineeType} Trainees list
                    </Typography>
                    <Typography color="gray" className="mt-1 font-normal">
                        See information about all members under GoPeakFit
                    </Typography>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row">

                    <select
                        name="strictness-level"
                        id="strictness-level"
                        className='rounded-lg border border-1 border-slate-900 w-auto'
                        onChange={(e: any) => setPerPage(e.target.value)}
                    >
                        <option value={perPage}>{perPage}</option>
                        <option value={10}>10</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                        {page?.total > 100
                            && <option value={page.total}></option>
                        }
                    </select>

                    <Button variant="outlined" size="sm" onClick={() => setPageNumber(page.currentPage == 1 ? 1 : page.currentPage - 1)}>
                        <ChevronLeft />
                    </Button>
                    <Button variant="outlined" size="sm" onClick={() => setPageNumber(page.currentPage == page.lastPage ? page.currentPage : page.currentPage + 1)}>
                        <ChevronRight />
                    </Button>
                </div>
            </div>
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                <Tabs value={0} className="w-full md:w-max">
                    <TabsHeader>
                        {TABS.map(({ label, value }) => (
                            <Tab key={value} value={value} onClick={() => setStrictnessLevel(value)}>
                                &nbsp;&nbsp;{label}&nbsp;&nbsp;
                            </Tab>
                        ))}
                    </TabsHeader>
                </Tabs>


                <Typography variant="small" color="blue-gray" className="font-normal">
                    Showing {page.from}-{page.to} of {page.total} Trainees
                </Typography>

                <Typography variant="small" color="blue-gray" className="font-normal">
                    Page {page.currentPage} of {page.lastPage}
                </Typography>

                <div className="w-full md:w-72">
                    <Input
                        value={filter}
                        onChange={(e: any) => setFilter(e.target.value)}
                        label="Search"
                        icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                    />
                </div>
            </div>
        </CardHeader>
    )
}

export default TableHeader