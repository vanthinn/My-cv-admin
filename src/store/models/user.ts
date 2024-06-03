// import { postImage } from '../../services/image.service';
import { IUser } from "@interfaces/IUser";
import { persist, action, Action, thunk, Thunk } from "easy-peasy";
import { getAllUser, getCurrentUser, getUserById } from "../../services/user.service";
import { postImage } from "../../services/image.service";

export interface IUserModel {
    //MessageError
    messageErrorUser: string;
    setMessageErrorUser: Action<IUserModel, string>;

    //GetCurrentUser
    currentUserSuccess: null | IUser;
    setCurrentUserSuccess: Action<IUserModel, IUser | null>;

    isGetCurrentUserSuccess: boolean;
    setIsGetCurrentUserSuccess: Action<IUserModel, boolean>;
    getCurrentUser: Thunk<IUserModel, undefined>;

    isGetAllUserSuccess: boolean;
    setIsGetAllUserSuccess: Action<IUserModel, boolean>;
    getAllUser: Thunk<IUserModel, any>;

    isGetUserByIdSuccess: boolean;
    setIsGetUserByIdSuccess: Action<IUserModel, boolean>;
    getUserById: Thunk<IUserModel, string>;

    //PostImage
    isPostImageSuccess: boolean;
    setIsPostImageSuccess: Action<IUserModel, boolean>;
    postImage: Thunk<IUserModel, any>;

    //editUser
    // isEditUserSuccess: boolean;
    // setIsEditUserSuccess: Action<IUserModel, boolean>;
    // editEdit: Thunk<IUserModel, IUserEdit>;
}
export const userModel: IUserModel = persist({
    //MessageError
    messageErrorUser: "",
    setMessageErrorUser: action((state, payload) => {
        state.messageErrorUser = payload;
    }),

    //GetCurrentUser
    currentUserSuccess: null,
    setCurrentUserSuccess: action((state, payload) => {
        state.currentUserSuccess = payload;
    }),
    isGetCurrentUserSuccess: true,
    setIsGetCurrentUserSuccess: action((state, payload) => {
        state.isGetCurrentUserSuccess = payload;
    }),
    getCurrentUser: thunk(async (actions) => {
        return getCurrentUser()
            .then(async (res) => {
                actions.setIsGetCurrentUserSuccess(true)
                actions.setCurrentUserSuccess(res.data)
                return res.data;
            })
            .catch((error) => {
                actions.setIsGetCurrentUserSuccess(false)
                actions.setCurrentUserSuccess(null)
                actions.setMessageErrorUser(error?.response?.data?.message)
            });
    }),

    isGetAllUserSuccess: true,
    setIsGetAllUserSuccess: action((state, payload) => {
        state.isGetAllUserSuccess = payload;
    }),
    getAllUser: thunk(async (actions, payload) => {
        return getAllUser(payload)
            .then(async (res) => {
                actions.setIsGetAllUserSuccess(true)
                return res.data;
            })
            .catch((error) => {
                actions.setIsGetAllUserSuccess(false)
                actions.setMessageErrorUser(error?.response?.data?.message)
            });
    }),

    isGetUserByIdSuccess: true,
    setIsGetUserByIdSuccess: action((state, payload) => {
        state.isGetUserByIdSuccess = payload;
    }),
    getUserById: thunk(async (actions, payload) => {
        return getUserById(payload)
            .then(async (res) => {
                actions.setIsGetUserByIdSuccess(true)
                return res.data;
            })
            .catch((error) => {
                actions.setIsGetUserByIdSuccess(false)
                actions.setMessageErrorUser(error?.response?.data?.message)
            });
    }),


    // PostImage
    isPostImageSuccess: true,
    setIsPostImageSuccess: action((state, payload) => {
        state.isPostImageSuccess = payload;
    }),
    postImage: thunk(async (actions, payload) => {
        return postImage(payload)
            .then(async (res) => {
                actions.setIsPostImageSuccess(true)
                return res.data;
            })
            .catch((error) => {
                actions.setIsPostImageSuccess(false)
                actions.setMessageErrorUser(error?.response?.data?.message)
            });
    }),

    //editUser
    // isEditUserSuccess: true,
    // setIsEditUserSuccess: action((state, payload) => {
    //     state.isEditUserSuccess = payload;
    // }),
    // editEdit: thunk(async (actions, payload) => {
    //     return editUser(payload)
    //         .then(async (res) => {
    //             actions.setIsEditUserSuccess(true)
    //             return res;
    //         })
    //         .catch((error) => {
    //             actions.setIsEditUserSuccess(false)
    //             actions.setMessageErrorUser(error?.response?.data?.message)
    //         });
    // }),
})