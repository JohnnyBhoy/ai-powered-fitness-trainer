import { Textarea, Typography } from '@material-tailwind/react'
import { ChangeEventHandler } from 'react'

type InputProps = {
    name: string,
    data: string | number | readonly string[] | undefined,
    row: number,
    onChange: ChangeEventHandler,
}

const MtTextArea = ({ name, data, row , onChange}: InputProps) => {
    return (
        <div className="w-full">
            <Typography
                variant="small"
                color="blue-gray"
                className="mb-3 dark:text-gray-500 text-gray-500 font-bold mt-4"
            >
                  {name?.charAt(0).toUpperCase() + name.slice(1)?.replace('_', " ")}
            </Typography>
            <Textarea
                value={data}
                rows={row}
                onChange={onChange}
                className="!w-full !border-[1.5px]  bg-white text-gray-600 ring-4 ring-transparent focus:!border-primary focus:!border-t-blue-gray-900 group-hover:!border-primary dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 border-t-gray-400 !border-t-gray-400"
                labelProps={{
                    className: "hidden",
                }}
            />
        </div>
    )
}

export default MtTextArea