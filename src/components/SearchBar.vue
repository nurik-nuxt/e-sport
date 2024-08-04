<script setup lang="ts">
    import { ref, defineEmits } from 'vue';
    type Emits = {
        (event: 'search', query: string): void;
    }
    const searchQuery = ref<string>(''); 
    const emit = defineEmits<Emits>();
    const performSearch = (): void => {
        emit('search', searchQuery.value);
        console.log('performSearch:', searchQuery.value);
    };
</script>
<template>
    <div class="search-bar">
        <div class="input-container">
            <img src="../assets/icons/Search.png" alt="Search" class="input-icon">
            <input
                type="text"
                v-model="searchQuery" 
                @keyup.enter="performSearch"
                placeholder="Поиск"
            />
        </div>
        <button @click="performSearch" id="btnSearch">Поиск</button>
    </div>
</template>
<style scoped>
.search-bar {
    display: flex;
    width: 95%;
    align-items: center;
    font-family: 'Montserrat', sans-serif;
    margin: 30px 30px;
}
@media (max-width: 600px) {
    .search-bar button {
        padding: 10px;
        font-size: 16px;
    }
    #btnSearch {
        margin-left: 20px;
        padding: 10px 20px;
    }
}
@media screen and (max-width: 431px){
    .search-bar{
        margin: 30px 10px;
    }
    #btn_search{
        padding: 10px 30px;
    }
}
.input-container {
    position: relative;
    width: 100%;
}

.input-icon {
    position: absolute;
    width: 30px;
    min-width: 30px;
    max-width: 30px;
    min-height: 30px;
    max-height: 30px;
    height: 30px;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
}
.search-bar input {
    width: 100%;
    padding: 10px 10px 10px 50px;
    border: 1px solid #474747;
    border-radius: 5px;
    font-size: 18px;
    font-weight: 500;
}
.search-bar button {
    background-color: #203D8B;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}
.search-bar button:hover {
    background-color: #0056b3;
}
#btnSearch{
    margin-left: 70px;
    padding: 10px 45px;
    font-weight: 500;
    font-size: 18px;
}
</style>
