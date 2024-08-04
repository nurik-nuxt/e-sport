<template>
  <div>
    <div v-if="currentComponent=== 'calendar'" class="mt-5 is-light-mode">
      <school-groups-nav @switchView="switchView"/>
      <Qalendar
          :events="events"
          :config="config"
      />
    </div>
    <div v-if="currentComponent === 'schedule-list'" class="school-groups">
      <div class="block-title text-2xl font-semibold mt-3">
        Расписание
      </div>
      <div class="flex justify-end mt-2">
        <BaseButton label="Добавить" @click="openAddScheduleModal"></BaseButton>
        <ScheduleAddModal v-if="isModalOpen" @close="closeAddScheduleModal" />
      </div>
      <div></div>
    </div>
  </div>
</template>

<script setup>
import { Qalendar } from "qalendar";
import { computed, reactive, ref } from "vue";
import { useScheduleStore } from "@/store/schedule/index.ts";
import SchoolGroupsNav from "@/components/SportSchools/SchoolGroups/SchoolGroupsNav.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import ScheduleAddModal from "@/components/ScheduleAddModal.vue";

const scheduleStore = useScheduleStore();
const isModalOpen = ref(false);

const openAddScheduleModal = () => {
  isModalOpen.value = true;
};
const closeAddScheduleModal = () => {
  isModalOpen.value = false;
};

const events = computed(() => {
  return scheduleStore.getCurrentSchoolSchedule
})
const currentView = ref('scheduleState'); // Значение по умолчанию

const config = reactive({
  dayBoundaries: {
    start: 8,
    end: 22
  }
})

const currentComponent = ref('calendar');

function switchView(view) {
  console.log(view);
  if (view === 'schedule-list') {
    currentComponent.value = 'schedule-list';
  } else {
    currentComponent.value = 'calendar';
    currentView.value = view;
  }
}

</script>

<style>
@import "qalendar/dist/style.css";
</style>