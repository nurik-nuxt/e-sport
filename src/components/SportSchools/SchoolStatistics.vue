<template>
  <div>
    <h1 class="block-title">Статистика школы</h1>
    <div class="dashboard">
      <div class="school-rating">
        <h3 class="school-rating-title">Рейтинг школы</h3>
        <div class="overall-rating">
          <van-rate :model-value="statistics?.schoolRating" readonly color="#FFEC2D" />
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
import { computed } from "vue";
const statisticsStore = useStatisticsStore();

const statistics = computed(() => {
  return statisticsStore.getStatistics
})
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
  margin-top: 0.5rem;
}

.disciplines .bar {
  height: 8px;
  border-radius: 8px;
}

.block-title {
  font-size: 24px;
  font-weight: 600;
  text-align: left;
  margin-top: 15px;
  margin-bottom: 25px;
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
.count {
  font-size: 12px;
  font-weight: 400;
  text-align: left;
  color: #606060;
}
.percentage {
  font-size: 12px;
  font-weight: 600;
  text-align: left;
  color: #000000;
}
</style>
