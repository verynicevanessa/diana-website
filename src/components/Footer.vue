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
        <img src="../assets/SF.gif" class="footer-image">
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
    height: 80vh;
     display: flex;
     justify-content: center;
     align-items: center;
     flex-direction: column; 
     position: relative;
     bottom: 0;
     text-align: center;
}
.footer-text {
    bottom: 1;
    margin: 0 10px;
}
.footer-image {
    width: 50%;
  max-width: 500px;
}

@media (max-width: 768px) {
.footer-text ul li a{
    font-size: 20px;
}

}

</style>