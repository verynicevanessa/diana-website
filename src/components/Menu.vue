<template>
  <transition name="fade">
    <div v-if="menuOpen" class="menu-overlay" :class="{ active: menuOpen }" ref="MenuOverlay">
      <MenuOverlay @close-menu="closeMenu" />
    </div>
  </transition>
  <div class="menu-wrapper">
    <span v-if="!hideLogo" class="name-logo">
      <router-link to="/projects" @click="closeMenu">
        <h3 style="color: black;">DIANA WEISMAN</h3>
      </router-link>
    </span>
    <router-link to="/" @click="closeMenu" :style="!isLogoActive && { pointerEvents: 'none' }">
      <img v-if="!hideLogo" src="/DLW-Visual-Re.png" :style="{ width: logoWidth + 'px' }" class="logo" ref="logo" />
    </router-link>
  </div>
  <a @click="toggleMenu" aria-label="Toggle menu">
    <img src="../assets/Menu-Snowflake.png" class="menu-button" alt="SVG Image" />
  </a>
</template>

<script>
import MenuOverlay from './MenuOverlay.vue';

export default {
  name: 'Menu',
  components: {
    MenuOverlay,
  },
  data() {
    return {
      menuOpen: false,
      isLogoActive: false,
      logoWidth: 200,
      hideLogo: false,
      currentRoute: '',
    };
  },
  watch: {
    $route(to) {
      this.handleRouteChange(to);
    },
    menuOpen(val) {
      if (val) {
        this.hideLogo = true;
      } else {
        this.handleRouteChange(this.$route);
      }
    },
  },
  mounted() {
    this.handleRouteChange(this.$route);
    window.addEventListener('resize', this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    closeMenu() {
      this.menuOpen = false;
    },
    handleResize() {
      // Prevent resizing on /project/ routes
      if (this.currentRoute.startsWith('/project/')) {
        return;
      }
      this.adjustLogoInitially();
    },
    handleScroll() {
      const scrollTop = window.scrollY;
      const maxScroll = 300;
      const maxWidth = window.innerWidth > 768 ? 800 : 400;
      const minWidth = 200;

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
      if (this.currentRoute === '/projects') {
        this.logoWidth = window.innerWidth > 768 ? 800 : 400;
        window.addEventListener('scroll', this.handleScroll); // Ensure scroll event listener is added
      } else if (this.currentRoute.startsWith('/project/')) {
        this.logoWidth = 200;  // Set a fixed size for /project/ pages
      } else {
        this.logoWidth = 200;
      }
    },
    handleRouteChange(route) {
      this.currentRoute = route.path;
      window.removeEventListener('scroll', this.handleScroll);

      if (route.path === '/about' || route.path === '/blinking' || this.menuOpen) {
        this.hideLogo = true;
      } else if (route.path === '/projects') {
        this.hideLogo = false;
        this.adjustLogoInitially();
      } else if (route.path.startsWith('/project/')) {
        this.hideLogo = false;
        this.logoWidth = 200; // Ensure logo size stays consistent on project detail pages
        this.isLogoActive = true;
      } else if (route.path === '/selected-projects') {
        this.hideLogo = false;
        this.logoWidth = 200;
      } else if (route.path === '/') {
        this.hideLogo = false;
        this.adjustLogoInitially();
        window.addEventListener('scroll', this.handleScroll);
      } else {
        this.hideLogo = false;
        this.logoWidth = 200;
      }
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
  width: 30%;
  position: relative;
  z-index: 500;
}
.menu span {
  position: absolute;
  left: 0;
}

.menu-button {
  width: 2em;
  z-index: 900;
  mix-blend-mode: difference;
}

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
  background-color: rgba(255, 255, 255, 0.234);
  z-index: 800;
  transition: transform 0.3s ease, background-color 0.5s ease; /* Added background-color transition */
  transform: translateY(-100%);
}

.menu-overlay.active {
  transform: translateY(0);
  background-color: rgba(255, 255, 255, 0.356); /* Target background color */
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px); /* For Safari */
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
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
    font-size: 1.5rem;
  }
  .menu {
    justify-content: end;
    margin-right: 30px;
  }
  a .menu-button {
    right: 10px;
  }
  .menu-button {
    right: 20px;
  }
}
</style>
