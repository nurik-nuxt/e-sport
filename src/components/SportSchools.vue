<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useSchoolStore } from '../store/schoolStore';
import SearchBar from "./SearchBar.vue";
import SchoolList from "./SportSchools/SchoolList.vue";
const schoolStore = useSchoolStore();

const schools = schoolStore.schools;

interface School {
    id: number;
    name: string;
    address: string;
    categories: string[];
    description: string;
    rating: number;
};

const searchQuery = ref('');
const filteredSchools = computed(() => {
  if (searchQuery.value.trim() === '') {
    return schoolStore.getSchools
  }
  return schoolStore.getSchools?.filter((school) => school?.name?.toLowerCase().includes(searchQuery.value.toLowerCase()))
})


const handleSearch = (query: string) => {
    searchQuery.value = query;
    console.log("hadnleSearch: ",query);
};
onMounted(async () => {
    if (!schoolStore.schools.length) {
        await schoolStore.fetchSchools();
    }
});
</script>
<template>
    <div>
        <SearchBar @search="handleSearch" />
        <SchoolList :schools="filteredSchools" />
    </div>
</template>
<style scoped>

</style>
