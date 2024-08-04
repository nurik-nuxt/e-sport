<script setup>
    import sportsmen from "../../../public/database/sportsmen.json";
    const getDisciplineColor = (discipline) => {
        const colors = {
            'kickboxing': '#29FF72', 
            'box': '#E1253C',       
            'борьба': '#FFB629'    
        };
        return colors[discipline] || '#ffffff'; 
    };
</script>
<template>
    <div class="listSportsMen">
        <div class="listTitle">
            Спортсмены
        </div>
        <div class="listItems">
            <div v-for="(sportsman, index) in sportsmen" :key="index" class="itemSportsMan">
                <div class="itemImg" :style="{ backgroundImage: 'url(' + sportsman.photo + ')'}">
                    <div 
                        class="SportDiscipline"
                        :style="{ backgroundColor: getDisciplineColor(sportsman.discipline) }"
                    >
                        {{sportsman.discipline}}
                    </div>
                </div>
                <div class="itemInfo">
                    <div class="ItemFullname">
                        {{ sportsman.name + " " + sportsman.surname }}
                    </div>
                    <div class="itemStatus">
                        {{ sportsman.position }}
                    </div>
                    <div class="ratingStars">
                        <div v-for="index in 5" :key="index" class="star">
                            <img src="../../assets/icons/StarLight.png" v-if="index <= sportsman.rating" alt="Filled Star">
                            <img src="../../assets/icons/StarGray.png" v-else alt="Empty Star">
                        </div>
                    </div>
                    <div class="ratingText">
                        рейтинг
                    </div>
                    <div class="itemBtnMore">
                        <router-link to="/SportsmenProfile" class="btnMore">
                            Подробнее
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>
<style scoped>
    .listSportsMen{
        width: 100%;
        font-family: 'Montserrat', sans-serif;
    }
    .listTitle{
        font-size: 1.5rem;
        font-weight: 600;
        margin-top: 1.75rem;
    }
    .listItems{
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
    }
    .itemSportsMan{
        width: 280px;
        min-width: 280px;
        margin-top: 2.15rem;
    }
    .itemImg{
        width: 100%;
        height: 350px;
        max-height: 350px;
        position: relative;
    }
    .SportDiscipline{
        position: absolute;
        bottom: 15px;
        left: 15px;
        padding: 4px 12px;
        border-radius: 3px;
        font-size: 10px;
        font-weight: 600;
        color: #fff;
    }
    .itemInfo{
        padding-left: 15px;
        padding-top: 10px;
    }
    .ItemFullname{
        color: #031954;
        font-size: 1.5rem;
        font-weight: 600;
    }
    .itemStatus{
        font-weight: 600;
        font-size: 14px;
        color: #606060;
    }
    .ratingStars{
        display: flex;
        margin-top: 5px;
        height: 25px;
    }
    .ratingText{
        font-weight: 500;
        font-size: 14px;
        color: #606060;
    }
    .itemBtnMore{
        margin-top: 10px;
        position: relative;
        height: 50px;
    }
    .btnMore{
        color: #031954;
        font-size: 14px;
        font-weight: 500;
        padding: 7px 20px;
        cursor: pointer;
        border: 1px solid #031954;
        border-radius: 5px;
        position: absolute;
        transition: all 200ms ease;
    }
    .btnMore:hover{
        background-color: #031954;
        color: #fff;
    }
</style>
