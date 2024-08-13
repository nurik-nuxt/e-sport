<script setup lang="ts">
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';

interface School {
    id: number;
    title: string;
    address: string;
    categories: string[];
    description: string;
    rating: number;
    image?: string;
} 

const props = defineProps<{
    school: School;
}>();
const router = useRouter();
function getCategoryColor(category: string): string {
    const colors: Record<string, string> = {
        'Каз. курес': '#29FF72', 
        'бокс': '#E1253C',       
        'борьба': '#FFB629'    
    };
    return colors[category] || '#ffffff'; 
}
function goToDetails(): void {
    if (props.school && props.school.id) {
        router.push({ name: 'SchoolData', params: { id: props.school.id } });
    } else {
        console.error('No school ID provided for routing');
    }
}
// TruncateText function to limit text length
function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + '...';
}

</script>
<template>
    <div class="schoolBlock">
        <div class="school_item">
            <img v-if="school?.images" :src="school?.images[0]" alt="Image of school" class="item_image">
            <img v-else src="https://i.postimg.cc/jjSq1VMQ/item-1.png" alt="Image of school" class="item_image">
            <div class="item_title">
                {{truncateText(school.title, 20)}}
            </div>
            <div class="item_address">
                {{ truncateText(school.address, 20)}}
            </div>
            <div class="item_categories">
                <div 
                    v-for="category in school.categories" 
                    :key="category"
                    class="category"
                    :style="{ backgroundColor: getCategoryColor(category) }"
                >
                    {{ category }}
                </div>
            </div>
            <div class="item_description">
              {{ truncateText(school.description, 135) }}
            </div>
            <div class="item_rating">
              <van-rate :model-value="school?.rating" readonly color="#FFEC2D" />
            </div>
            <span class="score_text">Оценка</span><br/>
            <div class="item_link_block">
                <button  @click.prevent="goToDetails" class="item_detail_link">Подробнее</button>
            </div>
        </div>
    </div>
</template>
<style scoped>
.school_item {
    background: #fff;
    margin-bottom: 50px;
    font-family: 'Montserrat', sans-serif;
    width: 100%; 
    max-width: 350px;
    min-width: 270px;
    display: flex;
    flex-direction: column;
    align-items: left;
    padding: 5px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    border-radius: 15px;
}
.item_image {
    width: 100%;
    height: 208px;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
}
.item_title {
    margin: 16px 0 0 15px;
    font-size: 20px;
    font-weight: 500;
    height: 55px;
}
.item_address {
    margin-left: 15px;
    font-size: 1rem;
    font-weight: 500;
    color: #606060;
}
.item_categories{
    display: flex;
    gap: 10px;
    margin-left: 15px;
}
.item_categories .category {
    padding: 2px 4px;
    color: #fff;
    font-size: 10px;
    border-radius: 5px;
}
.item_description {
    margin: 0 5px 20px 15px;
    font-size: .75rem;
    font-weight: 500;
    color: #606060;
    height: 70px;
}
.item_rating {
    display: flex;
    align-items: center;
    margin-left: 15px;
}

.item_rating .star {
    width: 20px;
    height: 20px;
}
.score_text{
    margin-left: 15px;
    font-size: .75rem;
    color: #606060;
    font-weight: 500;
}
.item_link_block{
    padding-top: 20px;
}
.item_detail_link {
    color: #031954;
    text-decoration: none;
    margin-left: 15px;
    padding: 6px 28px;
    border: 1px solid #031954;
    border-radius: 5px;
    font-size: 14px;
    transition: all 200ms ease;
}
.item_detail_link:hover{
    background-color: #031954;
    color: #fff;
}
</style>