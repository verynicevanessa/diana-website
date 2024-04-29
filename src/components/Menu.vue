<template>
  <!-- <transition name="flip"> -->
    <div
      v-if="menuOpen"
      class="menu-overlay"
      :class="{ active: menuOpen }"
      ref="MenuOverlay"
    >
      <!-- Your menu overlay content goes here -->
      <MenuOverlay @click="closeMenu" />
    </div>
  <!-- </transition> -->
  <div class="menu-wrapper">
    <span class="name-logo">
      <router-link to="/projects" @click="closeMenu">
        <h3 style="color: black;">DIANA WEISMAN</h3>
      </router-link>
    </span>
    <!-- <div class="menu"> -->
    <!-- Disable pointer events for logo while its 100% width, so projects behind are clickable -->
    <router-link
      to="/"
      @click="closeMenu"
      :style="!isLogoActive && { pointerEvents: 'none' }"
    >
      <img
        src="/Diana_FrozenLogo.png"
        :style="menuOpen ? {width: '200px'} : (logoWidth ? { width: logoWidth + 'px' } : '100%')"
        class="logo"
        ref="logo"
      />
    </router-link>
    <!-- </div> -->
  </div>

  <a @click="toggleMenu" aria-label="Toggle menu">
    <img
      src="../assets/Menu-Snowflake.png"
      class="menu-button"
      alt="SVG Image"
    />
  </a>
</template>

<script>
import MenuOverlay from "./MenuOverlay.vue"

export default {
  components: {
    MenuOverlay,
  },
  data() {
    return {
      menuOpen: false,
      isLogoActive: false,
      logoWidth: null, // Initial width set to 100% of the window width
    };
  },
  watch: {
    // Add watcher to route path rather than use mounted and beforeUnmount
    $route(to, from) {
      this.adjustLogoInitially();
      if (to.fullPath === "/projects") {
        this.handleScroll();
        window.addEventListener("scroll", this.handleScroll);
      } else {
        window.removeEventListener("scroll", this.handleScroll);
      }
    },
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    closeMenu() {
      this.menuOpen = false;
    },

    handleScroll() {
      const scrollTop = window.scrollY;
      const maxScroll = 300; // Maximum scroll distance that affects the size
      const maxWidth = window.innerWidth; // Max width (100% of window width)
      const minWidth = 200; // Minimum width after scrolling 200px

      if (scrollTop >= maxScroll) {
        this.logoWidth = minWidth;
        this.isLogoActive = true;
      } else {
        const widthDiff = maxWidth - minWidth;
        this.logoWidth = maxWidth - widthDiff * (scrollTop / maxScroll);
        this.logoWidth = Math.max(this.logoWidth, minWidth);
        this.isLogoActive = false;
      }
    },

    adjustLogoInitially() {
      this.logoWidth = 200;
      this.isLogoActive = true;
    },
  },
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
  pointer-events: none;
}

.menu-wrapper > * {
  pointer-events: auto;
}

.name-logo {
  mix-blend-mode: difference;
  color: white;
  position: fixed;
  left: 50px;
  top: 0;
  z-index: 800;
}

.menu {
  display: flex;
  justify-content: center;
  /* Center the menu items */
  width: 30%;
  /* Ensure the menu spans the full width of its container */
  position: relative;
  z-index: 500;
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

/* .logo {
  width: 100%;
  max-width: 150px; 
  z-index: 900;
} */

.logo {
  width: 100%;
  transform-origin: top center;
  top: 0;
}

.menu-wrapper .logo:hover {
  mix-blend-mode: difference;
}

a .menu-button {
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
  background-color: rgba(
    255,
    255,
    255,
    0.234
  ); /* Adjust background color as needed */
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

.flip-enter-active,
.flip-leave-active {
  transition: transform 0.5s ease-out;
}

.flip-enter-from,
.flip-leave-to {
  transform: rotateY(90deg);
}

.flip-enter-to,
.flip-leave-from {
  transform: rotateY(0deg);
}
@media (max-width: 650px) {
  span h1 {
    width: 100px;
  }

  .name-logo {
    left: 20px;
    display: none;
  }
  .name-logo h1 {
    font-size: 1.5rem; /* Adjust font size instead of width for better readability */
  }
  .menu {
    justify-content: end;
    margin-right: 30px;
  }
  a .menu-button {
    right: 10px;
  }
  .menu-button {
    right: 20px; /* Adjust for consistency */
  }
}
</style>
