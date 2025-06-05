import { getData } from "@/lib/helpers/requests";
import { validateZodSchema } from "@/lib/helpers/zodValidator";
import { municipalitiesSchema } from "@/lib/schemas/entities/municipality";
import { municipalityRoutes } from "@/lib/utils/routes";
import { useQuery } from "@tanstack/react-query";

const getMunicipalities = async () => {
    const token = localStorage.getItem("token");

    if (!token) throw new Error("No token found");

    const response = await getData({
        endpoint: municipalityRoutes.get,
        token,
    });

    const validation = validateZodSchema(municipalitiesSchema, response);

    if (!validation.success) {
        console.error(validation.error);

        throw new Error("Data validation failed in 'useQueryMunicipalities'");
    }

    return validation.data;
};

export const useQueryMunicipalities = () => {
    const { data, isLoading, ...rest } = useQuery({
        queryKey: ["municipalities"],
        queryFn: getMunicipalities,
        staleTime: Infinity,
    });

    return {
        municipalities: data || [],
        isLoadingMunicipalities: isLoading,
        ...rest,
    };
};
