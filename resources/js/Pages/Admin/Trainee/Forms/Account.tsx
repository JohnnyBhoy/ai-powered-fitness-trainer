import { Input, Radio, Typography } from '@material-tailwind/react'

const Account = ({ data, setData }: any) => {
    return (
        <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">

                {/** First Name */}
                <div className="w-full">
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="mb-2 text-left font-medium"
                    >
                        First Name
                    </Typography>
                    <Input
                        color="gray"
                        size="lg"
                        value={data?.first_name}
                        onChange={(e: any) => setData('first_name', e.target.value)}
                        name="weight"
                        className="placeholder:opacity-100 focus:!border-t-gray-900"
                        containerProps={{
                            className: "!min-w-full",
                        }}
                        labelProps={{
                            className: "hidden",
                        }}
                    />
                </div>

                {/** Last Name */}
                <div className="w-full">
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="mb-2 text-left font-medium"
                    >
                        Last Name
                    </Typography>
                    <Input
                        color="gray"
                        size="lg"
                        className="placeholder:opacity-100 focus:!border-t-gray-900"
                        name="size"
                        containerProps={{
                            className: "!min-w-full",
                        }}
                        labelProps={{
                            className: "hidden",
                        }}
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-7">
                {/** User name */}
                <div className="w-full mt-7">
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="mb-2 text-left font-medium"
                    >
                        User Name
                    </Typography>
                    <Input
                        color="gray"
                        size="lg"
                        name="size"
                        className="placeholder:opacity-100 focus:!border-t-gray-900"
                        containerProps={{
                            className: "!min-w-full",
                        }}
                        labelProps={{
                            className: "hidden",
                        }}
                    />
                </div>
                <div className="w-full mt-7">
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="mb-2 text-left font-medium"
                    >
                        Promo Account
                    </Typography>
                    <div className="flex gap-10">
                        <Radio name="type" label="No" ripple={true} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} />
                        <Radio name="type" label="Yes" ripple={false} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} />
                    </div>
                </div>
            </div>

            {/**Email */}
            <div className="w-full mt-7">
                <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 text-left font-medium"
                >
                    Email
                </Typography>
                <Input
                    color="gray"
                    size="lg"
                    type="email"
                    autoComplete="off"
                    className="placeholder:opacity-100 focus:!border-t-gray-900"
                    name="size"
                    containerProps={{
                        className: "!min-w-full",
                    }}
                    labelProps={{
                        className: "hidden",
                    }}
                />
            </div>

            {/** Password */}
            <div className="flex gap-7 mt-7">
                <div className="w-full">
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="mb-2 text-left font-medium"
                    >
                        Password
                    </Typography>
                    <Input
                        color="gray"
                        size="lg"
                        type="password"
                        autoComplete="new-password"
                        name="weight"
                        className="placeholder:opacity-100 focus:!border-t-gray-900"
                        containerProps={{
                            className: "!min-w-full",
                        }}
                        labelProps={{
                            className: "hidden",
                        }}
                    />
                </div>
                <div className="w-full">
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="mb-2 text-left font-medium"
                    >
                        Confirm Password
                    </Typography>
                    <Input
                        color="gray"
                        size="lg"
                        type="password"
                        autoComplete="new-password"
                        name="size"
                        className="placeholder:opacity-100 focus:!border-t-gray-900"
                        containerProps={{
                            className: "!min-w-full",
                        }}
                        labelProps={{
                            className: "hidden",
                        }}
                    />
                </div>

            </div>

        </div>
    )
}

export default Account