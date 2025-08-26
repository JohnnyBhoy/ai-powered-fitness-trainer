import { Input, Typography } from '@material-tailwind/react'
import React, { HTMLInputTypeAttribute } from 'react'

type InputProps = {
    name: string,
    data:string | number | readonly string[] | undefined,
    type: HTMLInputTypeAttribute | undefined,
}

const MtTextInput = ({name, data, type ="text"} : InputProps) => {
    return (
         <div className="mb-1 flex flex-col gap-6">
             <Typography variant="h6" color="blue-gray" className="-mb-3">
                {name}
            </Typography>
            <Input
                color="gray"
                value={data}
                size="lg"
                type={type}
                onChange={() => {}}
                placeholder="Name of Trainee"
                name="name"
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
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