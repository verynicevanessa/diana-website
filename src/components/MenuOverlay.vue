<template>
  <div>
    <div class="menu-overlay-slide">
      <div class="overlay-text">
        <p class="claim">{{ claim }}</p>
        <div id="blink-counter">Blinks: 0</div>

        <div>
          <ul>
            <li class="list-item-icon">
              <router-link @click="$emit('close-menu')" to="/projects">
                Projects<sup>{{ projectsCount }}</sup>
              </router-link>
            </li>
            <li class="list-item-icon">
              <router-link @click="$emit('close-menu')" to="/about">About</router-link>
            </li>
            <li class="list-item-icon">
              <router-link @click="$emit('close-menu')" to="/selected-projects">Selected</router-link>
            </li>
            <li class="list-item-icon">
              <router-link @click="$emit('close-menu')" to="/">Restart</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchAbout } from '@/api/api.js'; // Import the fetchAbout function

function calculateScrollbarWidth() {
  const bodySize = document.querySelector('body').offsetWidth;
  const windowSize = window.innerWidth;

  return windowSize - bodySize;
}

export default {
  methods: {
    pageReload(location) {
      this.$emit('close-menu');
      window.location.href = location; // Fix for the about page
    },
    updateBlinkCounter() {
      this.blinkCounter++;
      document.getElementById('blink-counter').innerText = `Blinks: ${this.blinkCounter}`;
    }
  },

  data() {
    return {
      claim: '', // Initialize claim as an empty string
      blinkCounter: 0 // Initialize blinkCounter
    };
  },
  computed: {
    projectsCount() {
      return this.$store.getters.projectsCount;
    },
  },
  async mounted() {
    if (this.$store.state.loadedProjects.length === 0) {
      this.$store.dispatch("loadProjects");
    }
    document.body.style.overflow = "hidden";

    // Fetch the about information
    try {
      const aboutInfo = await fetchAbout();
      if (aboutInfo && aboutInfo.claim) {
        this.claim = aboutInfo.claim;
      }
    } catch (error) {
      console.error('Error fetching about info:', error);
    }

    // Event-Listener für Blinzelereignisse hinzufügen
    document.addEventListener('blinkEvent', this.updateBlinkCounter);
  },
  beforeUnmount() {
    document.body.style.overflow = "auto";

    // Event-Listener entfernen
    document.removeEventListener('blinkEvent', this.updateBlinkCounter);
  }
};
</script>

<style scoped>
.menu-overlay-slide {
  height: 100vh;
  width: 100vw;
  position: fixed;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px); /* For Safari */
}

.overlay-text {
  height: 100vh;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  left: 0;
  right: 0;
  margin: auto;
}

.overlay-text p,
li {
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
  display: flex;
  align-items: end;
}

ul li a {
  color: rgb(0, 0, 0);
  font-size: clamp(30px, 5vw, 50px);
  text-decoration: none;
}

.menu-overlay p {
  color: rgb(0, 0, 0);
  font-size: clamp(30px, 5vw, 50px);
  margin-bottom: 10px;
}

.menu-overlay-slide {
  justify-content: center;
  flex-direction: column;
}

.list-item-icon {
  padding-left: 30px;
  background-image: url("/src/assets/DW-Menu.svg");
  background-repeat: no-repeat;
  background-size: 24px 24px;
  background-position: left center;
}

@media (max-width: 768px) {
  .overlay-text {
    max-width: 80%;
  }

  ul {
    flex-direction: column; /* Stack the list items vertically on small screens */
    align-items: start; /* Align items to the start of the container */
  }

  ul li {
    margin: 10px 0; /* Adjust margin for vertical layout */
  }
}
</style>
