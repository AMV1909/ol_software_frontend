import type { ResponseType } from "axios";

import { api } from "@/lib/utils/axios";
import { clearFalsyData } from "@/lib/helpers/clearFalsyData";

interface GetDataProps {
    endpoint: string;
    token?: string;
    params?: object;
    responseType?: ResponseType;
}

export const getData = async ({
    endpoint,
    token,
    params,
    responseType,
}: GetDataProps) => {
    const headers = { Authorization: `Bearer ${token}` };

    return api
        .get(endpoint, {
            headers,
            ...(params && { params: clearFalsyData(params) }),
            responseType,
        })
        .then((res) => res.data)
        .catch((err) => {
            console.error(err);
            throw err;
        });
};

interface PostDataProps {
    endpoint: string;
    data: object;
    token?: string;
    responseType?: ResponseType;
    isFormData?: boolean;
}

export const postData = async ({
    endpoint,
    data,
    token,
    responseType,
    isFormData,
}: PostDataProps) => {
    const headers = {
        Authorization: `Bearer ${token}`,
        ...(isFormData && { "Content-Type": "multipart/form-data" }),
    };

    return api
        .post(endpoint, data, { headers, responseType })
        .then((res) => res.data)
        .catch((err) => {
            console.error(err);
            throw err;
        });
};

interface PatchDataProps {
    endpoint: string;
    data: object;
    token?: string;
    responseType?: ResponseType;
}

export const patchData = async ({
    endpoint,
    data,
    token,
    responseType,
}: PatchDataProps) => {
    const headers = { Authorization: `Bearer ${token}` };

    return api
        .patch(endpoint, data, { headers, responseType })
        .then((res) => res.data)
        .catch((err) => {
            console.error(err);
            throw err;
        });
};

interface PutDataProps {
    endpoint: string;
    data: object;
    token?: string;
    responseType?: ResponseType;
    isFormData?: boolean;
}

export const putData = async ({
    endpoint,
    data,
    token,
    responseType,
    isFormData,
}: PutDataProps) => {
    const headers = {
        Authorization: `Bearer ${token}`,
        ...(isFormData && { "Content-Type": "multipart/form-data" }),
    };

    return api
        .put(endpoint, data, { headers, responseType })
        .then((res) => res.data)
        .catch((err) => {
            console.error(err);
            throw err;
        });
};

interface DeleteDataProps {
    endpoint: string;
    token?: string;
    responseType?: ResponseType;
}

export const deleteData = async ({
    endpoint,
    token,
    responseType,
}: DeleteDataProps) => {
    const headers = { Authorization: `Bearer ${token}` };

    return api
        .delete(endpoint, { headers, responseType })
        .then((res) => res.data)
        .catch((err) => {
            console.error(err);
            throw err;
        });
};
