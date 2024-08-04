export interface School {
    id: string;
    name: string;
    title: string;
    address: string;
    categories: string[];
    description: string;
    rating: number;
    location?: {
        id?: string;
        latitude?: number;
        longitude?: number;
    }
}