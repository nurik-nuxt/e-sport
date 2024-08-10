<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useNewsStore } from '@/store/newsStore';

const route = useRoute();
const newsStore = useNewsStore();

onMounted(() => {
  if (route.params.id) {
    newsStore.setSelectedNews(route.params.id as string);
  }
});

const selectedNews = computed(() => newsStore.selectedNews);
</script>

<template>
  <div class="news-item-block px-6 mt-10">
    <div class="news-block-title font-bold text-3xl">
      Новости
    </div>
    <div v-if="selectedNews" class="news-item-container">
      <div class="news-title-name text-2xl font-medium mb-3">
        {{ selectedNews.title }}
      </div>
      <div class="news-item-img w-full h-auto">
        <img :src="selectedNews.thumbnail" alt="News Image"/>
      </div>
      <div class="news-item-text-contain font-medium text-sm mt-6 pb-5">
        {{ selectedNews.content }}
      </div>
      <div class="news-author-and-date flex justify-between">
        <div class="news-author flex flex-col">
          <div class="news-author-title font-semibold text-sm">
            Автор:
          </div>
          {{ selectedNews.author.firstName }} {{ selectedNews.author.lastName }}
        </div>
        <div class="news-date text-sm flex flex-col">
            <div class="news-date-title font-semibold">
              Дата публикации:
            </div>
            {{ new Date(selectedNews.createdAt).toLocaleDateString() }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.news-item-img img {
  width: 100%;
  height: auto;
}
</style>