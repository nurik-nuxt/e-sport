<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
  <div class="edit-event-block">
    <div class="participant-title ml-4 mt-5">
      Участие в мероприятиях
    </div>
    <div class="edit-block-nav mt-2.5 flex justify-left ml-4 gap-x-4">
      <router-link :to="{ path: `/edite-event/${route.params.id}/about-event` }">
        О мероприятии
      </router-link>
      <router-link :to="{ path: `/edite-event/${route.params.id}/participants-event` }">
        О участниках
      </router-link>
    </div>
    <router-view name="editEvent">
    </router-view>
  </div>
</template>

<style scoped>
.participant-title{
  color: #031954;
  font-size: 2rem;
  font-weight: 600;
}
a{
  text-decoration: none;
  color: #031954;
  cursor: pointer;
  padding: 8px 32px;
  text-align: center;
  border: 1px solid #031954;
  border-radius: 15px;
  transition: all 200ms ease;
}
a:hover{
  color: #ffffff;
  background-color: #031954;
}
</style>