<template>
    <transition name="menu-overlay-section">
      <div v-if="menuOpen" class="menu-overlay" :class="{ 'active': menuOpen }" ref="MenuOverlay">

        <!-- Your menu overlay content goes here -->
        <MenuOverlay @close-menu="closeMenu"/>
      </div>
    </transition>
  <div class="menu-wrapper">
    <div class="menu">
      <h1>DIANA WEISMAN</h1>
      <router-link to="/"><img src="/DWLogo.png" class="logo"></router-link>
      <a @click="toggleMenu" aria-label="Toggle menu"><img src="/menu-snowflake.svg" class="menu-button" alt="SVG Image"></a>
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
  watch: {
    // Watcher on the menuOpen property to handle the body scroll
    menuOpen(newValue) {
      if (newValue) {
        // If menuOpen is true, disable scrolling
        document.body.style.overflow = 'hidden';
      } else {
        // If menuOpen is false, enable scrolling
        document.body.style.overflow = '';
      }
    }
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
  mix-blend-mode: exclusion;
}

.logo {
  width: 100%;
  max-width: 200px; 
  z-index: 900;
/* 
  background-image: url(/2.png);
     filter: blur(3px);
     background-size: contain; */
}

.menu-wrapper .logo:hover  {
 mix-blend-mode: difference;
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


</style>

