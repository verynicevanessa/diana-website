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
        <p>DIANA WEISMAN</p>
        <p>©2024</p>
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

.footer img {
    width: 50%;
    margin: auto;
}

</style>