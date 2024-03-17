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
    <div>
        <div class="menu-overlay-slide">
            <div class="overlay-text">
            <p>DIANA WEISMAN, BALTIMORE ©2024</p>
            <div><ul>
                <li class="list-item-icon"><router-link @click="$emit('close-menu')" to="/projects">Projects<sup>{{ projectsCount }}</sup></router-link></li>
                <li class="list-item-icon"> <router-link @click="$emit('close-menu')" to="/about">About</router-link></li>
                <li class="list-item-icon"> <router-link @click="$emit('close-menu')" to="/selected-projects">Selected</router-link></li>
                <li class="list-item-icon"> <router-link @click="$emit('close-menu')" to="/">Restart</router-link></li>
            </ul>
            </div>
        </div>
        </div>
    </div>
</template>

<style scoped>
.menu-overlay-slide {
    height: 100vh;
    width:100vw;
    position: fixed;
    backdrop-filter:  blur(20px);
}

.overlay-text {
    height: 100vh;
    max-width: 900px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    left:0;
    right:0;
    margin: auto;
   
}

.overlay-text p, li {
    font-size: clamp(20px, 5vw, 50px);
}


ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex; /* Display the list items in a row */
}

ul li {
  margin: 0 10px; /* Add margin between menu items */
    display: flex;
    align-items:end;
}

ul li a {
  color: rgb(0, 0, 0);
  font-size: clamp(20px, 5vw, 50px);
  text-decoration: none;
}

.menu-overlay p {
  color: rgb(0, 0, 0);
  font-size: clamp(20px, 5vw, 50px);
  margin-bottom: 10px;
}

.menu-overlay-slide {
  justify-content: center;
  flex-direction: columns;
}

.list-item-icon {
    padding-left: 30px;
  background-image: url('/src/assets/DW-Menu.svg');
  background-repeat: no-repeat;
  background-size: 24px 24px;
  background-position: left center;
}

@media (max-width: 768px) {
    .overlay-text {
        max-width: 80%;
    }

    ul {
    flex-direction: column; /* Stack the list items vertically on small screens */
    align-items: start; /* Align items to the start of the container */
  }
  
  ul li {
    margin: 10px 0; /* Adjust margin for vertical layout */
  }

}

</style>