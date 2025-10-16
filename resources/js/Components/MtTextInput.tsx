import { Input, Typography } from '@material-tailwind/react'
import { HTMLInputTypeAttribute } from 'react'

type InputProps = {
    name: string,
    data: string | number | readonly string[] | undefined,
    type: HTMLInputTypeAttribute | undefined,
    onChange: (e: any) => void,
}

const MtTextInput = ({ name, data, type = "text", onChange }: InputProps) => {
    return (
        <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3 dark:text-gray-500 text-gray-500">
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
                className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs 
                       placeholder:text-gray-400 focus:outline-hidden focus:ring-3 bg-transparent text-gray-800 
                       border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 
                       dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 
                       dark:border-gray-700 dark:focus:border-brand-800 pl-4"
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