<script setup lang="ts">
import {ref, onMounted} from 'vue';
import {useRouter} from 'vue-router';
import {useApi} from "@/composable/useApi";
import {useUploadStore} from "@/store/upload";
import {getEnv} from "@/utils/env";

const uploadStore = useUploadStore();

interface SchoolData {
  name: string;
  region: string;
  city: string;
  workingHoursStart: string;
  workingHoursEnd: string;
  description: string;
  address: string;
  photo: File | null;
}

const router = useRouter();
const addSchoolResponse = ref<null | Record<string, any>>(null);

const nameSchool = ref<string>('');
const region = ref<string>('');
const workingStartTime = ref<string>('');
const city = ref<string>('');
const workingEndTime = ref<string>('');
const descriptionSchool = ref<string>('');
const address = ref<string>('');
const photo = ref<File | null>(null);
const imageUrls = ref<string[]>([]);
const cities = ref<{ value: string; text: string }[]>([]);
interface City {
  id: string;
  name: string;
}

const fetchCities = async () => {
  try {
    const baseURL = getEnv('VITE_APP_URL_GATEWAY_BASE_URL');
    const fullURL = `${baseURL}/v1/cities`;
    const response = await useApi(fullURL) as City[];  // Cast the response to an array of City
    cities.value = response.map(city => ({
      value: city.id,
      text: city.name
    }));
    console.log(response);
  } catch (error) {
    console.error('Failed to fetch cities:', error);
  }
};


const preview = ref<string | ArrayBuffer | null>(null);



async function onFileSelected(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      preview.value = (e.target as FileReader).result;
    };
    reader.readAsDataURL(file);
    try {
      const response = await uploadStore.uploadFile(file);
      imageUrls.value.push(response);
      photo.value = file;
    } catch (error) {
      console.error('Error uploading file:', error);
    }
    photo.value = file;
  }
}

const addSchool = async () => {
  try {
    const data = {
      title: nameSchool.value,
      name: nameSchool.value,
      region: region.value,
      cityId: city.value,
      workingStartTime: workingStartTime.value,
      workingEndTime: workingEndTime.value,
      description: descriptionSchool.value,
      address: address.value,
      images: imageUrls.value
    }

    const response = await useApi('v1/schools', {
      method: 'POST',
      data: data,
    });
    addSchoolResponse.value = response.data;
    if (response?.id) {
      await router.push('/SportSchools');
    }
  } catch (error) {
    console.error('Error adding school:', error);
  }
};

const onSubmit = (event: Event) => {
  event.preventDefault();
  addSchool();
  // router.push('/PersonalAccount');
};
function cancelAndRedirect() {
  router.push('/PersonalAccount');
}
onMounted(() => {
  fetchCities();
});
</script>
<template>
  <div class="addSchoolWrapper">
    <div class="addSchoolBlock">
      <div class="addSchoolTitle">
        Заполните данные школы
      </div>
      <form @submit="onSubmit" method="POST" class="form_add_school">
        <label for="name_school" class="title_color font-semibold">Название</label>
        <input v-model="nameSchool" type="text" name="name_school" id="name_school" class="p-2 text-2xl font-semibold" required>
        <div class="city_block">
          <div class="choose_city flex flex-col">
            <label for="city" class="text-center title_color">Город</label>
            <div class="choose-city-select">
              <select v-model="city" name="city" id="city" class="text-ml font-medium border-solid border border-black text-center rounded-lg" required>
                <option value="" disabled selected>Выберите город</option>
                <option v-for="city in cities" :key="city.value" :value="city.value">{{ city.text }}</option>
              </select>
              <img src="../../../public/icons/arrowDown.png" class="img-arrow-down"/>
            </div>
          </div>
        </div>
        <div class="working_hours_table">
          <label for="working_hours" class="text-center flex justify-center title_color">Режим работы</label>
          <div class="working-hours flex justify-between">
            <input v-model="workingStartTime" type="text" name="working_hours_start" id="working_hours_start" class="text-3xl font-medium text-center" value="08:00" required/>
            <input v-model="workingEndTime" type="text" name="working_hours_end" id="working_hours_end" class="text-3xl font-medium text-center" value="18:00" required/>
          </div>
        </div>
        <label for="description_school" class="text-center font-medium description_title title_color">Описание</label>
        <textarea v-model="descriptionSchool" name="description_school" id="description_school" class="resize-none text-2xl font-medium text-left p-3" placeholder="Расскажите немного об особенностях..." required>
        </textarea>

        <label for="address" class="title_color">Адрес</label>
        <input v-model="address" type="text" name="address" id="address" class="text-2xl font-medium text-left p-3"/>

        <label for="fileInput" class="title_color file-label cursor-pointer">
          <img src="../../../public/icons/plus-gray.png" class="w-6 h-6"/>
          <div class="text-input-file">
            Добавить фото
          </div>
        </label>
        <input type="file" id="fileInput" @change="onFileSelected" class="border-0 focus:outline-none cursor-pointer">
        <img :src="preview" v-if="preview" class="image-preview" alt="image"/>
        <div class="btns_add_school flex justify-between w-full mt-10">
          <button @click="cancelAndRedirect" value="Отменить" id="reject_btn" class="py-4 px-9 btn_reject" >
            Отменить
          </button>
          <button type="submit" value="Далее" id="upload_btn">
            Добавить школу
          </button>
        </div>
      </form>
      <div v-if="addSchoolResponse">
        <h2>Ответ от сервера:</h2>
        <pre>{{ addSchoolResponse }}</pre>
      </div>
    </div>
  </div>
</template>
<style scoped>
.addSchoolWrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
.addSchoolBlock {
  margin: 30px;
  font-family: 'Montserrat', sans-serif;
  width: 530px;
  max-width: 530px;
  padding: 30px;
  background-color: #fff;
}
.addSchoolTitle {
  font-size: 2rem;
  font-weight: 600;
  text-align: center;
}
.form_add_school {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.form_add_school label {
  font-size: 16px;
  margin-top: 1rem;
}
.choose-city-select{
  position: relative;
}
.form_add_school .choose-city-select #city{
  padding: 12px 20px;
  appearance: none;
  border: 1px solid #031954;
  width: 100%;
}
.img-arrow-down{
  position: absolute;
  width: 20px;
  height: auto;
  top: 40%;
  right: 10px;
}

.form_add_school input, .form_add_school textarea {
  font-size: 17px;
  border: 1px solid #031954;
  border-radius: 5px;
  padding: 5px 10px;
  margin-top: 0.5rem;
}
.working-hours {
  display: flex;
  align-items: center;
}
.working-hours span {
  margin: 0 10px;
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
