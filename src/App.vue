<script setup>
  import { RouterView } from "vue-router";
  import Navigation from "./components/Navigation.vue";
  import ModalBlock from "./components/ModalBlock.vue";
  import BaseLoader from "@/components/base/BaseLoader.vue";
  import { useMainLoaderStore } from "@/store/loader.ts";

  const loaderStore = useMainLoaderStore();
</script>
<template>
  <div class="app">
    <BaseLoader :spinning="loaderStore.loading"/>
    <div class="all-components">
      <Navigation class="nav_block"/>
      <router-view class="router_block"></router-view>
    </div>
    <ModalBlock/>
  </div>
</template>

<style scoped>
  .all-components{
    display: grid;
    grid-auto-columns: 1fr; 
    grid-template-columns: 335px 1fr; 
    grid-template-rows: 1fr; 
    gap: 0;
    grid-template-areas: 
    "nav_block router_block"; 
}
.nav_block { grid-area: nav_block; }
.router_block { grid-area: router_block; }
  router-view {
    width: 100%;
    height: 100%;
}
@media screen and (max-width: 431px){
  .all-components{
    display: flex;
    flex-direction: column;
  }
}
</style>
