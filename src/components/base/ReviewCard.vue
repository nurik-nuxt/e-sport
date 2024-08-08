<script setup lang="ts">
const props = defineProps<{
  name: string;
  surname: string;
  quality: number;
  equipment: number;
  hallCondition: number;
  coachingStaff: number;
  overallDescription: string;
}>()
</script>

<template>
  <div class="card-wrapper">
    <div class="reviewer-name">
      {{ name }} {{ surname }}
    </div>
    <div class="rating-label">
      <span>Оснащённость</span>
      <van-rate :model-value="equipment" readonly color="#FFEC2D" />
    </div>
    <div class="rating-label">
      <span>Качество обучения</span>
      <van-rate :model-value="quality" readonly color="#FFEC2D" />
    </div>
    <div class="rating-label">
      <span>Тренерский рейтинг</span>
      <van-rate :model-value="coachingStaff" readonly color="#FFEC2D" />
    </div>
    <div class="review">
      {{ overallDescription }}
    </div>
  </div>
</template>

<style scoped>
.card-wrapper {
  border: 1px solid #000000;
  border-radius: 15px;
  width: 360px;
  height: 260px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.reviewer-name {
  font-size: 16px;
  font-weight: 500;
  color: #031954;
}

.rating-label {
  font-size: 14px;
  font-weight: 400;
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.review {
  font-size: 12px;
  font-weight: 400;
  text-align: left;
  color: #474747;
}
</style>