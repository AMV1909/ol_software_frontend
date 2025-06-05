export const clearFalsyData = (data: object) => {
    return Object.fromEntries(
        Object.entries(data).filter(([, value]) => !!value),
    );
};
