<template>
</template>


<script>
import { onMounted, onUnmounted } from 'vue';
import SFeye from '../assets/SF-eye.svg'; 
import SFblink from '/SF-blink.svg'; 

export default {
  setup() {
    const cursorHotspot = { x: 12, y: 12 };
    // This function will be called when the component is mounted to the DOM
    const handleGlobalClick = () => {
      //console.log("Global click event occurred");  Log when the global click event occurs
      document.body.style.cursor = `url(${SFblink}) ${cursorHotspot.x} ${cursorHotspot.y}, auto`;
      setTimeout(() => {
        document.body.style.cursor = `url(${SFeye}) ${cursorHotspot.x} ${cursorHotspot.y}, auto`;
        //console.log("Cursor changed back to SF-eye.svg"); // Log when cursor changes back
      }, 150);
    };

    onMounted(() => {
      //console.log("Component mounted");  Log when the component is mounted
      document.addEventListener('click', handleGlobalClick);
    });

    onUnmounted(() => {
      //console.log("Component unmounted"); Log when the component is unmounted
      document.removeEventListener('click', handleGlobalClick);
    });

    return {};
  }
}


</script>

<style>

body , a {
  cursor: url('../assets/SF-eye.svg') 12 12, auto;
}


</style>
