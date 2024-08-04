<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useModalStore } from "../store/modal/index";
import { useAuthStore } from "../store/auth/index";
import { useApi } from "@/composable/useApi";

import axios from 'axios';

const router = useRouter();
const modalStore = useModalStore();
const authStore = useAuthStore();
const isModalOpen = computed(() => modalStore.isModalOpen)

watch(isModalOpen, (newVal) => {
  if (newVal) {
    openModalLogic();
  } else {
    closeModalLogic();
  }
});


const modalBlock = ref<HTMLElement | null>(null);
let scrollPosition = 0;

function openModalLogic() {
  scrollPosition = window.pageYOffset;
  document.body.style.overflow = 'hidden';
  document.body.style.position = 'fixed';
  document.body.style.top = `-${scrollPosition}px`;
  document.body.style.width = '100%';
  if (modalBlock.value) {
    modalBlock.value.style.display = "block";
  }
}
function closeModalLogic() {
  document.body.style.removeProperty('overflow');
  document.body.style.removeProperty('position');
  document.body.style.removeProperty('top');
  document.body.style.removeProperty('width');
  window.scrollTo(0, scrollPosition);
  if (modalBlock.value) {
    modalBlock.value.style.display = "none";
  }
}
onMounted(() => {
  modalBlock.value = document.querySelector('.modal_block');
});
const closeModal = () => {
  modalStore.closeModal();
};

const iin = ref('');
const password = ref('');
const message = ref('');

const submitForm = async () => {
  try {
    const response = await useApi('/v1/auth/signin', {
      method: 'POST',
      data: {
        iin: iin.value,
        password: password.value
      }
    });
    console.log(response);
    console.log('API response:', response); // Debug log for API response
    const apiIin = response.data.user.iin;
    const apiMessage = response.statusText === 'Created' ? 'root admin' : 'Login failed';
    const token = response.data.auth.access.token;

    console.log('API response auth:', apiMessage); // Debug log for auth
    console.log('Token:', token); // Debug log for token

    message.value = apiMessage;
    authStore.updateMessage(apiMessage);
    authStore.updateIin(apiIin);
    authStore.setAuthToken(token);

    console.log('Message after dispatch:', message.value); // Debug log
    console.log('Iin after dispatch:', apiIin); // Debug log
    console.log('Token after dispatch:', token);
    router.push('/PersonalAccount');
    closeModalLogic();
  } catch (error) {
    console.error(error);
    const errorMessage = 'Неправильный пароль или ИИН';
    message.value = errorMessage;
    authStore.updateMessage(errorMessage);
  }
};

</script>
<template>
  <div class="modal_block" @click.self="closeModal">
    <div class="modal">
      <div class="modal_content">
        <button class="close_btn" @click="closeModal">
          <img src="../assets/icons/close.png" alt="close">
        </button>
        <div class="modal_emblem_kz">
          <img src="../assets/emblem_kz.png">
        </div>
        <div class="modal_title">
          <div class="modal_title_text">
            Комитет по делам спорта и физической культуры
            Министерства туризма и спорта Республики Казахстан
          </div>
        </div>
        <form @submit.prevent="submitForm" method="post" class="form_login">
          <div class="input_container">
            <img src="../assets/icons/User.png" min="000000000000" max="999999999999" alt="ИИН/ЖСН" class="input_icon">
            <input type="text" v-model="iin" name="iin" id="iin" pattern="\d{12}" placeholder="ИИН/ЖСН" maxlength="12" required>
          </div>
          <div class="input_container">
            <img src="../assets/icons/Password.png" alt="Пароль" class="input_icon">
            <input type="password" v-model="password"  name="password" id="password_id" placeholder="Пароль" required>
          </div>
          <div class="input_submit">
            <input type="submit"  name="login" id="login" value="Войти" class="bg-white">
          </div>
          <p>{{ message }}</p>
        </form>
        <div class="forget_pass_link">
          <a href="#" class="forget_link">
            Забыли пароль?
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.modal_block{
  display: none;
  position: fixed;
  width: 100vw;
  top: 0;
  left: 0;
  max-width: 100%;
  max-height: 100%;
  height: 100vh;
  background-color: rgba( 255, 255, 255, 0.6);
  z-index: 999;
  font-family: 'Montserrat', sans-serif;
}
.modal{
  position: absolute;
  top:50%;
  left: 50%;
  transform: translate(-50% , -50%)
}
.modal_content{
  padding: 30px 45px 55px;
  background-color: #203D8B;
  border-radius: 15px;
  font-family: 'Montserrat', sans-serif;
  color: #fff;
  position: relative;
}
.body-no-scroll {
  overflow: hidden;
  height: 100%;
}
.close_btn{
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
}
.modal_emblem_kz{
  width: 87px;
  height: 90px;
  margin: auto;
}
.modal_emblem_kz img{
  width: 100%;
  height: 100%;
}
.modal_title{
  display: flex;
  justify-content: center;
  margin-top: 11px;
}
.modal_title_text{
  font-weight: 700;
  font-size: 14px;
  text-align: center;
  width: 208px;
}
.form_login{
  width: 300px;
  margin-top: 15px;
}
.input_container {
  position: relative;
  display: flex;
  align-items: center;
  margin-top: 5px;
}
.input_icon {
  position: absolute;
  left: 10px; /* Отступ слева, можно настроить */
  width: 20px; /* Размер иконки */
  height: 20px; /* Размер иконки */
}

.input_container input {
  padding-left: 40px; /* Отступ текста, чтобы не перекрывал иконку */
  height: 40px; /* Высота инпута */
  border: 1px solid #ccc; /* Граница инпута */
  border-radius: 5px; /* Скругление углов инпута */
  width: 100%; /* Ширина инпута */
  font-size: 12px;
  font-weight: 500;
  color: #000;
  background-color: #D9D9D9;
}
#login{
  padding: 12px 130px;
  text-align: center;
  font-weight: 600;
  color: #031954;
  font-size: 12px;
  margin-top: 2rem;
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
}
.forget_pass_link{
  margin-top: 1rem;
}
.forget_link{
  padding: 13px 97px 12px;
  text-align: center;
  align-items: center;
  color: #fff;
  font-weight: 600;
  font-size: 12px;
  border-radius: 5px;
  border: 1px solid #fff;
  text-decoration: none;
  transition: all 200ms ease;
}
.forget_link:hover{
  background-color: #ccc;
  color: #000;
}
@media screen and (min-width: 990px){
  .input_container input {
    font-size: 1rem;
  }
  #login{
    font-size: 1.25rem;
  }
  .modal_title_text{
    font-size: 1.25rem;
    width: 350px;
  }
  .modal_title{

  }
  .form_login{
    width: 350px;
  }
  .forget_link{
    width: 350px;
    padding: 13px 104px 12px;
    font-size: 1rem;
  }
}
</style>