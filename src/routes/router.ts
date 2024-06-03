import { ROUTER } from "@commom/constants";
import Blog from "@pages/Blog";
import Company from "@pages/Company";
import DetailCompany from "@pages/DetailCompany";
import DetailUser from "@pages/DetailUser";
import Jobs from "@pages/Jobs";
import Service from "@pages/Service";
import User from "@pages/User";


export const routerAdmin = [
    { path: ROUTER.USER, element: User },
    { path: ROUTER.USER_DETAIL, element: DetailUser },
    { path: ROUTER.COMPANY, element: Company },
    { path: ROUTER.COMPANY_DETAIL, element: DetailCompany },
    { path: ROUTER.JOBS, element: Jobs },
    { path: ROUTER.BLOG, element: Blog },
    { path: ROUTER.SERVICE, element: Service },
];

