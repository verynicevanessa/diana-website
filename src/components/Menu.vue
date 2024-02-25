<template>
    <div class="menu-wrapper">
        <div class="menu">
            <router-link to="/"><img src="/DW-Logo.png" class="logo"></router-link>
            <a @click="toggleMenu">O</a>
        </div>
        <div class="menu-overlay" :class="{ 'active': menuOpen }" ref="menuOverlay" >
            <p> DIANA WEISMAN, NEW YORK</p><br>
      <ul>
        <li><router-link @click.native="closeMenu" to="/">Projects</router-link></li>
        <li><router-link @click.native="closeMenu" to="/about">About</router-link></li>
        <li>Contact</li>
      </ul>
    </div>
    </div>
</template>
    

<script>
export default {
  data() {
    return {
      menuOpen: false
    };
  },
  methods: {
    toggleMenu() {
      if (this.menuOpen) {
        this.closeMenu();
      } else {
        this.menuOpen = true;
      }
    },
    closeMenu() {
      this.menuOpen = false;
    },
    handleClickOutside(event) {
      const menuElement = this.$refs.menuOverlay;
      if (menuElement && !menuElement.contains(event.target) && this.menuOpen) {
        this.closeMenu();
      }
    }
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside, true);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside, true);
  }
};


</script>


    

<style scoped>
.menu-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%; /* Span the full width */
  display: flex; /* Use flexbox for alignment */
  justify-content: space-between; /* Align items on both ends */
  padding: 0 20px; /* Add some padding on both sides */
  box-sizing: border-box; /* Include padding in the element's total width */
  z-index: 900; /* Ensure it stays above other content */
}

.menu {
  display: flex;
  justify-content: center; /* Center the menu items */
  width: 100%; /* Ensure the menu spans the full width of its container */
}

.logo {
  width: 500px;
  cursor: grab;
  backdrop-filter: blur(10px);
  background-image: url(/2.png);
     filter: blur(3px);
     background-size: contain;
}

.logo:hover {
  color: red;
}

a {
  margin-left: auto; /* Push the button to the right */
  font-size: 50px;
}

.menu-overlay {
  position: absolute;
  top: 100%; /* Position the menu below the logo */
  left: 50%; /* Horizontally center the menu */
  transform: translateX(-50%); /* Adjust for centering */
  width: auto; /* Set the width to auto */
  display: flex;
  flex-direction: column; /* Stack items vertically */
  align-items: center;
  justify-content: center;
  z-index: 800; /* Ensure it's above other content */
  transition: opacity 0.3s ease; /* Smooth transition for opacity */
  opacity: 0; /* Initially hidden */
  pointer-events: none; /* Don't allow clicking on the overlay */
  mix-blend-mode: exclusion;
}

.menu-overlay.active {
  opacity: 1; /* Show the overlay */
  pointer-events: auto; /* Allow clicking on the overlay */
  mix-blend-mode: exclusion;
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
</style>

