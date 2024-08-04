<script setup lang="ts">
import { ref, defineEmits, computed, onMounted, defineProps, watch } from 'vue';
import { useUserStore } from '@/store/users/index';
import { useApi } from '@/composable/useApi';
import BaseInput from "@/components/base/BaseInput.vue";

const emit = defineEmits(['close']);
const usersStore = useUserStore();
const selectedWinners = ref(Array(3).fill(null));

const closeAddWinner = () => {
  emit('close');
};

const props = defineProps({
  eventId: String
});

watch(() => props.eventId, (newVal, oldVal) => {
  console.log("Event ID changed from", oldVal, "to", newVal); // This will log the event ID when it changes
}, { immediate: true });

const users = computed(() => usersStore.getUsers);

const participantInputs = ref([
  { searchText: '', selectedParticipant: null, showList: false },
  { searchText: '', selectedParticipant: null, showList: false },
  { searchText: '', selectedParticipant: null, showList: false }
]);

const filteredParticipants = (index) => {
  return users.value.filter(user =>
      `${user.firstName} ${user.lastName}`.toLowerCase().includes(participantInputs.value[index].searchText.toLowerCase())
  );
};
// Selects a participant and assigns it to a specific position (gold, silver, bronze)
const selectParticipant = (index, participant) => {
  participantInputs.value[index].selectedParticipant = participant;
  participantInputs.value[index].searchText = `${participant.firstName} ${participant.lastName}`;
  participantInputs.value[index].showList = false;
  selectWinner(index, participant);
};

// Use the selectWinner function to update the selectedWinners array
const selectWinner = (index, participant) => {
  selectedWinners.value[index] = participant;
};

const focusInput = (index) => {
  participantInputs.value[index].showList = true; // Показать список при фокусе
};

const blurInput = (index) => {
  setTimeout(() => {
    participantInputs.value[index].showList = false; // Скрыть список после потери фокуса
  }, 200); // Задержка для обработки клика по элементу списка
};

const deleteParticipant = (index) => {
  participantInputs.value[index].selectedParticipant = null;
  participantInputs.value[index].searchText = '';
  selectedWinners.value[index] = null;
};

const getPlaceText = (index) => {
  switch (index) {
    case 0: return 'Первое';
    case 1: return 'Второе';
    case 2: return 'Третье';
    default: return 'Участник';
  }
};

const saveWinners = async () => {
  for (const [index, winner] of selectedWinners.value.entries()) {
    if (winner) {
      const requestData = {
        eventId: props.eventId,
        userId: winner.id,
        medal: ['gold', 'silver', 'bronze'][index]
      };
      console.log('Sending request:', requestData);
      try{
        await useApi('v1/winners', {
          method: 'POST',
          data: {
            eventId: props.eventId,
            userId: winner.id,
            medal: ['gold', 'silver', 'bronze'][index]
          }
        });
      }catch(error){
        console.error('Failed to save winner:', error);
      }
    }
  }
  emit('close');
};

onMounted(async () => {
  await usersStore.fetchUsersByRole(2);
});

</script>

<template>
  <div class="wrapper">
    <div class="winners-block">
      <div class="winner-block-header">
        <div class="winner-label text-center font-bold">
          Список победителей
        </div>
      </div>
      <div class="winner-list">
        <div class="participants-table mt-8">
          <table class="w-full">
            <thead>
            <tr>
              <th class="text-left py-2 px-4">Место</th>
              <th class="text-left py-2 px-4">ФИО</th>
              <th class="text-left py-2 px-4">Школа</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(input, index) in participantInputs" :key="index">
              <td class="py-2 px-4">{{ getPlaceText(index) }}</td>
              <td class="py-2 px-4 relative">
                <base-input
                    v-model="input.searchText"
                    @focus="focusInput(index)"
                    @blur="blurInput(index)"
                    placeholder="Введите ФИО"
                />
                <ul v-if="input.showList && filteredParticipants(index).length" class="absolute bg-white border border-gray-300 w-full mt-1 max-h-48 overflow-y-auto z-50">
                  <li
                      v-for="participant in filteredParticipants(index)"
                      :key="participant.id"
                      @click="selectParticipant(index, participant)"
                      class="p-2 cursor-pointer hover:bg-gray-100"
                  >
                    {{ participant.firstName }}{{ participant.lastName }}
                  </li>
                </ul>
              </td>
<!--              <td class="py-2 px-4">{{ input.selectedParticipant ? input.selectedParticipant.school : 'Выберите участника' }}</td>-->
              <td class="py-2 px-4 text-right">
                <button @click="deleteParticipant(index)" class="bg-red-500 text-white px-3 py-1 rounded">
                  x
                </button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="btns-add-and-back">
        <div class="btn-back">
          <button @click="closeAddWinner" class="btn-back-route">
            Назад
          </button>
        </div>
        <div class="add-btn">
          <button @click="saveWinners" class="btn-add-route">
            Сохранить
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper{
  position: relative;
  display: flex;
  justify-content: center;
}
.winners-block{
  position: absolute;
  height: 500px;
  background-color: white;
  border: 1px solid #031954;
  margin-top: 5rem;
  padding: 60px 30px;
  border-radius: 15px;
}
.winner-label{
  color: #031954;
  font-size: 2rem;
}

table {
  border-collapse: collapse;
}

th,
td {
  border: none; /* Убираем границу */
}
ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

li:hover {
  background-color: #f0f0f0;
}

li {
  padding: 8px;
  cursor: pointer;
}

button {
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #c53030; /* Более темный красный при наведении */
}

.btns-add-and-back{
  position: absolute;
  bottom: 50px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  width: 88%;
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