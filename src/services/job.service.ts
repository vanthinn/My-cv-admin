import BaseURL from "@utils/api/baseURL";

const getAllJobOffer = (params: any) => {
    return BaseURL({
        url: `/job-offer`,
        method: "GET",
        params,
    });
}

const getJobById = (params: { jobId: string, userId?: string }) => {
    return BaseURL({
        url: `/job-offer/job-detail`,
        method: "GET",
        params
    });
}

const applyJob = (data: { jobId: string }) => {
    return BaseURL({
        url: `/job-apply`,
        method: "POST",
        data
    });
}

const getJoBApplyByJobId = (data: { id: string, params: any }) => {
    const { id, params } = data;
    return BaseURL({
        url: `/job-apply/job/` + id,
        method: "GET",
        params
    });
}

const deleteJobApply = (id: string) => {
    return BaseURL({
        url: `/job-apply/` + id,
        method: "DELETE",
    });
}

const getAllJobApply = (params: any) => {
    return BaseURL({
        url: `/job-apply`,
        method: "GET",
        params,
    });
}


export { getAllJobOffer, getJobById, applyJob, getJoBApplyByJobId, deleteJobApply, getAllJobApply }