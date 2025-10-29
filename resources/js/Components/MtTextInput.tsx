import { Input, Typography } from '@material-tailwind/react'
import { HTMLInputTypeAttribute } from 'react'

type InputProps = {
    name: string,
    data: string | number | readonly string[] | undefined,
    type: HTMLInputTypeAttribute | undefined,
    onChange: (e: any) => void,
    error: string | undefined,
}

const MtTextInput = ({ name, data, type = "text", onChange, error }: InputProps) => {
    return (
        <div className="mb-1 flex flex-col gap-6 w-full">
            <Typography variant="h6" color="blue-gray" className="-mb-5 dark:text-white/90 text-gray-500 text-sm">
                {name?.charAt(0).toUpperCase() + name.slice(1)?.replace('_', " ")}
            </Typography>
            <Input
                color="gray"
                value={data}
                size="lg"
                type={type}
                onChange={onChange}
                autoComplete="new-password"
                name={name}
                className="peer w-full h-11 bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 resize-y disabled:bg-blue-gray-50 disabled:border-0 disabled:resize-none disabled:cursor-not-allowed transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900 !resize-none !w-full !border-[1.5px] bg-white text-gray-600 ring-4 ring-transparent focus:!border-primary focus:!border-t-blue-gray-900 group-hover:!border-primary dark:bg-gray-900 dark:text-white/90 dark:border-gray-700 dark:border-t-gray-800 !border-t-gray-700"
                containerProps={{
                    className: "!min-w-full",
                }}
                labelProps={{
                    className: "hidden",
                }}
            />
           {error &&  <span className='text-red-500 dark:text-gray-300'>{error}</span>}
        </div>
    )
}

export default MtTextInput