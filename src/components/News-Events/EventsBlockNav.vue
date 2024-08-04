<script setup lang="ts">
import { useAuthStore } from "@/store/auth";
import { computed } from "vue";

const authStore = useAuthStore();
const isAuthenticated = computed(() => !!authStore.authToken);
</script>

<template>
  <div class="events-nav p-7 flex flex-wrap gap-x-1 gap-y-3">
    <div class="nav-item select-event-type">
      <select class="py-2.5 border events-types">
        <option value="all" selected>Все мероприятия</option>
        <option value="competitions">
          Соревнования
        </option>
        <option value="matches">
          Матчи
        </option>
        <option value="competitions">
          Отборы
        </option>
      </select>
      <img src="/icons/white-icon-arrow-down.png" class="icon-down" alt="icon arrow down"/>
    </div>
    <div class="nav-item">
      <div class="future-events py-2.5 px-5 font-medium">
        Предстоящие
      </div>
    </div>
    <div class="nav-item">
      <div class="past-events py-2.5 px-5 font-medium">
        Оконченные
      </div>
    </div>
    <div class="nav-item sport-schools-item">
      <img class="icon-home" src="/icons/home.png" alt="sport school icon"/>
      <select class="sport-schools appearance-none font-medium">
        <option selected value="">Спортивная школа</option>
        <option>
        </option>
      </select>
      <img class="icon-down" src="/icons/triangular-arrow-down.png" alt="icon arrow down"/>
    </div>
    <div class="nav-item sport-schools-item">
      <img class="icon-home" src="/icons/calendar.png" alt="sport school icon"/>
      <select class="event-date appearance-none font-medium">
        <option selected value="">Дата</option>
        <option>
          За день
        </option>
        <option>
          За неделю
        </option>
        <option>
          За месяц
        </option>
        <option>
          За 3 месяца
        </option>
        <option>
          За год
        </option>
      </select>
      <img class="icon-down" src="/icons/triangular-arrow-down.png" alt="icon arrow down"/>
    </div>
    <router-link v-if="isAuthenticated" to="/create-event/create-about-event" class="btn-organise nav-item font-medium text-xl px-6 py-2">
      Организовать
    </router-link>
  </div>
</template>

<style scoped>
.events-types{
  display: flex;
  flex-direction: row;
  border: 1px solid #031954;
  appearance: none;
  border-radius: 15px;
  width: 100%;
  padding-left: 17px;
  padding-right: 25px;
  background-color: #203D8B;
  color: white;
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
}
.nav-item {
  cursor: pointer;
}
.select-event-type{
  position: relative;
  width: 210px;
  max-width: 210px;
  text-align: center;
}
.icon-down{
  position: absolute;
  right: 15px;
  top: 20px;
}
.future-events, .past-events,.sport-schools{
  border: 1px solid #031954;
  color: #031954;
  border-radius: 15px;
  transition: all 200ms ease;
}
.past-events:hover{
  background-color: #203D8B;
  color: #fff;
}
.future-events:hover{
  background-color: #203D8B;
  color: #fff;
}
.sport-schools-item{
  position: relative;
}
.icon-home{
  position: absolute;
  margin-top: 10px;
  margin-left: 15px;
}
.sport-schools{
  padding: 10px 56px;
  border-radius: 5px;
}
.event-date{
  padding: 10px 30px;
  border-radius: 5px;
  border: 1px solid #031954;
  text-align: center;
  color: #031954;
}
.btn-organise{
  color: #185403;
  border: 1px solid #185403;
  font-size: 1rem;
  background-color: #ffffff;
  transition: all 200ms ease-in-out;
  border-radius: 15px;
}
.btn-organise:hover{
  color: #ffffff;
  background-color: #185403;
}
</style>