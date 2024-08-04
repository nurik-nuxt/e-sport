<script setup lang="ts">
import { ref, onMounted, computed  } from 'vue';
import { useApi } from '@/composable/useApi';
import {Group, useGroupStore} from '@/store/groups/groupsStore';
import AddSchoolGroup from "@/components/SportSchools/SchoolGroups/AddSchoolGroup.vue";
import {useRoute} from "vue-router";
import {useAuthStore} from "@/store/auth";

const authStore = useAuthStore();
const isAuthenticated = computed(() => !!authStore.authToken);
const groupStore = useGroupStore();
const route = useRoute();

const schoolId = route.params.id as string;
const isModalOpen = ref(false);

const openAddGroupModal = () => {
  isModalOpen.value = true;
};
const closeAddGroupModal = () => {
  isModalOpen.value = false;
};

const groupsBySchool = computed(() => groupStore.getCurrentSchoolGroups);
const disciplines = computed(() => groupStore.getDisciplines);
const coaches = computed(() => groupStore.getCoaches);

function getRowStyle(group: Group) {
  return {
    borderBottom: `1px solid ${group.color || '#ccc'}`,
    borderRadius: '4px 0 0 4px',
  };
}

function getFirstCellStyle(group: Group) {
  return {
    borderLeft: `8px solid ${group.color || '#ddd'}`, // Adjust default color as needed
    borderRadius: '4px 0 0 4px', // Apply radius to the left corners
    paddingLeft: '4px', // Add padding to align text away from the border
  };
}
onMounted(async () => {
  await groupStore.loadGroupsBySchool(schoolId);
  await groupStore.loadDisciplines();
  await groupStore.loadCoaches();
});
</script>
<template>
  <div class="change-groups">
    <div class="change-groups-panel mt-5">
      <div class="block-title text-2xl font-semibold">
        Группы
      </div>
      <div class="change-groups-nav">
        <div class="group-list-nav mt-3 flex flex-wrap gap-x-1 gap-y-2 justify-between">
          <div class="group-item w-64">
            <img class="icon-sport icons" src="/icons/type-sport.png" />
              <select class="w-full text-base appearance-none choose-sport">
                <option value="" selected disabled>Вид спорта</option>
                <option v-for="discipline in disciplines" :key="discipline.id" :value="discipline.id">
                  {{ discipline.title }}
                </option>
              </select>
              <img class="icon-polygon icons" src="/icons/polygon-down.png" />
            </div>
            <div class="group-item w-72">
              <img class="icon-sport icons" src="/icons/profile-img.png" />
              <select class="w-full text-base appearance-none choose-sport">
                <option value="" selected disabled>Тренер</option>
                <option v-for="coach in coaches" :key="coach.id" :value="coach.id">
                  {{ coach.firstName }} {{ coach.middleName }} {{ coach.lastName }}
                </option>
              </select>
              <img class="icon-polygon icons" src="/icons/polygon-down.png" />
            </div>
            <div class="group-item w-48">
              <img class="icon-sport icons" src="/icons/age-icon.png" />
              <select class="w-full text-base appearance-none choose-sport">
                <option value="" selected disabled>Возрастная</option>
                <option value="football">Младшая</option>
                <option value="football">Старшая</option>
              </select>
              <img class="icon-polygon icons" src="/icons/polygon-down.png" />
            </div>
            <div class="group-item w-48">
              <img class="icon-sport icons" src="/icons/profile-img.png" />
              <select class="w-full text-base appearance-none choose-sport">
                <option value="" selected disabled>Цена /мес</option>
                <option value="12000">12000</option>
                <option value="30000">30000</option>
              </select>
              <img class="icon-polygon icons" src="/icons/polygon-down.png" />
            </div>
            <div class="group-item w-48">
              <button v-if="isAuthenticated" @click="openAddGroupModal" class="w-48 text-base change-btn">
                Добавить группу
              </button>
            </div>
        </div>
      </div>
    </div>
    <div class="table-groups mt-16" v-if="groupsBySchool.length">
      <table>
        <thead>
        <tr>
          <th>№</th>
          <th>Дисциплина</th>
          <th>Тренер</th>
          <th>Группа</th>
          <th>Стоимость</th>
          <th><img src="/icons/setting.png" /></th> <!-- Column for icons -->
        </tr>
        </thead>
        <tbody>
        <tr v-for="(group, index) in groupsBySchool" :key="group.id" :style="getRowStyle(group)" class="backdrop-contrast-200">
          <td :style="getFirstCellStyle(group)">
            {{ index + 1 }}
          </td>
          <td>{{ group.discipline.title}}</td>
          <td>{{ `${group.coach.firstName} ${group.coach.middleName} ${group.coach.lastName}` }}</td>
          <td>{{ group.name }}</td>
          <td>{{ group.price }}</td>
          <td>
            <router-link to="">
              <img src="/icons/set-triple-dots.png" alt="Icon">
            </router-link>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <add-school-group v-if="isModalOpen" @close="closeAddGroupModal" :school-id="schoolId"/>
  </div>
</template>
<style scoped>
.choose-sport{
  border: 1px solid #031954;
  border-radius: 5px;
  padding: 10px 20px 10px 45px;
  appearance: none;
}
.choose-sport:focus{
  border: 1px solid #0a39af;
  box-shadow: 2px -1px 25px -1px rgba(28,255,237,0.7);
  -webkit-box-shadow: 2px -1px 25px -1px rgba(28,255,237,0.7);
  -moz-box-shadow: 2px -1px 25px -1px rgba(28,255,237,0.7);
}
.group-item {
  position: relative;
  color: #031954;
  font-weight: 500;
}
.icons{
  position: absolute;
  z-index: 99;
}
.icon-sport{
  left: 12px;
  top: 10px;
}
.icon-polygon{
  right: 18px;
  top: 45%;
}

::-webkit-calendar-picker-indicator{
  background-color: #ffffff;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  border: 1px solid #ffffff;
}
.change-btn{
  color: #031954;
  font-weight: 500;
  padding: 10px 12px;
  border-radius: 5px;
  font-size: 18px;
  border: 1px solid #031954;
  transition: all 200ms ease;
  display: flex;
}
.change-btn:hover{
  border: 1px solid #03540B;
  background-color: #03540B;
  color: #fff;
}
table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
}
th{
  color: #181818;
}
th, td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ccc;
  vertical-align: middle;
}
th {
  background-color: #f4f4f4;
}
tr{
  color: #031954;
  font-weight: 500;
  border-bottom: 1px;
}
tr:nth-child(1) {
  border-bottom: 1px solid #d7d7d7;
}
button {
  cursor: pointer;
}
</style>