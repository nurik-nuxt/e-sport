<script setup lang="ts">
import userData from '../../../public/database/profile.json';
import {computed} from "vue";
import {useUserStore} from "@/store/users";
import { useSchoolStore } from "@/store/schoolStore";
import {useRoute} from "vue-router";
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
  discipline_color: string;
  reviews: string[];
}
const testUser = (userData as UserProfile[])[0];
const userStore = useUserStore();
const schoolStore = useSchoolStore();
const school = computed(() => {
  return schoolStore.getCurrentSchool
})
const route = useRoute();

const user = computed(() => {
  return userStore?.getCurrentSchoolCoaches?.find((coach) => coach.id === route?.params?.id)
})
</script>
<template>
  <div class="coach_profile">
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
          <div class="award_list flex flex-col mt-2">
            <div class="award_item">
              1 место:
              <div class="award-list-item"></div>
            </div>
            <div class="award_item">
              2 место:
              <div class="award-list-item"></div>
            </div>
            <div class="award_item">
              3 место:
              <div class="award-list-item"></div>
            </div>
          </div>
        </div>
        <div class="discplines mt-2.5">
          <div class="disciplines_title text-1xl font-bold mb-3">
            Дисциплины
          </div>
          <div class="discipline_coach" :style="{backgroundColor: user?.discipline?.color }">
            {{  user?.discipline?.title }}
          </div>
        </div>
        <div class="coach mt-2.5">
          <button class="coach-group-btn">
            Группы
          </button>
        </div>
      </div>
    </div>
    <div class="ratingBlock px-8 mt-4">
      <div class="item_rating flex">
        <van-rate :model-value="user?.rating" readonly color="#FFEC2D" />
      </div>
      <p class="font-bold mt-2">Рейтинг тренера</p>
    </div>
    <div class="list-reviews-coach px-8">
      <div class="list-reviews-title font-semibold text-xl mt-6">
        Отзывы:
      </div>
      <div class="reviews-item-list flex flex-wrap gap-x-7">
        <div class="reviews-item mt-9" v-for="(review, index) in testUser.reviews" :key="index">
          <div class="review-head flex px-2">
            <div class="author-img w-11 h-11 rounded-full">
              <img :src="review?.author_img" alt="Author Image" class="w-full h-full">
            </div>
            <div class="author-info flex flex-col ml-2">
              <div class="author-name font-medium text-xl">
                {{ review?.author }}
              </div>
              <div class="author-status font-medium text-sm text-gray-500">
                {{ review?.author_status }}
              </div>
            </div>
          </div>
          <div class="review-body">
            <div class="review-text font-medium text-xs text-gray-500 w-96 mt-2.5">
              {{ review?.review_text }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.coach_profile{
  margin-top: 15px;
}
.discipline_coach{
  padding: 6px 30px;
  width: max-content;
  color: white;
  border-radius: 5px;
  font-size: 20px;
  font-weight: 600;
}
.coach-group-btn{
  color: #031954;
  padding: 10px 40px;
  border-radius: 15px;
  border: 1px solid #031954;
  transition: all 200ms ease-in-out;
  font-weight: 500;
}
.coach-group-btn:hover{
  color: white;
  background-color: #031954;
}
.reviews-item{
  padding: 20px 10px;
  border-radius: 15px;
  border: 1px solid #031954;
  width: max-content;
}
.profile-image {
  width: 100%;
  height: 350px;
  max-height: 350px;
  position: relative;
  max-width: 350px;
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
  margin-bottom: 15px;
}
.school_name{
  font-weight: 600;
  font-size: 2rem;
}
</style>
