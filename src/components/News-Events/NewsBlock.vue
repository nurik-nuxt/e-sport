<script setup lang="ts">
import NewsBlockNav from "@/components/News-Events/NewsBlockNav.vue";
import AddNewsBlock from "@/components/News-Events/AddNewsBlock.vue";
import { useNewsStore } from '@/store/newsStore';
import {ref, onMounted} from "vue";

const newsStore = useNewsStore();
const add_news = ref(false);
const newsList = ref([]);

const truncateContent = (content: string, length: number = 100) => {
  if (content.length <= length) return content;
  return content.substring(0, length) + '...';
};

const showAddNewsModal= () => {
  add_news.value = true;
}
const hideAddNewsModal = () => {
  add_news.value = false;
}

onMounted(() => {
  newsStore.fetchNews();
});
</script>

<template>
  <div class="news-block">
    <NewsBlockNav @add-news="showAddNewsModal"   />
    <div v-if="newsStore.error" class="error-message">
      {{ newsStore.error }}
    </div>
    <div class="news-list-block ml-8 pb-5">
      <div class="news-list flex flex-wrap gap-x-3 gap-y-8">
        <div v-for="news in newsStore.newsList" :key="news.id" class="news-item w-80 flex flex-col justify-between pt-2">
          <div class="news-item-title-block">
            <div class="news-item-title font-semibold text-base">
              {{ news.title }}
            </div>
          </div>
          <div class="news-item-content h-24 w-full">
            <img alt="image of news" :src="news.thumbnail" class="h-24 w-full news-img"/>
          </div>
          <div class="news-city-and-author flex justify-between mt-5">
            <div class="new-city-block flex flex-col">
              <span class="text-xs text-gray-600">Дата</span>
              <div class="news-city text-xs font-medium">
                {{ new Date(news.createdAt).toLocaleDateString() }}
              </div>
            </div>
            <div class="author-block flex flex-col">
              <span class="text-xs text-gray-600">Автор</span>
              <div class="news-author text-xs font-medium">
                {{ news.author.firstName }} {{ news.author.lastName }}
              </div>
            </div>
          </div>
          <router-link :to="{ name: 'NewsItem', params: { id: news.id } }" class="more-btn mt-5">
            Подробнее
          </router-link>
        </div>
      </div>
    </div>
    <div v-if="add_news" class="add-news-modal-contain">
      <div class="add-news-modal">
        <add-news-block class="add-news-block"  @close="hideAddNewsModal" />
      </div>
    </div>
  </div>
</template>

<style scoped>
  .add-news-modal-contain{
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.5);
    top: 0;
    left: 0;
    position: absolute;
  }
  .add-news-modal{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
  .more-btn{
    color: #031954;
    border: 1px solid #031954;
    border-radius: 5px;
    padding: 7px 20px;
    font-weight: 500;
    transition: all 200ms ease;
    width: max-content;
  }
  .more-btn:hover{
    background-color: #031954;
    color: white;
  }
  .news-item{
    border-radius: 5px;
    box-shadow: 5px 5px 10px 0px rgba(150,150,150,0.73);
    -webkit-box-shadow: 5px 5px 10px 0px rgba(150,150,150,0.73);
    -moz-box-shadow: 5px 5px 10px 0px rgba(150,150,150,0.73);
    padding: 10px;
    padding-bottom: 30px;
  }
  .news-item-title{
    display: block;
    height: 60px;
    width: 100%;
    max-height: 60px;
  }
  .news-img{
    object-fit: cover;
    width: 100%;
  }
</style>