<script setup lang="ts">
import BaseInput from "@/components/base/BaseInput.vue";
import {ref, onMounted, computed} from 'vue';
import{useGroupStore} from "@/store/groups/groupsStore";
import {useApi} from "@/composable/useApi";
import { useUserStore } from "@/store/users";
import {useRoute} from "vue-router";

const emit = defineEmits(['close']);
const groupStore = useGroupStore();
const userStore = useUserStore();
const route = useRoute();

const groupName = ref('');
const selectedCoachId = ref('');
const selectedDisciplineId = ref('');
const isFree = ref(false);
const price = ref<number | null>(null);
const startTime = ref('')
const endTime = ref('')
const weekDay = ref('');


const handleClose = () => {
  emit('close');
};
const disciplines = computed(() => groupStore.getDisciplines);
const coaches = computed(() => userStore.getCurrentSchoolCoaches);
const groups = computed(() => groupStore.getCurrentSchoolGroups)

const handleSubmit = async (event: Event) => {
  event.preventDefault();
  const groupPrice = isFree.value ? 0 : price.value;

  const groupData = {
    // name: groupName.value,
    weekDay: weekDay.value,
    timeFrom: startTime.value,
    timeTo: endTime.value,
    groupId: groupName.value,
    // scheduleId
  };

  try {
    // Make the API request to create a group
    const response = await useApi('/v1/appointments', {
      method: 'POST',
      data: groupData
    });
    if (response?.id) {
      await groupStore.loadGroupsBySchool(<string>response?.school?.id)
    }
    emit('close'); // Close the modal after successful creation
  } catch (error) {
    console.error('Failed to create group:', error);
  }
};

const days = ref([
  {
    title: 'Пн',
    value: 'Monday'
  },
  {
    title: 'Вт',
    value: 'Tuesday'
  },
  {
    title: 'Ср',
    value: 'Wednesday'
  },
  {
    title: 'Чт',
    value: 'Thursday'
  },
  {
    title: 'Пт',
    value: 'Friday'
  },
  {
    title: 'Сб',
    value: 'Saturday'
  },
  {
    title: 'Вс',
    value: 'Sunday'
  }
])
</script>
<template>
  <div class="create-group-wrapper">
    <div class="create-group">
      <div class="create-group-title text-3xl font-semibold text-center flex justify-center">
        Добавить расписанию
      </div>
      <div class="create-group-form">
        <form  @submit="handleSubmit">
          <div class="coach-block flex flex-col">
            <label for="coach" class="coach-title text-center">
              Тренер
            </label>
            <select v-model="selectedCoachId" class="w-36 select-item" id="coach">
              <option value="" selected disabled>
                Выберите тренера
              </option>
              <option v-for="coach in coaches" :key="coach.id" :value="coach.id">
                {{ coach.firstName }} {{ coach.middleName }} {{ coach.lastName }}
              </option>
            </select>
            <img src="/icons/arrowDown.png" class="icon-down" />
          </div>
          <div class="discipline-block flex flex-col">
            <label for="discipline" class="discipline-title text-center">
              Группа
            </label>
            <select v-model="groupName" class="discipline-select w-36 select-item" id="discipline">
              <option value="" selected disabled>
                Выберите группу
              </option>
              <option v-for="group in groups" :key="group.id" :value="group.id">
                {{ group.name }}
              </option>
            </select>
            <img src="/icons/arrowDown.png" class="icon-down" />
          </div>

          <div class="discipline-block flex flex-col">
            <label for="discipline" class="discipline-title text-center">
              Дисциплина
            </label>
            <select v-model="selectedDisciplineId" class="discipline-select w-36 select-item" id="discipline">
              <option value="" selected disabled>
                Выберите дисциплину
              </option>
              <option v-for="discipline in disciplines" :key="discipline.id" :value="discipline.id">
                {{ discipline.title }}
              </option>
            </select>
            <img src="/icons/arrowDown.png" class="icon-down" />
          </div>
          <div class="time-block flex gap-2">
            <div class="time-start flex flex-col">
              <label class="time-label">Начало</label>
              <base-input
                  type="text"
                  class="text-center text-xl time-input"
                  v-model="startTime"
              />
            </div>
            <div class="time-end flex flex-col">
              <label class="time-label">Конец</label>
              <base-input
                  type="text"
                  class="text-center text-xl time-input"
                  v-model="endTime"
              />
            </div>
          </div>
          <div class="discipline-block flex flex-col">
            <label for="discipline" class="discipline-title text-center">
              День
            </label>
            <select v-model="weekDay" class="discipline-select w-36 select-item" id="discipline">
              <option value="" selected disabled>
                Выберите день
              </option>
              <option v-for="day in days" :key="day.value" :value="day.title">
                {{ day.title }}
              </option>
            </select>
            <img src="/icons/arrowDown.png" class="icon-down" />
          </div>
          <div class="reject-and-add-btns flex justify-between mt-5">
            <div class="reject-btn">
              <button @click="handleClose" class="reject-btn-style">
                Удалить
              </button>
            </div>
            <div class="add-btn">
              <button type="submit" class="add-btn-style">
                Добавить
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<style scoped>
.create-group-wrapper{
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.5);
  z-index: 999;
}
.create-group{
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 6rem;
  border: 1px solid #031954;
  background-color: #fff;
  border-radius: 15px;
  padding: 40px 70px;
}
.create-group-title{
  display: flex;
}
.create-group-form{
  width: 30rem;
  position: relative;
}
.create-group-form form{
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.select-item{
  border: 1px solid #031954;
  border-radius: 10px;
  width: 100%;
  text-align: center;
  height: 40px;
  appearance: none;
}
label{
  color: #031954;
  font-weight: 500;
  font-size: 18px;
}
.input-group-name{
  color: #000000;
  border: 1px solid #031954;
}
.coach-block,.discipline-block,.group-block,.days-block{
  position: relative;
}
.icon-down{
  width: 25px;
  max-width: 12.5px;
  max-height: 6.25px;
  height: 24px;
  position: absolute;
  right: 15px;
  top: 70%;
}

.reject-btn-style{
  color: #E1253C;
  padding: 16px 42px;
  border: 1px solid #570000;
  border-radius: 15px;
  font-weight: 500;
  transition: all 200ms ease;
}
.reject-btn-style:hover{
  background-color: rgba(206,15,1,0.99);
  color: #ffffff;
}
.add-btn-style{
  color: #005703;
  padding: 16px 30px;
  font-weight: 500;
  border-radius: 15px;
  border: 1px solid #005703;
  transition: all 200ms ease;
}
.add-btn-style:hover{
  background-color: rgba(139, 255, 93, 0.87);
  color: #031954;
}
#label-price{
  display: flex;
  margin-top: 2px;
}
.price-input-block{
  color: #031954;
  font-weight: 500;
}

#price-input{
  width: 250px;
  height: 40px;
  border: 1px solid #031954;
  border-radius: 10px;
  text-align: center;
}
</style>
