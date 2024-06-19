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



</style>
