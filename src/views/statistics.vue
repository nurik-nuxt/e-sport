<template>
  <div>
    <h1 class="block-title">Cтатистика школ РК</h1>
    <div class="change-groups-nav">
      <div class="flex justify-end gap-3 items-center mb-6 pr-3">
        <div class="group-item w-64">
          <img class="icon-sport icons" src="/icons/ranking.svg" alt="alt"/>
          <select v-model="regionId" class="w-full text-base appearance-none choose-sport">
            <option value="" selected disabled>Регион</option>
            <option v-for="region in regions" :key="region.id" :value="region.id">
              {{ region.name }}
            </option>
          </select>
          <img class="icon-polygon icons" src="/icons/polygon-down.png"  alt="alt"/>
        </div>
        <div class="group-item w-64">
          <img class="icon-sport icons" src="/icons/ranking.svg"  alt="alt"/>
          <select v-model="cityId" class="w-full text-base appearance-none choose-sport">
            <option value="" selected disabled>Город</option>
            <option v-for="city in regions?.find((region) => region?.id === regionId)?.cities" :key="city.id" :value="city.id">
              {{ city.name }}
            </option>
          </select>
          <img class="icon-polygon icons" src="/icons/polygon-down.png"  alt="alt"/>
        </div>
        <div class="group-item w-64">
          <img class="icon-sport icons" src="/icons/ranking.svg" alt="alt"/>
          <select v-model="schoolId" class="w-full text-base appearance-none choose-sport">
            <option value="" selected disabled>Школа</option>
            <option v-for="school in regions?.find((region) => region?.id === regionId)?.cities?.find((city) => city?.id === cityId)?.schools" :key="school.id" :value="school.id">
              {{ school.name }}
            </option>
          </select>
          <img class="icon-polygon icons" src="/icons/polygon-down.png"  alt="alt"/>
        </div>
        <button class="text-base change-btn" @click="search">
          <img src="../assets/icons/search.svg" alt="search">
        </button>
        <button class="text-base refresh" @click="reset">
          <img src="../assets/icons/refresh.svg" alt="refresh">
        </button>
      </div>
    </div>
    <div class="dashboard">
      <div class="school-rating">
        <h3 class="school-rating-title">Рейтинг школы</h3>
        <div class="overall-rating">
          <van-rate :model-value="statistics?.schoolsRating" readonly color="#FFEC2D" />
          <span>{{ statistics?.reviewCount }} отзывов</span>
        </div>
        <div class="rating-details">
          <div>
            Оснащённость
            <van-rate :model-value="statistics?.avgStats?.averageEquipment" readonly color="#FFEC2D" />
          </div>
          <div>
            Состояние зала
            <van-rate :model-value="statistics?.avgStats?.averageHallCondition" readonly color="#FFEC2D" />
          </div>
          <div>
            Качество обучения
            <van-rate :model-value="statistics?.avgStats?.averageQuality" readonly color="#FFEC2D" />
          </div>
          <div>
            Тренерский рейтинг
            <van-rate :model-value="statistics?.avgStats?.averageCoachingStaff" readonly color="#FFEC2D" />
          </div>
          <div>
            Рейтинг спортсменов
            <van-rate :model-value="statistics?.avgStats?.averageCoachingStaff" readonly color="#FFEC2D" />
          </div>
        </div>
      </div>

      <div class="athlete-age">
        <h3 class="school-rating-title">Возраст спортсменов</h3>
        <div v-for="(age, index) in statistics?.ages" :key="index" class="age-group">
          <div v-if="age.percentage">
            <div>{{ index }}</div>
            <div class="age-bar">
              <div class="bar male" :style="{ width: age.percentage + '%' }"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="top-coaches">
        <h3 class="school-rating-title">Лучшие тренера</h3>
        <div class="coach" v-for="coach in statistics?.coaches" :key="coach.id">
          <img :src="coach?.profileImage" alt="coach" />
          <div class="coach-info">
            <h4>{{ coach?.firstName }} {{ coach?.lastName }}</h4>
            <p>{{ coach?.biography }}</p>
            <span>
            <van-rate :model-value="coach?.rating" readonly color="#FFEC2D" />
            {{ coach?.rating }}
          </span>
          </div>
        </div>
      </div>

      <div class="disciplines">
        <h3 class="school-rating-title">Дисциплины</h3>
        <div class="flex items-center gap-2 mb-6">
          <div v-for="(discipline, index) in statistics?.disciplines" :key="index" class="flex gap-3 items-center">
            <div class="flex gap-2 items-center">
              <div class="round" :style="{ background: discipline?.color}"></div>
              {{ index }}
            </div>
          </div>
        </div>
        <div v-for="(discipline, index) in statistics?.disciplines" :key="index" class="discipline">
          <span class="count">{{ discipline?.count }} спортсменов</span>
          <div class="discipline-bar flex items-center justify-between">
            <div class="bar" :style="{ width: discipline?.percentage + '%', background: discipline?.color }"></div>
            <div class="percentage">{{ discipline?.percentage?.toFixed(1) }} %</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStatisticsStore } from "@/store/statistics/index.ts";
