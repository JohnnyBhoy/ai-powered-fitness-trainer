import { GpfTraineeProps } from "@/types/gpf";
import { AcademicCapIcon, ChatBubbleBottomCenterIcon, ComputerDesktopIcon, FingerPrintIcon, FolderArrowDownIcon, ListBulletIcon, PencilSquareIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import {
    Tab,
    TabPanel,
    Tabs,
    TabsBody,
    TabsHeader,
} from "@material-tailwind/react";
import { handler } from "@material-tailwind/react/types/components/dialog";
import React from "react";
import AccountInfo from "../../Forms/AccountInfo";
import Biometrics from "../../Forms/Biometrics";
import Goals from "../../Forms/Goals";
import Messages from "../../Forms/Messages";
import Program from "../../Forms/Program";
import Nutrition from "../../Forms/Nutrition";
import Prompt from "../../Forms/Prompt";
import { Apple, MinecartLoaded } from "react-bootstrap-icons";
import { Brain } from "lucide-react";


type UpdateProps = {
    open: boolean,
    handleOpen: handler,
    traineeData: GpfTraineeProps,
    setReload: CallableFunction,
    reload: boolean,
}

export default function Update({ open, handleOpen, traineeData, setReload, reload }: UpdateProps) {
    const data = [
        {
            label: "Account",
            value: "account",
            desc: <AccountInfo data={traineeData} />,
            icon: UserCircleIcon,
        },

        {
            label: "Biometrics",
            value: "biometrics",
            desc: <Biometrics data={traineeData} />,
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
            desc: <Program data={traineeData} />,
            icon: ListBulletIcon,
        },
        {
            label: "Nutrition",
            value: "nutrition",
            desc: <Nutrition data={traineeData} />,
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
        <Tabs id="custom-animation" value="account">
            <div>
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
                }} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} placeholder={undefined}  >
                {data.map(({ value, desc }) => (
                    <TabPanel key={value} value={value}>
                        {desc}
                    </TabPanel>
                ))}
            </TabsBody>
        </Tabs>
    );
}