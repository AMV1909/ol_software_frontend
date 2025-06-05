"use client";

// TP
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

// BL
import { loginFormSchema, type LoginFormData } from "@/lib/schemas/forms/login";
import { useLogin } from "@/lib/hooks/queries/useQuerySession";
import { useAppStore } from "@/lib/store";

// UI
import { InputWithLabel } from "@/ui/molecules/Inputs/InputWithLabel";
import { Button } from "@/ui/atoms/Button";
import { CheckboxWithLabel } from "@/ui/molecules/Inputs/CheckboxWithLabel";

export function LoginForm() {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            terms: false,
        },
    });

    const { login } = useLogin();
    const router = useRouter();

    const onSubmit = async (data: LoginFormData) => {
        await login(data);
        router.push("/dashboard");
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-xl bg-white"
            noValidate
        >
            <header className="w-[500px] max-w-full">
                <h2 className="mx-auto w-2/3 py-2 text-center">
                    Digita tu correo electrónico y contraseña para iniciar
                    sesión
                </h2>
            </header>

            <div className="flex flex-col gap-4 border-t-2 border-gray-200 p-10">
                <InputWithLabel
                    label="Correo electrónico"
                    type="email"
                    {...register("email")}
                    autoComplete="email"
                    errorMessage={errors.email?.message}
                />

                <InputWithLabel
                    label="Contraseña"
                    type="password"
                    {...register("password")}
                    autoComplete="current-password"
                    errorMessage={errors.password?.message}
                />

                <Controller
                    control={control}
                    name="terms"
                    render={({ field }) => (
                        <CheckboxWithLabel
                            label="Acepto los términos y condiciones"
                            value={field.value ? "true" : "false"}
                            onClick={() => field.onChange(!field.value)}
                            errorMessage={errors.terms?.message}
                        />
                    )}
                />
                <Button disabled={isSubmitting}>Iniciar sesión</Button>
            </div>
        </form>
    );
}
