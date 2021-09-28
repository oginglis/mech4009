<template>
  <Slider v-model="length" class="slider-styling" :max="10" />
  <div id="container"></div>
</template>

<script >
import * as Three from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Slider from "@vueform/slider";

export default {
  name: "ThreeCanvas",

  data() {
    return {
      length: 3,
    };
  },
  components: {
    Slider,
  },
  methods: {
    init: function () {
      let container = document.getElementById("container");
      this.camera = new Three.PerspectiveCamera(
        70,
        container.clientWidth / container.clientHeight,
        0.01,
        50
      );
      this.camera.position.set(8, 8, 8);

      this.scene = new Three.Scene();
      this.camera.lookAt(this.scene.position);
      // Pink Point on Geo

      // Arrow Helper
      const dir = new Three.Vector3(0, 1, 0);

      //normalize the direction vector (convert to vector of length 1)
      dir.normalize();

      const origin = new Three.Vector3(0, 3, 0);

      const hex = 0xffff00;

      const arrowHelper = new Three.ArrowHelper(dir, origin, this.length, hex);
      arrowHelper.name = "first arrow";
      this.scene.add(arrowHelper);

      // Create a dashed line
      const lineMaterial = new Three.MeshBasicMaterial({ color: 0xffc0cb });
      const points = [];
      points.push(new Three.Vector3(0, this.length, 0));
      points.push(new Three.Vector3(0, -this.length, 0));

      let tubeGeometry = new Three.TubeGeometry(
        new Three.CatmullRomCurve3(points),
        512, // path segments
        0.1, // THICKNESS
        30, //Roundness of Tube
        false //closed
      );
      let line = new Three.Line(tubeGeometry, lineMaterial);
      line.name = "Ollie thick line";
      this.scene.add(line);

      const conegeometry = new Three.ConeGeometry(0.3, 0.8, 32);

      const materialcone = new Three.MeshBasicMaterial({ color: 0xffff00 });
      const cone = new Three.Mesh(conegeometry, materialcone);
      cone.position.set(0, this.length, 0);
      cone.name = "arrow head";
      this.scene.add(cone);
      // Rotation 90 Degrees in radians = 1.5708
      this.renderer = new Three.WebGLRenderer({ antialias: true });
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.maxDistance = 7;
      this.controls.minDistance = 1.3;
      this.controls.minAzimuthAngle = 3;
      this.controls.maxAzimuthAngle = 2;
      this.controls.target.set(0, 1.5, 0);
      this.controls.enablePan = false;
      this.controls.autoRotate = true;
      this.controls.autoRotateSpeed = 0.1;
      this.controls.update();
      this.renderer.setClearColor("#D3D3D3");

      this.gridHelper = new Three.GridHelper(10, 10);
      this.scene.add(this.gridHelper);
      this.axesHelper = new Three.AxesHelper(1);

      this.scene.add(this.axesHelper);
      container.appendChild(this.renderer.domElement);

      this.updateSlider = function () {
        let selectedObject = this.scene.getObjectByName("first arrow");
        this.scene.remove(selectedObject);
        const arrowHelper = new Three.ArrowHelper(
          dir,
          origin,
          this.length,
          hex
        );
        arrowHelper.name = "first arrow";
        this.scene.add(arrowHelper);
        let selectedObject2 = this.scene.getObjectByName("Ollie thick line");
        this.scene.remove(selectedObject2);
        let points2 = [];
        points2.push(new Three.Vector3(0, this.length, 0));
        points2.push(new Three.Vector3(0, -this.length, 0));
        let tubeGeometry = new Three.TubeGeometry(
          new Three.CatmullRomCurve3(points2),
          512, // path segments
          0.1, // THICKNESS
          30, //Roundness of Tube
          false //closed
        );
        let line = new Three.Line(tubeGeometry, lineMaterial);
        line.name = "Ollie thick line";
        this.scene.add(line);

        let selectedcone = this.scene.getObjectByName("arrow head");
        this.scene.remove(selectedcone);
        const materialcone = new Three.MeshBasicMaterial({ color: 0xffff00 });
        const cone = new Three.Mesh(conegeometry, materialcone);
        cone.position.set(0, this.length, 0);
        cone.name = "arrow head";
        this.scene.add(cone);
      };
    },
    animate: function () {
      requestAnimationFrame(this.animate);
      this.updateSlider();
      this.renderer.render(this.scene, this.camera);
    },
    onWindowResize: function () {
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
    },
  },
  created() {
    window.addEventListener("resize", this.onWindowResize, false);
  },
  mounted() {
    this.init();
    this.animate();
  },
};
</script>

<style src="@vueform/slider/themes/default.css">
</style>
<style scoped  >
#container {
  width: 500px;
  height: 500px;
  position: relative;
  margin: 0 auto;
}

.slider-styling {
  width: 500px;
  margin: 1rem auto;
}
</style>
