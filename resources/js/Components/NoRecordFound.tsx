import React from 'react'

const NoRecordFound = () => {
    return (
        <tr>
            <td colSpan={7} className='text-center'>
                <h1 className='py-6 font-semibold text-md animate-pulse'>No Users found in our records...</h1>
            </td>
        </tr>
    )
}

export default NoRecordFound