<template>
    <transition name="flip">
      <div v-if="menuOpen" class="menu-overlay" :class="{ 'active': menuOpen }" ref="MenuOverlay">

        <!-- Your menu overlay content goes here -->
        <MenuOverlay @close-menu="closeMenu"/>
      </div>
    </transition>
    <div class="menu-wrapper">
      <!-- <div class="menu"> -->
        
        <router-link to="/" @click="closeMenu"><img src="/Diana_FrozenLogo.png" class="logo"></router-link>
      <!-- </div> -->
    </div>
    <span class="name-logo"><router-link to="/projects" @click="closeMenu"><h3 >DIANA WEISMAN</h3></router-link></span>

    <a @click="toggleMenu" aria-label="Toggle menu"><img src="../assets/Menu-Snowflake.png" class="menu-button" alt="SVG Image"></a>
  

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
  justify-content: center;
  padding: 0 20px;
  box-sizing: border-box;
  z-index: 900;
  position: relative;
}

.name-logo {
  mix-blend-mode: difference; 
  color: white;
  position: fixed;
  left: 50px;
  top: 0;
  z-index: 900;
}

.menu {
  display: flex;
  justify-content: center;
  /* Center the menu items */
  width: 30%;
  /* Ensure the menu spans the full width of its container */
  position: relative;
  z-index: 900;
}
.menu span {
  position: absolute;
  left: 0;
}

.menu-button {
  width: 2em;
  /* margin: 10px 0 0 0; */
  z-index: 900;
  mix-blend-mode: difference;
}


.logo {
  width: 100%;
  max-width: 150px; 
  z-index: 900;
}

.menu-wrapper .logo:hover  {
 mix-blend-mode: difference;
}

a .menu-button{
  position: fixed;
  right: 50px;
  top: 20px;

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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}


.flip-enter-active, .flip-leave-active {
  transition: transform 0.5s ease-out;
}

.flip-enter-from, .flip-leave-to {
  transform: rotateY(90deg);
}

.flip-enter-to, .flip-leave-from {
  transform: rotateY(0deg);
}
@media (max-width: 650px) {
  span h1{
    width: 100px;
  }

  .name-logo {
    left:20px;
  }
  .name-logo h1 {
    font-size: 1.5rem; /* Adjust font size instead of width for better readability */
  }
  .menu{
    justify-content: end;
    margin-right: 30px;
  }
  a .menu-button{
    right: 10px;
  }
  .menu-button {
    right: 20px; /* Adjust for consistency */
  }
}


</style>

