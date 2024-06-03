import BaseURL from "@utils/api/baseURL";

const getCurrentUser = () => {
    return BaseURL({
        url: `/users/profile`,
        method: "GET",
    });
}

const getAllUser = (params: any) => {
    return BaseURL({
        url: `/users`,
        method: "GET",
        params
    });
}

const getUserById = (id: string) => {
    return BaseURL({
        url: `/users/` + id,
        method: "GET",
    });
}


export { getCurrentUser, getAllUser, getUserById }