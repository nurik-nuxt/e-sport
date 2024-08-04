<script setup lang="ts">
import currentUser from '../../../public/database/admin.json';
import { computed } from 'vue';
import { useAuthStore } from '../../store/auth/index';

const authStore = useAuthStore();
const message = computed(() => authStore.getMessage);
const iin = computed(() => authStore.getIin);
</script>
<template>
    <div class="personalAccount"> 
        <h1 class="pers_title font-bold text-2xl py-4">Личный кабинет</h1>
        <div v-if="authStore.message && authStore.iin">
            <div v-for="(currentUser, index) in currentUser" :key="index">
                <div class="user_profile">
                    <div :style="{ backgroundImage: 'url(' + currentUser.photo + ')' }" class="user_photo">
                    </div>
                    <div class="user_info">
                        <div class="strong">Должность:</div>
                        <div> {{ message }}</div>
                        <div class="strong">ИИН:</div>
                        <div>{{ iin }}</div>
                        <div class="strong">Имя:</div>
                        <div>{{ currentUser.name }}</div>
                        <div class="strong">Фамилия:</div> 
                        <div>{{ currentUser.surname }}</div>
                    </div>
                </div>
            </div>
            <div class="add-funct-title text-center font-semibold text-3xl mt-10">
              Управление
            </div>
            <div class="add_funct_block">
                <div class="add_school add_item">
                    <a href="#/AddSchool" class="link_add_item">
                        <div class="add_item_contain">
                            <p class="add_item_text">Добавить школу</p>
                        </div>
                    </a>
                </div>
                <div class="add_event add_item">
                    <a href="#" class="link_add_item">
                        <div class="add_item_contain">
                            <p class="add_item_text">Добавить мероприятие</p>
                        </div>
                    </a>
                </div>
                <div class="add_news add_item">
                    <a href="#" class="link_add_item">
                        <div class="add_item_contain">
                            <p class="add_item_text">Добавить новость</p>
                        </div>
                    </a>
                </div>
                <div class="add_sport add_item">
                  <a href="#" class="link_add_item">
                    <div class="add_item_contain">
                      <p class="add_item_text">Добавить вид спорта</p>
                    </div>
                  </a>
                </div>
                <div class="add_scale_event add_item">
                  <a href="#" class="link_add_item">
                    <div class="add_item_contain">
                      <p class="add_item_text">Добавить масштаб мероприятия</p>
                    </div>
                  </a>
                </div>
                <div class="add_city add_item">
                  <a href="#" class="link_add_item">
                    <div class="add_item_contain">
                      <p class="add_item_text">Добавить город</p>
                    </div>
                  </a>
                </div>
            </div>
        </div>
        <div v-else>
            <p>Данных нет о таком пользователе</p>
        </div>
    </div>
</template>
<style scoped>
    .personalAccount{
        font-family: 'Montserrat', sans-serif;
    }
    .pers_title{
        margin-left: 1.875rem;
    }
    .user_profile{
        margin-left: 1.875rem;
        width: 56rem;
        display: grid; 
        grid-auto-columns: 1fr; 
        grid-template-columns: 39.5% 1fr; 
        grid-template-rows: 1fr; 
        gap: 0% 2.8%; 
        grid-template-areas: 
            "user_photo user_info"; 
    }
    .user_photo { 
        grid-area: user_photo;
    }
    .user_info { 
        grid-area: user_info; 
        font-size: 1rem;
        font-family: 'Montserrat', sans-serif;
        position: relative;
    }
    .user_photo{
        width: 100%;
        height: 400px;
        background-size: 100%;
        border: 3px solid black;
        stroke-width: 1px;
    }
    .user_info .strong{
        font-size: 20px;
        font-weight: 600;
    }
    .add_funct_block {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 20px;
      width: 95%;
      padding: 2.5% ;
    }
    .add_item {
      flex: 1 1 calc(33.333% - 20px);
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid #031954;
      border-radius: 10px;
      padding: 5px;
      box-sizing: border-box;
      transition: all 0.3s ease;
      cursor: pointer;
      background-color: white;
      text-align: center;
    }
    .add_item:hover {
      background-color: #DFDEDE;
    }
    .link_add_item {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      text-decoration: none;
      transition: all 200ms ease-in-out;
    }
    .add_item_contain {
      display: flex;
      align-items: center;
    }
    .add_item_text {
      margin-left: 10px;
      color: #031954;
      font-size: 16px;
      font-weight: bold;
    }
    .add_item::before {
      content: "+";
      font-size: 35px;
      color: #160041;
      margin-left: 1.5rem;
    }

    @media (max-width: 768px) {
      .add_item {
        flex: 1 1 calc(50% - 20px); /* Две кнопки в ряд с промежутком */
      }
    }
    @media (max-width: 480px) {
      .add_item {
        flex: 1 1 100%; /* Одна кнопка в ряд */
      }
    }
</style>
