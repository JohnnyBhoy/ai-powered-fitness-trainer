import { GpfTraineeProps } from "@/types/gpf";
import { AcademicCapIcon, ChatBubbleBottomCenterIcon, FingerPrintIcon, FolderArrowDownIcon, ListBulletIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import {
    Tab,
    TabPanel,
    Tabs,
    TabsBody,
    TabsHeader,
} from "@material-tailwind/react";
import { handler } from "@material-tailwind/react/types/components/dialog";
import React from "react";
import Prompt from "./Prompt";
import AccountInfo from "./AccountInfo";
import Biometrics from "./Biometrics";
import Goals from "./Goals";
import Messages from "./Messages";
import Program from "./Program";
import Nutrition from "./Nutrition";


type UpdateProps = {
    open: boolean,
    handleOpen: handler,
    traineeData: GpfTraineeProps,
    setReload: CallableFunction,
    reload: boolean,
}

export default function Update({ open, handleOpen, traineeData, setReload, reload }: UpdateProps) {
    console.log('data: ',traineeData);

    const data = [
        {
            label: "Account",
            value: "account",
            desc: <AccountInfo userData={traineeData} />,
            icon: UserCircleIcon,
        },

        {
            label: "Biometrics",
            value: "biometrics",
            desc: <Biometrics userData={traineeData} />,
            icon: FingerPrintIcon,
        },

        {
            label: "Goals",
            value: "goals",
            desc: <Goals userData={traineeData} />,
            icon: AcademicCapIcon,
        },

        {
            label: "Messages",
            value: "messages",
            desc: <Messages data={traineeData} />,
            icon: ChatBubbleBottomCenterIcon,
        },
        {
            label: "Program",
            value: "program",
            desc: <Program data={traineeData?.program_data} />,
            icon: ListBulletIcon,
        },
        {
            label: "Nutrition",
            value: "nutrition",
            desc: <Nutrition data={traineeData?.nutrition_plan} />,
            icon: FolderArrowDownIcon,
        },
        {
            label: "AI Prompt",
            value: "prompt",
            desc: <Prompt data={traineeData} />,
            icon: FolderArrowDownIcon,
        },
    ];

    return (
        <Tabs id="custom-animation" value="account">
            <div className="">
                <TabsHeader>
                    {data.map(({ label, value, icon }) => (
                        <Tab key={value} value={value}>
                            <div className="flex items-center gap-2">
                                {React.createElement(icon, { className: "w-5 h-5" })}
                                {label}
                            </div>
                        </Tab>
                    ))}
                </TabsHeader>
            </div>
            <TabsBody
                animate={{
                    initial: { y: 250 },
                    mount: { y: 0 },
                    unmount: { y: 250 },
                }} onPointerEnterCapture={undefined} placeholder={undefined} onPointerLeaveCapture={undefined}  >
                {data.map(({ value, desc }) => (
                    <TabPanel key={value} value={value}>
                        {desc}
                    </TabPanel>
                ))}
            </TabsBody>
        </Tabs>
    );
}