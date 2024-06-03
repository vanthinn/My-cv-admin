import { ICompany } from "./ICompany";
import { IRecruitmentResponse } from "./IRecruitment";

export interface IUserLogin {
    email: string;
    password: string;
    tenantId?: string;
}

export interface IUserEdit {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    avatarUrl?: string;
    phoneNumber: string
    gender: string;
    dateOfBirth: string;
    address?: string;
}

export interface IUser {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    avatarUrl?: string;
    phoneNumber: string
    gender?: string;
    dateOfBirth?: string;
    address?: string;
    roleId?: string;
    tenantId?: string;
    role?: {
        id: string;
        name: string
    }
    company?: ICompany
}

export interface IBookmark {
    id?: string,
    createdAt?: string
    job: IRecruitmentResponse
}