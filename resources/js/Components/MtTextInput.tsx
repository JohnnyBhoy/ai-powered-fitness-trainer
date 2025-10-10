import { Input, Typography } from '@material-tailwind/react'
import React, { ChangeEventHandler, HTMLInputTypeAttribute } from 'react'

type InputProps = {
    name: string,
    data:string | number | readonly string[] | undefined,
    type: HTMLInputTypeAttribute | undefined,
    onChange: ChangeEventHandler | undefined,
}

const MtTextInput = ({name, data, type ="text", onChange} : InputProps) => {
    return (
         <div className="mb-1 flex flex-col gap-6">
             <Typography variant="h6" color="blue-gray" className="-mb-3 dark:text-gray-500">
                {name?.charAt(0).toUpperCase() + name.slice(1)?.replace('_', " ")}
            </Typography>
            <Input
                color="gray"
                value={data}
                size="lg"
                type={type}
                onChange={onChange}
                placeholder="Name of Trainee"
                name={name}
                className="!border-t-gray-400 focus:!border-t-gray-900 dark:border-gray-400 dark:focus:border-none dark:text-gray-500"
                containerProps={{
                    className: "!min-w-full",
                }}
                labelProps={{
                    className: "hidden",
                }}
            />
        </div>
    )
}

export default MtTextInput