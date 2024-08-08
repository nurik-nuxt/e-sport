<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useEventStore } from '@/store/eventStore';
import { useApi } from '@/composable/useApi';
import EventsBlockNav from '@/components/News-Events/EventsBlockNav.vue';

const events = ref([]);
const error = ref(null);
const eventStore = useEventStore();
const router = useRouter();
const fetchEvents = async () => {
  try {
    const response = await useApi('v1/events');
    events.value = response;
  } catch (err) {
    error.value = err.message || 'An error occurred';
  }
};

const getAuthorName = (organizer: string) => {
  return organizer || 'Unknown Organizer';
};

// const getEventStatus = (event_status: string) => {
//   switch(event_status) {
//     case '1': return { name: 'Идет прием заявок', color: 'rgba(74,209,19,0.87)' };
//     case '2': return { name: 'Прием заявок завершено', color: 'rgba(206,15,1,0.99)' };
//     case '3': return { name: 'Завершен', color: 'rgb(103,103,103)' };
//     default: return { name: 'Неизвестная дисциплина', color: '#000000' };
//   }
// }

const getEventTypeStyle = (type) => {
  const defaultColors = {
    'Первенство Области': '#29FF72',
    'Чемпионат Области': '#E1253C',
    'Unknown Event': '#d7d7d7'
  };
  return {
    name: type.name || 'Unknown Event',
    color: type.color || defaultColors[type.name] || defaultColors['Unknown Event']
  };
};
const selectEvent = (event: any) => {
  eventStore.setSelectedEvent(event);
  router.push(`/events/${event.id}`);
};

const truncateText = (text: string, length: number) => {
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
};
onMounted(fetchEvents);
</script>

<template>
  <div class="events-block">
    <EventsBlockNav/>
    <div class="event-list pb-10">
      <div v-if="error">
        Error: {{ error }}
      </div>
      <div v-else class="flex flex-wrap gap-y-8 gap-x-4">
        <div v-for="event in events" :key="event.id" class="event-item flex flex-col justify-between">
          <div class="event-param flex gap-x-1">
            <div class="event-type" :style="{ backgroundColor: event.discipline.color }">
              {{ event.discipline.title }}
            </div>
            <div class="event-type types-event" v-for="type in event.types" :key="type.id" :style="{ backgroundColor: getEventTypeStyle(type).color }">
              {{ getEventTypeStyle(type).name }}
            </div>
          </div>
          <div class="event-name-block">
            <div class="event-name">
              {{ truncateText(event.title, 70) }}
            </div>
          </div>
          <div class="event-img h-64">
            <img :src="event.thumbnail" class="event-thumbnail" alt="Нет фото" />
          </div>
          <div class="event-org-details flex flex-row justify-between mt-2.5">
            <div class="event-date-block">
              <div class="event-date-title">
                Время проведения
              </div>
              <div class="event-dates">
                {{ new Date(event.startDate).toLocaleDateString() }} - {{ new Date(event.endDate).toLocaleDateString() }}
              </div>
            </div>
            <div class="org-author">
              <div class="event-organizer-title">
                Организатор
              </div>
              <div class="org-name">
                {{ getAuthorName(event.organizer) }}
              </div>
            </div>
          </div>
          <div class="event-details-btn">
            <button @click="selectEvent(event)">
              Подробнее
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .event-list{
    margin-top: 25px;
    margin-left: 50px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    gap: 50px;
  }
  .event-item{
    width: 310px;
    border-radius: 5px;
    box-shadow: 5px 5px 10px 0px rgba(150,150,150,0.73);
    -webkit-box-shadow: 5px 5px 10px 0px rgba(150,150,150,0.73);
    -moz-box-shadow: 5px 5px 10px 0px rgba(150,150,150,0.73);
    padding: 10px;
  }
  .event-param{
    height: 30px;
  }
  .event-type {
    padding: 5px;
    max-width: max-content;
    color: #fff;
    border-radius: 3px;
    font-size: 10px;
    font-weight: 600;
    height: max-content;
  }
  .event-name, .event-description, .event-dates, .event-deadline {
    margin: 5px 0;
  }
  .event-name-block{
    display: block;
    height: 60px;
    max-height: 60px;
  }
  .event-name{
    font-weight: 600;
    font-size: 1rem;
    height: 60px;
  }
  .event-img{
    height: 96px;
    max-height: 96px;
  }
  .event-thumbnail{
    height: 96px;
    object-fit: cover;
    width: 100%;
  }
  .event-org-details{
    height: 30px;
  }
  .event-date-title{
    font-size: 10px;
  }
  .event-dates{
    font-size: 10px;
    color: #000000;
    font-weight: 500;
    margin: 0;
  }
  .org-name{
    font-size: 10px;
    color: #000000;
    font-weight: 500;
    margin: 0;
  }
  .event-organizer-title{
    color: #575757;
    font-weight: 500;
    font-size: 10px;
  }
  .event-details-btn{
    height: 60px;
  }
  .event-details-btn button{
    font-size: 14px;
    color: #031954;
    padding: 7px 20px;
    border: 1px solid #031954;
    border-radius: 5px;
    font-weight: 500;
    margin-top: 1rem;
    transition: all 200ms ease;

  }
  .event-details-btn button:hover{
    background-color: #031954;
    color: white;
  }
  .types-event{
    color: #031954;
  }
</style>