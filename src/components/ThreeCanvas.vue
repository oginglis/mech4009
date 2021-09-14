<template>
  <div id="container"></div>
</template>

<script setup>
import * as Three from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default {
  name: "ThreeCanvas",
  data: function () {
    return {
      camera: null,
      renderer: null,
      container: null,
    };
  },
  mounted: function () {
    this.init();
    this.animate();
  },
  created() {
    window.addEventListener("resize", this.scaleCanvas);
  },
  destroyed() {
    window.removeEventListener("resize", this.scaleCanvas);
  },
  methods: {
    init: function () {
      let container = document.getElementById("container");
      this.container = container;
      this.camera = new Three.PerspectiveCamera(
        70,
        container.clientWidth / container.clientHeight,
        0.25,
        20
      );
      this.camera.position.set(0, 0, 1);
      this.scene = new Three.Scene();

      this.renderer = new Three.WebGLRenderer({ antialias: true });
      this.renderer.setClearColor(0xc5c5c3);
      this.renderer.setSize(container.clientWidth, container.clientHeight);

      // Change the colour encoding for the renderer
      this.renderer.outputEncoding = Three.sRGBEncoding;

      // Attach renderer to the DOM
      container.appendChild(this.renderer.domElement);
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.maxDistance = 1.5;
      this.controls.minDistance = 1.3;
      this.controls.minAzimuthAngle = 3;
      this.controls.maxAzimuthAngle = 2;
      this.controls.target.set(0, 0, 0);
      this.controls.enablePan = false;
      this.controls.autoRotate = true;
      this.controls.autoRotateSpeed = 0.1;
      this.controls.update();
    },
    animate: function () {
      requestAnimationFrame(this.animate);
      this.controls.update();

      this.renderer.render(this.scene, this.camera);
      this.labelRenderer.render(this.scene, this.camera);
    },
    scaleCanvas() {
      this.camera.aspect(
        this.container.clientWidth,
        this.container.clientHeight
      );
      this.renderer.setSize(
        this.container.clientWidth,
        this.container.clientHeight
      );
      this.camera.updateProjectMatrix();
    },
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
</style>
