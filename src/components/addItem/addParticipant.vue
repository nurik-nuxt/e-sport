<script setup lang="ts">
import { ref, onMounted, defineEmits,defineProps, watch, computed } from 'vue';
import { useUserStore } from "@/store/users";
import { useEventStore } from "@/store/eventStore";
import {useApi} from "@/composable/useApi";

const emit = defineEmits(['close']);
const usersStore = useUserStore();
const eventStore = useEventStore();
const selectedUserIds = ref<string[]>([]);
const existingParticipants = ref<string[]>([]);

const props = defineProps({
  eventId: String
});

const schoolId = localStorage.getItem('schoolId');

onMounted(async () => {
  if (schoolId) {
    await usersStore.loadSportsmensBySchool(schoolId);
  } else {
    console.error("No school ID found in localStorage");
  }
});

const fetchExistingParticipants = async () => {
  try {
    if (props.eventId) {
      const response = await useApi(`/v1/events/${props.eventId}/participants`, {
        method: 'GET'
      });
      existingParticipants.value = response.map((participant: any) => participant.id);
      // Initialize selectedUserIds with existing participants
      selectedUserIds.value = [...existingParticipants.value];
    }
  } catch (error) {
    console.error('Failed to fetch existing participants:', error);
  }
};

const availableUsers = computed(() => {
  return usersStore.getCurrentSchoolSportsmens;
});

const toggleUserSelection = (userId: string) => {
  const index = selectedUserIds.value.indexOf(userId);
  if (index === -1) {
    selectedUserIds.value.push(userId);
  } else {
    selectedUserIds.value.splice(index, 1);
  }
};

const closeModal = () => {
  emit('close');
};

const users = computed(() => usersStore.getCurrentSchoolSportsmens);

const addSelectedUsersToEvent = async () => {
  try {
    const requestBody = {
      participantIds: selectedUserIds.value
    };
    await useApi(`v1/events/add-participants/${props.eventId}`, {
      method: 'POST',
      data: requestBody
    });
    console.log('Users added successfully to event:', props.eventId);
    closeModal();
  } catch (error) {
    console.error('Failed to add users:', error);
  }
};
</script>

<template>
  <div class="add-participant-block">
    <div class="add-participant relative">
      <div class="add-participant-title text-center font-bold">
        Список участников
      </div>
      <div class="add-participant-list">
        <table class="table-auto w-full">
          <tbody>
          <tr v-for="user in availableUsers" :key="user.id">
            <td>
              <input type="checkbox" class="checkbox-participant" :value="user.id" @change="toggleUserSelection(user.id)" :checked="selectedUserIds.includes(user.id)" />
            </td>
            <td>{{ user.lastName }} {{ user.firstName }}</td>
            <td class="iin-column">{{ user.iin }}</td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="btns-add-and-back">
        <div class="btn-back">
          <button @click="closeModal" class="btn-back-route">
            Назад
          </button>
        </div>
        <div class="add-btn">
          <button @click="addSelectedUsersToEvent" class="btn-add-route">
            Сохранить
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.add-participant-block{
  display: flex;
  align-items: center;
  justify-content: center;
}
.add-participant{
  width: 600px;
  height: 600px;
  padding: 60px 50px;
  background-color: white;
  border: 1px solid #031954;
  z-index: 999;
  border-radius: 15px;
}
.add-participant-title{
  color: #031954;
  font-size: 30px;
  padding-bottom: 40px;
}
table {
  width: 100%;
  border-collapse: collapse;
}
.checkbox-participant{
  width: 20px;
  height: 20px;
}
.iin-column{
  text-align: right;
}

th, td {
  border-bottom: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}
.btns-add-and-back{
  position: absolute;
  bottom: 50px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  width: 500px;
}
.btn-back-route{
  padding: 10px 40px;
  border-radius: 5px;
  color: #B10000;
  border: 1px solid #540303;
  background-color: white;
  transition: all 200ms ease-in-out;
}
.btn-back-route:hover{
  background-color: #B10000;
  color: #fff;
}
.btn-add-route{
  padding: 10px 40px;
  border-radius: 5px;
  color: #005703;
  border: 1px solid #005703;
  background-color: white;
  transition: all 200ms ease-in-out;
}
.btn-add-route:hover{
  color: white;
  background-color: #005703;
}
</style>