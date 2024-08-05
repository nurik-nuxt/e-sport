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
        Расписание групп
      </div>
      <div class="group-list-nav mt-3 flex flex-wrap justify-between">
        <div class="group-item w-64">
          <img class="icon-sport icons" src="/icons/type-sport.png"  alt="alt"/>
          <select class="w-full text-base appearance-none choose-sport">
            <option value="" selected disabled>Вид спорта</option>
            <option value="football">Футбол</option>
            <option value="football">Волейбол</option>
            <option value="football">Баскетбол</option>
            <option value="football">Борьба</option>
          </select>
          <img class="icon-polygon icons" src="/icons/polygon-down.png" />
        </div>
        <div class="group-item w-72">
          <img class="icon-sport icons" src="/icons/profile-img.png" />
          <select class="w-full text-base appearance-none choose-sport">
            <option value="" selected disabled>Тренер</option>
            <option value="">Геннадий Головкин</option>
            <option value="">Сауль Альварес</option>
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
        <div class="group-item w-36">
          <input type="date" class="w-full text-base">
        </div>
        <div class="group-item w-64">
          <img class="icon-sport icons" src="/icons/type-sport.png"  alt="alt"/>
          <select class="w-full text-base appearance-none choose-sport">
            <option value="" selected disabled>Дней</option>
            <option value="football">Футбол</option>
            <option value="football">Волейбол</option>
            <option value="football">Баскетбол</option>
            <option value="football">Борьба</option>
          </select>
          <img class="icon-polygon icons" src="/icons/polygon-down.png" />
        </div>
      </div>
      <div class="flex flex-col mt-2">
        <div class="flex justify-end gap-3">
          <button @click="currentComponent = 'calendar'" class="text-base back-btn">
            Назад
          </button>
          <button @click="openAddScheduleModal" class="text-base change-btn">
            Добавить
          </button>
        </div>
        <ScheduleAddModal v-if="isModalOpen" @close="closeAddScheduleModal" />
        <div v-if="events.length">
          <div v-for="(event, index) in uniqueTitles" :key="event.id">
            <div class="flex justify-between py-2 record nt-2">
              <div>{{ index + 1 }}</div>
              <div>{{ event?.discipline }}</div>
              <div>{{ event?.coach }}</div>
              <div>{{ event?.title }}</div>
              <div>{{ event?.timeFrom }} - {{ event?.timeTo }}</div>
              <div>{{ event?.weekDay }}</div>
            </div>
          </div>
        </div>
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

const uniqueTitles = computed(() => {
  const map = new Map();

  events.value.forEach(item => {
    if (map.has(item.title)) {
      const existingItem = map.get(item.title);
      existingItem.weekDay = Array.from(new Set([...existingItem.weekDay.split(', '), item.weekDay])).sort().join(', ');
    } else {
      map.set(item.title, { ...item });
    }
  });

  return Array.from(map.values());
});

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

<style scoped>
@import "qalendar/dist/style.css";
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
input[type="date"]{
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: 1px solid #031954;
  border-radius: 5px;
  padding: 9px 7px;
  outline: none;
  background-color: #ffffff;
  color: #031954;
  cursor: pointer;
  font-size: 18px;
}
::-webkit-calendar-picker-indicator{
  background-color: #ffffff;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  border: 1px solid #ffffff;
}
.back-btn {
  color: #031954;
  font-weight: 500;
  padding: 10px 25px;
  border-radius: 5px;
  font-size: 18px;
  border: 1px solid #031954;
  transition: all 200ms ease;
}
.back-btn:hover {
  border: 1px solid #031954;
  background-color: #031954;
  color: #fff;
}

.change-btn{
  color: #03540B;
  font-weight: 500;
  padding: 10px 25px;
  border-radius: 5px;
  font-size: 18px;
  border: 1px solid #03540B;
  transition: all 200ms ease;
}
.change-btn:hover{
  border: 1px solid #03540B;
  background-color: #03540B;
  color: #fff;
}
.record {
  border-bottom: 1px solid #474747B2;
  color: #031954;
  font-size: 18px;
  font-weight: 500;
  text-align: left;

}
</style>