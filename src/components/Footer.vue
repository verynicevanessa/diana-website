<script>


export default {
    computed: {
        projectsCount() {
            return this.$store.getters.projectsCount;
        },
    },
    mounted() {
        if (this.$store.state.loadedProjects.length === 0) {
            this.$store.dispatch('loadProjects');
        }
    },
};


</script>


<template>
    <div class="footer">
        <img src="/D-SF.gif" class="footer-image">
        <div class="footer-text">
            <p>DIANA WEISMAN, BALTIMORE ©2024</p>
            <ul>
                <li><router-link to="/projects">Projects <sup>{{ projectsCount }}</sup></router-link></li>
                <li> <router-link to="/about">About</router-link></li>
                <li> <router-link to="/selected-projects">Selected</router-link></li>
                <li> <router-link to="/">Restart</router-link></li>
            </ul>
           
        </div>
    </div>
</template>

<style>
.footer {
    height: 90vh;
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
    width: 80%;
    max-width: 500px;
}

.footer-text ul li {
    display: flex;
    align-items:end;
}

@media (max-width: 768px) {
.footer-text ul li a{
    font-size: 20px;
}

}

</style>