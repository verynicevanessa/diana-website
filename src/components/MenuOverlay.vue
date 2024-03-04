<script>
import ThreeDLogo from './ThreeDLogo.vue';

</script>


<template>
    <div>
        <!-- <ThreeDLogo /> -->
        <div class="menu-overlay-slide">
            <p>DIANA WEISMAN, NEW YORK</p>
            <p>©2024</p>
            <di><ul>
                <li><router-link @click="$emit('close-menu')" to="/">Projects</router-link></li>
                <li> <router-link @click="$emit('close-menu')" to="/about">About</router-link></li>
                <li> <router-link @click="$emit('close-menu')" to="/SelectedProjects">Selected</router-link></li>
                <li> <router-link @click="$emit('close-menu')" to="/">Contact</router-link></li>
            </ul>
        </di>
        </div>
    </div>
</template>

<style>
.menu-overlay-slide {
    height: 100vh;
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    left:0;
    right:0;
    margin: auto;
    backdrop-filter:  blur(20px);
}




</style>