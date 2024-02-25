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
        <ThreeDLogo />
        <div class="footer-text">
            <p>DIANA WEISMAN</p>
            <p>©2024</p>
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
}
.footer-text {
    bottom: 0;
}

</style>