import { computed, onMounted, ref } from "vue";
const statisticsStore = useStatisticsStore();

onMounted(async () => {
  await Promise.all([
    statisticsStore.loadStatisticsByFilter(),
    statisticsStore.loadRegions()
  ])
})

const statistics = computed(() => {
  return statisticsStore.getStatistics
})

const regions = computed(() => {
  return statisticsStore.getRegions
})


const regionId = ref('')
const cityId = ref('')
const schoolId = ref('')

const reset = async () => {
  regionId.value = '';
  cityId.value = '';
  schoolId.value = '';
  await statisticsStore.loadStatisticsByFilter()
}
const search = async () => {
  await statisticsStore.loadStatisticsByFilter(regionId.value, cityId.value, schoolId.value)
}
</script>

<style scoped>
.dashboard {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  padding: 2rem;
  background-color: #f8f8ff;
}

.school-rating,
.athlete-age,
.top-coaches,
.disciplines {
  background-color: #ffffff;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.school-rating .overall-rating {
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.school-rating .rating-details div {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.athlete-age .age-group {
  margin-bottom: 1rem;
}

.athlete-age .age-bar {
  display: flex;
  margin-top: 0.5rem;
}

.athlete-age .bar {
  height: 8px;
  border-radius: 8px;
}

.athlete-age .male {
  background-color: purple;
}

.athlete-age .female {
  background-color: green;
  margin-left: 2px;
}

.top-coaches .coach {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.top-coaches .coach img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 1rem;
}

.top-coaches .coach-info h4 {
  margin: 0;
  font-size: 20px;
  font-weight: 500;
  text-align: left;
  color: #294694;
}

.top-coaches .coach-info p {
  margin: 0;
  color: #666;
}

.top-coaches .coach-info span {
  font-size: 0.9rem;
  color: #ffab00;
}

.disciplines .discipline {
  margin-bottom: 1rem;
}

.disciplines .discipline-bar {
  margin-top: 1rem;
}

.disciplines .bar {
  height: 8px;
  border-radius: 8px;
}

.block-title {
  font-size: 24px;
  font-weight: 600;
  text-align: left;
  margin-top: 66px;
  margin-bottom: 25px;
  margin-left: 2rem;
  color: #031954;
}

.school-rating-title {
  font-size: 20px;
  font-weight: 500;
  text-align: left;
  color: #294694;
}
.round {
  width: 20px;
  height: 20px;
  border-radius: 100%;
}
.group-item {
  position: relative;
  color: #031954;
  font-weight: 500;
}
.choose-sport{
  border: 1px solid #031954;
  border-radius: 5px;
  padding: 10px 20px 10px 45px;
  appearance: none;
}
.choose-sport:focus{
  border: 1px solid #0a39af;
  box-shadow: 2px -1px 25px -1px rgba(28,255,237,0.7);
  -webkit-box-shadow: 2px -1px 25px -1px rgba(28,255,237,0.7);
  -moz-box-shadow: 2px -1px 25px -1px rgba(28,255,237,0.7);
}

.icons{
  position: absolute;
  z-index: 99;
}
.icon-sport{
  left: 12px;
  top: 10px;
}
.icon-polygon{
  right: 18px;
  top: 45%;
}
.change-btn{
  font-weight: 500;
  padding: 10px;
  border-radius: 5px;
  font-size: 18px;
  border: 1px solid #031954;
  transition: all 200ms ease;
}
.refresh {
  font-weight: 500;
  padding: 7px;
  border-radius: 5px;
  font-size: 18px;
  border: 1px solid #E12525;
  transition: all 200ms ease
}
.count {
  font-size: 12px;
  font-weight: 400;
  text-align: left;
  color: #606060;
}
.round {
  width: 20px;
  height: 20px;
  border-radius: 100%;
}
.percentage {
  font-size: 12px;
  font-weight: 600;
  text-align: left;
  color: #000000;
}
</style>
