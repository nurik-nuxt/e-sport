<script setup lang="ts">
import { computed, onMounted, ref, shallowRef } from 'vue';
import { useSchoolStore } from '@/store/schoolStore';
import BaseButton from "@/components/base/BaseButton.vue";
import MapCreateModal from "@/components/MapCreateModal.vue";
import {
  YandexMap,
  YandexMapDefaultFeaturesLayer,
  YandexMapDefaultMarker,
  YandexMapDefaultSchemeLayer
} from "vue-yandex-maps";
import { YMapDefaultMarker } from "@yandex/ymaps3-types/packages/markers";
import {useAuthStore} from "@/store/auth";

const schoolStore = useSchoolStore();
const authStore = useAuthStore();
const isAuthenticated = computed(() => !!authStore.authToken);
const school = computed(() => schoolStore.getCurrentSchool);

const showModal = ref(false);

function toggleModal() {
  showModal.value = !showModal.value;
}

const defaultMarker = shallowRef<YMapDefaultMarker | null>(null);

const coordinates = computed((): [number, number] => {
  const latitude = school.value?.location?.latitude;
  const longitude = school.value?.location?.longitude;

  if (latitude !== undefined && longitude !== undefined) {
    return [latitude, longitude];
  }
  return [71.43, 51.13]; // Fallback coordinates
});

onMounted(() => {
  if (defaultMarker.value && school.value?.location) {
    defaultMarker.value.coordinates = [
      school.value.location.longitude,
      school.value.location.latitude,
    ];
  }
});
</script>

<template>
  <div v-if="school" class="about_school">
    <div class="school_info">
      <div class="school_info_block">
        <div class="school_title">
          Заголовок
        </div>
        <div class="school_title_text">
          {{ school?.title }}
        </div>
        <div class="description_block">
          <div class="description_title">
            Описание
          </div>
          <div class="description_text">
            {{ school.description }}
          </div>
        </div>
      </div>
      <div class="school_map_block">
        <div v-if="school?.location?.latitude && school?.location?.longitude" class="school_map">
          <yandex-map
              height="200px"
              width="500px"
              :settings="{
              location: {
                center: [school.location.latitude, school.location.longitude],
                zoom: 12
              }
            }"
          >
            <yandex-map-default-scheme-layer />
            <yandex-map-default-features-layer />
            <yandex-map-default-marker
                :settings="{
                coordinates: coordinates,
                title: `Долгота: ${coordinates[0]}<br>Широта: ${coordinates[1]}`
              }"
            />
          </yandex-map>
        </div>
        <div v-else>
          <div class="flex flex-col gap-3">
            <span class="text-4xl text-[#606060]">-ГЕОЛОКАЦИЯ <br>НЕИЗВЕСТНА -</span>
            <BaseButton v-if="isAuthenticated" label="Указать на карте" @click="toggleModal" />
          </div>
        </div>
      </div>
    </div>
    <div class="discipline_work_time_block">
      <div class="discipline_block">
        <div class="discipline_title">
          Дисциплины
        </div>
        <div class="discipline_list">
          <div class="discip_item kickbox_block">
            <div class="left-strip"></div>
            <div class="content">
              <div class="discip_icon">
                <img src="../../../public/icons/kickboxing.png" alt="Kickboxing Icon">
              </div>
              <div class="discip_name">
                Kickboxing
              </div>
              <div class="dicsip_description">
                спортивное единоборство, зародившееся в 60-х — 70-х годах двадцатого века. Исторически подразделяется на американский кикбоксинг, японский кикбоксинг.
              </div>
              <div class="discip_coach_title">
                Тренеры
              </div>
              <div class="discip_coach_list">
                Азамат Мусагалиев, Сергей Иванов, Игорь Щацский, Максим Самородов
              </div>
              <div class="price_title">
                Стоимость
              </div>
              <div class="price_text">
                15 занятий - 30 000 тенге
              </div>
            </div>
          </div>
          <div class="discip_item box_block">
            <div class="left-strip"></div>
            <div class="content">
              <div class="discip_icon">
                <img src="../../../public/icons/box.png" alt="Box Icon">
              </div>
              <div class="discip_name">
                Box
              </div>
              <div class="dicsip_description">
                спортивное единоборство, зародившееся в 60-х — 70-х годах двадцатого века. Исторически подразделяется на американский кикбоксинг, японский кикбоксинг.
              </div>
              <div class="discip_coach_title">
                Тренеры
              </div>
              <div class="discip_coach_list">
                Азамат Мусагалиев, Сергей Иванов, Игорь Щацский, Максим Самородов
              </div>
              <div class="price_title">
                Стоимость
              </div>
              <div class="price_text">
                15 занятий - 30 000 тенге
              </div>
            </div>
          </div>
          <div class="discip_item wrestling_block">
            <div class="left-strip"></div>
            <div class="content">
              <div class="discip_icon">
                <img src="../../../public/icons/wrestling.png" alt="Wrestling Icon">
              </div>
              <div class="discip_name">
                Борьба
              </div>
              <div class="dicsip_description">
                спортивное единоборство, зародившееся в 60-х — 70-х годах двадцатого века. Исторически подразделяется на американский кикбоксинг, японский кикбоксинг.
              </div>
              <div class="discip_coach_title">
                Тренеры
              </div>
              <div class="discip_coach_list">
                Азамат Мусагалиев, Сергей Иванов, Игорь Щацский, Максим Самородов
              </div>
              <div class="price_title">
                Стоимость
              </div>
              <div class="price_text">
                15 занятий - 30 000 тенге
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="work_time_contact_block">
        <div class="work_time_block">
          <div class="work_time_title">
            Время работы
          </div>
          <div class="work_time">
            <div class="work_time_item">
              <div class="work_day">Понедельник</div>
              <div class="work_time_period">07:00 - 22:00</div>
            </div>
            <div class="work_time_item">
              <div class="work_day">Вторник</div>
              <div class="work_time_period">07:00 - 22:00</div>
            </div>
            <div class="work_time_item">
              <div class="work_day">Среда</div>
              <div class="work_time_period">07:00 - 22:00</div>
            </div>
            <div class="work_time_item">
              <div class="work_day">Четверг</div>
              <div class="work_time_period">07:00 - 22:00</div>
            </div>
            <div class="work_time_item">
              <div class="work_day">Пятница</div>
              <div class="work_time_period">07:00 - 22:00</div>
            </div>
            <div class="work_time_item">
              <div class="work_day">Суббота</div>
              <div class="work_time_period">07:00 - 22:00</div>
            </div>
            <div class="work_time_item">
              <div class="work_day">Воскресенье</div>
              <div class="work_time_period">07:00 - 22:00</div>
            </div>
          </div>
        </div>
        <div class="contact_block">
          <div class="contact_title">
            Контакты
          </div>
          <div class="contact_item">
            <div class="contact_phone">
              +7 (707) 700 70 07
            </div>
            <div class="phone_icon"><img src="../../../public/icons/phone.png" alt="alt"/></div>
          </div>
          <div class="contact_item">
            <div class="contact_phone">
              +7 (707) 700 70 07
            </div>
            <div class="phone_icon"><img src="../../../public/icons/phone.png" alt="alt"/></div>
          </div>
          <div class="contact_item">
            <div class="contact_phone">
              mincult.kz
            </div>
            <div class="phone_icon"><img src="../../../public/icons/email.png" alt="alt"/></div>
          </div>
          <div class="address_block">
            {{ school.address}}
          </div>
        </div>
      </div>
    </div>
    <MapCreateModal v-if="showModal" @close="showModal = false" />
  </div>
