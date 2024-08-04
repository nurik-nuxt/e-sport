import { useApi } from "@/composable/useApi";

export interface Coach {
    id: string;
    role: number;
    iin: string;
    biography: string | null;
    awards: string | null;
    firstName: string;
    middleName: string | null;
    lastName: string;
    profileImage: string | null;
    phoneNumber: string | null;
    birth_date: string | null;
    password: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
}

export interface Member {
    id: string;
    role: number;
    iin: string;
    biography: string | null;
    awards: string | null;
    firstName: string;
    middleName: string | null;
    lastName: string;
    profileImage: string | null;
    phoneNumber: string | null;
    birth_date: string | null;
    password: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
}

export interface School {
    id: string;
    name: string;
    title: string;
    cityId: string;
    description: string;
    images: string | null;
    address: string;
    workingStartTime: string | null;
    workingEndTime: string | null;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
}

export interface Group {
    id: string;
    name: string;
    color: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    coach: Coach;
    members: Member[];
    school: School;
}


export const fetchGroups = async (): Promise<Group[]> => {
    try {
        const response = await useApi('/v1/groups');
        return response.map((groupData: any) => ({
            ...groupData,
            coach: groupData.coach,
            members: groupData.members,
            school: groupData.school
        }));
    } catch (error) {
        console.error("Ошибка при получении данных групп:", error);
        throw error;
    }
};

export const addGroup = async (groupData: Group): Promise<Group> => {
    try {
        const response = await useApi('/v1/groups', {
            method: 'POST',
            data: groupData,  // Passing the new group data to the request
        });
        return response;  // Returning the response from the API
    } catch (error) {
        console.error("Ошибка при добавлении группы:", error.response ? error.response.data : error.message);
        throw error;
    }
};