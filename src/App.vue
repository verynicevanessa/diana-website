<script setup>
import Work from './views/Work.vue'
import Menu from './components/Menu.vue'

import ThreeDLogo from './components/ThreeDLogo.vue'


</script>

<template>
 <Menu></Menu>
 <transition name="slide"><router-view></router-view></transition>
<!-- <ThreeDLogo></ThreeDLogo> -->

</template>

<style>
/* .menu-wrapper {
    z-index: 900;
    mix-blend-mode: difference;
} */

.menu-wrapper {
    position: fixed;
}

.slide-enter-active, .slide-leave-active {
  transition: transform 0.5s ease;
}
.slide-enter, .slide-leave-to /* .slide-leave-active in <2.1.8 */ {
  transform: translateY(100%);
}

</style>
