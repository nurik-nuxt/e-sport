<script setup lang="ts">
import AddParticipant from "@/components/addItem/addParticipant.vue";
import {ref, computed, onMounted} from "vue";
import { useEventStore } from '@/store/eventStore';
import { useCoachStore } from '@/store/coach/index';
import AddWinners from "@/components/addItem/addWinners.vue";

const eventStore = useEventStore();
const coachStore = useCoachStore();
const selectedEvent = computed(() => eventStore.selectedEvent);

const sportsmen = computed(() => {
  return selectedEvent.value ? selectedEvent.value.participants : [];
});

const cityName = computed(() => {
  return selectedEvent.value && selectedEvent.value.city ? selectedEvent.value.city.name : 'Unknown City';
});

const disciplineTitle = computed(() => {
  return selectedEvent.value && selectedEvent.value.discipline ? selectedEvent.value.discipline.title : 'Unknown Discipline';
});

const showModal = ref(false);
const showWinner = ref(false);

const showAddParticipant = () => {
  showModal.value = true;
};

const hideAddParticipant = () => {
  showModal.value = false;
};

const showAddWinner = () => {
  showWinner.value = true;
}

const hideAddWinner = () => {
  showWinner.value = false;
}
const coachName = computed(() => {
  return coachStore.coach ? `${coachStore.coach.firstName} ${coachStore.coach.middleName} ${coachStore.coach.lastName}` : 'Coach not found';
});

onMounted(()=>{
  console.log("Selected Event ID:", selectedEvent.value?.id);
  if (selectedEvent.value && selectedEvent.value.discipline) {
    coachStore.fetchCoach(selectedEvent.value.discipline.id, selectedEvent.value.participants[0]?.id);
  }
})

</script>

<template>
  <div class="wrapper">
    <div class="content">
      <div class="content-title font-semibold text-2xl mt-9">
        Спортсмены
      </div>
      <div class="sportsmen-params flex flex-wrap gap-x-2">
        <div class="sportsmen-params-item">
          <img src="/icons/home.png" class="school-icon" alt="image school icon" />
          <select class="school-list">
            <option value="">
              Школа
            </option>
            <option value="1">
              Спорт школа 1
            </option>
            <option value="2">
              Спорт школа 2
            </option>
            <option value="3">
              Спорт школа 3
            </option>
          </select>
          <img src="/icons/arrowDown.png" class="arrow-icon" alt="image school icon" />
        </div>
        <div class="sportsmen-params-item">
          <img src="/icons/city.png" class="school-icon" alt="image school icon" />
          <select class="school-list">
            <option value="">
              Город
            </option>
            <option value="1">
              Алматы
            </option>
            <option value="2">
              Астана
            </option>
            <option value="3">
              Шымкент
            </option>
          </select>
          <img src="/icons/arrowDown.png" class="arrow-icon" alt="image school icon" />
        </div>
        <div class="sportsmen-params-item">
          <img src="/icons/profile-img.png" class="school-icon" alt="image school icon" />
          <select class="school-list">
            <option value="" selected>
              Тренер
            </option>
            <option value="1">
              Криштиану Роналду
            </option>
            <option value="2">
              Геннадий Головкин
            </option>
            <option value="3">
              Елдос Сметов
            </option>
          </select>
          <img src="/icons/arrowDown.png" class="arrow-icon" alt="image school icon" />
        </div>
        <div class="sportsmen-params-item">
          <button @click="showAddWinner" class="btn-add-participant">
              Назначить победителей
          </button>
        </div>
        <div class="sportsmen-params-item">
          <button @click="showAddParticipant" class="btn-add-participant">
            Добавить
          </button>
        </div>
      </div>
      <div class="table-container">
        <table>
          <thead>
          <tr>
            <th>№</th>
            <th>Имя</th>
            <th>Фамилия</th>
            <th>ИИН</th>
            <th>Дата рожд.</th>
            <th>Номер</th>
            <th>Школа</th>
            <th>Город</th>
            <th>Тренер</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(person, index) in sportsmen" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ person.firstName }}</td>
            <td>{{ person.lastName }}</td>
            <td>{{ person.iin }}</td>
            <td>{{ person.birth_date }}</td>
            <td>{{ person.phoneNumber }}</td>
            <td>{{ person.school.name }}</td>
            <td>{{ cityName }}</td>
            <td>{{ coachName}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <add-winners
      v-if="showWinner"
      @close="hideAddWinner"
      class="add-winners"
      :event-id="selectedEvent?.id"
    />
    <add-participant v-if="showModal" @close="hideAddParticipant" :event-id="selectedEvent?.id" class="add-participant" />
  </div>
</template>

<style scoped>
  .sportsmen-params{
    color: #031954;
  }
  .content-title{
    margin-bottom: 1rem;
  }
  .school-list{
    font-weight: 500;
    font-size: 1rem;
    padding: 10px 45px 10px 50px;
    border: 1px solid #031954;
    appearance: none;
    border-radius: 5px;
  }
  .sportsmen-params-item{
    position: relative;
    width: max-content;
  }
  .school-icon{
    width: 25px;
    height: 24px;
    position: absolute;
    left: 11px;
    top: 10px;
  }
  .arrow-icon{
    width: 15px;
    height: 9px;
    position: absolute;
    right: 9px;
    top: 18px;
  }
  .btn-add-participant{
    color: #005703;
    font-weight: 500;
    padding: 10px 32px;
    border: 1px solid #005703;
    border-radius: 15px;
    transition: all 200ms ease;
  }
  .btn-add-participant:hover{
    color: white;
    background-color: #005703;
  }
  .table-container {
    margin: 20px;
    overflow-x: auto;
  }
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th{
    text-align: center;
    padding: 12px;
    border: 1px solid #ddd;
  }
  td {
    padding: 12px;
    border: 1px solid #ddd;
    text-align: left;
  }
  th {
    background-color: #f4f4f4;
    font-weight: 400;
    color: #181818;
  }
  tr:nth-child(even) {
    background-color: #f9f9f9;
    color: #031954;
  }
  tr{
    color: #031954;
    font-weight: 500;
    font-size: 16px;
  }
  tr:hover {
    background-color: #f1f1f1;
  }
  .add-participant, .add-winners{
    width: 100%;
    height: 100%;
    max-width: 100%;
    max-height: 100%;
    position: absolute;
    background-color: rgba(255,255,255, 0.5);
    top: 0;
    left: 0;
  }
</style>
<!--<div class="sportsmen-params-item">-->
<!--<img src="/icons/profile-img.png" class="school-icon" alt="image school icon" />-->
<!--<select class="school-list">-->
<!--  <option value="">-->
<!--    Спортсмен-->
<!--  </option>-->
<!--  <option value="1">-->
<!--    Кабатов Жандос-->
<!--  </option>-->
<!--  <option value="2">-->
<!--    Геннадий Головкин-->
<!--  </option>-->
<!--  <option value="3">-->
<!--    Елдос Сметов-->
<!--  </option>-->
<!--</select>-->
<!--<img src="/icons/arrowDown.png" class="arrow-icon" alt="image school icon" />-->
<!--</div>-->