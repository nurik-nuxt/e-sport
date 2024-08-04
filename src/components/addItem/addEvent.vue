<script setup lang="ts">
import {computed, ref, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useEventStore } from '@/store/eventStore';

const route = useRoute();
const router = useRouter();
const eventStore = useEventStore();
const showCreateEvent = ref(false);

watchEffect(() => {
  const source = route.query.source as string;
  const eventId = route.query.eventId as string;
  showCreateEvent.value = source === 'eventItem';
  if (eventId) {
    eventStore.fetchEventById(eventId);
  }
});

const navigateToParticipants = () => {
  router.push({ path: '/create-event/create-about-participants', query: { source: 'eventItem' } });
};

const navigateToEvent = () => {
  router.push({ path: '/create-event/create-about-event', query: { source: 'eventItem' } });
};

const isNewsActive = computed(() => route.path.endsWith('/aboutEvent'));
const isPartActive = computed(() => route.path.endsWith('/aboutPart'));
</script>

<template>
  <div class="create-event mx-10 mt-16">
    <div class="create-event-title font-semibold text-4xl">
      Организация мероприятия
    </div>
    <div class="add-event-nav">
      <button @click="navigateToEvent"
              :class="{ 'active': isNewsActive }">
        О Мероприятии
      </button>
      <button
          v-if="showCreateEvent"
          @click="navigateToParticipants"
          :class="{ 'active': isPartActive }"
      >
        Участники
      </button>
    </div>
    <router-view name="createEvent">
    </router-view>
  </div>
</template>

<style scoped>
  .create-event-title{
    color: #031954;
  }
  .add-event-nav{
    display: flex;
    gap: 20px;
    margin-top: 20px;
  }
  button {
    color: #203D8B;
    text-decoration: none;
    border-radius: 15px;
    padding: 10px 20px;
    border: 1px solid #203D8B;
    transition: all 200ms ease;
    font-weight: 500;
    font-size: 1rem;
  }
  button.active {
    background-color: #203D8B;
    color: white;
  }
  button:hover {
    background-color: #203D8B;
    color: white;
  }
</style>