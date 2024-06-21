<template>
  <transition name="fade">
    <div
      v-if="menuOpen"
      class="menu-overlay"
      :class="{ active: menuOpen }"
      ref="MenuOverlay"
    >
      <MenuOverlay @close-menu="closeMenu" />
    </div>
  </transition>
  <div class="menu-wrapper">
    <span v-if="!hideLogo" class="name-logo">
      <router-link to="/projects" @click="closeMenu">
        <h3 style="color: black;">DIANA WEISMAN</h3>
      </router-link>
    </span>
    <router-link
      to="/"
      @click="closeMenu"
      :style="!isLogoActive && { pointerEvents: 'none' }"
    >
      <img
        v-if="!hideLogo"
        src="/DLW-Visual-Re.png"
        :style="menuOpen ? { width: '200px' } : (logoWidth ? { width: logoWidth + 'px' } : '100%')"
        class="logo"
        ref="logo"
      />
    </router-link>
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
import { ref, onMounted, watch } from 'vue';
import MenuOverlay from './MenuOverlay.vue';

export default {
  name: 'Menu', // Dies stellt sicher, dass die Komponente im Navigation Guard gefunden werden kann
  components: {
    MenuOverlay,
  },
  data() {
    return {
      menuOpen: false,
      isLogoActive: false,
      logoWidth: null,
      hideLogo: false,
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
      const maxScroll = 300;
      const maxWidth = 800; // Anfangsbreite des Logos auf der Work-Seite
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
      this.logoWidth = 800; // Anfangsbreite des Logos auf der Work-Seite
      this.isLogoActive = true;
    },
    handleRouteChange(route) {
      window.removeEventListener('scroll', this.handleScroll); // Entferne den Scroll-Listener standardmäßig
      if (route.path === '/about' || route.path === '/blinking' || this.menuOpen) {
        this.hideLogo = true;
      } else if (route.path === '/projects') {
        this.hideLogo = false;
        this.adjustLogoInitially();
        window.addEventListener('scroll', this.handleScroll); // Füge den Scroll-Listener nur auf der Work-Seite hinzu
      } else if (route.path.startsWith('/project/')) {
        this.hideLogo = false;
        this.logoWidth = 200; // Kleines Logo auf der ProjectDetail-Seite
        this.isLogoActive = true;
      } else if (route.path === '/selected-projects') {
        this.hideLogo = false;
        this.logoWidth = 200; // Großes Logo auf der SelectedProjects-Seite
      } else {
        this.hideLogo = false;
        this.logoWidth = 200; // Standardgröße für alle anderen Seiten
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
