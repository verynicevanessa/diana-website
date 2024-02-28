<template>
    <transition name="menu-overlay-section">
      <div v-if="menuOpen" class="menu-overlay" :class="{ 'active': menuOpen }" ref="MenuOverlay">

        <!-- Your menu overlay content goes here -->
        <MenuOverlay @close-menu="closeMenu"/>
      </div>
    </transition>
  <div class="menu-wrapper">
    <div class="menu">
      <router-link to="/"><img src="/DWLogo.png" class="logo"></router-link>
      <a @click="toggleMenu" aria-label="Toggle menu"><img src="../assets/Menu-Snowflake.png" class="menu-button" alt="SVG Image"></a>
    </div>
  </div>
  

</template>

<script>
import MenuOverlay from './MenuOverlay.vue';

export default {
  components: {
    MenuOverlay
  },
  data() {
    return {
      menuOpen: false
    };
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
      console.log('Menu state:', this.menuOpen); 
    },
    closeMenu() {
    this.menuOpen = false; // Directly close the menu
  }
  }
};
</script>



<style>
.menu-wrapper {
  top: 0;
  left: 0;
  width: 100%; 
  display: flex; 
  justify-content: space-between; 
  padding: 0 20px; 
  box-sizing: border-box; 
  z-index: 900; 
  position: relative;
  /* mix-blend-mode: difference; */
}

.menu {
  display: flex;
  justify-content: center; /* Center the menu items */
  width: 100%; /* Ensure the menu spans the full width of its container */
  position: relative;
  z-index: 900;
}

.menu-button {
  width: 3em;
  margin: 10px 10px 0 0;
  z-index: 900;
}

.menu-button svg {
  mix-blend-mode: exclusion !important; filter: invert(1) !important;}


.logo {
  width: 500px;
  cursor: grab;
  mix-blend-mode: exclusion;
/* 
  background-image: url(/2.png);
     filter: blur(3px);
     background-size: contain; */
}


a {
  margin-left: auto; /* Push the button to the right */
}

.menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.234); /* Adjust background color as needed */
  z-index: 800; /* Ensure it's above other content */
  transition: transform 0.3s ease; /* Smooth transition for sliding animation */
  transform: translateY(-100%); /* Initially hide the menu overlay */
}

.menu-overlay.active {
  transform: translateY(0); /* Slide the menu overlay into view */
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex; /* Display the list items in a row */
}

ul li {
  margin: 0 10px; /* Add margin between menu items */
}

ul li a {
  color: rgb(0, 0, 0);
  font-size: 50px;
  text-decoration: none;
}

.menu-overlay p {
  color: rgb(0, 0, 0);
  font-size: 50px;
  margin-bottom: 10px;
}

.menu-overlay-slide {
  justify-content: center;
  flex-direction: columns;
    width: 100vw;
    height: 100vh;
}


</style>

