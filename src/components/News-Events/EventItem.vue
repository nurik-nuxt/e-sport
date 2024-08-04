<script setup lang="ts">
import { computed, watchEffect } from 'vue';
import { useEventStore } from '@/store/eventStore';
import { useRoute } from 'vue-router';
import { useAuthStore } from "@/store/auth";

const authStore = useAuthStore();
const isAuthenticated = computed(() => !!authStore.authToken);
const eventStore = useEventStore();
const route = useRoute();

const selectedEvent = computed(() => {
  return eventStore.selectedEvent;
});

watchEffect(() => {
  const eventId = route.params.id as string;
  if (!selectedEvent.value || selectedEvent.value.id !== eventId) {
    console.log("Mismatch detected or no selected event. Fetching event based on route id:", eventId);
    eventStore.fetchEventById(eventId);
  }
});

const getEventTypeStyle = (type) => {
  const defaultColors = {
    'Первенство Области': '#29FF72',
    'Чемпионат Области': '#E1253C',
    // Add other types with default colors if needed
    'Unknown Event': '#000000'
  };
  return {
    name: type.name || 'Unknown Event',
    color: type.color || defaultColors[type.name] || defaultColors['Unknown Event']
  };
};
const getAuthorName = (organizer: string) => {
  return organizer || 'Unknown Organizer';
};

const getMedalMessage = (medal: string) => {
  switch (medal) {
    case 'gold':
      return 'Первое место';
    case 'silver':
      return 'Второе место';
    case 'bronze':
      return 'Well done on winning the bronze medal!';
    default:
      return 'Congratulations!';
  }
};
const hasWinners = computed(() => {
  return selectedEvent.value && selectedEvent.value.winners && selectedEvent.value.winners.length > 0;
});


</script>
<template>
  <div class="event-item-block">
    <div class="word-events">
      Мероприятия
    </div>
    <div class="event-item" v-if="selectedEvent">
      <div class="type-sport">
        <div class="event-type" v-for="type in selectedEvent.types" :key="type.id" :style="{ backgroundColor: selectedEvent.discipline.color }">
          {{ getEventTypeStyle(type).name }}
        </div>
        <div class="event-name">
          {{ selectedEvent.name }}
        </div>
        <div class="info-block flex gap-5">
          <div class="photo-and-text-block">
            <div class="photo-of-event">
              <img :src="selectedEvent.thumbnail || 'https://i.postimg.cc/vTcV4sgF/1472020650855kv-1000x768.jpg'" alt="EventStore Photo">
            </div>
            <div class="full-text-event">
              {{ selectedEvent.description }}
            </div>
          </div>
          <div class="short-data-event">
            <div class="date-event flex flex-col">
              <div class="date-even-title text-sm font-semibold">
                Дата проведения:
              </div>
              <div class="event-dates text-sm">
                {{ new Date(selectedEvent.startDate).toLocaleDateString() }} - {{ new Date(selectedEvent.endDate).toLocaleDateString() }}
              </div>
            </div>
            <div class="prize-fund-event flex flex-col mt-4">
              <div class="prize-event-title text-sm font-semibold">
                Призовой фонд:
              </div>
              <div class="prize-fund text-sm">
                {{ selectedEvent.prizePool}}
              </div>
            </div>
            <div class="orgaz-name-block flex flex-col mt-4">
              <div class="org-title text-sm font-semibold">
                Организатор:
              </div>
              <div class="org-name text-sm">
                {{ getAuthorName(selectedEvent.organizer) }}
              </div>
            </div>
            <svg height="1" width="100%" class="mt-5">
              <line x1="0" y1="0" x2="100%" y2="0" style="stroke:rgb(0,0,0);stroke-width:2" />
            </svg>
            <div class="winners-block">
              <div class="winner-title font-semibold mt-4 ml-2.5">
                Победители:
              </div>
              <div v-if="hasWinners" class="winners-block-item">
                <div class="winners-block-item flex gap-x-1" v-for="winner in selectedEvent.winners" :key="winner.id">
                  <div class="profile-image-winner w-12 h-12">
                    <img :src="winner.user.profileImage" class="w-12 h-12 border-4 rounded-full" />
                  </div>
                  <div class="winner-fullname flex mt-3">
                    {{ winner.user.firstName }} {{ winner.user.lastName }}
                  </div>
<!--                  - {{ getMedalMessage(winner.medal) }}-->
                </div>
              </div>
              <div v-else class="winners-block-item text-xl text-slate-500 px-2 py-24 font-bold italic" >
                -Конкурс еще не окончен <br/>
                Следите за новостями-
              </div>
            </div>
            <svg height="1" width="100%" class="mt-5">
              <line x1="0" y1="0" x2="100%" y2="0" style="stroke:rgb(0,0,0);stroke-width:2" />
            </svg>
            <div class="list-participants-block flex flex-col mt-4">
              <div class="participants-title font-semibold text-sm ml-2.5">
                Участники:
              </div>
              <div class="participant-item" v-for="participant in selectedEvent.participants" :key="participant.id">
                {{ participant.firstName }} {{ participant.lastName }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="isAuthenticated" class="set-event-btn-block">
        <router-link :to="{ path: '/create-event', query: { source: 'eventItem', eventId: selectedEvent.id } }"  class="set-event-button">
          <img src="/icons/set_event.png" class="set-event-icon" />
          Управлять
        </router-link>
      </div>
    </div>
    <div v-else>
      Мепроприятие не найдено
    </div>
  </div>
</template>
<style scoped>
.event-item-block{
  padding: 40px 30px;
}
.word-events{
  font-size: 2rem;
  font-weight: 600;
  display: flex;
}
.event-type{
  padding: 4px 10px;
  font-size: 10px;
  color: #ffffff;
  border-radius: 5px;
  width: max-content;
  font-weight: 600;
}
.event-name{
  font-size: 1.5rem;
  font-weight: 500;
  padding: 15px 0;
}
.photo-and-text-block{
  width: 72% !important;
}
.photo-of-event{
  width: 100%;
}
.full-text-event{
  margin-top: 22px;
  font-weight: 500;
  font-size: 14px;
}
.set-event-btn-block{
  position: absolute;
  right: 50px;
  top: 50px;
}
.set-event-button{
  position: relative;
  padding: 13px 30px 13px 53px;
  border: 1px solid #031954;
  border-radius: 5px;
  color: #031954;
  font-weight: 500;
  font-size: 1rem;
  transition: all 200ms ease;
}
.set-event-button:hover{
  color: white;
  background-color: #1B0942;
}
.set-event-icon{
  position: absolute;
  top: 12px;
  left: 20px;
}
</style>