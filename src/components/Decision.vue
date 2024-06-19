<template>
  <div class="main">
   
    <div class="content">

      <img class="video" src="/D-SF.gif" >

      <div v-if="!permissionGiven">
        
        <div class="proceed">
          <h3>
            {{ decision1 }}
          </h3>
          <div class="btn">
            <button @click="handleMe">Pass</button>
            <button @click="handleProceed">Proceed</button>
          </div>
        </div>
      </div>
      <div class="enter" v-if="permissionGiven">


        <h3 v-html="decision2"></h3>

        <div class="btn">
          <button @click="handleEnter">Enter</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchProjects, fetchAbout } from "@/api/api"; // Adjust the import path as needed

export default {
  data() {
    return {
      decisionMade: false,
      permissionGiven: false,
      decision1: '',
      decision2: '',
    };
  },
  computed: {
  currentMediaUrl() {
    return this.images.length > 0 ? this.images[this.currentIndex].url : '';
  },
  currentMediaType() {
    return this.images.length > 0 ? this.images[this.currentIndex].type : 'image';
  },
},

  async created() {
    try {
      const projects = await fetchProjects();
      this.images = projects.map(project => ({
      url: project.heroImage.url,
      type: project.heroImage.mimeType.startsWith('video/') ? 'video' : 'image'
    }));
      const aboutInfo = await fetchAbout();
      this.decision1 = aboutInfo.decision1;
      this.decision2 = aboutInfo.decision2.html;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
  methods: {
    handleMe() {
      this.$router.push("/projects");
    },
    handleYou() {
      this.decisionMade = true;
    },
    async handleProceed() {
      try {
        const response = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        window.currentStream = response;
        console.log({ currentStream });
        this.permissionGiven = response.active;
      } catch (e) {
        this.$router.push("/blinking");
        console.log("Error", e);
      }
    },
    handleEnter() {
      this.$emit("proceed");
    },
  },
};
</script>

<style scoped>
.main {
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  /* background: radial-gradient(circle, #d4dde7, #8e9aa8); */
}

.background-media {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; 
  object-position: center;
  z-index: -1; /* Place it behind the content */
}

.content {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: rgba(231, 235, 238, 0.4);
  backdrop-filter: blur(10px);
  border-radius: 18px;
  padding: 10px;
  margin: 10%;
}

.imgContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
}
.video {
  width: 100%;
  max-width: 200px;
}

.makeDecision {
  display: flex;
  flex-direction: column;
  align-items: center;
}

h2 {
  margin: 0;
  width: 400px;
  font-size: 32px;
  text-transform: uppercase;
  margin: 1em 0;
}

.btn {
  width: 100%;
  display: flex;
  justify-content: center;
}

button {
  padding: 10px 30px 10px 30px;
  margin: 5px;
  border: none;
  border-radius: 16px;
  background-color: #ffffff4e;
  transition: background 0.5s ease-in-out;
  font-family: Kommuna Demo;
  font-size: 20px;
}

button:hover {
  background-color: #fff;
  
}

@media (max-width: 768px) {
  .main {
    flex-direction: column;
    justify-content: flex-start;
  }

  .content {
    width: 90vw; /* Adjust content width on smaller screens */
    margin-top: 20vh; /* Add some top margin on smaller screens */
    margin-left: 1vw;
    margin-right: 1vw;
  }

  h2 {
    font-size: 24px; /* Smaller font size for h2 on small devices */
    width: 90%; /* Make the width more responsive */
  }

  .video {
    max-width: 150px; /* Smaller video width on smaller screens */
  }

  .btn button {
    font-size: 16px; /* Smaller font size for buttons */
    padding: 8px 20px; /* Adjust button padding */
  }
}

@media (max-width: 480px) {
  .main {
    height: 90vh;
  }
  .content {
    width: 90vw; /* Adjust content width for very small screens */
    margin-left: 1vw;
    margin-right: 1vw;
  }

  h2 {
    font-size: 20px; /* Even smaller font size for h2 on very small devices */
  }

  .makeDecision, .proceed, .enter {
    padding: 5px; /* Reduce padding for decision-making elements */
  }

  .btn button {
    font-size: 14px; /* Further reduce font size for buttons */
  }
}

</style>
