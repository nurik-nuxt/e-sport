<script setup lang="ts">
import ReviewCard from "@/components/base/ReviewCard.vue";
import { useScheduleStore } from "@/store/schedule";
import { computed, ref } from "vue";
import {useAuthStore} from "@/store/auth";
import AddSchoolReviewModal from "@/components/SportSchools/AddSchoolReviewModal.vue";

const schoolStore = useScheduleStore();
const authStore = useAuthStore();

const reviews = computed(() => {
  return schoolStore.getSchoolReviews
})
const isAuthenticated = computed(() => !!authStore.authToken);
const showModal = ref(false)
</script>
<template>
  <div class="mt-5">
    <div v-if="!showModal" class="reviews">
      <button @click="showModal = true" class="add-review">Добавить отзыв</button>
      <review-card
          v-for="review in reviews"
          :key="review.id"
          :name="review.name"
          :surname="review.surname"
          :quality="review.quality"
          :equipment="review.equipment"
          :hall-condition="review.hallCondition"
          :coaching-staff="review.coachingStaff"
          :overall-description="review.overallDescription"
      />
    </div>
    <add-school-review-modal class="mt-5" v-if="showModal" @close="showModal = false" />
  </div>
</template>

<style scoped>
.reviews {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
}
.add-review {
  border-radius: 15px;
  height: 260px;
  padding: 16px;
  border: 1px dashed #000000
}
</style>