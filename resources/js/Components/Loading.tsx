import React from 'react'

const Loading = ({text} : {text:string}) => {
    return (
        <div className="flex place-items-center justify-center gap-2">
            <img
                src='/images/loading.gif'
                alt='loading_gif'
                className='h-auto'
            />
            <h4 className='dark:text-gray-100'>{text}</h4>
        </div>
    )
}

export default Loading