import { Textarea, Typography } from '@material-tailwind/react'

type InputProps = {
    name: string,
    data: string | number | readonly string[] | undefined,
    row: number,
}

const MtTextArea = ({ name, data, row }: InputProps) => {
    return (
        <div className="w-full">
            <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 text-left font-medium dark:text-gray-500"
            >
                {name}
            </Typography>
            <Textarea
                value={data}
                rows={row}
                onChange={() => {}}
                className="!w-full !border-[1.5px]  bg-white text-gray-600 ring-4 ring-transparent focus:!border-primary focus:!border-t-blue-gray-900 group-hover:!border-primary dark:bg-white/[0.03] dark:text-gray-300 dark:border-gray-700 border-t-gray-400"
                labelProps={{
                    className: "hidden",
                }}
            />
        </div>
    )
}

export default MtTextArea