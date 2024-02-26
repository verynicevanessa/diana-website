<script>
import ThreeDLogo from './ThreeDLogo.vue';

export default {
    components: {
        ThreeDLogo
    }
}
</script>


<template>
    <div>
        <!-- <ThreeDLogo /> -->
        <div class="menu-overlay-slide">
            <p>DIANA WEISMAN, NEW YORK</p>
            <p>©2024</p>
            <ul>
                <li><router-link to="/">Projects</router-link></li>
                <li> <router-link to="/about">About</router-link></li>
                <li> <router-link to="/blinking">Blink</router-link></li>
                <li> <router-link to="/">Contact</router-link></li>
            </ul>
           
        </div>
    </div>
</template>

<style>
.menu-overlay-slide {
    width: 100%;
    height: 100%;
}

</style>