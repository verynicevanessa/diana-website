<template>
  <div ref="fixedElement" class="fixed-element">
    <slot></slot>
  </div>
</template>

<script>
export default {
  mounted() {
    this.setPosition();
  },
  methods: {
    setPosition() {
      const element = this.$refs.fixedElement;
      const windowHeight = window.innerHeight;
      const elementHeight = element.offsetHeight;
      const middlePosition = (windowHeight - elementHeight) / 2;

      element.style.top = `${middlePosition}px`;
    }
  }
};
</script>


<style scoped>
.fixed-element {
  position: fixed;
  transform: translateX(-50%);
  left: 50%;
  z-index: 100;
  user-select: none;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  pointer-events: none;
  cursor: inherit;
}
</style>