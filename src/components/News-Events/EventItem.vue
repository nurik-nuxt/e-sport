<script setup lang="ts">
import { computed, onMounted, watch } from 'vue';
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

const eventId = computed(() => route.params.id || route.query.selectedEventId);

watch(eventId, (newEventId) => {
  if (newEventId && (!selectedEvent.value || selectedEvent.value.id !== newEventId)) {
    eventStore.fetchEventById(newEventId);
  }
}, { immediate: true });

const getAuthorName = (organizer: string) => {
  return organizer || 'Unknown Organizer';
};

// Function to sort winners by medal priority
const sortWinners = (winners) => {
  const medalPriority = { gold: 1, silver: 2, bronze: 3 };
  return winners.sort((a, b) => medalPriority[a.medal] - medalPriority[b.medal]);
};

// Create a computed property for sorted winners
const sortedWinners = computed(() => {
  return selectedEvent.value && selectedEvent.value.winners ? sortWinners(selectedEvent.value.winners) : [];
});

const getMedalMessage = (medal: string) => {
  switch (medal) {
    case 'gold':
      return '1 - место';
    case 'silver':
      return '2 - место';
    case 'bronze':
      return '3 - место';
    default:
      return 'Участник';
  }
};
const hasWinners = computed(() => {
  return selectedEvent.value && selectedEvent.value.winners && selectedEvent.value.winners.length > 0;
});

const isAuthor = computed(() => {
  return selectedEvent.value && authStore.iin === selectedEvent.value.createdBy?.iin; // Compare the authenticated user's IIN with createdBy IIN
});

</script>
<template>
  <div class="event-item-block">
    <div class="word-events">
      {{ selectedEvent?.title}}
    </div>
    <div class="event-item" v-if="selectedEvent">
      <div class="type-sport">
        <div class="event-discipline-type flex gap-x-4">
          <div class="event-discipline" :style="{ backgroundColor: selectedEvent.discipline.color }">
            {{selectedEvent.discipline.title}}
          </div>
          <div v-if="selectedEvent && selectedEvent.types.length > 0" class="event-type" :style="{ backgroundColor: selectedEvent.types[0].color || 'defaultColor' }">
              {{ selectedEvent.types[0].name || 'Unknown Event' }}
          </div>
          <div v-else>
            Масштаб неизвестно
          </div>
        </div>
        <div class="info-block flex gap-5">
          <div class="photo-and-text-block">
            <div class="photo-of-event mt-5">
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
              <div class="winner-title font-semibold mt-4 text-xl">
                Победители:
              </div>
              <div v-if="hasWinners" class="winners-block-item">
                <div class="winners-block-item flex gap-x-1" v-for="winner in sortedWinners" :key="winner.id">
                  <div class="profile-image-winner w-12 h-12">
                    <img :src="winner.user.profileImage" class="w-12 h-12 border-4 rounded-full" />
                  </div>
                  <div class="winner-fullname flex mt-3 font-medium">
                    <router-link :to="{ path: `/sportsmen-profile/${winner.user.id}` }" class="participant-link">
                      {{ winner.user.firstName }} {{ winner.user.lastName }} - {{ getMedalMessage(winner.medal) }}
                    </router-link>
                  </div>
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
              <div class="participants-title font-semibold text-xl">
                Участники:
              </div>
              <div class="participant-item" v-for="participant in selectedEvent.participants" :key="participant.id">
                <router-link :to="{ path: `/sportsmen-profile/${participant.id}` }" class="participant-link">
                  {{ participant.firstName }} {{ participant.lastName }}
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="isAuthenticated" class="set-event-btn-block">
        <div v-if="isAuthor">
          <router-link :to="{ path: `/edite-event/${selectedEvent.id}/about-event` }" class="set-event-button">
            <img src="/icons/set_event.png" class="set-event-icon" />
            Управлять
          </router-link>
        </div>
        <div v-if="!isAuthor">
          <router-link v-if="isAuthenticated" :to="{ path: `/edite-event/${selectedEvent.id}/only-request-participation` }" class="apply-event-button">
            Подать заявку
          </router-link>
        </div>
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
.event-discipline, .event-type{
  font-size: 1rem;
  font-weight: 500;
  padding: 4px 10px;
  width: max-content;
  border-radius: 5px;
  color: #ffffff;
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
.apply-event-button{
  padding: 15px;
  border: 1px solid #031954;
  border-radius: 5px;
  color: #031954;
  font-weight: 500;
  font-size: 1rem;
  transition: all 200ms ease;
}
.apply-event-button:hover{
  color: white;
  background-color: #031954;
}
.participant-link:hover {
  color: blue;
  text-decoration: underline;
  cursor: pointer;
}
</style>