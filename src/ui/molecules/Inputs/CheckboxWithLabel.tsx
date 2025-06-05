import { useId, type ComponentProps, type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import { Checkbox } from "@/ui/atoms/Inputs/Checkbox";

interface Props extends ComponentProps<typeof Checkbox> {
    label: string | ReactNode;
    errorMessage?: string;
}

export function CheckboxWithLabel({
    label,
    className,
    required,
    errorMessage,
    ...props
}: Props) {
    const id = useId();

    return (
        <div className="flex flex-col gap-1">
            <div className={cn("flex items-center gap-2", className)}>
                <Checkbox id={id} {...props} />

                <label htmlFor={id} className="cursor-pointer text-sm">
                    {label} {required && "*"}
                </label>
            </div>

            {errorMessage && (
                <p className="text-destructive inline-flex text-sm">
                    {errorMessage}
                </p>
            )}
        </div>
    );
}
