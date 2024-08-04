<script setup lang="ts">
import { defineEmits } from 'vue';

const emits = defineEmits(['switchView']);

function emitSwitch(view: string) {
  emits('switchView', view);
}
</script>
<template>
  <div class="groups-nav">
    <div class="block-title text-2xl font-semibold">
      Расписание
    </div>
    <div class="group-list-nav mt-3 flex flex-wrap justify-between">
      <div class="group-item w-64">
        <img class="icon-sport icons" src="/icons/type-sport.png"  alt="alt"/>
        <select class="w-full text-base appearance-none choose-sport">
          <option value="" selected disabled>Вид спорта</option>
          <option value="football">Футбол</option>
          <option value="football">Волейбол</option>
          <option value="football">Баскетбол</option>
          <option value="football">Борьба</option>
        </select>
        <img class="icon-polygon icons" src="/icons/polygon-down.png" />
      </div>
      <div class="group-item w-72">
        <img class="icon-sport icons" src="/icons/profile-img.png" />
        <select class="w-full text-base appearance-none choose-sport">
          <option value="" selected disabled>Тренер</option>
          <option value="">Геннадий Головкин</option>
          <option value="">Сауль Альварес</option>
        </select>
        <img class="icon-polygon icons" src="/icons/polygon-down.png" />
      </div>
      <div class="group-item w-48">
        <img class="icon-sport icons" src="/icons/age-icon.png" />
        <select class="w-full text-base appearance-none choose-sport">
          <option value="" selected disabled>Возрастная</option>
          <option value="football">Младшая</option>
          <option value="football">Старшая</option>
        </select>
        <img class="icon-polygon icons" src="/icons/polygon-down.png" />
      </div>
      <div class="group-item w-36">
        <input type="date" class="w-full text-base">
      </div>
      <div class="group-item w-44">
        <button @click="emitSwitch('schedule-list')" class="w-full text-base change-btn">
          Изменить
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped>
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
  .group-item {
    position: relative;
    color: #031954;
    font-weight: 500;
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
  input[type="date"]{
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: 1px solid #031954;
    border-radius: 5px;
    padding: 9px 7px;
    outline: none;
    background-color: #ffffff;
    color: #031954;
    cursor: pointer;
    font-size: 18px;
  }
  ::-webkit-calendar-picker-indicator{
    background-color: #ffffff;
    border-radius: 5px;
    color: #fff;
    cursor: pointer;
    border: 1px solid #ffffff;
  }
  .change-btn{
    color: #E1253C;
    font-weight: 500;
    padding: 10px 25px;
    border-radius: 5px;
    font-size: 18px;
    border: 1px solid #031954;
    transition: all 200ms ease;
  }
  .change-btn:hover{
    border: 1px solid #0a39af;
    background-color: #ff2942;
    color: #fff;
  }
</style>