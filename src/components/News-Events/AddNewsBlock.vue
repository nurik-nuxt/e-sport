<script setup lang="ts" xmlns="http://www.w3.org/1999/html">
import {computed, onMounted, ref, defineEmits} from "vue";
import {useUploadStore} from "@/store/upload";
import { useCitiesStore } from "@/store/cities/index";
import { useApi } from "@/composable/useApi";
import { useRouter } from "vue-router";

const preview = ref<string | ArrayBuffer | null>(null);
const thumbnail = ref('');
const uploadStore = useUploadStore();
const citiesStore = useCitiesStore();
const router = useRouter();
const cityId = ref('');
const title = ref('');
const content = ref('');
const emit = defineEmits(['close']);

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

async function createNews() {
  try {
    const requestBody = {
      title: title.value,
      content: content.value,
      cityId: cityId.value,
      thumbnail: thumbnail.value,
    };

    await useApi('v1/news', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      data: requestBody,
    });
    console.log('News created successfully');
    router.push('/news-events/news');
    emit('close');
  } catch (error) {
    console.error('Error creating news:', error);
    alert('Failed to create news. Please try again.');
  }
}
const cities = computed(() => citiesStore.getCities);

onMounted(() => {
  citiesStore.fetchCities();
});
</script>

<template>
  <div class="add-news-block w-96">
    <div class="add-news-title text-center font-semibold text-3xl">
      Создать новость
    </div>
    <div class="add-news-contain w-full">
      <div class="title-news-block flex flex-col">
        <label for="news-title" class="news-title text-center">
          Название
        </label>
        <input type="text" id="news-title" class="w-full" v-model="title" />
      </div>
      <div class="content-block flex flex-col">
        <label for="news-content" class="news-content text-center">
          Текст
        </label>
        <textarea type="text" id="news-content" class="w-full resize-none textarea-content" v-model="content"/>
      </div>
      <div class="city-block flex flex-col">
        <label for="city" class="news-content text-center">
          Город
        </label>
        <div class="city-select-block relative">
          <select v-model="cityId" id="city" class="w-full text-center">
            <option class="city-option font-medium" disabled value="">Выберите город</option>
            <option v-for="city in cities" :key="city.id" :value="city.id" class="font-medium">
              {{ city.name }}
            </option>
          </select>
          <img src="/icons/arrowDown.png" class="absolute img-arrow-down"/>
        </div>
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
        <button @click="$emit('close')" id="reject_btn" class="py-4 px-9 btn_reject" >
          Отменить
        </button>
        <button type="submit" @click="createNews" value="" id="upload_btn">
          Опубликовать новость
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .add-news-block{
    width: 600px;
    padding: 40px;
    background-color: white;
    border-radius: 15px;
    border: 1px solid #031954;
    color: #031954;
  }
  #news-title{
    color: #031954;
    height: 40px;
    border: 1px solid #031954;
    border-radius: 10px;
    padding: 0 10px;
    text-align: center;
    font-size: 20px;
    font-weight: 500;
  }
  #city{
    height: 40px;
    border: 1px solid #031954;
    border-radius: 10px;
    appearance: none;
    font-weight: 500;
  }
  .city-option{
    height: 40px;
  }
  .textarea-content{
    border: 1px solid #031954;
    border-radius: 10px;
    padding: 10px;
    height: 250px;
    font-size: 1rem;
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
  .img-arrow-down{
    right: 15px;
    top: 17px;
  }
</style>