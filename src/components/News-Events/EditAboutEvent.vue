<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import BaseInput from "@/components/base/BaseInput.vue";
import { useRouter } from 'vue-router';
import { useEventStore } from '@/store/eventStore';
import { useUploadStore } from "@/store/upload";
import { useApi } from "@/composable/useApi";
import { useCitiesStore } from "@/store/cities/index";
import { useDisciplinesStore } from '@/store/discipline/index';
import { useEventTypesStore } from '@/store/event-types/index';

const router = useRouter();
const eventStore = useEventStore();
const uploadStore = useUploadStore();
const citiesStore = useCitiesStore();
const disciplinesStore = useDisciplinesStore();
const eventTypesStore = useEventTypesStore();

const selectedEvent = computed(() => eventStore.selectedEvent);
const preview = ref<string | ArrayBuffer | null>(selectedEvent.value?.thumbnail || null);
const thumbnail = ref(selectedEvent.value?.thumbnail || '');
const title = ref(selectedEvent.value?.title || '');
const organizer = ref(selectedEvent.value?.organizer || '');
const description = ref(selectedEvent.value?.description || '');
const prizePool = ref(selectedEvent.value?.prizePool || '');
const cityId = ref(selectedEvent.value?.city.id || '');
const typeIds = ref<string[]>(selectedEvent.value?.types.map(type => type.id) || []);
const startDate = ref(selectedEvent.value?.startDate || '');
const endDate = ref(selectedEvent.value?.endDate || '');
const disciplineId = ref(selectedEvent.value?.discipline.id || '');
const startTime = ref(selectedEvent.value?.startTime || '');

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
      method: 'PUT',
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
  citiesStore.fetchCities();
  disciplinesStore.fetchDisciplines();
  eventTypesStore.fetchEventTypes();
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
              Выберите город
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
            <option value="" disabled>Выберите дисциплину</option>
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
          <select id="event-type" class="sport-type" v-model="typeIds" multiple>
            <option value="" disabled>Выберите тип мероприятия</option>
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

</style>