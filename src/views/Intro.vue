<script>
  function decisionMade(choice) {
    alert('You chose: ' + choice);
    // Implement the functionality you need when a button is clicked
  }
</script>

<template>
<div class="intro-page">
    <img src="../assets/Menu-Snowflake.png" alt="Decorative Image" class="intro-image">
    <div class="decision-text">
         Trust this Person?
         Who will decide the path to explore this experience
    </div>
    <div class="button-container">
  <button onclick="decisionMade('ME')">ME</button>
  <button onclick="decisionMade('YOU')">YOU</button>
</div>

</div>



</template>

<style>

.intro-page {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: auto;
  top:0;
  bottom: 0;
}
.intro-image {
  width: 80%;
  max-width: 800px;
}

button {
    background-color: #ffffff4c;
    border-radius: 20px;
    padding: 10px 20px;
    font-size: 18px;
    margin: 10px;
    cursor: pointer;
    outline: none;
  }

  button:focus {
    border-color: #000;
  }
  .button-container {
    display: flex;
    justify-content: center;
  }

</style>