<script>
import ThreeDLogo from './ThreeDLogo.vue';

</script>


<template>
    <div>
        <!-- <ThreeDLogo /> -->
        <div class="menu-overlay-slide">
            <div class="overlay-text">
            <h1>DIANA WEISMAN, NEW YORK<br>
                ©2024</h1>
            <di><ul>
                <li><router-link @click="$emit('close-menu')" to="/projects">Projects</router-link></li>
                <li> <router-link @click="$emit('close-menu')" to="/about">About</router-link></li>
                <li> <router-link @click="$emit('close-menu')" to="/SelectedProjects">Selected</router-link></li>
                <li> <router-link @click="$emit('close-menu')" to="/">Contact</router-link></li>
            </ul>
        </di>
    </div>
        </div>
    </div>
</template>

<style>
.menu-overlay-slide {
    height: 100vh;
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
    width: 100vw;
    height: 100vh;
}


</style>