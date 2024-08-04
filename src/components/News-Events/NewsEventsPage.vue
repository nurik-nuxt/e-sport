<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const isNewsActive = computed(() => route.path.endsWith('/news'));
const isEventsActive = computed(() => route.path.endsWith('/events'));

</script>

<template>
  <div class="news-events-page">
    <div class="page-nav">
      <router-link to="/news-events/news"
                   :class="{ 'active': isNewsActive }"
      >
        Новости
      </router-link>
      <img src="/icons/line-between.png" class="line-between mt-2">
      <router-link to="/news-events/events"
                   :class="{ 'active': isEventsActive }"
      >
        Мероприятия
      </router-link>
    </div>
    <router-view name="newsEventsPage">
    </router-view>
  </div>
</template>
<style scoped>
router-link {
  color: grey; /* Цвет для неактивных ссылок */
}
.active {
  color: #294694;
  padding-bottom: 5px;
  border-bottom: 2px #294694 solid;
}
.page-nav{
  display: flex;
  margin-left: 30px;
  margin-top: 30px;
  font-size: 2rem;
  font-weight: 600;
  gap: 23px;
}
.line-between{
  height: 40px;
  width: 2px;
}
</style>