import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import { postData } from "@/lib/helpers/requests";
import { validateZodSchema } from "@/lib/helpers/zodValidator";
import { userSchema } from "@/lib/schemas/entities/user";
import { sessionRoutes } from "@/lib/utils/routes";
import { useAppStore } from "@/lib/store";
import type { AxiosError } from "axios";

interface LoginParams {
    email: string;
    password: string;
}

const login = async (params: LoginParams) => {
    const response = await postData({
        endpoint: sessionRoutes.login,
        data: params,
    });

    const validation = validateZodSchema(userSchema, response.user);

    if (!validation.success) {
        console.error(validation.error.message);

        throw new Error("Data validation failed in 'useQuerySession'");
    }

    return { user: validation.data, token: response.access_token };
};

export const useLogin = () => {
    const { setUser } = useAppStore();

    const { mutateAsync, isPending, ...rest } = useMutation({
        mutationFn: login,
        onMutate: () => toast.loading("Iniciando sesión...", { id: "login" }),
        onSuccess: ({ user, token }) => {
            toast.success("Sesión iniciada correctamente");
            localStorage.setItem("token", token);
            setUser(user);
        },
        onError: (error: AxiosError) => {
            if (error.response?.status === 401) {
                toast.error("Credenciales incorrectas");
                return;
            }

            toast.error("Error al iniciar sesión");
        },
        onSettled: () => toast.dismiss("login"),
    });

    return { login: mutateAsync, isLoggingIn: isPending, ...rest };
};
