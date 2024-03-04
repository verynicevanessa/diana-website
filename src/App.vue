<script setup>
import Work from './views/Work.vue'
import Menu from './components/Menu.vue'

import ThreeDLogo from './components/ThreeDLogo.vue'


</script>

<template>
 <Menu></Menu>
<router-view></router-view>
<!-- <ThreeDLogo></ThreeDLogo> -->

</template>

<style>
/* .menu-wrapper {
    z-index: 900;
    mix-blend-mode: difference;
} */

.menu-wrapper {
    position: fixed;
    pointer-events: none;
}

/* .slide-enter-active, .slide-leave-active {
  transition: transform 0.5s ease;
  position: absolute;
  width: 100%;
} */
/* .slide-enter, .slide-leave-to {
  transform: translateY(100%);
} */

</style>
