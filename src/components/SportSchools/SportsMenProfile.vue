<script setup lang="ts">
import {computed} from "vue";
import { useSchoolStore } from "@/store/schoolStore";

interface UserProfile {
  name: string;
  surname: string;
  position: string;
  biography: string;
  status: string;
  photo: string;
  discipline: string;
  coach: string;
  text: string;
  rating: number;
  gallery: string[];
  awards: string[];
}
import userData from '../../../public/database/profile.json';
import {useUserStore} from "@/store/users";
import {useRoute} from "vue-router";
import {useAuthStore} from "@/store/auth";
const testUser = (userData as UserProfile[])[0];
const authStore = useAuthStore();
const schoolStore = useSchoolStore();
const isAuthenticated = computed(() => !!authStore.authToken);
const schoolId = computed(() => {
  return schoolStore.getCurrentSchoolId
})

const userStore = useUserStore();
const route = useRoute();
const user = computed(() => {
  return userStore.getCurrentSchoolSportsmens?.find((sportsmen) => sportsmen?.id === route?.params?.id)
})

const adminSchoolId = computed(() => {
  return localStorage.getItem('schoolId')
})
const userRole = computed(() => {
  return localStorage.getItem('userRole')
})

const school = computed(() => {
  return schoolStore.getCurrentSchool
})
</script>
<template>
    <div class="sports_men_profile">
      <div class="school_data">
        <div class="school_title_info">
          <van-rate :model-value="school?.rating" readonly color="#FFEC2D" />
          <div class="school_name">
            {{ school?.name}}
          </div>
          <div class="school_address">
            {{ school?.address }}
          </div>
        </div>
      </div>
      <div class="profile_info flex gap-x-9 px-8">
          <div class="itemSportsMan">
            <div class="itemImg" :style="{ backgroundImage: 'url(' + user?.profileImage + ')'}"></div>
          </div>
            <div class="profile_info_text flex-col justify-around">
                <div class="fullname">
                    <div class="fullname_title text-1xl font-bold">
                        ФИО
                    </div>
                    <div class="fullname_text">
                        {{ user?.firstName + " " + user?.lastName }}
                    </div>
                </div>
                <div class="biography w-3/4 mt-2.5">
                    <div class="biography_title text-1xl font-bold">
                        Биография
                    </div>
                    <div class="biography_text">
                        {{ user?.biography }}
                    </div>
                </div>
                <div class="awards mt-2.5">
                    <div class="award_title text-1xl font-bold">
                        Награды
                    </div>
                    <div class="award_list flex flex-col mt-2 h-24 overflow-y-auto">
                        <div v-for="item in testUser.awards" :key="item.id" class="award_item">
                            <p class="flex" target="_blank">
                                <img :src="item.img" :alt="`Photo of ${item.text}`" class="size-7">
                                <span class="mt-1">{{ item.text }}</span>
                                <span class="mt-1 px-4">-</span>
                                <span class="mt-1">{{item.date_event}}</span>
                                <span v-for="eventType in item.event_types"
                                      :key="eventType.id"
                                      class="ml-4 rounded event-type-class"
                                      :style="{ backgroundColor: eventType.color }">
                                  {{ eventType.name }}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
                <div class="discplines mt-2.5">
                    <div class="disciplines_title text-1xl font-bold mb-3">
                        Дисциплины
                    </div>
                    <div class="discipline-block" :style="{ backgroundColor: user?.discipline?.color }">
                      {{  user?.discipline?.title }}
                    </div>
                </div>
                <div class="coach mt-2.5">
                    <div class="coach_title text-1xl font-bold">
                        Тренера
                    </div>
                    {{ user?.coach }}
                </div>
            </div>
        </div>
        <div class="ratingBlock px-8 mt-4">
            <div class="item_rating flex">
              <van-rate :model-value="user?.rating" readonly color="#FFEC2D" />
            </div>
            <p class="font-bold mt-2">Рейтинг спортсмена</p>
        </div>
        <div class="gallereyBlock px-8">
            <div class="galleryTitle font-bold text-xl my-8">
                Галерея:
            </div>
            <div class="galleryList flex flex-wrap w-full justify-between gap-4">
                <div class="galleryItem sm:w-1/2 md:w-1/3 lg:w-1/4 p-1" v-for="(image, index) in user?.gallery" :key="index">
                    <img :src="image" class="galleryImage w-full h-auto rounded shadow-lg transition-transform transform hover:scale-105" alt="alt"/>
                </div>
            </div>
        </div>
        <button v-if="isAuthenticated && schoolId === adminSchoolId && userRole === '4'" class="edit-button">
          Редактировать
        </button>
    </div>
</template>
<style scoped>
    .sports_men_profile{
        margin-top: 15px;
    }
    .profile_img{
      width: 411px;
      max-width: 411px;
      overflow: hidden; /* Скрыть части изображения, выходящие за пределы контейнера */
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid black;
    }
    .profile_img_inner{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .discipline-block{
      width: max-content;
      border-radius: 3px;
      padding: 8px 30px;
      color: #ffffff;
      font-weight: 600;
      font-size: 20px;
    }
    .award_list::-webkit-scrollbar {
      width: 2px;
    }

    .award_list::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 10px;
    }

    .award_list::-webkit-scrollbar-thumb {
      background: #888;
      border-radius: 10px;
    }

    .award_list::-webkit-scrollbar-thumb:hover {
      background: #555;
    }

    /* For Firefox */
    .award_list {
      scrollbar-width: thin;
      scrollbar-color: #888 #f1f1f1;
    }

    .galleryList {
        display: flex;
        flex-wrap: wrap;
        align-items: stretch;
        justify-content: flex-start;
        gap: 30px;
    }
    .galleryItem {
        width: 320px; 
        padding: 2px;
    }
    .galleryItem img {
        margin: 0;
        padding: 0;
        width: 100%;
        height: auto;
        display: block;
    }
    .profile-image {
      width: 100%;
      height: 350px;
      max-height: 350px;
      position: relative;
      max-width: 350px;
    }
    .award_item {
      display: flex;
      align-items: center;
      margin-bottom: 0.188rem;
    }
    .event-type-class{
      padding: 5px 12px;
      color: #ffffff;
      font-size: 14px;
      font-weight: 600;
    }
    .edit-button{
      border: 1px solid #F50000;
      color: #031954;
      padding: 14px 20px;
      border-radius: 15px;
      position: absolute;
      top: 30px;
      right: 50px;
      transition: all 200ms ease;
    }
    .edit-button:hover{
      background-color: #B10000;
      color: white;
    }
    .itemSportsMan{
      width: 280px;
      min-width: 280px;
    }
    .itemImg{
      width: 100%;
      height: 350px;
      max-height: 350px;
      position: relative;
      background-position: center;
      background-size: contain;
      background-repeat: no-repeat;
    }
    .school_data {
      margin-left: 32px;
    }
    .school_name{
      font-weight: 600;
      font-size: 2rem;
    }
</style>
