<script>
import ThreeDLogo from './ThreeDLogo.vue';

export default {
    components: {
        ThreeDLogo
    }
}
</script>


<template>
    <div class="footer">
        <!-- <ThreeDLogo /> -->
        <div class="footer-text">
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
.footer {
     display: flex;
     justify-content: center;
     align-items: center;
     height: 100vh;
     flex-direction: column; 
     position: relative;
     bottom: 0;
     background-color: antiquewhite;
     text-align: center;
}
.footer-text {
    position: absolute;
    bottom: 1;
    margin: 0 10px;
}

</style>