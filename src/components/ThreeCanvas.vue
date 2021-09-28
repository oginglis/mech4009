<template>
  <div class="viz-wrap">
    <div class="viz-controls-wrap">
      <Slider v-model="length" class="slider-styling" :max="10" />
    </div>

    <div id="container"></div>
  </div>
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
      // Find Container To Mount To
      let container = document.getElementById("container");
      // Create a scene
      this.scene = new Three.Scene();

      // Create a camera and set its position
      this.camera = new Three.PerspectiveCamera(
        70,
        container.clientWidth / container.clientHeight,
        0.01,
        50
      );
      // Position Camera and point it to the origin
      this.camera.position.set(8, 8, 8);
      this.camera.lookAt(this.scene.position);
      // Pink Point on Geo

      // Arrow Helper
      const dir = new Three.Vector3(0, 1, 0);

      //normalize the direction vector (convert to vector of length 1)
      dir.normalize();

      const origin = new Three.Vector3(0, 3, 0);

      const hex = 0x003e74;

      const arrowHelper = new Three.ArrowHelper(dir, origin, this.length, hex);
      arrowHelper.name = "first arrow";
      this.scene.add(arrowHelper);

      // Create a dashed line

      // const points = [];
      // points.push(new Three.Vector3(0, this.length, 0));
      // points.push(new Three.Vector3(0, -this.length, 0));

      // let tubeGeometry = new Three.TubeGeometry(
      //   new Three.CatmullRomCurve3(points),
      //   512, // path segments
      //   0.1, // THICKNESS
      //   30, //Roundness of Tube
      //   false //closed
      // );
      // let line = new Three.Line(tubeGeometry, lineMaterial);
      // line.name = "Ollie thick line";
      // this.scene.add(line);

      // const materialcone = new Three.MeshBasicMaterial({ color: 0x003e74 });
      // const cone = new Three.Mesh(conegeometry, materialcone);
      // cone.position.set(0, this.length, 0);
      // cone.name = "arrow head";
      // this.scene.add(cone);
      // Rotation 90 Degrees in radians = 1.5708
      this.renderer = new Three.WebGLRenderer({ antialias: true });
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      this.renderer.setClearColor("#FFFFFF");

      // Create orbit controls
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

      // Create a grid
      this.gridHelper = new Three.GridHelper(10, 10, 0x444444, 0xd3d3d3);
      this.scene.add(this.gridHelper);
      // Create an axis helper
      this.axesHelper = new Three.AxesHelper(1);
      this.scene.add(this.axesHelper);

      // Attach rendered to Dom Element
      container.appendChild(this.renderer.domElement);

      const removeObjectFromScene = (objectName) => {
        objectName.forEach((object) => {
          let selectedObject = this.scene.getObjectByName(object);
          this.scene.remove(selectedObject);
        });
      };

      const createVectorGeometry = (vecBottom, vecTop, color) => {
        let points2 = [];
        points2.push(vecBottom);
        points2.push(vecTop);
        const lineMaterial = new Three.MeshBasicMaterial({ color: color });
        let tubeGeometry = new Three.TubeGeometry(
          new Three.CatmullRomCurve3(points2),
          512, // path segments
          0.05, // THICKNESS
          30, //Roundness of Tube
          false //closed
        );
        let line = new Three.Line(tubeGeometry, lineMaterial);
        line.name = "Ollie thick line";
        // line.position.set(vecBottom);
        this.scene.add(line);
        let materialcone = new Three.MeshBasicMaterial({ color: color });
        let conegeometry = new Three.ConeGeometry(0.3, 0.8, 32);
        let cone = new Three.Mesh(conegeometry, materialcone);
        cone.position.set(vecBottom);
        cone.name = "arrow head";
        this.scene.add(cone);
      };

      let vec1 = new Three.Vector3(0, this.length, 0);
      let vec2 = new Three.Vector3(0, 0, 0);
      let vecColor = 0x003e74;

      createVectorGeometry(vec1, vec2, vecColor);

      this.updateSlider = () => {
        let selectedObject = this.scene.getObjectByName("first arrow");
        this.scene.remove(selectedObject);
        removeObjectFromScene([
          "first arrow",
          "Ollie thick line",
          "arrow head",
        ]);
        let vec1 = new Three.Vector3(0, this.length, 0);
        let vec2 = new Three.Vector3(0, 1, 0);
        let vecColor = 0x003e74;
        createVectorGeometry(vec1, vec2, vecColor);
        // const arrowHelper = new Three.ArrowHelper(
        //   dir,
        //   origin,
        //   this.length,
        //   hex
        // );
        // arrowHelper.name = "first arrow";
        // this.scene.add(arrowHelper);
        // let selectedObject2 = this.scene.getObjectByName("Ollie thick line");
        // this.scene.remove(selectedObject2);
      };

      // Add action line to Vector Geometry
      // Add Label to vectors

      //
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
}

.slider-styling {
  width: 400px;
}

.viz-wrap {
  display: flex;
  justify-content: space-between;
  width: 1000px;
  margin: 0 auto;
  background-color: #ebeeee;
  padding: 1.5rem;
}
</style>
