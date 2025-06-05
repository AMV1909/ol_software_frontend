import { useState } from "react";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { queryClient } from "@/app/providers";
import {
    deleteData,
    getData,
    patchData,
    postData,
} from "@/lib/helpers/requests";
import { validateZodSchema } from "@/lib/helpers/zodValidator";
import {
    businessmanListSchema,
    businessmanSchema,
    businessmanSingleSchema,
    type Businessman,
} from "@/lib/schemas/entities/businessman";
import { businessmanRoutes } from "@/lib/utils/routes";
import { downloadFile } from "@/lib/helpers/downloadFile";
import type { BusinessmanFormData } from "@/lib/schemas/forms/businessman";
import type { AxiosError } from "axios";

interface QueryParams {
    page?: number;
    limit?: number;
}

const getBusinessmen = async (params: QueryParams) => {
    const token = localStorage.getItem("token");

    if (!token) throw new Error("No token found");

    const response = await getData({
        endpoint: businessmanRoutes.get,
        params,
        token,
    });

    const validation = validateZodSchema(businessmanListSchema, response);

    if (!validation.success) {
        console.error(validation.error.message);

        throw new Error("Data validation failed in 'getBusinessmen'");
    }

    return validation.data;
};

export const useQueryBusinessmen = (params: QueryParams) => {
    const [page, setPage] = useState(1);

    const { data, isLoading, ...rest } = useInfiniteQuery({
        queryKey: ["businessmen", { ...params, page }],
        queryFn: ({ pageParam }) =>
            getBusinessmen({ ...params, page: pageParam }),
        initialPageParam: page,
        getPreviousPageParam: (firstPage) =>
            firstPage.info.page > 1 ? firstPage.info.page - 1 : undefined,
        getNextPageParam: (lastPage) =>
            lastPage.info.page < lastPage.info.totalPages
                ? lastPage.info.page + 1
                : undefined,
    });

    const goToPage = (page: number) => setPage(page);

    return {
        businessmen: data?.pages.flatMap((page) => page.businessmen) || [],
        isLoadingBusinessmen: isLoading,
        info: {
            page,
            totalPages: data?.pages[0].info.totalPages || 0,
        },
        goToPage,
        ...rest,
    };
};

const getBusinessman = async (id: number) => {
    const token = localStorage.getItem("token");

    if (!token) throw new Error("No token found");

    const response = await getData({
        endpoint: businessmanRoutes.getById(id),
        token,
    });

    const validation = validateZodSchema(businessmanSingleSchema, response);

    if (!validation.success) {
        console.error(validation.error.message);

        throw new Error("Data validation failed in 'getBusinessman'");
    }

    return validation.data;
};

export const useQueryBusinessman = (id: number) => {
    const { data, isLoading, ...rest } = useQuery({
        queryKey: ["businessman", id],
        queryFn: () => getBusinessman(id),
    });

    return { businessman: data, isLoadingBusinessman: isLoading, ...rest };
};

const getReport = async () => {
    const token = localStorage.getItem("token");

    if (!token) throw new Error("No token found");

    const response = await getData({
        endpoint: businessmanRoutes.getReport,
        token,
        responseType: "blob",
    });

    downloadFile(response, "report.csv");
};

export const useQueryReport = () => {
    const { mutateAsync, isPending, ...rest } = useMutation({
        mutationFn: getReport,
        onMutate: () =>
            toast.loading("Generando reporte...", { id: "loading" }),
        onSuccess: () => {
            toast.success("Reporte generado correctamente");
        },
        onError: () => {
            toast.error("Error al generar reporte");
        },
        onSettled: () => toast.dismiss("loading"),
    });

    return {
        downloadReport: mutateAsync,
        isDownloadingReport: isPending,
        ...rest,
    };
};

const createBusinessman = async (data: BusinessmanFormData) => {
    const token = localStorage.getItem("token");

    if (!token) throw new Error("No token found");

    await postData({
        endpoint: businessmanRoutes.create,
        data,
        token,
    });
};

