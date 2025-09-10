import React, { ReactNode } from 'react'

const TableContainer = ({ children }: {children: ReactNode}) => {
        
    return (
        <div className="bg-slate-300 p-6">
            {children}
        </div>
    )
}

export default TableContainer