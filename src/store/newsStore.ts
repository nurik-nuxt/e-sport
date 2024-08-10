import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { useApi } from '@/composable/useApi';

interface City {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
}

interface Author {
    id: string;
    role: number;
    iin: string;
    rating: number;
    biography: string;
    firstName: string;
    birth_date: string;
    middleName: string;
    phoneNumber: string;
    lastName: string;
    profileImage: string;
    gallery: string | null;
    createdAt: string;
    updatedAt: string | null;
    deletedAt: string | null;
}

interface News {
    id: string;
    title: string;
    content: string;
    thumbnail: string;
    createdAt: string;
    updatedAt: string | null;
    deletedAt: string | null;
    city: City;
    author: Author;
}

export const useNewsStore = defineStore('newsStore', () => {
    const newsList = ref<News[]>([]);
    const selectedNews = ref<News | null>(null);
    const isLoading = ref(false);
    const error = ref<string | null>(null);

    const fetchNews = async () => {
        isLoading.value = true;
        error.value = null;
        try {
            const response = await useApi<News[]>('v1/news', { method: 'GET' });
            newsList.value = response;
            if (response) {
                console.log('API response:', response);
                console.log('Processed news:', newsList.value);
            }
        } catch (err) {
            error.value = 'Error fetching news';
            console.error('Error fetching news:', err);
        } finally {
            isLoading.value = false;
        }
    };

    const setSelectedNews = (id: string) => {
        const news = newsList.value.find((news) => news.id === id);
        if (news) {
            selectedNews.value = news;
        } else {
            error.value = `News with ID ${id} not found`;
            console.error(`News with ID ${id} not found`);
        }
    };

    const hasNews = computed(() => newsList.value.length > 0);

    return {
        newsList,
        selectedNews,
        isLoading,
        error,
        fetchNews,
        setSelectedNews,
        hasNews,
    };
});
