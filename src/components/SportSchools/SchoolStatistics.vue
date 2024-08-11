<template>
  <div>
    <h1 class="block-title">Статистика школы</h1>
    <div class="dashboard">
      <div class="school-rating">
        <h3>Рейтинг школы</h3>
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
        <h3>Возраст спортсменов</h3>
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
        <h3>Лучшие тренера</h3>
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
        <h3>Дисциплины</h3>
        <div v-for="(discipline, index) in statistics?.disciplines" :key="index" class="discipline">
          <div>{{ index }}</div>
          <div class="discipline-bar">
            <div class="bar" :style="{ width: discipline.percent + '%', background: discipline?.color }"></div>
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
const coaches = [
  { name: 'Игорь Шацкий', position: 'главный тренер ДЮСШ', photo: '/path-to-photo.jpg' },
  { name: 'Игорь Шацкий', position: 'главный тренер ДЮСШ', photo: '/path-to-photo.jpg' },
  { name: 'Игорь Шацкий', position: 'главный тренер ДЮСШ', photo: '/path-to-photo.jpg' },
  { name: 'Игорь Шацкий', position: 'помощник тренера ДЮСШ', photo: '/path-to-photo.jpg' }
];

const ages = [
  { range: '0-7 лет', male: 22, female: 22 },
  { range: '8-15 лет', male: 22, female: 22 },
  { range: '16-25 лет', male: 22, female: 22 },
  { range: '26-35 лет', male: 22, female: 22 },
];

const disciplines = [
  { name: 'Kickboxing', color: 'green', percent: 22 },
  { name: 'Футбол', color: 'yellow', percent: 36 },
  { name: 'Box', color: 'red', percent: 25 },
  { name: 'Борьба', color: 'orange', percent: 32 },
];
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
  font-size: 1rem;
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
}

.block-title {
  font-size: 24px;
  font-weight: 600;
  text-align: left;
  margin-top: 15px;
  margin-bottom: 25px;
}
</style>
