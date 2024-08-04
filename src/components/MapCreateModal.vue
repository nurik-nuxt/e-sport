<script setup lang="ts">
import {
  YandexMap,
  YandexMapDefaultFeaturesLayer,
  YandexMapDefaultMarker,
  YandexMapDefaultSchemeLayer
} from "vue-yandex-maps";

import { shallowRef, triggerRef } from 'vue';
import type { YMapDefaultMarker } from '@yandex/ymaps3-types/packages/markers';
import BaseButton from "@/components/base/BaseButton.vue";
import {  useRoute } from "vue-router";
import { useSchoolStore } from "@/store/schoolStore";

const emits = defineEmits(['close']);
const route = useRoute();
const schoolStore = useSchoolStore();

const defaultMarker = shallowRef<YMapDefaultMarker | null>(null);

const onDragMove = () => {
  // console.log(defaultMarker.value?._props?.coordinates);
  triggerRef(defaultMarker);
};

const closeModal = () => {
  emits('close')
}

const saveCoords = async () => {
  const [longitude, latitude] = defaultMarker?.value?._props?.coordinates;
  if (longitude && latitude) {
    await schoolStore.addCoordinatesSchool(<string>route?.params?.id, longitude, latitude).then((res) => {
      if (res?.id) {
        closeModal()
      }
    })
  }
}
</script>

<template>
  <div class="create-group-wrapper">
    <div class="create-group">
      <div class="create-group-title text-3xl font-semibold text-center mb-6">
        Укажите на карте местоположение школы
      </div>
      <div class="create-group-form">
        <yandex-map
            height="500px"
            width="700px"
            :settings="{
              location: {
                center: [71.43, 51.13],
                zoom: 12
              }
            }"
        >
          <yandex-map-default-scheme-layer/>
          <yandex-map-default-features-layer/>
          <yandex-map-default-marker
              v-model="defaultMarker"
              :settings="{
            coordinates: defaultMarker ? defaultMarker.coordinates : [71.43, 51.13],
            title: `Долгота: ${ defaultMarker?.coordinates[0].toFixed(2) }<br>Широта: ${ defaultMarker?.coordinates[1].toFixed(2) }`,
            draggable: true,
            onDragMove,
        }"
          />
        </yandex-map>
      </div>
      <div class="flex w-full justify-between mt-8">
        <BaseButton label="Удалить" @click="closeModal"/>
        <BaseButton label="Сохранить" @click="saveCoords" />
      </div>
    </div>
  </div>
</template>
<style scoped>
.create-group-wrapper{
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.5);
  z-index: 999;
}
.create-group{
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 6rem;
  border: 1px solid #031954;
  background-color: #fff;
  border-radius: 15px;
  padding: 40px 70px;
}
.create-group-form{
  position: relative;
}
.create-group-form form{
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.select-item{
  border: 1px solid #031954;
  border-radius: 10px;
  width: 100%;
  text-align: center;
  height: 40px;
  appearance: none;
}
label{
  color: #031954;
  font-weight: 500;
  font-size: 18px;
}
.coach-block,.discipline-block,.group-block,.days-block{
  position: relative;
}
.icon-down{
  width: 25px;
  max-width: 12.5px;
  max-height: 6.25px;
  height: 24px;
  position: absolute;
  right: 15px;
  top: 70%;
}
.time-label{
  text-align: center;
}
.time-input{
  color: #474747;
  border: 1px solid #031954;
  border-radius: 10px;
}
.days-select{
  border: 1px solid #031954;
  border-radius: 10px;
  text-align: center;
  height: 40px;
  appearance: none;
}
.reject-btn-style{
  color: #E1253C;
  padding: 16px 42px;
  border: 1px solid #570000;
  border-radius: 15px;
  font-weight: 500;
  transition: all 200ms ease;
}
.reject-btn-style:hover{
  background-color: rgba(206,15,1,0.99);
  color: #ffffff;
}
.add-btn-style{
  color: #005703;
  padding: 16px 30px;
  font-weight: 500;
  border-radius: 15px;
  border: 1px solid #005703;
  transition: all 200ms ease;
}
.add-btn-style:hover{
  background-color: rgba(139, 255, 93, 0.87);
  color: #031954;
}
</style>