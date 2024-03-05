<template>
  <div class="main">
    <div class="content">
      <div class="imgContainer">
        <img class="img" src="../../public/DW-Snowflake.png" />
      </div>
      <div v-if="!permissionGiven">
        <div class="makeDecision" v-if="!decisionMade">
          <h3>
            ((Decision option text:)) who will decide the path to explore this
            experience
          </h3>
          <div class="btn">
            <button @click="handleMe">Me</button>
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
        <h3>ENTER experience</h3>
        <div class="btn">
          <button @click="handleEnter">Enter</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      decisionMade: false,
      permissionGiven: false,
    };
  },
  methods: {
    handleMe(){
      this.$router.push("/");
    },
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
      this.$emit('proceed');
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
  background-color: #e7ebf3;
}
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.imgContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
}
.img {
  max-width: 100%;
  max-height: 100%;
}

.makeDecision {
  display: flex;
  flex-direction: column;
  align-items: center;
}

h3 {
  margin: 0;
  width: 200px;
  font-style: "NewEdge 666";
  font-size: 18px;
}

.btn {
  background-color: red;
  width: 100%;
  display: flex;
  justify-content: center;
}

button{
  padding: 10px 30px 10px 30px;
}
</style>
