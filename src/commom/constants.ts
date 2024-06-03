export const ROUTER = Object.freeze({
    LOGIN: '/login',
    USER: '/',
    USER_DETAIL: '/user/:id',
    COMPANY: '/company',
    COMPANY_DETAIL: '/company/:id',
    BLOG: '/blog',
    JOBS: '/jobs',
    SERVICE: '/service'
});

export const DATA_SIDEBAR = [

    {
        id: 0,
        name: 'Users',
        pathName: "/",
        icon: "user",
        children: [],
    },
    {
        id: 1,
        name: 'Company',
        pathName: "/company",
        icon: "company",
        children: [],
    },
    {
        id: 2,
        name: 'Jobs',
        pathName: "/jobs",
        icon: "jobs",
        children: [],
    },
    {
        id: 3,
        name: 'Blog',
        pathName: "/blog",
        icon: "blog",
        children: [],
    },
    {
        id: 4,
        name: 'Service',
        pathName: "/service",
        icon: "service",
        children: [],
    },

];


export const scaleData = [
    {
        label: "11 - 50 employees",
        name: "11 - 50 employees",
        id: '11 - 50 employees'
    },
    {
        label: "100 - 200 employees",
        name: "100 - 200 employees",
        id: '100 - 200 employees'
    },
    {
        label: "201 - 500 employees",
        name: "201 - 500 employees",
        id: '201 - 500 employees'
    },
    {
        label: "501 - 1000 employees",
        name: "501 - 1000 employees",
        id: '501 - 1000 employees'
    },
    {
        label: "1000 - 2000 employees",
        name: "1000 - 2000 employees",
        id: '1000 - 2000 employees'
    },
    {
        label: "More than 2000 employees",
        name: "More than 2000 employees",
        id: 'More than 2000 employees'
    },
]

export const fieldOfActivityData = [
    {
        label: "Marketing and Logistics",
        name: "Marketing and Logistics",
        id: 'Marketing and Logistics'
    },
    {
        label: "Consumer Services",
        name: "Consumer Services",
        id: 'Consumer Services'
    },
    {
        label: "Information Technology and Services",
        name: "Information Technology and Services",
        id: 'Information Technology and Services'
    },
    {
        label: "Automotive",
        name: "Automotive",
        id: 'Automotive'
    },
    {
        label: "Hospital & Health Care",
        name: "Hospital & Health Care",
        id: 'Hospital & Health Care'
    },
    {
        label: "Architecture & Planning",
        name: "Architecture & Planning",
        id: 'Architecture & Planning'
    },
    {
        label: "Accounting",
        name: "Accounting",
        id: 'Accounting'
    },
    {
        label: "Cosmetics",
        name: "Cosmetics",
        id: 'Cosmetics'
    },
    {
        label: "Construction",
        name: "Construction",
        id: 'Construction'
    },
    {
        label: "Real Estate",
        name: "Real Estate",
        id: 'Real Estate'
    },
    {
        label: "Financial Services",
        name: "Financial Services",
        id: 'Financial Services'
    },
]