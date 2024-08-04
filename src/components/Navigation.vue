<script setup>
// import { useStore } from 'vuex';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useModalStore } from "../store/modal/index.ts";
import { useAuthStore } from "../store/auth/index.ts";

const router = useRouter();
const modalStore = useModalStore();
const authStore = useAuthStore();
const isAuthenticated = computed(() => !!authStore.authToken);

const openModal = () => {
  modalStore.openModal();
};
const message = computed(() => {
  return authStore.getMessage
})
const iin = computed(() => {
  return authStore.getIin
})
const logout = async () => {
  await authStore.clearUserData()
  router.push('/QazMap');
};

</script>
<template>
    <div class="menu">
        <div class="titleInfoBlock">
            <div class="EmpblemBlock">
                <div class="EmplemImg">
                    <img src="../assets/emblem_kz.png" alt="img"/>
                </div>
            </div>
            <div class="NameOrg">
                <div class="NameTitle">
                    Комитет по делам спорта и физической культуры
                    Министерства туризма и спорта Республики Казахстан
                </div>
            </div>
        </div>
        <div class="navigationList">
            <div class="navBlock">
                <a href="#/QazMap" class="navLink">
                    <img src="../assets/icons/Address.png" alt="img">
                    <div class="navText">
                        Карта
                    </div>
                </a>
                <a href="#/SportSchools" class="navLink">
                    <img src="../assets/icons/Home.png" alt="img">
                    <div class="navText">
                        Спортивные школы
                    </div>
                </a>
                <a href="#/news-events" class="navLink">
                    <img src="../assets/icons/Event.png" alt="img">
                    <div class="navText">
                        Новости и мероприятия
                    </div>
                </a>
                <a href="#/schedules" class="navLink">
                    <img src="../assets/icons/Schedule.png" alt="img">
                    <div class="navText">
                        Расписание тренировок 
                    </div>
                </a>
                <a href="#" class="navLink">
                    <img src="../assets/icons/Analytics.png" alt="img">
                    <div class="navText">
                        Статистика
                    </div>
                </a>
                <a href="#" class="navLink">
                    <img src="../assets/icons/Survey.png" alt="img">
                    <div class="navText">
                        Опросы
                    </div>
                </a>
            </div>
        </div>
        <div v-if="message && isAuthenticated">
            <div class="profile_line">
                <a href="#/PersonalAccount" class="user_link">
                    <div class="user_block">
                        <img src="https://i.postimg.cc/7YdHngZH/alno.jpg" alt="User Photo" class="user_photo">
                        <p class="user_name">ИИН: {{ iin }}</p>
                        <a href="#/QazMap" class="logout_btn">
                            <button @click="logout" class="bg-white text-black font-medium">Выйти</button>
                        </a>
                    </div>
                </a>
            </div>
        </div>
        <div v-else class="authBlock" id="authBlock" >
            <button class="authLink" @click="openModal">
                <img src="../assets/icons/Login.png" alt="img">
                <div class="navText">
                    Войти
                </div>
            </button>
        </div>
    </div>
</template>

<style scoped>
    .menu{
        width: 335px;
        left: 0;
        top: 0;
        background-color: #203D8B;
        height: 100vh;
        position: fixed;
    }
    .EmpblemBlock{
        padding-left: 15px;
        padding-top: 15px;
    }
    .EmplemImg{
        width: 87px;
        height: 90px;
    }
    .NameOrg{
        padding-left: 15px;
        font-size: 1.125rem;
        color: #fff;
        font-weight: 700;
        padding-right: 5%;
    }
    .NameTitle{
        margin-top: 1rem;
    }
    .navigationList{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .navLink{
        padding: 10px 0 10px 15px;
        display: flex;
        text-decoration: none;
        color: #fff;
    }
    .navBlock{
        margin-top: .75rem;
    }
    .navLink img{
        width: 30px;
        height: 30px;
    }
    .navText{
        padding: 4px 10px;
        font-size: 1.125rem;
        font-weight: 500;
    }
    .navLink:hover{
        background-color: #294694;
    }
    .navLink:focus{
        background-color: #294694;
    }
    .user_block {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-grow: 1;
        min-width: 0;
        position: absolute;
        bottom: 10px;
        left: 15px;
        width: 300px;
        text-decoration: none;
        color: #fff;
    }
    .user_photo {
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }
    .user_name {
        margin-left: 10px;
    }
    .authBlock{
        flex-grow: 1;
        min-width: 0;
        position: absolute;
        bottom: 10px;
        width: 100%;
    }
    .authLink{
        display: flex;
        text-decoration: none;
        color: #fff;
        padding: 10px 0 10px 15px;
        flex-grow: 1;
        width: 100%;
    }
    .authBlock:hover{
        background-color: #294694;
    }
    .authLink img{
        width: 30px;
        height: 30px;
    }
    .user_link{
        display: flex;
        justify-content: space-between;
    }
    .logout_btn button{
        font-size: 1rem;
        border: none;
        color: black;
        border-radius: 5px;
        padding: 5px 8px;
    }
    @media screen and (max-width: 431px){
        .menu{
            position: static;
            width: 100%;
        }
        .authLink{
            width: 95%;
        }
        .titleInfoBlock{
            display: flex;
        }
        .NameOrg{
            font-size: .85rem;
        }
        .EmplemImg{
            width: 58px;
            height: 60px;
        }
        .EmplemImg img{
            width: 100%;
            height: 100%;
        }
    }
</style>
