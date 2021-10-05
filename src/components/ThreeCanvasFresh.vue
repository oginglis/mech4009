<template>
  <Slider
    v-model="clipping"
    class="slider-styling"
    :min="-1"
    :max="1"
    :step="0.1"
  />
  <div id="container"></div>
</template>

<script >
import * as Three from "three";
import Slider from "@vueform/slider";
import { CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
export default {
  name: "ThreeFresh",

  data() {
    return {
      clipping: 0,

      formula: "$$x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}.$$",
    };
  },
  components: {
    Slider,
  },

  methods: {
    createASlider: function (name) {
      name;
    },
    formatToRadians: function (value) {
      let pi = Math.PI;

      return `${Math.round((value + 2.158638) * (180 / pi))} degrees ${(
        value + 2.158638
      ).toFixed(2)} Radians`;
    },
    rotateAboutPoint: function (obj, point, axis, theta, pointIsWorld) {
      // obj - your object (THREE.Object3D or derived)
      // point - the point of rotation (THREE.Vector3)
      // axis - the axis of rotation (normalized THREE.Vector3)
      // theta - radian value of rotation
      // pointIsWorld - boolean indicating the point is in world coordinates (default = false)
      if (obj) {
        if (pointIsWorld) {
          obj.parent.localToWorld(obj.position); // compensate for world coordinate
        }
        obj.position.sub(point); // remove the offset
        obj.position.applyAxisAngle(axis, theta); // rotate the POSITION
        obj.position.add(point); // re-add the offset
        if (pointIsWorld) {
          obj.parent.worldToLocal(obj.position); // undo world coordinates compensation
        }
        obj.rotateOnAxis(axis, theta);
      }
    },
    resizeCanvasToDisplaySize: function () {
      const canvas = this.renderer.domElement;
      // look up the size the canvas is being displayed
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      // you must pass false here or three.js sadly fights the browser
      this.renderer.setSize(width, height, false);
      this.camera.aspect = width / height;
      this.labelRenderer.render(this.scene, this.camera, false);
      this.camera.updateProjectionMatrix();
      // update any render target sizes here
    },
    init: function () {
      // Find Container To Mount To
      let container = document.getElementById("container");

      // Create a scene
      this.scene = new Three.Scene();
      // Create a camera and set its position
      this.camera = new Three.PerspectiveCamera(70, 2, 0.01, 50);
      this.camera.position.set(0, 0, 10);
      // Position Camera and point it to the origin
      this.renderer = new Three.WebGLRenderer({ antialias: true });
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      this.renderer.setClearColor("#FFFFFF");
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.localClippingEnabled = true;
      container.appendChild(this.renderer.domElement);
      // this.renderer.sortObjects = true;
      this.labelRenderer = new CSS2DRenderer();
      this.labelRenderer.setSize(450, 400);
      this.labelRenderer.domElement.style.position = "absolute";
      this.labelRenderer.domElement.style.top = "0px";
      this.labelRenderer.domElement.style.left = "0px";
      this.labelRenderer.domElement.style.pointerEvents = "none";
      container.appendChild(this.labelRenderer.domElement);
      // Create a grid
      this.gridHelper = new Three.GridHelper(10, 10, 0x444444, 0xd3d3d3);
      this.gridHelper.rotateX((90 * Math.PI) / 180);
      this.gridHelper.position.set(-3, -2, 0);
      this.scene.add(this.gridHelper);
      // Create an axis helper
      const resizeObserver = new ResizeObserver(this.resizeCanvasToDisplaySize);
      resizeObserver.observe(this.renderer.domElement, { box: "content-box" });
      // ***** Clipping planes: *****

      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.maxDistance = 20;
      this.controls.minDistance = 1.3;
      this.controls.minAzimuthAngle = 3;
      this.controls.maxAzimuthAngle = 2;
      this.controls.target.set(0, 0, 0);
      this.controls.enablePan = false;
      this.controls.autoRotate = true;
      this.controls.autoRotateSpeed = 0.1;
      this.controls.update();

      this.localPlane = new Three.Plane(new Three.Vector3(0, -1, 0), -2);

      const geometry = new Three.CylinderGeometry(0.5, 0.5, 8, 32);
      const material = new Three.MeshBasicMaterial({
        color: 0x0000ff,
      });

      const cylinder = new Three.Mesh(geometry, material);
      cylinder.rotateX(1.5708);
      this.scene.add(cylinder);

      var geo = new Three.EdgesGeometry(cylinder.geometry); // or WireframeGeometry
      var mat = new Three.LineBasicMaterial({ color: 0xffffff });
      var wireframe = new Three.LineSegments(geo, mat);
      cylinder.add(wireframe);

      this.updateCylinder = () => {
        cylinder.translateY(1);
        cylinder.scale.set(1, this.clipping, 1);
        cylinder.translateY(-1);
      };
    },
    animate: function () {
      requestAnimationFrame(this.animate);
      this.updateCylinder();
      this.renderer.render(this.scene, this.camera);
      this.localPlane.translate(new Three.Vector3(0, this.clipping, 0));
      this.camera.aspect = 450 / 400;
      this.camera.updateProjectionMatrix();
      this.renderer.render(this.scene, this.camera);
      this.labelRenderer.render(this.scene, this.camera);
      this.controls.update();
    },
  },
  created() {},
  mounted() {
    this.init();
    this.animate();
  },
};
</script>

<style src="@vueform/slider/themes/default.css">
</style>
<style scoped  >
* {
  box-sizing: border-box;
  -moz-box-sizing: border-box;
}

body {
  background-color: #fff;
  color: #444;
}

a {
  color: #08f;
}

#content {
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 1;
  padding: 3em 0 0 0;
}

#c {
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
}

.list-item {
  display: inline-block;
  margin: 1em;
  padding: 1em;
  box-shadow: 1px 2px 4px 0px rgba(0, 0, 0, 0.25);
}

.list-item > div:nth-child(1) {
  width: 200px;
  height: 200px;
}

.list-item > div:nth-child(2) {
  color: #888;
  font-family: sans-serif;
  font-size: large;
  width: 200px;
  margin-top: 0.5em;
}
</style>
