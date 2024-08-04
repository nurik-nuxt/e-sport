type AuthParams = {
    iin: undefined | number;
    password: string;
}

interface Owner {
    id: string;
    role: number;
    iin: string;
    biography: string | null;
    awards: string | null;
    firstName: string;
    lastName: string;
    profile_image: string | null;
    password: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
}

interface School {
    id: string;
    name: string;
    title: string;
    cityId: string;
    description: string;
    address: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
}

type TrainingMoment = {
    id: string;
    title: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    owner: Owner;
    school: School;
    appointments: any[]; // Adjust type as necessary if more details are known
}

type Schedule = {
    title?: string;
    time: {
        start: string;
        end: string;
    },
    color?: string;
    id: string;
    description?: string;
    isEditable: boolean;
    date?: string;
    timeFrom?: string;
    timeTo?: string;
    name?: string;
    group?: {
        color?: string;
        name?: string;
    };
    with?: string | undefined;
}

type User = {
    "iin": string,
    "password": string;
    "role": number;
    "firstName": string;
    "middleName": string;
    "lastName": string;
    "phoneNumber": string;
    "schoolId": string;
    "biography": string;
    "birth_date": string;
    "profileImage": string;
    "city": string;
}
type Coach = {
    id: string;
    role: number;
    iin: string;
    biography: string;
    awards: string | null;
    firstName: string;
    birth_date: string;
    middleName: string;
    phoneNumber: string;
    lastName: string;
    profileImage: string;
    password: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
}
export type { AuthParams, TrainingMoment, Schedule, User, Coach };