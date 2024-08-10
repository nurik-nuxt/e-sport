<script setup lang="ts">
import {ref, computed, onMounted, watchEffect} from 'vue';
import BaseInput from "@/components/base/BaseInput.vue";
import {useRoute, useRouter} from 'vue-router';
import { useEventStore } from '@/store/eventStore';
import { useUploadStore } from "@/store/upload";
import { useApi } from "@/composable/useApi";
import { useCitiesStore } from "@/store/cities/index";
import { useDisciplinesStore } from '@/store/discipline/index';
import { useEventTypesStore } from '@/store/event-types/index';

const router = useRouter();
const route = useRoute();
const eventStore = useEventStore();
const uploadStore = useUploadStore();
const citiesStore = useCitiesStore();
const disciplinesStore = useDisciplinesStore();
const eventTypesStore = useEventTypesStore();

const selectedEvent = computed(() => eventStore.selectedEvent);

const preview = ref<string | ArrayBuffer | null>(null);
const thumbnail = ref('');
const title = ref('');
const organizer = ref('');
const description = ref('');
const prizePool = ref('');
const cityId = ref('');
const typeIds = ref('');
const startDate = ref('');
const endDate = ref('');
const disciplineId = ref('');
const startTime = ref('');

watchEffect(()=>{
  if(selectedEvent.value){
    preview.value = selectedEvent.value.thumbnail;
    thumbnail.value = selectedEvent.value.thumbnail || '';
    title.value = selectedEvent.value.title || '';
    organizer.value = selectedEvent.value.organizer || '';
    description.value = selectedEvent.value.description || '';
    prizePool.value = selectedEvent.value.prizePool || '';
    cityId.value = selectedEvent.value.city.id || '';
    typeIds.value = (selectedEvent.value?.types[0]?.id || '');
    startDate.value = selectedEvent.value.startDate || '';
    endDate.value = selectedEvent.value.endDate || '';
    disciplineId.value = selectedEvent.value.discipline.id || '';
    startTime.value = selectedEvent.value.startTime || '';
  }
})
const formatDate = (date: string | undefined) => {
  if (!date) return '';
  return new Date(date).toISOString().split('T')[0];
};


async function onFileSelected(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      preview.value = (e.target as FileReader).result;
    };
    reader.readAsDataURL(file);
    try {
      thumbnail.value = await uploadStore.uploadFile(file);
    } catch (error) {
      console.error('Error uploading file:', error);
      thumbnail.value = '';
    }
  }
}

