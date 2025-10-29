import React, { ReactNode } from 'react'

type InputWithIconProps = {
    id: string
    placeholder: string
    type: string
    icon: ReactNode
    value: string | number
    onChange: (e: any) => void
    name: string
}

const InputWithIcon = ({ id, placeholder, type, icon, value, name, onChange }: InputWithIconProps) => {
    return <div className="">
        <label htmlFor="first_name" className="dark:text-white/90">{
            name?.replace("_", " ")?.replace(name?.charAt(0), name?.charAt(0)?.toUpperCase())}
        </label>
        <div className="relative">
            <input
                id={id}
                placeholder={placeholder}
                type={type}
                value={value}
                name={name}
                autoComplete="new-password"
                onChange={onChange}
                className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs 
                       placeholder:text-gray-400 focus:outline-hidden focus:ring-3 bg-transparent text-gray-800 
                       border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 
                       dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 
                       dark:border-gray-700 dark:focus:border-brand-800 pl-11"
            />
            <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none left-4 top-1/2 dark:text-gray-400">
                {icon}
            </span>
        </div>
    </div>
}

export default InputWithIcon