export const useCreateBusinessman = () => {
    const { mutateAsync, isPending, ...rest } = useMutation({
        mutationFn: createBusinessman,
        onMutate: () =>
            toast.loading("Creando comerciante...", { id: "loading" }),
        onSuccess: () => {
            toast.success("Comerciante creado correctamente");
            queryClient.invalidateQueries({ queryKey: ["businessmen"] });
        },
        onError: (error: AxiosError) => {
            if (error.response?.status === 409) {
                toast.error("El email proporcionado ya está en uso");
                return;
            }

            toast.error("Error al crear comerciante");
        },
        onSettled: () => toast.dismiss("loading"),
    });

    return {
        createBusinessman: mutateAsync,
        isCreatingBusinessman: isPending,
        ...rest,
    };
};

const patchBusinessmanStatus = async (
    id: number,
    status: Businessman["status"],
) => {
    const token = localStorage.getItem("token");

    if (!token) throw new Error("No token found");

    await patchData({
        endpoint: businessmanRoutes.patchStatus(id),
        data: { status },
        token,
    });
};

export const usePatchBusinessmanStatus = (id: number) => {
    const { mutateAsync, isPending, ...rest } = useMutation({
        mutationFn: (status: Businessman["status"]) =>
            patchBusinessmanStatus(id, status),
        onMutate: () =>
            toast.loading("Actualizando estado...", { id: "loading" }),
        onSuccess: () => {
            toast.success("Estado actualizado correctamente");
            queryClient.invalidateQueries({ queryKey: ["businessmen"] });
        },
        onError: () => {
            toast.error("Error al actualizar estado");
        },
        onSettled: () => toast.dismiss("loading"),
    });

    return {
        updateBusinessmanStatus: mutateAsync,
        isUpdatingBusinessmanStatus: isPending,
        ...rest,
    };
};

const deleteBusinessman = async (id: number) => {
    const token = localStorage.getItem("token");

    if (!token) throw new Error("No token found");

    await deleteData({
        endpoint: businessmanRoutes.delete(id),
        token,
    });
};

export const useDeleteBusinessman = (id: number) => {
    const { mutateAsync, isPending, ...rest } = useMutation({
        mutationFn: deleteBusinessman,
        onMutate: () =>
            toast.loading("Eliminando comerciante...", { id: "loading" }),
        onSuccess: () => {
            toast.success("Comerciante eliminado correctamente");
            queryClient.invalidateQueries({ queryKey: ["businessmen"] });
        },
        onError: () => {
            toast.error("Error al eliminar comerciante");
        },
        onSettled: () => toast.dismiss("loading"),
    });

    return {
        deleteBusinessman: mutateAsync,
        isDeletingBusinessman: isPending,
        ...rest,
    };
};

const updateBusinessman = async (id: number, data: BusinessmanFormData) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    await patchData({
        endpoint: businessmanRoutes.update(id),
        data,
        token,
    });
};

export const useUpdateBusinessman = (id: number) => {
    const { mutateAsync, isPending, ...rest } = useMutation({
        mutationFn: (data: BusinessmanFormData) => updateBusinessman(id, data),
        onMutate: () =>
            toast.loading("Actualizando comerciante...", { id: "loading" }),
        onSuccess: () => {
            toast.success("Comerciante actualizado correctamente");
            queryClient.invalidateQueries({ queryKey: ["businessmen"] });
            queryClient.invalidateQueries({ queryKey: ["businessman", id] });
        },
        onError: (error: AxiosError) => {
            if (error.response?.status === 409) {
                toast.error("El email proporcionado ya está en uso");
                return;
            }

            toast.error("Error al actualizar comerciante");
        },
        onSettled: () => toast.dismiss("loading"),
    });

    return {
        updateBusinessman: mutateAsync,
        isUpdatingBusinessman: isPending,
        ...rest,
    };
};
