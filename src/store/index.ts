import {
    createStore,
    createTypedHooks,
    StateMapper,
    ActionMapper,
} from "easy-peasy";

import { authModel as auth, IAuthModel } from "./models/auth";
import { notifyModel as notify, INotifyModel } from "./models/notify";
import { userModel as user, IUserModel } from "./models/user";
import { companyModel as company, ICompanyModel } from "./models/company";
import { jobModel as job, IJobModel } from "./models/job";


export interface IStoreModel {
    auth: IAuthModel;
    notify: INotifyModel;
    user: IUserModel;
    company: ICompanyModel
    job: IJobModel
}

const storeModel: IStoreModel = {
    auth,
    notify,
    user,
    company,
    job
}

export const { useStoreActions, useStoreState, useStoreDispatch, useStore } =
    createTypedHooks<IStoreModel>();

interface IStateMapper extends StateMapper<IStoreModel> { }
interface IActionMapper extends ActionMapper<IStoreModel, keyof IStoreModel> { }

// Auth
export const authStateSelector = (state: IStateMapper) => state.auth;
export const authActionSelector = (state: IActionMapper) => state.auth;

// Notify
export const notifyStateSelector = (state: IStateMapper) => state.notify;
export const notifyActionSelector = (state: IActionMapper) => state.notify;

// User
export const userStateSelector = (state: IStateMapper) => state.user;
export const userActionSelector = (state: IActionMapper) => state.user;

// Company
export const companyStateSelector = (state: IStateMapper) => state.company;
export const companyActionSelector = (state: IActionMapper) => state.company;

// Job
export const jobStateSelector = (state: IStateMapper) => state.job;
export const jobActionSelector = (state: IActionMapper) => state.job;

const store = createStore(storeModel, {
    name: "store",
    // middleware,
});

export default store;