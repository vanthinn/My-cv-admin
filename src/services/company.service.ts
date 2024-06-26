import { ICompany } from "@interfaces/ICompany";
import BaseURL from "@utils/api/baseURL";

const getAllCompany = (params: any) => {
    return BaseURL({
        url: `/company`,
        method: "GET",
        params,
    });
};

const getCompanyById = (id: string) => {
    return BaseURL({
        url: `/company/${id}`,
        method: "GET",
    });
};

const createCompany = (data: Omit<ICompany, 'id'>) => {
    return BaseURL({
        url: `/company`,
        method: "POST",
        data,
    });
}

const updateCompany = (data: ICompany) => {
    return BaseURL({
        url: `/company/${data.id}`,
        method: "PUT",
        data,
    });
}


const deleteCompany = (id: string) => {
    return BaseURL({
        url: `/company/${id}`,
        method: "DELETE",
    });
}


export { getAllCompany, getCompanyById, updateCompany, createCompany, deleteCompany }