<script setup lang="ts">
import {computed, ref} from 'vue';
import BaseInput from "@/components/base/BaseInput.vue";
import {useSchoolStore} from "@/store/schoolStore";
import {useCitiesStore} from "@/store/cities";
import {useRoute} from "vue-router";
import { useScheduleStore } from "@/store/schedule";

const emits = defineEmits(['close']);

const scheduleStore = useScheduleStore();
const schoolStore = useSchoolStore();
const citiesStore = useCitiesStore();
const lastName = ref('');
const firstName = ref('');
const biography = ref('');
const phoneNumber = ref('');
const route = useRoute();
const quality = ref(3)
const equipment = ref(3)
const hallCondition = ref(3)
const coachingStaff = ref(3)


const schoolTitle = computed(() => {
  return schoolStore.getCurrentSchool?.title
})
const schoolCityId = computed(() => {
  return schoolStore.getCurrentSchool?.cityId
})

const cityTitle = computed(() => {
  return citiesStore?.getCities?.find((city) => city.id === schoolCityId.value)?.name
})

async function onSubmit() {
  try {
    const data = {
      name: firstName.value,
      surname: lastName.value,
      phoneNumber: phoneNumber.value,
      schoolId: <string>route?.params?.id,
      overallDescription: biography.value,
      quality: quality.value,
      equipment: equipment.value,
      hallCondition: hallCondition.value,
      coachingStaff: coachingStaff.value
    }
    await scheduleStore.createReview(data).then(async (res) => {
        if (res?.id) {
          await scheduleStore.fetchSchoolReviews(<string>route?.params?.id)
          emits('close')
        }
    })
  } catch (e) {
    console.error(e)
  }
}
</script>
<template>
  <div class="addUserWrapper">
    <div class="addUserBlock">
      <div class="addUserTitle">
        Оставьте отзыв о школе
      </div>
      <form @submit.prevent="onSubmit" method="POST" class="form_add_user">
        <div class="school-and-city-block flex justify-between gap-1">
          <div class="school-block input-item flex flex-col w-full">
            <label for="school_name" class="label-title">
              Школа
            </label>
            <input
                type="text"
                :value="schoolTitle"
                name="school_name"
                id="school_name"
                readonly
                class="text-center"
            />
          </div>
          <div class="city-block input-item flex flex-col w-full">
            <label for="city" class="label-title">
              Город
            </label>
            <input
                type="text"
                :value="cityTitle"
                name="city"
                id="city"
                readonly
                class="text-center"
            />
          </div>
        </div>
        <div class="fullname-block justify-between gap-1">
          <div class="surname-block w-full">
            <label for="surname_user">Фамилия</label>
            <base-input
                v-model="lastName"
                type="text"
                name="surname_user"
                color="red-500"
                backgroundColor="blue-100"
                fontSize="lg"
                id="surname_user"
                required
            />
          </div>
          <div class="name-block flex flex-col w-full">
            <label for="name_user" class="">Имя</label>
            <base-input
                v-model="firstName"
                type="text"
                name="name_user"
                color="red-500"
                backgroundColor="blue-100"
                fontSize="lg"
                id="name_user"
                required
            />
          </div>
        </div>
        <div class="tel-block flex flex-col w-full">
          <label for="phone_number">Номер телефона( по желанию)</label>
          <base-input
              class="w-full"
              v-model="phoneNumber"
              type="tel"
              name="phone_number"
              id="phone_number"
              :size="12"
              :maxlength="12"
              autocomplete="tel"
              placeholder="+7 (7__) ___ __ __"
          />
        </div>
        <div class="flex flex-col gap-4 mt-2">
          <div class="flex flex-col gap-2 justify-center items-center">
            <span class="rating">Состояние зала</span>
            <van-rate v-model="hallCondition" color="#FFEC2D" size="25px" />
          </div>
          <div class="flex flex-col gap-2 justify-center items-center">
            <span class="rating">Оснащённость</span>
            <van-rate v-model="equipment" color="#FFEC2D" size="25px" />
          </div>
          <div class="flex flex-col gap-2 justify-center items-center">
            <span class="rating">Тренерский рейтинг</span>
            <van-rate v-model="coachingStaff" color="#FFEC2D" size="25px" />
          </div>
          <div class="flex flex-col gap-2 justify-center items-center">
            <span class="rating">Качество обучения</span>
            <van-rate v-model="quality" color="#FFEC2D" size="25px" />
          </div>
        </div>
        <div class="description-user-block flex flex-col mt-3">
          <label for="description" class="description-label">
            Ваше мнение
          </label>
          <textarea id="description" class="description-user-text resize-none" v-model="biography">
                </textarea>
        </div>
        <div class="btns_add_school flex justify-between w-full mt-10">
          <button  @click="$emit('close')" value="Отменить" id="reject_btn" class="py-4 px-9 btn_reject" >
            Отменить
          </button>
          <button type="submit" value="Далее" id="upload_btn">
            Добавить отзыв
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<style scoped>
.addUserWrapper{
  display: flex;
  justify-content: center;
  width: 100%;
  height: auto;
  background-color: rgba(255, 255, 255, 1);
}
.addUserBlock{
  font-family: 'Montserrat', sans-serif;
  background-color: #fff;
  width: 574px;
  max-width: 574px;
  margin-top: 4rem;
  height: 100%;
  padding-bottom: 20rem;
}
.addUserTitle{
  font-size: 2rem;
  font-weight: 600;
  text-align: center;
  display: flex;
  justify-content: center;
}
.form_add_user{
  display: flex;
  flex-direction: column;
  //width: 520px;
  margin-left: 4.5%;
}
.surname-block{
  display: flex;
  flex-direction: column;
}
label{
  text-align: center;
  color: #031954;
  font-weight: 550;
  font-size: 1.125rem;
}
.fullname-block{
  display: flex;
  gap: 2%;
}
.form_add_user input{
  height: 40px;
  font-size: 20px;
  border: 1px solid #031954;
  border-radius: 10px;
  padding: 5px 10px;
  //width: 255px;
}
.form_add_user input:focus{
  border: 1px solid #007BFF;
}
.father-name-and-birthday{
  display: flex;
  column-gap: 2%;
}
.iin-and-tel-block{
  column-gap: 2%;
}
.school-and-city-block{
  column-gap: 2%;
}
#fileInput{
  border: none;
  height: 40px;
}
.role_label{
  margin-top: 1rem;
}
.role-select,.select-discipline{
  position: relative;
}
#role,#discipline{
  padding: 5px 10px;
  font-family: 'Montserrat', sans-serif;
  font-size: 1.25rem;
  width: 100%;
  appearance: none;
  height: 40px;
  border: 1px solid #031954;
  border-radius: 10px;
  text-align: center;
}
.img-arrow-down{
  right: 20px;
  top: 15px;
}
.description-user-text{
  border: 1px solid #031954;
  border-radius: 10px;
  text-align: left;
  padding: 10px;
  height: 80px;
}
.password-block .password-input{
  width: 100%;
  font-size: 12.5px;
}
.title_color {
  color: #031954;
  font-weight: 500;
  text-align: center;
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

.rating {
  font-size: 18px;
  font-weight: 500;
  text-align: left;
  color: #031954;
}
</style>
