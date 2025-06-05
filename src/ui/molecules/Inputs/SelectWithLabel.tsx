import { useId, type ComponentProps } from "react";
import { cn } from "@/lib/utils/cn";
import { Select } from "@/ui/atoms/Inputs/Select";

type Props = ComponentProps<typeof Select> & {
    label: string;
    className?: string;
};

export function SelectWithLabel({ label, className, ...props }: Props) {
    const id = useId();

    return (
        <div className={cn("relative flex flex-col gap-1", className)}>
            <label
                htmlFor={id}
                className="absolute -top-2 left-2 bg-white px-1 text-sm text-gray-500"
            >
                {label}
            </label>

            <Select id={id} {...props} />
        </div>
    );
}
