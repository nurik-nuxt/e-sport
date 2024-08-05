<script setup lang="ts">
import {computed, onMounted, ref} from 'vue';
import BaseInput from "@/components/base/BaseInput.vue";
import {useSchoolStore} from "@/store/schoolStore";
import {useCitiesStore} from "@/store/cities";
import {useRoute, useRouter} from "vue-router";
import {useUploadStore} from "@/store/upload";
import {useAuthStore} from "@/store/auth";
import {useApi} from "@/composable/useApi";
import {useDisciplineStore} from "@/store/disciplines";

const uploadStore = useUploadStore();
const authStore = useAuthStore();
const disciplineStore = useDisciplineStore();

const schoolStore = useSchoolStore();
const citiesStore = useCitiesStore();
const preview = ref<string | ArrayBuffer | null>(null);
const lastName = ref('');
const firstName = ref('');
const middleName = ref('')
const iin = ref('');
const biography = ref('');
const birth_date = ref('');
const phoneNumber = ref('');
const role = ref('');
const disciplineId = ref('');
const sport = ref('');
const disciplines = ref<Array<{ id: string; title: string }>>([]);
const serverResponse = ref({});
const password = ref('');
const submitAttempted = ref(false);
const route = useRoute();
const router = useRouter();
const profileImage = ref('');

// Validation of password
const passwordIsValid = computed(() => {
  const minLength = 8;
  const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!№;])[A-Za-z\d!№;]{8,}$/;
  return pattern.test(password.value) && password.value.length >= minLength;
});

const checkPassword = () => {
  if (!passwordIsValid.value) {
    alert("Пароль должен содержать минимум 8 символов, включая как минимум одну заглавную и строчную букву, одну цифру и один специальный символ ('!№;').");
  } else {
    alert("Пароль валиден!");
  }
};


async function onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
        preview.value = (e.target as FileReader).result;
        };
        reader.readAsDataURL(file);
      try {
        profileImage.value = await uploadStore.uploadFile(file);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
}
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
      iin: iin.value,
      password: password.value,
      role: role.value,
      sport: disciplines.value,
      firstName: firstName.value,
      middleName: middleName.value,
      lastName: lastName.value,
      phoneNumber: phoneNumber.value,
      schoolId: <string>route?.params?.id,
      disciplineId: disciplineId.value,
      biography: biography.value,
      birth_date: birth_date.value,
      profileImage: profileImage.value,
      city: schoolCityId.value
    }
    await authStore.addUser(data).then(async (res) => {
      console.log(res);
      if (res?.response?.data?.error) {
        serverResponse.value = res?.response?.data?.message
      } else if (res?.id) {
        await router.push('/PersonalAccount');
      }
    })
  } catch (e) {
    console.error(e)
  }
}
onMounted(async () => {
  await disciplineStore.loadAllDisciplines();
})

