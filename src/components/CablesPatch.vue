<script setup>  
import logger from '@/utils/logger';
</script>

<template>
  <canvas v-bind:id="canvasId" tabIndex="1" style="height: 500px;"></canvas>
</template>

<script>
export default {
  props: {
    patchDir: {
      type: String,
      default: '/patch/',
    },
    canvasId: {
      type: String,
      default: 'glcanvas',
    },
    patchOptions: {
      type: Object
    },
    projectsData: {
      type: Object
    }
  },

  beforeRouteLeave(to, from, next) {
    if (window.CABLES && window.CABLES.patch !== null) { 
      logger.log('⚡️ Disposing of patch');
      window.CABLES.patch.dispose();
      window.CABLES.patch = null; // Explicitly set to null after disposal
    }
    next();
  },

  beforeUnmount() { // Use beforeDestroy if using Vue 2
    if (window.CABLES && window.CABLES.patch !== null) {
      logger.log('Disposing CABLES patch');
      window.CABLES.patch.dispose();
      window.CABLES.patch = null; // Explicitly set to null after disposal
    }
  },
  
  computed: {
    mergedPatchOptions() {
      const defaultOptions = {
        'prefixAssetPath': this.patchDir,
        'jsPath': this.patchDir + '/js/',
        'glCanvasId': this.canvasId,
        'glCanvasResizeToWindow': true,
        'silent': 1, // suppresses console warnings
        'canvas': {'alpha': true, 'premultipliedAlpha': true},
        variables: {
          inputJson: this.projectsData
        }
      };
      return {...defaultOptions, ...this.patchOptions }
    }
  },
  mounted() {
    const _patchInitialized = (patch) => {
      // You can now access the patch object (patch), register variable watchers and so on
      logger.log(this.patchDir + ' initialized');
    };

    const _patchFinishedLoading = (patch) => {
      // The patch is ready now, all assets have been loaded
      logger.log(this.patchDir + ' finished loading');
      this.$emit('patch-loaded');
    };

    const script = document.createElement('script');
    script.src = this.patchDir + '/js/patch.js';
    script.async = true;
    
    script.onload = () => {
      const patchOptions = this.mergedPatchOptions;
      if (!patchOptions.patch) patchOptions.patch = CABLES.exportedPatch;
      if (!patchOptions.onPatchLoaded) patchOptions.onPatchLoaded = _patchInitialized;
      if (!patchOptions.onFinishedLoading) patchOptions.onFinishedLoading = _patchFinishedLoading;
      CABLES.patch = new CABLES.Patch(patchOptions);
    };
    document.body.appendChild(script);
  },
};
</script>

<style scoped>
.canvasContainer, #glcanvas {
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  outline: none;
}
</style>