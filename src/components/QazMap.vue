<script setup lang="ts">
import {
  YandexMap,
  YandexMapDefaultFeaturesLayer,
  YandexMapDefaultMarker,
  YandexMapDefaultSchemeLayer
} from "vue-yandex-maps";
import {computed, onMounted, shallowRef} from "vue";
import { YMapDefaultMarker } from "@yandex/ymaps3-types/packages/markers";
import { useSchoolStore } from "@/store/schoolStore";
import SchoolItem from "@/components/SportSchools/SchoolItem.vue";

const defaultMarker = shallowRef<YMapDefaultMarker | null>(null);
const schoolStore = useSchoolStore();

const schools = computed(() => {
  return schoolStore.getSchools
})

onMounted(async () => {
  await schoolStore.fetchSchools()
})
</script>

<template>
  <div class="school-map">
    <yandex-map
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
          v-for="school in schools"
          :key="school.id"
          :settings="{
            popup: { position: 'top' },
            coordinates: [`${school?.location?.latitude}`, `${school?.location?.longitude}`],
            title: `${school.title}`,
        }"
      >
        <template #popup="{ close }">
          <div class="marker-popup">
            <SchoolItem :school="school" />
            <button class="close_btn" @click="close">
              <img src="../assets/icons/close.png" alt="close">
            </button>
          </div>
        </template>
      </yandex-map-default-marker>
    </yandex-map>
  </div>
</template>

<style scoped>
.school-map {
  height: 100vh;
}
.marker-popup {
  width: 350px;
  position: relative;
}
.close_btn{
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
}
</style>