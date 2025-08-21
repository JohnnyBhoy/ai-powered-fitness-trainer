import { Input, Typography } from '@material-tailwind/react'
import React, { HTMLInputTypeAttribute } from 'react'

type InputProps = {
    name: string,
    data:string | number | readonly string[] | undefined,
    type: HTMLInputTypeAttribute | undefined,
}

const MtTextInput = ({name, data, type ="text"} : InputProps) => {
    return (
        <div className="w-full">
            <Typography
                variant="small"
                color="blue-gray"
                className="mb-0 text-left font-medium"
            >
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
                className="focus:!border-t-gray-900 border-t-gray-500"
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