</template>

<style scoped>
.school_info {
  display: flex;
  margin-top: 30px;
  justify-content: space-between;
  width: 95%;
}
.school_title {
  font-size: 20px;
  font-weight: 600;
}
.school_title_text {
  font-weight: 400;
  font-size: 18px;
}
.description_block {
  margin-top: 10px;
  width: 90%;
  font-size: 18px;
}
.description_title {
  font-size: 20px;
  font-weight: 600;
}
.discipline_work_time_block {
  display: grid;
  grid-auto-columns: 1fr;
  grid-template-columns: 57% 1fr;
  grid-template-rows: 1fr;
  gap: 0 25px;
  grid-template-areas: "discipline_block work_time_contact_block";
}
.discipline_block {
  grid-area: discipline_block;
}
.work_time_contact_block {
  grid-area: work_time_contact_block;
}
.discipline_title {
  font-size: 20px;
  font-weight: 600;
  margin-top: 15px;
  margin-bottom: 15px;
}
.discipline_list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  width: 100%;
}
.discip_item {
  display: flex;
  width: 310px;
  height: 248px;
  border: 1px solid #606060;
  border-radius: 10px;
  font-family: Montserrat, sans-serif;
  box-sizing: border-box;
  margin-bottom: 20px; /* Добавлено для разделения блоков */
}
.left-strip {
  width: 20px;
  border-radius: 10px 0 0 10px;
}
.content {
  padding: 15px;
  width: 100%;
}
.discip_icon img {
  width: 30px;
  height: 30px;
}
.discip_name {
  font-size: 14px;
  font-weight: bold;
  margin: 5px 0;
}
.dicsip_description,
.discip_coach_list,
.price_text {
  font-size: 10px;
  color: #4a4a4a;
}
.discip_coach_title,
.price_title {
  font-size: 10px;
  color: #000000;
  margin-top: 10px;
  font-weight: bold;
}
.kickbox_block .left-strip {
  background-color: #29ff72; /* Цвет для кикбоксинга */
}
.box_block .left-strip {
  background-color: #e1253c; /* Цвет для бокса */
}
.wrestling_block .left-strip {
  background-color: #ffb629; /* Цвет для борьбы */
}
.work_time_contact_block {
  display: flex;
  margin-top: 30px;
  gap: 30px;
}
.work_time_block {
  font-family: "Montserrat", sans-serif;
}
.work_time_title {
  font-size: 18px;
  font-weight: 600;
  color: #031954;
}
.work_time {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.work_time_item {
  display: flex;
  width: 250px;
  justify-content: space-between;
  font-size: 14px;
}
.contact_block {
  display: flex;
  flex-direction: column;
  position: relative;
  height: 240px;
  gap: 10px;
}
.contact_title {
  font-size: 18px;
  font-weight: 600;
  color: #031954;
}
.contact_item {
  display: flex;
  gap: 30px;
  justify-content: space-between;
}
.contact_phone {
  display: flex;
  font-size: 14px;
}
.address_block {
  position: absolute;
  bottom: 0;
  font-size: 14px;
}
</style>
