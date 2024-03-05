<template>
  <div class="main">
    <div class="content">
      <video class="video" src="../assets/SF-small.mp4" autoplay loop muted></video>
      <div v-if="!permissionGiven">
        <div class="makeDecision" v-if="!decisionMade">
          <h3>
            who will decide the path to explore this
            experience
          </h3>
          <div class="btn">
            <button @click="goToProjects" >Me</button>
            <button @click="handleYou">You</button>
          </div>
        </div>
        <div class="proceed" v-if="decisionMade">
          <h3>
            For a personal on-site experience, enable camera and let your mind
            decide
          </h3>
          <div class="btn">
            <button @click="handleProceed">Proceed</button>
          </div>
        </div>
      </div>
      <div class="enter" v-if="permissionGiven">
        <h3>
          ENTER experience
        </h3>
        <div class="btn">
          <button @click="handleEnter">Enter</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main {
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  z-index: 500;
}
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}


h3 {
  margin: 0;
  width: 200px;
}
</style>

<script>
export default {
  props: ["handlePermission"],

  data() {
    return {
      decisionMade: false,
      permissionGiven: false,
    };
  },
  methods: {
    handleYou() {
      this.decisionMade = true;
    },
    async handleProceed() {
      try {
        const response = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        this.permissionGiven = response.active;
      } catch (e) {
        console.log("Error", e);
      }
    },

    handleEnter() {
      this.handlePermission({ cameraAccess: true });
    },
  },
};
</script>
