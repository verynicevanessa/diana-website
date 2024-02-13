<template>
    <div class="menu-wrapper">
        <div class="menu">
            <router-link to="/"><h1>Logo</h1></router-link>
            <a @click="toggleMenu">MENU</a>
        </div>
        <div class="menu-overlay" :class="{ 'active': menuOpen }">
            <p> DIANA WEISMAN, NEW YORK</p><br>
      <ul>
        <li><router-link @click.native="closeMenu" to="/">Projects</router-link></li>
        <li><router-link @click.native="closeMenu" to="/about">About</router-link></li>
        <li><router-link @click.native="closeMenu" to="/contact">Contact</router-link></li>
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
      this.menuOpen = !this.menuOpen;
    },
    closeMenu() {
      this.menuOpen = false;
    }
  }
};
</script>
    

<style>
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

h1 {
  color: red;
  margin: 0 auto; /* Center the logo */
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
  mix-blend-mode: difference;
}

.menu-overlay.active {
  opacity: 1; /* Show the overlay */
  pointer-events: auto; /* Allow clicking on the overlay */
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
  color: white;
  font-size: 50px;
  text-decoration: none;
}

p {
  color: white;
  font-size: 50px;
  margin-bottom: 10px;
}
</style>

