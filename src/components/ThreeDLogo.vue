<template>
  <div id="container" ref="container" @wheel="onMouseWheel"></div>

</template>

<script>
import * as THREE from 'three';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

export default {
  data() {
    return {
      camera: null,
      renderer: null, // Store renderer for cleanup
      isDragging: false,
      lastX: 0,
      lastY: 0,
      rotationSpeed: 0.02, // Adjust as necessary for sensitivity
    };
  },
  mounted() {
    this.initThree();
    this.$refs.container.addEventListener('mousedown', this.onMouseDown);
    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('mouseup', this.onMouseUp);
    window.addEventListener('resize', this.onWindowResize);
  },
  beforeDestroy() {
    if (this.renderer) {
      this.renderer.dispose();
    }
    window.removeEventListener('resize', this.onWindowResize);
    // Consider disposing of other resources like materials, geometry, textures
  },
  methods: {
    initThree() {
      const scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      this.renderer = new THREE.WebGLRenderer({ alpha: true });
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.$refs.container.appendChild(this.renderer.domElement);

      const light = new THREE.AmbientLight(0x404040); // soft white light
      scene.add(light);

      this.renderer.setClearColor(0x000000, 0); // The second parameter (0) is the alpha value

      this.$refs.container.appendChild(this.renderer.domElement);

      // Optionally, add a directional light
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
      directionalLight.position.set(0, 1, 1);
      scene.add(directionalLight);

      const mtlLoader = new MTLLoader();
      mtlLoader.load('/3D-Diana.mtl', (materials) => {
        console.log('Materials loaded:', materials); 
        materials.preload();

        const objLoader = new OBJLoader();
        objLoader.setMaterials(materials); // This line applies the loaded materials to the OBJ model
        objLoader.load(
          '/3D-Diana.obj',
          (object) => {
          object.scale.set(0.001, 0.001, 0.001); // Example scaling, adjust as necessary
          object.position.set(0, 0, 0); // Center the object in the scene
          this.camera.position.set(0, 0, 5); // Adjust the camera to properly view the object

          scene.add(object);
          this.object = object; // Store the object for later use in rotation, etc.
    },
    (xhr) => {
      console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
    },
    (error) => {
      console.error('Error loading OBJ file:', error);
    }
  );
}); // Closing parenthesis for mtlLoader.load callback

      this.camera.position.z = 5; 

      const animate = () => {
        requestAnimationFrame(animate);
        this.renderer.render(scene, this.camera);
      };

      animate();
    },
    // onMouseWheel(event) {
    //   const delta = Math.sign(event.deltaY) * 0.5; // Adjust the zoom speed
    //   this.camera.position.z += delta;
    //   this.camera.updateProjectionMatrix();
    // },
    onWindowResize() {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    },
    onMouseDown(event) {
    this.isDragging = true;
    this.lastX = event.clientX;
    this.lastY = event.clientY;
  },
  onMouseMove(event) {
  if (this.isDragging) {
    const deltaX = event.clientX - this.lastX;
    this.lastX = event.clientX;

    // Update object rotation here, only horizontally
    this.object.rotation.y += deltaX * this.rotationSpeed;
  }
},
  onMouseUp() {
    this.isDragging = false;
  },
  },
};
</script>



<style>
#container {
  width: 100%;
  height: 50%;
}
</style>
