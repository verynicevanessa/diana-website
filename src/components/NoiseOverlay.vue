<template>
    <div class="noise-overlay"></div>
  </template>
  
  <style scoped>
  .noise-overlay::after {
    animation: grain 8s steps(10) infinite;
    background-image: url('/noise.png');
    content: "";
    height: 300%;
    left: -50%;
    opacity: 0.9;
    position: fixed;
    top: -110%;
    width: 300%;
    pointer-events: none;
  }
  
  @keyframes grain {
    0%, 100% { transform: translate(0, 0); }
    10% { transform: translate(-5%, -10%); }
    20% { transform: translate(-15%, 5%); }
    30% { transform: translate(7%, -25%); }
    40% { transform: translate(-5%, 25%); }
    50% { transform: translate(-15%, 10%); }
    60% { transform: translate(15%, 0%); }
    70% { transform: translate(0%, 15%); }
    80% { transform: translate(3%, 35%); }
    90% { transform: translate(-10%, 10%); }
  }
  </style>
  