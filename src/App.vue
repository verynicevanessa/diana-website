<script setup>
import Menu from "./components/Menu.vue";
import Cursor from "./components/Cursor.vue";

</script>

<template>

  <Cursor></Cursor>
  <Menu></Menu>

    <router-view></router-view>

 
</template>

<style>
.menu-wrapper {
  position: fixed;
  z-index: 900;
}

#app {
  position: relative;
}

.slide-fade-enter-active {
  transition: all 0.8s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}


</style>
