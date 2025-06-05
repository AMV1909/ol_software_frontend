const API_PREFIX = "/api";

export const sessionRoutes = {
    login: `${API_PREFIX}/login`,
};

export const businessmanRoutes = {
    get: `${API_PREFIX}/businessmen`,
    getById: (id: number) => `${API_PREFIX}/businessmen/${id}`,
    getReport: `${API_PREFIX}/businessmen/report`,
    create: `${API_PREFIX}/businessmen`,
    update: (id: number) => `${API_PREFIX}/businessmen/${id}`,
    patchStatus: (id: number) => `${API_PREFIX}/businessmen/${id}/status`,
    delete: (id: number) => `${API_PREFIX}/businessmen/${id}`,
};

export const municipalityRoutes = {
    get: `${API_PREFIX}/municipalities`,
};
