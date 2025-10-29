import Table from './GoPeakFit/Table';
import TableFooter from './GoPeakFit/TableFooter';
import TableHeader from './GoPeakFit/TableHeader';

function TraineeTable() {

    return (
        <div className="border-t border-gray-100 dark:border-gray-800">
            <div className="space-y-6">
                <div className="overflow-hidden bg-white  dark:bg-white/[0.03]">
                    <TableHeader />
                    <div className="max-w-full overflow-x-auto custom-scrollbar">
                        <div>
                            <Table />
                        </div>
                    </div>
                    <TableFooter />
                </div>
            </div>
        </div>
    )
}

export default TraineeTable