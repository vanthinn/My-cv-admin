import { IUser } from "./IUser";

export interface ICompany {
    id?: string;
    displayName: string;
    logoUrl: string,
    address: string
    images?: string
    email: string
    phoneNumber: string
    fieldOfActivity: string
    scale: string
    description?: string
    intro?: string
    website?: string
    _count?: {
        jobs: number
    }
    users?: IUser[]
}

// export interface ICompanyRequest {
//     id?: string;
//     displayName: string;
//     logoUrl: string,
//     address: string
//     images?: string
//     email: string
//     phoneNumber: string
//     fieldOfActivity: string
//     scale: string
//     description?: string
//     intro?: string
//     website?: string
// }   