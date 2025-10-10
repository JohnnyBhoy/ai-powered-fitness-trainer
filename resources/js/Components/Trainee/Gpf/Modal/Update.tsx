import { GpfTraineeProps } from "@/types/gpf";
import { AcademicCapIcon, ChatBubbleBottomCenterIcon, FingerPrintIcon, ListBulletIcon, PencilSquareIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import {
    Tab,
    TabPanel,
    Tabs,
    TabsBody,
    TabsHeader,
} from "@material-tailwind/react";
import { Brain } from "lucide-react";
import React from "react";
import AccountInfo from "../../Forms/AccountInfo";
import Biometrics from "../../Forms/Biometrics";
import Goals from "../../Forms/Goals";
import Messages from "../../Forms/Messages";
import Nutrition from "../../Forms/Nutrition";
import Program from "../../Forms/Program";
import Prompt from "../../Forms/Prompt";


type UpdateProps = {
    traineeData: GpfTraineeProps
}

export default function Update({ traineeData }: UpdateProps) {

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
            desc: <Goals data={traineeData} />,
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
            icon: PencilSquareIcon,
        },
        {
            label: "AI Prompt",
            value: "prompt",
            desc: <Prompt data={traineeData} />,
            icon: Brain,
        },
    ];

    return (
        <div className="dark:bg-gray-900">
            <Tabs id="custom-animation" value="account">
                <div className="dark:bg-gray-900">
                    <TabsHeader className="dark:bg-white/[0.03] dark:text-gray-100">
                        {data.map(({ label, value, icon }) => (
                            <Tab key={value} value={value} className="dark:text-blue-500">
                                <div className="flex items-center gap-2 dart:text-blue-500">
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
                    }}
                    onPointerEnterCapture={undefined}
                    placeholder={undefined}
                    onPointerLeaveCapture={undefined}
                >
                    {data.map(({ value, desc }) => (
                        <TabPanel key={value} value={value}>
                            {desc}
                        </TabPanel>
                    ))}
                </TabsBody>
            </Tabs>
        </div>
    );
}