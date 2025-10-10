import React, { ReactNode } from 'react'

const TableContainer = ({ children }: {children: ReactNode}) => {
        
    return (
        <div className="bg-slate-300  dark:bg-gray-900 dark:text-gray-100 ">
            {children}
        </div>
    )
}

export default TableContainer