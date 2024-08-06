<script setup lang="ts">
import {computed} from "vue";

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
const testUser = (userData as UserProfile[])[0];

const userStore = useUserStore();
const route = useRoute();
const user = computed(() => {
  return userStore.getCurrentSchoolSportsmens?.find((sportsmen) => sportsmen?.id === route?.params?.id)
})
</script>
<template>
    <div class="sports_men_profile">
        <div class="profile_info flex gap-x-9 justify-center px-8">
            <div class="profile_img border-1 border-black border-solid">
                <img :src="user?.profileImage" class="w-auto h-auto profile-image" alt="photo"/>
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
                    <div class="award_list flex mt-2">
                        <div v-for="item in testUser.awards" :key="item.id" class="award_item">
                            <a :href="item.link" class="flex" target="_blank"> 
                                <img :src="item.img" :alt="`Photo of ${item.text}`" class="size-10">
                                <p class="mt-2">{{ item.text }}</p>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="discplines mt-2.5">
                    <div class="disciplines_title text-1xl font-bold">
                        Дисциплины
                    </div>
                    {{  user?.discipline?.title }}
                </div>
                <div class="coach mt-2.5">
                    <div class="coach_title text-1xl font-bold">
                        Тренера
                    </div>
                    {{ user.coach }}
                </div>
            </div>
        </div>
        <div class="ratingBlock px-8 mt-4">
            <div class="item_rating flex">
                <div v-for="index in 5" :key="index" class="star">
                    <img src="../../assets/icons/StarLight.png" v-if="index <= user.rating" alt="Filled Star">
                    <img src="../../assets/icons/StarGray.png" v-else alt="Empty Star">
                </div>
            </div>
            <p class="font-bold mt-2">Рейтинг спортсмена</p>
        </div>
        <div class="gallereyBlock px-8">
            <div class="galleryTitle font-bold text-xl my-8">
                Галерея:
            </div>
            <div class="galleryList flex flex-wrap w-full justify-between gap-4">
                <div class="galleryItem sm:w-1/2 md:w-1/3 lg:w-1/4 p-1" v-for="(image, index) in user.gallery" :key="index">
                    <img :src="image" class="galleryImage w-full h-auto rounded shadow-lg transition-transform transform hover:scale-105"/>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .sports_men_profile{
        margin-top: 5rem;
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
</style>
