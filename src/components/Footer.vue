<script>
import { fetchAbout } from '@/api/api.js';

export default {
    data() {
        return {
            claim: '', // Initialize claim as an empty string
        };
    },
    computed: {
        projectsCount() {
            return this.$store.getters.projectsCount;
        },
    },
    async mounted() {
        if (this.$store.state.loadedProjects.length === 0) {
            this.$store.dispatch('loadProjects');
        }

        // Fetch the about information
        try {
            const aboutInfo = await fetchAbout();
            if (aboutInfo && aboutInfo.claim) {
                this.claim = aboutInfo.claim;
            }
        } catch (error) {
            console.error('Error fetching about info:', error);
        }
    },
};
</script>

<template>
    <div class="footer">
        <img src="/D-SF.gif" alt="Footer Decorative" class="footer-image">
        <div class="footer-text">
            <p class="claim">{{ claim }}</p>
            <ul>
                <li><router-link to="/projects">Projects <sup>{{ projectsCount }}</sup></router-link></li>
                <li><router-link to="/about">About</router-link></li>
                <li><router-link to="/selected-projects">Selected</router-link></li>
                <li><router-link to="/">Restart</router-link></li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
.footer {
    height: 90vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column; 
    position: relative;
    bottom: 0;
    text-align: center;
}
.footer-text {
    bottom: 1;
    margin: 0 10px;
}
.footer-image {
    width: 80%;
    max-width: 500px;
}

.footer-text ul li {
    display: flex;
    align-items: end;
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
  font-size: clamp(24px, 5vw, 50px);
  text-decoration: none;
}

/* Enhancements for smaller screens */
@media (max-width: 768px) {
    .footer {
        padding: 10px;
    }

    .footer-text ul li a {
        font-size: 16px; /* Adjusted for better readability on small screens */
    }

    .footer-text p {
        font-size: 14px; /* Slightly smaller text size for the footer text */
    }
}
</style>
