<script setup lang="ts">

import { computed, defineProps, ref } from "vue";
import BaseInput from "@/components/base/BaseInput.vue";
import { useGroupStore } from "@/store/groups/groupsStore";
import { useUserStore } from "@/store/users";

const emit = defineEmits(['close']);
const props = defineProps<{
  groupId: string
}>();
const handleClose = () => {
  emit('close');
};

const groupStore = useGroupStore();
const userStore = useUserStore();

const sportsmenId = ref('');

const sportsmens = computed(() => {
  return userStore.getCurrentSchoolSportsmens
})

const handleSubmit = async (event: Event) => {
  event.preventDefault();
};

const groupName = computed(() => {
  return groupStore.getCurrentSchoolGroups?.find((item) => item.id === props.groupId)?.name
})

const disciplineTitle = computed(() => {
  return groupStore.getCurrentSchoolGroups?.find((item) => item.id === props.groupId)?.discipline?.title
})

const addSportsmen = async () => {
  const membersId = [`${sportsmenId.value}`];
  await groupStore.addSportsmenToGroup(props.groupId, membersId).then(async (res) => {
    if (res?.id) {
      handleClose();
      await groupStore.loadGroupMembersByGroupId(props.groupId)
    }
  })
}
</script>
<template>
  <div class="create-group-wrapper">
    <div class="create-group">
      <div class="create-group-title text-3xl font-semibold text-center flex justify-center">
        Добавление спортсмена
      </div>
      <div class="create-group-form">
        <form  @submit="handleSubmit">
          <div class="mt-4 flex flex-col items-center justify-center">
            <span class="field-label mb-2">Группа</span>
            <base-input :model-value="groupName" type="text" class="text-lg text-center input-group-name disabled"/>
          </div>
          <div class="discipline-block flex flex-col mt-4">
            <label for="discipline" class="discipline-title text-center">
              Спортсмен
            </label>
            <select v-model="sportsmenId" class="discipline-select w-36 select-item" id="discipline">
              <option value="" selected disabled>
                Выберите спортсмена
              </option>
              <option v-for="sportsmen in sportsmens" :key="sportsmen.id" :value="sportsmen.id">
                {{ sportsmen.firstName }} {{ sportsmen.lastName }}
              </option>
            </select>
            <img src="/icons/arrowDown.png" class="icon-down" />
          </div>
          <div class="mt-4 flex flex-col items-center justify-center">
            <span class="field-label mb-2">Дисциплина</span>
            <base-input :model-value="disciplineTitle" type="text" class="text-lg text-center input-group-name disabled"/>
          </div>
          <div class="reject-and-add-btns flex justify-between mt-5">
            <div class="reject-btn">
              <button @click="handleClose" class="reject-btn-style">
                Удалить
              </button>
            </div>
            <div class="add-btn">
              <button type="submit" class="add-btn-style" @click="addSportsmen">
                Добавить
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
.input-group-name{
  color: #000000;
  border: 1px solid #031954;
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
#label-price{
  display: flex;
  margin-top: 2px;
}
.price-input-block{
  color: #031954;
  font-weight: 500;
}

#price-input{
  width: 250px;
  height: 40px;
  border: 1px solid #031954;
  border-radius: 10px;
  text-align: center;
}
.disabled {
  opacity: 0.6;
  cursor: not-allowed;
  pointer-events: none;
}

.field-label {
  font-size: 18px;
  font-weight: 500;
  text-align: left;
  color: #031954;
}
</style>
