<template>
  <div class="viz-wrap">
    <div class="viz-controls-wrap">
      <p>
        The moment vector of the force
        <math-jax latex="$$\vec{F}$$"></math-jax> about point A will be equal to
        the cross products of the
        <math-jax latex="$$\vec{r}$$"></math-jax> vector and the force vector
        <math-jax latex="$$\vec{F}$$"></math-jax>. The
        <math-jax latex="$$\vec{r}$$"></math-jax> vector is a vector from point
        A to any point along the line of action of the force.
      </p>
      <h3>Force Vector Angle:</h3>
      <Slider
        v-model="length"
        class="slider-styling"
        :min="-3.14159"
        :max="3.14159"
        :format="formatToRadians"
        :step="-1"
      />
    </div>

    <div id="container"></div>
  </div>
</template>

<script >
import * as Three from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import { GUI } from "three/examples/jsm/libs/dat.gui.module";

// import "../assets/mathjax/es5/tex-chtml.js";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import Slider from "@vueform/slider";
import {
  CSS2DRenderer,
  CSS2DObject,
} from "three/examples/jsm/renderers/CSS2DRenderer.js";

export default {
  name: "ThreeCanvas",

  data() {
    return {
      length: 0,

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
      return `${Math.round(value * (180 / pi))} degrees ${value.toFixed(
        2
      )} Radians`;
    },
    init: function () {
      // Find Container To Mount To
      let container = document.getElementById("container");
      // Create a scene
      this.scene = new Three.Scene();
      let sceneObjects = [];
      // Create a camera and set its position
      this.camera = new Three.PerspectiveCamera(
        70,
        container.clientWidth / container.clientHeight,
        0.01,
        50
      );
      // Position Camera and point it to the origin
      this.camera.position.set(0, 0, 10);
      this.camera.lookAt(this.scene.position);

      // Arrow Helper
      const dir = new Three.Vector3(0, 1, 0);

      //normalize the direction vector (convert to vector of length 1)
      dir.normalize();

      const origin = new Three.Vector3(0, 3, 0);

      const hex = 0x003e74;

      const arrowHelper = new Three.ArrowHelper(dir, origin, this.length, hex);
      arrowHelper.name = "first arrow";
      this.scene.add(arrowHelper);

      this.renderer = new Three.WebGLRenderer({ antialias: true });
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      this.renderer.setClearColor("#FFFFFF");
      this.renderer.setPixelRatio(window.devicePixelRatio);
      // Create orbit controls
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.maxDistance = 15;
      this.controls.minDistance = 1.3;
      this.controls.minAzimuthAngle = 3;
      this.controls.maxAzimuthAngle = 2;
      this.controls.target.set(-3, -3, 0);
      this.controls.enablePan = false;
      this.controls.autoRotate = true;
      this.controls.autoRotateSpeed = 0.1;
      this.controls.update();

      // Label renderer

      this.labelRenderer = new CSS2DRenderer();
      this.labelRenderer.setSize(container.clientWidth, container.clientHeight);
      this.labelRenderer.domElement.style.position = "absolute";
      this.labelRenderer.domElement.style.top = "0px";
      this.labelRenderer.domElement.style.pointerEvents = "none";
      container.appendChild(this.labelRenderer.domElement);

      // Create a grid
      this.gridHelper = new Three.GridHelper(15, 8, 0x444444, 0xd3d3d3);
      this.gridHelper.rotateX((90 * Math.PI) / 180);
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

      const createStillLine = (vecBottom, vecTop, color) => {
        let points2 = [];
        points2.push(vecBottom);
        points2.push(vecTop);
        const lineMaterial = new Three.MeshBasicMaterial({ color: color });
        let tubeGeometry = new Three.TubeGeometry(
          new Three.CatmullRomCurve3(points2),
          512, // path segments
          0.02, // THICKNESS
          30, //Roundness of Tube
          true //closed
        );
        let line = new Three.Line(tubeGeometry, lineMaterial);
        line.name = "r";
        // line.position.set(vecBottom);

        const geometrySphere = new Three.SphereGeometry(0.3, 32, 16);
        const materialSphere = new Three.MeshBasicMaterial({ color: 0x000000 });
        const sphere = new Three.Mesh(geometrySphere, materialSphere);
        sphere.position.set(vecBottom.x, vecBottom.y, 0);
        this.scene.add(sphere);

        this.scene.add(line);
        sceneObjects.push(line.name);

        let newVec2 = new Three.Vector3();
        newVec2.subVectors(vecTop, vecBottom);
        let materialcone = new Three.MeshBasicMaterial({ color: color });
        let conegeometry = new Three.ConeGeometry(0.1, 0.4, 32);
        let cone = new Three.Mesh(conegeometry, materialcone);
        var axis = new Three.Vector3(0, 1, 0);
        cone.quaternion.setFromUnitVectors(axis, newVec2.clone().normalize());

        let rotatedFXTOP =
          Math.cos(this.length) * vecTop.x - Math.sin(this.length) * vecTop.y;
        let rotateFYTOP =
          Math.sin(this.length) * vecTop.x - Math.cos(this.length) * vecTop.y;
        let newTopVector = new Three.Vector3(-rotatedFXTOP, -rotateFYTOP);

        let rotatedFXBOTTOM =
          Math.cos(this.length) * vecBottom.x -
          Math.sin(this.length) * vecBottom.y;
        let rotateFYBOTTOM =
          Math.sin(this.length) * vecBottom.x -
          Math.cos(this.length) * vecBottom.y;
        let newBottomVector = new Three.Vector3(
          -rotatedFXBOTTOM,
          -rotateFYBOTTOM
        );
        let newVecBetweenPoints = new Three.Vector3();
        newVecBetweenPoints.subVectors(newTopVector, newBottomVector);

        cone.position.copy(vecTop);

        // cone.position.set((0, 1, 1));
        cone.name = "arrow head";
        // cone.rotateZ(-this.length);
        this.scene.add(cone);

        sceneObjects.push(cone.name);
      };

      const createMomentVector = (
        vecBottom,
        vecTop,
        color,
        hasLineOfAction
      ) => {
        let points2 = [];
        points2.push(vecBottom);
        points2.push(vecTop);
        const lineMaterial = new Three.MeshBasicMaterial({ color: color });
        let tubeGeometry = new Three.TubeGeometry(
          new Three.CatmullRomCurve3(points2),
          512, // path segments
          0.07, // THICKNESS
          30, //Roundness of Tube
          true //closed
        );
        let line = new Three.Line(tubeGeometry, lineMaterial);
        line.name = "r";
        // line.position.set(vecBottom);

        const geometrySphere = new Three.SphereGeometry(0.1, 32, 16);
        const materialSphere = new Three.MeshBasicMaterial({ color: 0x000000 });
        const sphere = new Three.Mesh(geometrySphere, materialSphere);
        sphere.position.set(vecBottom.x, vecBottom.y, 0);
        this.scene.add(sphere);

        this.scene.add(line);
        sceneObjects.push(line.name);

        if (hasLineOfAction == true) {
          let newVec = new Three.Vector3();
          newVec.subVectors(vecTop, vecBottom);
          let lineofaction = [];
          // let clone = Object.assign({}, newVec);
          let clone2 = Object.assign({}, newVec);
          // let cloneVec = new Three.Vector3(...Object.values(clone));
          let cloneVec2 = new Three.Vector3(...Object.values(clone2));
          // lineofaction.push(cloneVec);
          lineofaction.push(cloneVec2.multiplyScalar(-200));
          lineofaction.push(newVec.multiplyScalar(200));
          const dashedmaterial = new Three.LineDashedMaterial({
            color: 0x000000,
            dashSize: 0.2,
            gapSize: 0.2,
          });
          const linegeometry = new Three.BufferGeometry().setFromPoints(
            lineofaction
          );
          let dashedline = new Three.Line(linegeometry, dashedmaterial);
          dashedline.computeLineDistances();

          dashedline.name = "dashed-line";
          this.scene.add(dashedline);
          sceneObjects.push(dashedline.name);
        }
        let newVec2 = new Three.Vector3();
        newVec2.subVectors(vecTop, vecBottom);
        let materialcone = new Three.MeshBasicMaterial({ color: color });
        let conegeometry = new Three.ConeGeometry(0.2, 0.4, 32);
        let cone = new Three.Mesh(conegeometry, materialcone);
        var axis = new Three.Vector3(0, 1, 0);
        cone.quaternion.setFromUnitVectors(axis, newVec2.clone().normalize());

        let rotatedFXTOP =
          Math.cos(this.length) * vecTop.x - Math.sin(this.length) * vecTop.y;
        let rotateFYTOP =
          Math.sin(this.length) * vecTop.x - Math.cos(this.length) * vecTop.y;
        let newTopVector = new Three.Vector3(rotatedFXTOP, rotateFYTOP);

        let rotatedFXBOTTOM =
          Math.cos(this.length) * vecBottom.x -
          Math.sin(this.length) * vecBottom.y;
        let rotateFYBOTTOM =
          Math.sin(this.length) * vecBottom.x -
          Math.cos(this.length) * vecBottom.y;
        let newBottomVector = new Three.Vector3(
          -rotatedFXBOTTOM,
          -rotateFYBOTTOM
        );
        let newVecBetweenPoints = new Three.Vector3();
        newVecBetweenPoints.subVectors(newBottomVector, newTopVector);

        cone.position.copy(vecTop);

        // cone.position.set((0, 1, 1));
        cone.name = "arrow head";
        // cone.rotateZ(-this.length);
        this.scene.add(cone);

        sceneObjects.push(cone.name);
      };

      const createVectorGeometry = (
        vecBottom,
        vecTop,
        color,
        hasLineOfAction
      ) => {
        let points2 = [];
        points2.push(vecBottom);
        points2.push(vecTop);
        const lineMaterial = new Three.MeshBasicMaterial({ color: color });
        let tubeGeometry = new Three.TubeGeometry(
          new Three.CatmullRomCurve3(points2),
          512, // path segments
          0.05, // THICKNESS
          30, //Roundness of Tube
          true //closed
        );
        let line = new Three.Line(tubeGeometry, lineMaterial);
        line.name = "Ollie thick line";
        // line.position.set(vecBottom);
        line.rotateZ(-this.length);
        this.scene.add(line);
        sceneObjects.push(line.name);

        let text2 = document.createElement("div");
        text2.className = "label";
        text2.style.color = "rgb(0,0,0)";

        text2.textContent = `${Math.round(this.length * (180 / Math.PI))}°`;

        let label2 = new CSS2DObject(text2);
        label2.name = "angle";
        sceneObjects.push(label2.name);

        label2.position.set(0.3, 0.3, 0);

        this.scene.add(label2);

        if (hasLineOfAction == true) {
          let newVec = new Three.Vector3();
          newVec.subVectors(vecTop, vecBottom);
          let lineofaction = [];
          // let clone = Object.assign({}, newVec);
          let clone2 = Object.assign({}, newVec);
          // let cloneVec = new Three.Vector3(...Object.values(clone));
          let cloneVec2 = new Three.Vector3(...Object.values(clone2));
          // lineofaction.push(cloneVec);
          lineofaction.push(cloneVec2.multiplyScalar(-200));
          lineofaction.push(newVec.multiplyScalar(200));
          const dashedmaterial = new Three.LineDashedMaterial({
            color: 0x0acbee,
            dashSize: 0.2,
            gapSize: 0.2,
          });
          const linegeometry = new Three.BufferGeometry().setFromPoints(
            lineofaction
          );
          let dashedline = new Three.Line(linegeometry, dashedmaterial);
          dashedline.computeLineDistances();
          dashedline.rotateZ(-this.length);
          dashedline.name = "dashed-line";
          this.scene.add(dashedline);
          sceneObjects.push(dashedline.name);
        }
        let newVec2 = new Three.Vector3();
        newVec2.subVectors(vecTop, vecBottom);
        let materialcone = new Three.MeshBasicMaterial({ color: color });
        let conegeometry = new Three.ConeGeometry(0.2, 0.4, 32);
        let cone = new Three.Mesh(conegeometry, materialcone);
        var axis = new Three.Vector3(0, 1, 0);
        cone.quaternion.setFromUnitVectors(axis, newVec2.clone().normalize());

        let rotatedFXTOP =
          Math.cos(this.length) * vecTop.x - Math.sin(this.length) * vecTop.y;
        let rotateFYTOP =
          Math.sin(this.length) * vecTop.x - Math.cos(this.length) * vecTop.y;
        let newTopVector = new Three.Vector3(-rotatedFXTOP, -rotateFYTOP);

        let rotatedFXBOTTOM =
          Math.cos(this.length) * vecBottom.x -
          Math.sin(this.length) * vecBottom.y;
        let rotateFYBOTTOM =
          Math.sin(this.length) * vecBottom.x -
          Math.cos(this.length) * vecBottom.y;
        let newBottomVector = new Three.Vector3(
          -rotatedFXBOTTOM,
          -rotateFYBOTTOM
        );
        let newVecBetweenPoints = new Three.Vector3();
        newVecBetweenPoints.subVectors(newTopVector, newBottomVector);
        cone.quaternion.setFromUnitVectors(
          axis,
          newVecBetweenPoints.clone().normalize()
        );
        cone.position.copy(newTopVector);

        // cone.position.set((0, 1, 1));
        cone.name = "arrow head";
        // cone.rotateZ(-this.length);
        this.scene.add(cone);

        sceneObjects.push(cone.name);
      };

      const loadSVG = () => {
        // instantiate a loader
        const loader = new SVGLoader();

        // load a SVG resource
        let self = this;
        loader.load(
          // resource URL
          "./arrows.svg",
          // called when the resource is loaded
          function (data) {
            const paths = data.paths;
            const group = new Three.Group();
            group.scale.multiplyScalar(0.01);

            for (let i = 0; i < paths.length; i++) {
              const path = paths[i];

              const material = new Three.MeshBasicMaterial({
                color: 0xff064a,
                side: Three.DoubleSide,
                depthWrite: false,
              });

              const shapes = SVGLoader.createShapes(path);

              for (let j = 0; j < shapes.length; j++) {
                const shape = shapes[j];
                const geometry = new Three.ShapeGeometry(shape);
                const mesh = new Three.Mesh(geometry, material);

                group.add(mesh);
              }
            }
            group.position.set(-5, -5, 0.1);

            self.scene.add(group);
          },
          // called when loading is in progresses
          function (xhr) {
            console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
          },
          // called when loading has errors
          function (error) {
            console.log("An error happened");
            console.log(error);
          }
        );
      };
      loadSVG();

      const createAngleArcGeometry = () => {
        const geometryTorus = new Three.TorusGeometry(
          1,
          0.03,
          16,
          100,
          this.length
        );
        const materialTorus = new Three.MeshBasicMaterial({ color: 0x0acbee });
        const torus = new Three.Mesh(geometryTorus, materialTorus);

        torus.rotateZ((-90 * Math.PI) / 180);
        torus.rotateY(Math.PI);
        torus.name = "angle torus";
        sceneObjects.push(torus.name);
        this.scene.add(torus);
      };
      createAngleArcGeometry();
      // Draw Force Vector
      let vec1 = new Three.Vector3(0, this.length, 0);
      let vec2 = new Three.Vector3(0, 0, 0);
      let vecColor = 0x0acbee;
      let createAction = true;
      createVectorGeometry(vec1, vec2, vecColor, false);

      this.updateSlider = () => {
        let selectedObject = this.scene.getObjectByName("first arrow");
        this.scene.remove(selectedObject);

        removeObjectFromScene(sceneObjects);
        sceneObjects = [];
        let vec1 = new Three.Vector3(0, 1, 0);
        let vec2 = new Three.Vector3(0, 3, 0);
        let vecColor = 0x0acbee;
        createVectorGeometry(vec1, vec2, vecColor, createAction);
        createStillLine(
          new Three.Vector3(-3, -3, 0),
          new Three.Vector3(-0.15, -0.15, 0),
          0x000000,
          false
        );
        createAngleArcGeometry();

        createMomentVector(
          new Three.Vector3(-3, -3, 0),
          new Three.Vector3(-3, -3, -2 * (this.length - (45 * Math.PI) / 180)),
          0xff064a,
          false
        );
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
      this.labelRenderer.render(this.scene, this.camera);
    },
    onWindowResize: function () {
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.labelRenderer.setSize(window.innerWidth, window.innerHeight);
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
  position: relative;
  flex: 1;
}

.viz-controls-wrap {
  flex: 1;
  padding-right: 1.5rem;
}
.slider-styling {
  width: 400px;
  margin-top: 4rem;

  --slider-tooltip-bg: #003e74;
  --slider-connect-bg: #10b981;
}

.viz-wrap {
  display: flex;
  justify-content: space-between;
  width: 900px;
  height: 500px;
  margin: 0 auto;
  background-color: #ebeeee;
  padding: 1.5rem;
}
</style>