// Fetch the list of disciplines on component mount
onMounted(async () => {
  try {
    disciplines.value = await useApi('v1/disciplines/');
  } catch (error) {
    console.error('Error fetching disciplines:', error);
  }
});
</script>
<template>
    <div class="addUserWrapper">
        <div class="addUserBlock">
            <div class="addUserTitle">
              Заполните данные пользователя
            </div>
            <form @submit.prevent="onSubmit" method="POST" class="form_add_user">
              <div class="fullname-block">
                <div class="surname-block">
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
                <div class="name-block flex flex-col">
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
              <div class="father-name-and-birthday">
                <div class="father-name-block flex flex-col input-item">
                  <label for="father_name_user">Отчество (Необязательно)</label>
                  <base-input
                      v-model="middleName"
                      type="text"
                      name="father_name_user"
                      color="red-500"
                      backgroundColor="blue-100"
                      fontSize="lg"
                      id="father_name_user"
                  />
                </div>
                <div class="birthday_block flex flex-col input-item" >
                  <label for="birth_date">Дата рождение</label>
                  <base-input
                      type="date"
                      v-model="birth_date"
                      name="birt_date"
                      id="birth_date"
                  />
                </div>
              </div>
              <div class="iin-and-tel-block flex">
                <div class="iin-block flex flex-col input-item">
                  <label for="iin">ИИН</label>
                  <base-input
                      v-model="iin"
                      type="text"
                      name="iin"
                      :maxlength="12"
                      color="red-500"
                      backgroundColor="blue-100"
                      fontSize="lg"
                      id="iin"
                      required
                  />
                </div>
                <div class="tel-block flex flex-col input-item">
                  <label for="phone_number">Номер телефона</label>
                  <base-input
                      v-model="phoneNumber"
                      type="tel"
                      name="phone_number"
                      id="phone_number"
                      required
                      :size="12"
                      :maxlength="12"
                      autocomplete="tel"
                      placeholder="+7 (7__) ___ __ __"
                  />
                </div>
              </div>
              <div class="school-and-city-block flex">
                <div class="school-block input-item flex flex-col">
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
                <div class="city-block input-item flex flex-col">
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
              <div class="role-block flex flex-col">
                <label for="role" class="role_label">
                  Роль
                </label>
                <div class="role-select w-full">
                  <select id="role" v-model="role" required>
                    <option value="3">
                      Тренер
                    </option>
                    <option value="2">
                      Спортсмен(ка)
                    </option>
                    <option value="4" selected>
                      Админ школы
                    </option>
                  </select>
                  <img src="../../../public/icons/arrowDown.png" class="absolute img-arrow-down" alt="alt"/>
                </div>
              </div>
              <div v-if="role === '2' || role === '3'" class="type-sport-block flex flex-col">
                <label for="discipline" class="type-sport-label">
                  Вид спорта
                </label>
                <select id="discipline" v-model="sport" required class="w-full">
                  <option v-for="discipline in disciplines" :key="discipline.id" :value="discipline.id">
                    {{ discipline.title }}
                  </option>
                </select>
                  <img src="../../../public/icons/arrowDown.png" class="absolute img-arrow-down"/>
              </div>
              <div class="description-user-block flex flex-col mt-3">
                <label for="description" class="description-label">
                  Описание пользователя
                </label>
                <textarea id="description" class="description-user-text resize-none" v-model="biography">
                </textarea>
              </div>
              <div class="password-block flex flex-col mt-3" >
                <label class="password-title">
                  Пароль
                </label>
                <base-input
                    v-model="password"
                    placeholder="8+ символов, A-Z,a-z, цифры, “!№; (Сообщите пароль только пользователю)"
                    class="w-full password-input"
                    @blur="checkPassword"
                    type="text"
                    name="password"
                />
                <div v-if="submitAttempted && !passwordIsValid">
                  Пароль должен содержать минимум 8 символов, включая как минимум одну заглавную и строчную букву, одну цифру и один специальный символ ('!№;').
                </div>
              </div>
              <div class="add-photo-block mt-3">
                <label for="fileInput" class="title_color file-label cursor-pointer">
                  <img src="../../../public/icons/plus-gray.png" class="w-6 h-6"/>
                  <div class="text-input-file">
                    Добавить фото
                  </div>
                </label>
                <input type="file" id="fileInput" @change="onFileSelected" class="border-0 focus:outline-none cursor-pointer">
                <img :src="preview" v-if="preview" class="image-preview" alt="image"/>
              </div>
              <div class="btns_add_school flex justify-between w-full mt-10">
                <button  @click="$emit('close')" value="Отменить" id="reject_btn" class="py-4 px-9 btn_reject" >
                  Отменить
                </button>
                <button type="submit" value="Далее" id="upload_btn">
                  Добавить школу
                </button>
              </div>
            </form>
            <div class="ml-2.5 text-2xl mt-3">
                <h2>Ответ от сервера:</h2>
                <pre v-if="serverResponse.length">{{ serverResponse }}</pre>
            </div>
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
    }
    .form_add_user{
        display: flex;
        flex-direction: column;
        width: 520px;
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
        width: 255px;
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
    .input-item{
      width: 255px;
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
</style>
