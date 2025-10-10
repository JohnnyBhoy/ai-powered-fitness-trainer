import { useProgramStore } from "@/stores/useProgramStore";
import { ProgramDataProps } from "@/types/program";

const ProgramData = ({ value, rows, name, onChange }: ProgramDataProps) => {
    const { update } = useProgramStore();

    return update ? (
        <textarea
            defaultValue={value}
            rows={rows}
            className="rounded p-1 mt-2 text-xs w-full dark:bg-white/[0.03]"
            name={name}
            onChange={onChange}
        />)
        : <h4>{value}</h4>

}

export default ProgramData