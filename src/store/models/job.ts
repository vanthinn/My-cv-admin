import { Action, Thunk, action, persist, thunk } from "easy-peasy";
import { applyJob, deleteJobApply, getAllJobApply, getAllJobOffer, getJoBApplyByJobId, getJobById } from "../../services/job.service";

export interface IJobModel {
    //MessageError
    messageErrorJob: string;
    setMessageErrorJob: Action<IJobModel, string>;

    //GetAllJob
    isGetAllJobSuccess: boolean;
    setIsGetAllJobSuccess: Action<IJobModel, boolean>;
    getAllJob: Thunk<IJobModel, any>;

    //GetAllJobById
    isGetJobByIdSuccess: boolean;
    setIsGetJobByIdSuccess: Action<IJobModel, boolean>;
    getJobById: Thunk<IJobModel, { jobId: string, userId?: string }>;

    //ApplyJob
    isApplyJobSuccess: boolean;
    setIsApplyJobSuccess: Action<IJobModel, boolean>;
    applyJob: Thunk<IJobModel, { jobId: string }>;

    //deleteJobApply
    isDeleteJobApplySuccess: boolean;
    setIsDeleteJobApplySuccess: Action<IJobModel, boolean>;
    deleteJobApply: Thunk<IJobModel, string>;

    //getJobApplyByJobId
    isGetJobApplyByJobId: boolean;
    setIsGetJobApplyByJobId: Action<IJobModel, boolean>;
    getJobApplyByJobId: Thunk<IJobModel, { id: string, params: any }>;

    //GetAllJobApply
    isGetAllJobApplySuccess: boolean;
    setIsGetAllJobApplySuccess: Action<IJobModel, boolean>;
    getAllJobApply: Thunk<IJobModel, any>;
}

export const jobModel: IJobModel = persist({
    messageErrorJob: "",
    setMessageErrorJob: action((state, payload) => {
        state.messageErrorJob = payload;
    }),

    isGetAllJobSuccess: true,
    setIsGetAllJobSuccess: action((state, payload) => {
        state.isGetAllJobSuccess = payload;
    }),
    getAllJob: thunk(async (actions, payload) => {
        return getAllJobOffer(payload)
            .then(async (res) => {
                actions.setIsGetAllJobSuccess(true)
                return res.data;
            })
            .catch((error) => {
                console.log(error)
                actions.setIsGetAllJobSuccess(false)
                actions.setMessageErrorJob(error?.response?.data?.message)
            });
    }),

    //GetJobById
    isGetJobByIdSuccess: true,
    setIsGetJobByIdSuccess: action((state, payload) => {
        state.isGetJobByIdSuccess = payload;
    }),
    getJobById: thunk(async (actions, payload) => {
        return getJobById(payload)
            .then(async (res) => {
                actions.setIsGetJobByIdSuccess(true)
                return res.data;
            })
            .catch((error) => {
                actions.setIsGetJobByIdSuccess(false)
                actions.setMessageErrorJob(error?.response?.data?.message)
            });
    }),

    //GetJobById
    isApplyJobSuccess: true,
    setIsApplyJobSuccess: action((state, payload) => {
        state.isApplyJobSuccess = payload;
    }),
    applyJob: thunk(async (actions, payload) => {
        return applyJob(payload)
            .then(async (res) => {
                actions.setIsApplyJobSuccess(true)
                return res;
            })
            .catch((error) => {
                actions.setIsApplyJobSuccess(false)
                actions.setMessageErrorJob(error?.response?.data?.message)
            });
    }),

    //getJobApplyByJobId
    isGetJobApplyByJobId: true,
    setIsGetJobApplyByJobId: action((state, payload) => {
        state.isGetJobApplyByJobId = payload;
    }),
    getJobApplyByJobId: thunk(async (actions, payload) => {
        return getJoBApplyByJobId(payload)
            .then(async (res) => {
                actions.setIsGetJobApplyByJobId(true)
                return res.data;
            })
            .catch((error) => {
                actions.setIsGetJobApplyByJobId(false)
                actions.setMessageErrorJob(error?.response?.data?.message)
            });
    }),


    isDeleteJobApplySuccess: true,
    setIsDeleteJobApplySuccess: action((state, payload) => {
        state.isDeleteJobApplySuccess = payload;
    }),
    deleteJobApply: thunk(async (actions, payload) => {
        return deleteJobApply(payload)
            .then(async (res) => {
                actions.setIsDeleteJobApplySuccess(true)
                return res;
            })
            .catch((error) => {
                actions.setIsDeleteJobApplySuccess(false)
                actions.setMessageErrorJob(error?.response?.data?.message)
            });
    }),

    isGetAllJobApplySuccess: true,
    setIsGetAllJobApplySuccess: action((state, payload) => {
        state.isGetAllJobApplySuccess = payload;
    }),
    getAllJobApply: thunk(async (actions, payload) => {
        return getAllJobApply(payload)
            .then(async (res) => {
                actions.setIsGetAllJobApplySuccess(true)
                return res.data;
            })
            .catch((error) => {
                console.log(error)
                actions.setIsGetAllJobApplySuccess(false)
                actions.setMessageErrorJob(error?.response?.data?.message)
            });
    }),

})