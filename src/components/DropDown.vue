<template>
    <div class="custom-dropdown" @click="toggleDropdown">
        <div class="dropdown-selected">
            <img :src="selectedImage" class="selected-img" alt="Selected" />
            {{ selected.label }}
            <img src="../assets/icons/PolygonDown.png" class="arrow-img" :class="{ 'arrow-rotate': isOpen }" />
        </div>
        <div class="dropdown-options" v-if="isOpen">
            <div
            class="dropdown-item"
            v-for="option in options"
            :key="option.value"
            @click.stop="selectOption(option)"
            >
            {{ option.label }}
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['options', 'selectedImage', 'defaultLabel'],
        data() {
        return {
            isOpen: false,
            selected: { label: this.defaultLabel },
        };
        },
        methods: {
        toggleDropdown() {
            this.isOpen = !this.isOpen;
        },
        selectOption(option) {
            this.selected = option;
            this.isOpen = false;
            this.$emit('selected', option);
        }
        }
    };
</script>    


<style scoped>
.custom-dropdown {
    position: relative;
    width: 250px;
    font-family: 'Montserrat', sans-serif;
}

.dropdown-selected {
    padding: 10px;
    background-color: #f0f0f0;
    border: 1px solid #031954;
    color: #031954;
    font-weight: 500;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    position: relative;
}

.dropdown-selected img.selected-img {
    width: 25px;
    height: 25px;
    margin-right: 10px;
}
.dropdown-selected img.arrow-img {
    width: 15px;
    height: 9px;
    position: absolute;
    right: 15px;
    top: 18px;
    transition: transform 300ms ease;
}
.arrow-rotate {
    transform: rotate(180deg);
}

.dropdown-options {
    position: absolute;
    background-color: white;
    border: 1px solid #031954;
    border-radius: 5px;
    width: 100%;
    box-sizing: border-box;
    z-index: 1000;
    color: #031954;
}
.dropdown-item {
    padding: 10px;
    cursor: pointer;
    transition: all 200ms ease;
    font-weight: 500;
}
.dropdown-item:hover {
    background-color: #00AFCA;
    color: #fff;
}
</style>
