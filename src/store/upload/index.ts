import { defineStore } from "pinia";
import { useApi } from "@/composable/useApi";

export const useUploadStore = defineStore('upload', {
    state: () => ({
        filePath: '' as string,
    }),

    actions: {
        async uploadFile(file: File) {
            const body = new FormData();
            body.append('file', file);
            try {
                const response = await useApi(`/v1/files`, {
                    method: 'POST',
                    data: body,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                this.filePath = response;
                return response;
            } catch (e) {
                console.error(e);
                throw new Error('File upload failed');
            }
        }
    }
});