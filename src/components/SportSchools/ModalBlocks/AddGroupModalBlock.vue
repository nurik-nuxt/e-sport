<script setup lang="ts">
import { ref,defineEmits } from 'vue';
import { addGroup, Group } from "@/store/groups/fetchGroups";
import BaseInput from "@/components/base/BaseInput.vue";

const emits = defineEmits(['close']);

const close = () => {
  emits('close');
};
const newGroup = ref<Group>({
  sportType: '',
  coachName: '',
  groupName: '',
  // startTime: '',
  // endTime: '',
  // days: '',
});

const createGroup = async () => {
  try {
    const addedGroup = await addGroup(newGroup.value);
    console.log("Группа успешно добавлена:", addedGroup);
    newGroup.value = { sportType: '', coachName: '', groupName: ''}
  } catch (error) {
    console.error("Ошибка при добавлении группы:", error);
  }
};
//, startTime: '', endTime: '', days: ''//

</script>
<template>
  <div class="create-group-wrapper">
    <div class="create-group">
      <div class="create-group-title text-3xl font-semibold text-center">
        Добавить расписание группы
      </div>
      <div class="create-group-form">
        <form >
          <div class="coach-block flex flex-col">
            <label for="coach" class="coach-title text-center">
              Тренер
            </label>
            <select v-model="newGroup.coachName" class="w-36 select-item" id="coach">
              <option value="" selected disabled>
                Выберите тренера
              </option>
              <option value="Геннадий Головкин">
                Геннадий Головкин
              </option>
              <option value="Криштиану Роналду">
                Криштиану Роналду
              </option>
            </select>
            <img src="/icons/arrowDown.png" class="icon-down" />
          </div>
          <div class="group-block flex flex-col">
            <label for="group" class="group-title text-center">
              Группа
            </label>
            <select v-model="newGroup.groupName" class="group-select w-36 select-item" id="group">
              <option value="" selected disabled>
                Выберите группу
              </option>
              <option value="Группа 1">
                Группа 1
              </option>
              <option value="Группа 2">
                Группа 2
              </option>
              <option value="Группа 3">
                Группа 3
              </option>
            </select>
            <img src="/icons/arrowDown.png" class="icon-down" />
          </div>
          <div class="discipline-block flex flex-col">
            <label for="discipline" class="discipline-title text-center">
              Дисциплина
            </label>
            <select v-model="newGroup.sportType" class="discipline-select w-36 select-item" id="discipline">
              <option value="" selected disabled>
                Выберите дисциплину
              </option>
              <option value="Футбол">
                Футбол
              </option>
              <option value="Борьба">
                Борьба
              </option>
              <option value="Баскетбол">
                Баскетбол
              </option>
            </select>
            <img src="/icons/arrowDown.png" class="icon-down" />
          </div>



<!--          <div class="time-block flex gap-2">-->
<!--            <div class="time-start flex flex-col">-->
<!--              <label class="time-label">Начало</label>-->
<!--              <base-input-->
<!--                type="text"-->
<!--                class="text-center text-xl time-input"-->
<!--                v-model="newGroup.startTime"-->
<!--              />-->
<!--            </div>-->
<!--            <div class="time-end flex flex-col">-->
<!--              <label class="time-label">Конец</label>-->
<!--              <base-input-->
<!--                type="text"-->
<!--                class="text-center text-xl time-input"-->
<!--                v-model="newGroup.endTime"-->
<!--              />-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="days-block flex flex-col">-->
<!--            <label for="days" class="days-title text-center">-->
<!--              Дни-->
<!--            </label>-->
<!--            <select v-model="newGroup.days" class="w-full days-select w-36" id="days">-->
<!--              <option value="" selected disabled>-->
<!--                Выберите дни-->
<!--              </option>-->
<!--              <option value="Пн,Чт,Пт">-->
<!--                Пн,Чт,Пт-->
<!--              </option>-->
<!--              <option value="Пн,Ср,Пт">-->
<!--                Пн,Ср,Пт-->
<!--              </option>-->
<!--              <option value="Вт,Чт,Сб">-->
<!--                Вт,Чт,Сб-->
<!--              </option>-->
<!--            </select>-->
<!--            <img src="/icons/arrowDown.png" class="icon-down" />-->
<!--          </div>-->



          <div class="reject-and-add-btns flex justify-between mt-5">
            <div class="reject-btn">
              <button @click="close" class="reject-btn-style">
                Удалить
              </button>
            </div>
            <div class="add-btn">
              <button @click="createGroup" class="add-btn-style">
                Добавить расписание
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .create-group-wrapper{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(255, 255, 255, 0.5);
    z-index: 999;
  }
  .create-group{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 6rem;
    border: 1px solid #031954;
    background-color: #fff;
    border-radius: 15px;
    padding: 40px 70px;
  }
  .create-group-title{
    display: flex;
  }
  .create-group-form{
    width: 30rem;
    position: relative;
  }
  .create-group-form form{
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .select-item{
    border: 1px solid #031954;
    border-radius: 10px;
    width: 100%;
    text-align: center;
    height: 40px;
    appearance: none;
  }
  label{
    color: #031954;
    font-weight: 500;
    font-size: 18px;
  }
  .coach-block,.discipline-block,.group-block,.days-block{
    position: relative;
  }
  .icon-down{
    width: 25px;
    max-width: 12.5px;
    max-height: 6.25px;
    height: 24px;
    position: absolute;
    right: 15px;
    top: 70%;
  }
  .time-label{
    text-align: center;
  }
  .time-input{
    color: #474747;
    border: 1px solid #031954;
    border-radius: 10px;
  }
  .days-select{
    border: 1px solid #031954;
    border-radius: 10px;
    text-align: center;
    height: 40px;
    appearance: none;
  }
  .reject-btn-style{
    color: #E1253C;
    padding: 16px 42px;
    border: 1px solid #570000;
    border-radius: 15px;
    font-weight: 500;
    transition: all 200ms ease;
  }
  .reject-btn-style:hover{
    background-color: rgba(206,15,1,0.99);
    color: #ffffff;
  }
  .add-btn-style{
    color: #005703;
    padding: 16px 30px;
    font-weight: 500;
    border-radius: 15px;
    border: 1px solid #005703;
    transition: all 200ms ease;
  }
  .add-btn-style:hover{
    background-color: rgba(139, 255, 93, 0.87);
    color: #031954;
  }
</style>
