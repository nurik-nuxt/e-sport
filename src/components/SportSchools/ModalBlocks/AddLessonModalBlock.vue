<script setup lang="ts">
    import { ref, defineProps, defineEmits } from 'vue';
    const props = defineProps({
        isOpen: Boolean,
    });
    const emits = defineEmits(['close', 'add-lesson']);

    const newLesson = ref({
    'type-sport': '',
    coach: '',
    'age-group': '',
    time: '',
    days: [] as string[],
    });

    const onAddLessonSubmit = () => {
        emits('add-lesson', newLesson.value);
        closeModal();
    };

    const closeModal = () => {
        emits('close');
    };
</script>
<template>
    <div class="modal-block-change">
        <form @submit.prevent="onAddLessonSubmit" method="POST" class="modal-form">
            <div class="form-group">
                <label for="new-type-sport">Вид спорта</label>
                <select v-model="newLesson['type-sport']" id="new-type-sport" required>
                    <option value="" disabled>Выберите вид спорта</option>
                    <option value="Футбол">Футбол</option>
                    <option value="Бокс">Бокс</option>
                    <option value="Плавание">Плавание</option>
                </select>
            </div>
            <div class="form-group">
                <label for="new-coach">Тренер</label>
                <select v-model="newLesson.coach" id="new-coach" required>
                    <option value="" disabled>Выберите тренера</option>
                    <option value="Криштиану Роналду">Криштиану Роналду</option>
                    <option value="Геннадий Головкин">Геннадий Головкин</option>
                    <option value="Сауль Альварес">Сауль Альварес</option>
                </select>
            </div>
            <div class="form-group">
                <label for="new-age-group">Группа</label>
                <select v-model="newLesson['age-group']" id="new-age-group" required>
                    <option value="" disabled>Выберите группу</option>
                    <option value="Младшая">Младшая</option>
                    <option value="Средняя">Средняя</option>
                    <option value="Старшая">Старшая</option>
                </select>
            </div>
            <div class="form-group">
            <label for="new-time">Время</label>
            <input v-model="newLesson.time" type="text" id="new-time" placeholder="10:00-12:00" required />
            </div>
            <div class="form-group">
                <label for="new-days">Дни</label>
                <div class="checkbox-group">
                    <label><input type="checkbox" value="Пн" v-model="newLesson.days" /> Пн</label>
                    <label><input type="checkbox" value="Вт" v-model="newLesson.days" /> Вт</label>
                    <label><input type="checkbox" value="Ср" v-model="newLesson.days" /> Ср</label>
                    <label><input type="checkbox" value="Чт" v-model="newLesson.days" /> Чт</label>
                    <label><input type="checkbox" value="Пт" v-model="newLesson.days" /> Пт</label>
                    <label><input type="checkbox" value="Сб" v-model="newLesson.days" /> Сб</label>
                    <label><input type="checkbox" value="Вс" v-model="newLesson.days" /> Вс</label>
                </div>
            </div>
            <div class="form-actions">
                <button type="submit">Добавить занятие</button>
                <button type="button" @click="emits('close')">Отмена</button>
            </div>
        </form>
    </div>
</template>
<style scoped>
    .modal-block-change {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    }

    .modal-form {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    width: 400px;
    max-width: 90%;
    }

    .form-group {
    margin-bottom: 15px;
    }

    .form-group label {
    display: block;
    margin-bottom: 5px;
    }

    .form-group select,
    .form-group input[type="text"] {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    }

    .checkbox-group {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    }

    .checkbox-group label {
    display: flex;
    align-items: center;
    }

    .checkbox-group input {
    margin-right: 5px;
    }

    .form-actions {
    display: flex;
    justify-content: space-between;
    }

    .form-actions button {
    padding: 10px 20px;
    border: none;
    background: #007bff;
    color: #fff;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.2s;
    }

    .form-actions button:hover {
    background: #0056b3;
    }
</style>


