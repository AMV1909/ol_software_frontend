"use client";

// TP
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

// BL
import { cn } from "@/lib/utils/cn";
import { useQueryMunicipalities } from "@/lib/hooks/queries/useQueryMunicipalities";
import {
    type BusinessmanSingle,
    businessmanStatusesMap,
} from "@/lib/schemas/entities/businessman";
import {
    businessmanFormSchema,
    type BusinessmanFormData,
} from "@/lib/schemas/forms/businessman";
import {
    useCreateBusinessman,
    useUpdateBusinessman,
} from "@/lib/hooks/queries/useQueryBusinessmen";

// UI
import { Button } from "@/ui/atoms/Button";
import { InputWithLabel } from "@/ui/molecules/Inputs/InputWithLabel";
import { SelectWithLabel } from "@/ui/molecules/Inputs/SelectWithLabel";

type Props =
    | {
          mode: "create";
          businessman?: BusinessmanSingle;
      }
    | {
          mode: "edit";
          businessman: BusinessmanSingle;
      };

export function BusinessmanForm({ mode, businessman }: Props) {
    const {
        control,
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<BusinessmanFormData>({
        resolver: zodResolver(businessmanFormSchema),
        defaultValues: businessman
            ? {
                  name: businessman.name,
                  municipalityId: businessman.municipality.id,
                  phone: businessman.phone ?? "",
                  email: businessman.email ?? "",
                  status: businessman.status ?? "",
              }
            : undefined,
    });

    const { municipalities } = useQueryMunicipalities();

    const { createBusinessman } = useCreateBusinessman();
    const { updateBusinessman } = useUpdateBusinessman(businessman?.id!);

    const router = useRouter();

    const footerData = [
        {
            label: "Total Ingresos Formulario:",
            value: `$${businessman?.totalIncome}`,
        },
        {
            label: "Cantidad de empleados:",
            value: businessman?.totalEmployees,
        },
    ];

    const onSubmit = async (data: BusinessmanFormData) => {
        if (mode === "create") {
            await createBusinessman(data);
        } else {
            await updateBusinessman(data);
        }

        router.push("/dashboard");
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-lg border border-gray-200 bg-white"
            noValidate
        >
            <header className="border-b border-gray-200 px-10 py-4">
                <h2 className="text-2xl font-bold text-blue-900">
                    Datos Generales
                </h2>
            </header>

            <div className="grid grid-cols-2 px-20 py-10">
                <div className="flex flex-col gap-4 pr-10">
                    <InputWithLabel
                        label="Nombre"
                        {...register("name")}
                        errorMessage={errors.name?.message}
                    />

                    <Controller
                        control={control}
                        name="municipalityId"
                        render={({ field }) => (
                            <SelectWithLabel
                                label="Municipio"
                                options={municipalities.map((municipality) => ({
                                    label: municipality.name,
                                    value: municipality.id,
                                }))}
                                {...field}
                                errorMessage={errors.municipalityId?.message}
                            />
                        )}
                    />

                    <InputWithLabel
                        label="Teléfono"
                        type="tel"
                        {...register("phone")}
                        errorMessage={errors.phone?.message}
                    />
                </div>

                <div className="flex flex-col gap-4 border-l border-gray-200 pl-10">
                    <InputWithLabel
                        label="Email"
                        type="email"
                        {...register("email")}
                        errorMessage={errors.email?.message}
                    />

                    <Controller
                        control={control}
                        name="status"
                        render={({ field }) => (
                            <SelectWithLabel
                                label="Estado"
                                options={Object.entries(
                                    businessmanStatusesMap,
                                ).map(([key, value]) => ({
                                    label: value,
                                    value: key,
                                }))}
                                {...field}
                                errorMessage={errors.status?.message}
                            />
                        )}
                    />
                </div>
            </div>

            <footer className="fixed inset-x-0 right-10 bottom-0 left-10 flex h-[10vh] flex-1 items-center justify-between rounded-t-lg bg-blue-900 px-10 py-2">
                <div className="flex items-center gap-20">
                    {mode === "edit" &&
                        footerData.map((item, index) => (
                            <div
                                key={index}
                                className={cn(
                                    index === 0 && "pr-20",
                                    index === 1 &&
                                        "border-l border-blue-200 pl-20",
                                )}
                            >
                                <p className="text-white">{item.label}</p>

                                <p className="text-2xl font-bold text-blue-200">
                                    {item.value}
                                </p>
                            </div>
                        ))}
                </div>

                <div className="flex h-full items-center gap-4 rounded-lg border border-blue-200/10 px-2">
                    <p className="text-white">
                        Si ya ingresaste todos los datos, crea tu formulario
                        aquí
                    </p>

                    <Button disabled={isSubmitting}>Enviar formulario</Button>
                </div>
            </footer>
        </form>
    );
}
