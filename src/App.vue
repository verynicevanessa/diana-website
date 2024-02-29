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
</style>
