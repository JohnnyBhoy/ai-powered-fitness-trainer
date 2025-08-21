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
                className="mb-2 text-left font-medium"
            >
                {name}
            </Typography>
            <Textarea
                value={data}
                rows={row}
                onChange={() => {}}
                placeholder="eg. This is a white shoes with a comfortable sole."
                className="!w-full !border-[1.5px] !border-blue-gray-200/90 !border-t-blue-gray-200/90 bg-white text-gray-600 ring-4 ring-transparent focus:!border-primary focus:!border-t-blue-gray-900 group-hover:!border-primary"
                labelProps={{
                    className: "hidden",
                }}
            />
        </div>
    )
}

export default MtTextArea