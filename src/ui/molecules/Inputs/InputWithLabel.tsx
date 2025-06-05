import { useId, type ComponentProps } from "react";
import { cn } from "@/lib/utils/cn";
import { Input } from "@/ui/atoms/Inputs/Input";

interface Props extends ComponentProps<typeof Input> {
    label: string;
}

export function InputWithLabel({
    label,
    required,
    className,
    ...props
}: Props) {
    const id = useId();

    return (
        <div
            className={cn(
                "relative flex flex-col gap-1",
                className,
                props.type === "radio" && "flex-row-reverse items-center",
            )}
        >
            <label
                htmlFor={id}
                className={cn(
                    "absolute -top-2 left-2 bg-white px-1 text-sm text-gray-500",
                    props.type === "radio" && "text-base",
                )}
            >
                {label}
            </label>

            <Input id={id} {...props} />
        </div>
    );
}
