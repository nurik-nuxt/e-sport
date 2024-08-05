<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useSchoolStore } from '@/store/schoolStore';
import { useScheduleStore } from "@/store/schedule";
import { useAuthStore } from "@/store/auth";
import SchoolNav from "./SchoolNav.vue";
import SchoolInfo from "./SchoolInfo.vue";
import SchoolCoachList from "./SchoolCoachList.vue";
import SchoolSportsMen from "./SchoolSportsMen.vue";
import SportsMenProfile from "../SportSchools/SportsMenProfile.vue";
import AddSportsmanProfile from '../addItem/addSportsmanProfile.vue';
import SchoolSchedule from './SchoolSchedule.vue';
import SchoolGroups from "@/components/SportSchools/SchoolGroups/SchoolGroups.vue";
import { useCitiesStore } from "@/store/cities";
import { useUserStore } from "@/store/users";
import { useDisciplineStore } from "@/store/disciplines";
import { useGroupStore } from "@/store/groups/groupsStore";
import SchoolScheduleList from "@/components/SportSchools/SchoolScheduleList.vue";

const authStore = useAuthStore();
const citiesStore = useCitiesStore();
const isAuthenticated = computed(() => !!authStore.authToken);
const userStore = useUserStore();
const disciplineStore = useDisciplineStore();
const groupStore = useGroupStore();


const route = useRoute(); 
const schoolStore = useSchoolStore();
const scheduleStore = useScheduleStore();

const currentView = ref('info');
const showModal = ref(false);

function enableScroll() {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
}
watch(showModal, (newValue) => {
    if (newValue) {
        document.body.classList.add('no-scroll');
    } else {
        document.body.classList.remove('no-scroll');
    }
});

function toggleModal() {
    console.log("Toggling modal!");
    showModal.value = !showModal.value;
    console.log('showModal:', showModal.value); 
    if (showModal.value) {
        // disableScroll();
    } else {
        enableScroll();
    }
}

function switchView(view: string) {
  console.log(view, 'view')
    currentView.value = view;
}

onMounted(async () => {
  await Promise.all([
    schoolStore.fetchSchoolById(<string>route?.params?.id),
    scheduleStore.getSchedulesBySchoolId(<string>route?.params?.id),
    citiesStore.fetchCities(),
    userStore.loadCoachesBySchool(<string>route?.params?.id),
    userStore.loadSportsmensBySchool(<string>route?.params?.id),
    disciplineStore.loadAllDisciplines(),
    groupStore.loadDisciplines(),
    groupStore.loadGroupsBySchool(<string>route?.params?.id)
  ])
});
const school = computed(() => {
  return schoolStore.getCurrentSchool;
})

</script>
<template>
<div class="main_school_data">
    <div v-if="schoolStore.isLoading" class="text-3xl text-center mt-20">
        Загрузка...
    </div>
    <div v-else-if="school" class="school_data">
        <div class="school_title_info">
            <div class="school_score">
                <img src="../../assets/icons/StarLight.png" v-for="index in 5" :key="index"  alt="img"/>
            </div>
            <div class="school_name">
                {{ school.name}}
            </div>
            <div class="school_address">
                {{ school.address }}
            </div>
            <button v-if="isAuthenticated" @click="toggleModal" class="btnAddUser">Добавить пользователя</button>
        </div>
        <school-nav @switch="switchView"/>
        <SchoolInfo v-if="currentView === 'info'" :school="school" />
        <SchoolCoachList v-if="currentView === 'coaches'" />
        <SchoolSportsMen v-if="currentView === 'sportsmen'" />
        <sports-men-profile v-if="currentView === 'sportsmen-profile'"/>
        <school-schedule v-if="currentView === 'schedule'"/>
        <school-groups v-if="currentView === 'groups'" />
    </div>
    <div v-else>
        Данные не найдены!
    </div>
    <AddSportsmanProfile v-if="showModal" @close="showModal = false" class="add-sportsmen-profile" />
</div>
</template>
<style scoped>
    .main_school_data{
        position: relative;
        top: 0;
        left: 0;
    }
    .add-sportsmen-profile{
        position: absolute;
        top: 0;
        left: 0;
        z-index: 999;
    }
    .school_data{
        margin: 15px 30px;
        display: block;
        position: relative;
    }
    .school_score{
        display: flex;
    }
    .school_name{
        font-weight: 600;
        font-size: 2rem;
    }
    .router_part{
        width: 100%;
    }
    .add_sportsman{
        position: absolute;
        width: 100%;
        height: 100vh;
        background-color: rgba(255, 255, 255, 0.4);
        top: 0;
        left: 0;
        overflow-y: auto;
    }
    .btnAddUser{
        padding: 10px 20px;
        font-size: 20px;
        border-radius: 5px;
        background-color: #203D8B;
        border: none;
        color: #fff;
        cursor: pointer;
        font-family: 'Montserrat', sans-serif;
        font-weight: 500;
    }
    .btnAddUser:hover{
        background-color: #294694;
    }
    /* Add these to your <style scoped> section */
    .no-scroll {
    overflow: hidden !important;
    padding-right: 15px !important;
    }

    .modal-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    }

    .modal-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    max-width: 500px;
    width: 100%;
    }

    /* For transition effect */
    .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0;
    }

</style>