async function updateEvent() {
  try {
    if (!selectedEvent.value) {
      console.error('No event selected for editing');
      return;
    }

    const requestBody = {
      title: title.value,
      organizer: organizer.value,
      description: description.value,
      prizePool: prizePool.value,
      cityId: cityId.value,
      thumbnail: thumbnail.value,
      typeIds: Array.isArray(typeIds.value) ? typeIds.value : [typeIds.value],
      startDate: new Date(startDate.value).toISOString(),
      endDate: new Date(endDate.value).toISOString(),
      disciplineId: disciplineId.value,
      startTime: startTime.value,
    };
    console.log('Request Body:', JSON.stringify(requestBody, null, 2));
    await useApi(`v1/events/${selectedEvent.value.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      data: requestBody,
    });
    console.log('Event updated successfully');
    router.push('/news-events/events');
  } catch (error) {
    console.error('Error updating event:', error);
    alert('Failed to update event. Please try again.');
  }
}

const cities = computed(() => citiesStore.getCities);
const disciplines = computed(() => disciplinesStore.getDisciplines);
const eventTypes = computed(() => eventTypesStore.getEventTypes);

onMounted(() => {
  const eventId = route.params.id as string;
  eventStore.fetchEventById(eventId);
  citiesStore.fetchCities();
  disciplinesStore.fetchDisciplines();
  eventTypesStore.fetchEventTypes();
  startDate.value = formatDate(selectedEvent.value?.startDate);
  endDate.value = formatDate(selectedEvent.value?.endDate);
});
</script>

<template>
  <div class="wrapper flex justify-center items-center mt-5 pb-5">
    <div class="edit-about-event">
      <div class="name-event flex flex-col justify-center">
        <div class="event-title">
          Название
        </div>
        <BaseInput
            type="text"
            v-model="title"
            class="text-xl text-center base-input"
        />
      </div>
      <div class="org-and-city flex flex-row justify-between">
        <div class="org-block">
          <div class="org-title event-title">
            Организатор
          </div>
          <div class="org-input half-input">
            <base-input type="text" v-model="organizer" class="text-center w-full base-input"/>
          </div>
        </div>
        <div class="city-block">
          <div class="city-title event-title">
            Город
          </div>
          <select v-model="cityId" class="text-center w-full half-input base-input">
            <option value="" disabled selected>
              {{ selectedEvent?.city}}
            </option>
            <option v-for="city in cities" :key="city.id" :value="city.id">
              {{ city.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="time-start-end flex flex-row justify-between">
        <div class="time-start-block">
          <div class="time-start-title event-title">
            Дата начала
          </div>
          <div class="time-start-input half-input">
            <base-input type="date"
                        v-model="startDate"
                        class="text-center w-full base-input"
            />
          </div>
        </div>
        <div class="time-end-block">
          <div class="city-title event-title">
            Дата окончания
          </div>
          <div class="time-end-input half-input">
            <base-input
                type="date"
                v-model="endDate"
                class="text-center w-full base-input"
            />
          </div>
        </div>
      </div>
      <div class="description-block w-full">
        <div class="description-title event-title">
          Описание
        </div>
        <textarea class="resize-none w-full description-text"
                  v-model="description"
                  placeholder="Расскажите немного об особенностях...">
        </textarea>
      </div>
      <div class="sport-type-block w-full">
        <div class="sport-title event-title">
          Спорт
        </div>
        <div class="sport-select-block">
          <select v-model="disciplineId" class="sport-type sport-select-block">
            <option v-for="discipline in disciplines" :key="discipline.id" :value="discipline.id">
              {{ discipline.title }}
            </option>
          </select>
          <img src="../../../public/icons/arrowDown.png" class="absolute img-arrow-down"/>
        </div>
      </div>
      <div class="sport-type-block w-full">
        <div class="sport-title event-title">
          Вид / Масштаб мероприятия
        </div>
        <div class="sport-select-block">
          <select id="event-type" class="sport-type" v-model="typeIds">
            <option v-for="eventType in eventTypes" :key="eventType.id" :value="eventType.id">
              {{ eventType.name }}
            </option>
          </select>
          <img src="../../../public/icons/arrowDown.png" class="absolute img-arrow-down"/>
        </div>
      </div>
      <div class="prize-block w-full">
        <div class="prize-title event-title">
          Призовой фонд
        </div>
        <textarea class="resize-none w-full prize-text" v-model="prizePool" placeholder="Опишите призы">
        </textarea>
      </div>
      <div class="add-photo-block mt-3">
        <label for="fileInput" class="title_color file-label cursor-pointer">
          <img src="/icons/plus-gray.png" class="w-6 h-6"/>
          <div class="text-input-file">
            Добавить фото
          </div>
        </label>
        <input type="file" id="fileInput" @change="onFileSelected" class="border-0 focus:outline-none cursor-pointer">
        <img :src="preview" v-if="preview" class="image-preview" alt="image"/>
      </div>
      <div class="btns_add_school flex justify-between w-full mt-10">
        <router-link to="/news-events/events" id="reject_btn" class="py-4 px-9 btn_reject" >
          Отменить
        </router-link>
        <button type="submit" @click="updateEvent" value="" id="upload_btn">
          Сохранить изменения
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.edit-about-event{
  width: 480px;
  max-width: 480px;
}
.event-title{
  color: #031954;
  text-align: center;
  font-weight: 500;
  font-size: 18px;
}
.base-input{
  border-radius: 10px;
  border: 1px solid #031954;
  width: 100%;
  max-width: 480px;
}
.half-input{
  width: 230px;
  height: 40px;
}
.description-text{
  border: 1px solid #031954;
  border-radius: 10px;
  height: 90px;
  padding: 10px 14px;
  font-size: 15px;
  font-weight: 500;
}
.prize-text{
  border: 1px solid #031954;
  border-radius: 10px;
  height: 70px;
  padding: 10px 14px;
  font-size: 15px;
  font-weight: 500;
}
.sport-type{
  border-radius: 10px;
  border: 1px solid #031954;
  width: 100%;
  text-align: center;
  color: #000000;
  font-size: 15px;
  appearance: none;
  padding: 10px 0;
  font-weight: 500;
}
.sport-select-block{
  position: relative;
}
.img-arrow-down{
  right: 15px;
  top: 17px;
}
#fileInput{
  display: none;
}
.file-label{
  width: 100%;
  border: 1px solid #000000;
  color: #69696A;
  border-radius: 10px;
  display: flex;
  padding: 10px 15px;
  font-weight: 500;
}

.text-input-file{
  margin-left: 35px;
}
.image-preview {
  width: 100px;
  height: auto;
  margin-top: 10px;
}
#upload_btn {
  padding: 15px 60px;
  border-radius: 15px;
  font-size: 16px;
  border: 1px solid #005703;
  background-color: #ffffff;
  transition: all 200ms ease;
  color: #005703;
  cursor: pointer;
  font-weight: 500;
}
#upload_btn:hover {
  background-color: rgba(74, 209, 19, 0.87);
  color: #ffffff;
  border: 1px solid #000000;
}
.btn_reject{
  color: #E1253C;
  border: 1px solid #570000;
  border-radius: 15px;
  font-weight: 600;
  transition: all 200ms ease;
}
.btn_reject:hover{
  color: #e1255d;
  border: 1px solid #570017;
  background-color: #ffd3d3;
}
</style>