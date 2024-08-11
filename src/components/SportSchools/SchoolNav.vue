<script setup>
    const emit = defineEmits(['switch']);
    function goToInfo() {
        emit('switch', 'info');
    }
    function goToCoaches() {
        emit('switch', 'coaches');
    }
    function goToSportsmen() {
        emit('switch', 'sportsmen');
    }
    function goToSchedule(){
        emit('switch', 'schedule');
    }
    function goToGroups(){
      emit('switch', 'groups');
    }
    function goToReviews(){
      emit('switch', 'review');
    }
    function goStatistics(){
      emit('switch', 'statistics');
    }
</script>
<template>
    <div class="list_nav">
        <div @click="goToInfo" class="nav_item">
            О школе
        </div>
        <div @click="goToCoaches" class="nav_item">
            Тренера
        </div>
        <button @click="goToSportsmen" class="nav_item">
            Спортсмены
        </button>
        <button @click="goToSchedule" class="nav_item">
            Расписание
        </button>
        <button class="nav_item">
          Галерея
        </button>
        <div class="nav_item" @click="goToGroups">
            Группы
        </div>
        <div class="nav_item" @click="goToReviews">
            Отзывы
        </div>
        <div class="nav_item" @click="goStatistics">
            Статистика
        </div>
    </div>
</template>
<style scoped>
    .list_nav{
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        font-family: 'Montserrat', sans-serif;
        margin-top: 10px;
    }
    .nav_item{
        font-size: 1rem;
        font-weight: 500;
        padding: 10px 25px;
        border-radius: 15px;
        color: #031954;
        border: 1px solid #031954;
        transition: all 200ms ease;
        text-decoration: none;
        cursor: pointer;
    }
    .nav_item:hover{
        background-color: #203D8B;
        color: #fff;
    }
    .nav_item:active{
        background-color: #203D8B;
        color: #fff;
    }
</style>