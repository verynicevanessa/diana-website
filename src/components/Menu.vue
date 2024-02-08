<template>
    <div class="menu-wrapper">
        <div class="menu">
            <router-link to="/"><h1>Logo</h1></router-link>
            <a>ø</a>
        </div>
    </div>
</template>
    
<script>
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
</style>

