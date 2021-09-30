<template>
  <div class="viz-wrap">
    <div class="viz-controls-wrap">
      <p>
        The moment vector of the force
        <math-jax latex="$$\vec{F}$$"></math-jax> about point P will be equal to
        the cross products of the
        <math-jax latex="$$\vec{r}$$"></math-jax> vector and the force vector
        <math-jax latex="$$\vec{F}$$"></math-jax>. The
        <math-jax latex="$$\vec{r}$$"></math-jax> vector is a vector from point
        P to any point along the line of action of the force.
      </p>
      <h3>
        Angle of <math-jax latex="$$\vec{F}$$"></math-jax> and Line of Action:
      </h3>
      <Slider
        v-model="length"
        class="slider-styling"
        :min="-Math.PI"
        :max="Math.PI"
        :format="formatToRadians"
        :step="-1"
      />
    </div>

    <div id="container"></div>
  </div>
</template>

<script >
import * as Three from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
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
      this.camera = new Three.PerspectiveCamera(70, 2, 0.01, 50);
      // Position Camera and point it to the origin
      this.camera.position.set(-2, -1, 10);
      // this.camera.lookAt(this.scene.position);

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
      // this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      // this.controls.maxDistance = 15;
      // this.controls.minDistance = 1.3;
      // this.controls.minAzimuthAngle = 3;
      // this.controls.maxAzimuthAngle = 2;
      // this.controls.target.set(-3, -3, 0);
      // this.controls.enablePan = false;
      // this.controls.autoRotate = true;
      // this.controls.autoRotateSpeed = 0.1;
      // this.controls.update();

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
      container.appendChild(this.renderer.domElement);

      // obj - your object (THREE.Object3D or derived)
      // point - the point of rotation (THREE.Vector3)
      // axis - the axis of rotation (normalized THREE.Vector3)
      // theta - radian value of rotation
      // pointIsWorld - boolean indicating the point is in world coordinates (default = false)
      const rotateAboutPoint = (obj, point, axis, theta, pointIsWorld) => {
        pointIsWorld = pointIsWorld === undefined ? false : pointIsWorld;

        if (pointIsWorld) {
          obj.parent.localToWorld(obj.position); // compensate for world coordinate
        }

        obj.position.sub(point); // remove the offset
        obj.position.applyAxisAngle(axis, theta); // rotate the POSITION
        obj.position.add(point); // re-add the offset

        if (pointIsWorld) {
          obj.parent.worldToLocal(obj.position); // undo world coordinates compensation
        }

        obj.rotateOnAxis(axis, theta); // rotate the OBJECT
      };

      const resizeCanvasToDisplaySize = () => {
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
      };
      const resizeObserver = new ResizeObserver(resizeCanvasToDisplaySize);
      resizeObserver.observe(this.renderer.domElement, { box: "content-box" });

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

        let text3 = document.createElement("div");
        text3.className = "label";
        text3.style.color = "rgb(0,0,0)";
        text3.style.backgroundColor = `#ffffff`;
        text3.style.padding = `4px 3px 4px 3px`;

        text3.textContent = `r`;

        let label3 = new CSS2DObject(text3);
        label3.name = "angle2";
        sceneObjects.push(label3.name);

        label3.position.set(-1, -0.7, 0);

        this.scene.add(label3);
      };
      let text8 = document.createElement("div");
      text8.className = "label";
      text8.style.color = "rgb(0,0,0)";
      // text8.style.backgroundColor = `#ffffff`;
      text8.style.padding = `.5px 1px 2px 3px`;

      text8.textContent = `P`;

      let label8 = new CSS2DObject(text8);
      label8.name = "P";
      sceneObjects.push(label8.name);

      label8.position.set(-2.8, -2.5, 0);

      this.scene.add(label8);
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

        let text5 = document.createElement("div");
        text5.className = "label";
        text5.style.color = "rgb(0,0,0)";

        text5.textContent = `M`;
        text5.style.backgroundColor = `#ffffff`;
        text5.style.borderRadius = "25%";
        text5.style.padding = `2px 2px 2px 2px`;
        text5.fontWeight = `bold`;
        text5.style.boxShadow = `1px 2px 3px rgba(0,0,0,.5)`;

        let label5 = new CSS2DObject(text5);
        label5.name = "M";
        sceneObjects.push(label5.name);

        label5.position.set(vecTop.x, vecTop.y + 1, vecTop.z);
        this.scene.add(label5);
      };

      let fVector;
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
        fVector = newVecBetweenPoints;
        cone.quaternion.setFromUnitVectors(
          axis,
          newVecBetweenPoints.clone().normalize()
        );
        cone.position.copy(newTopVector);

        newVecBetweenPoints.multiplyScalar(0.5);

        let text4 = document.createElement("div");
        text4.className = "label";
        text4.style.color = "rgb(0,0,0)";

        text4.textContent = `F`;
        text4.style.backgroundColor = `#ffffff`;
        text4.style.padding = `3px 2px 3px 2px`;
        text4.fontWeight = `bold`;

        let label4 = new CSS2DObject(text4);
        label4.name = "F";
        sceneObjects.push(label4.name);

        let newPosition = newBottomVector.add(newTopVector).divideScalar(2);

        label4.position.set(newPosition.x, newPosition.y, newPosition.z);
        this.scene.add(label4);

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
          "./rotatearrow.svg",
          // called when the resource is loaded
          function (data) {
            const paths = data.paths;
            const group = new Three.Group();
            group.scale.multiplyScalar(0.008);

            for (let i = 0; i < paths.length; i++) {
              const path = paths[i];

              const material = new Three.MeshBasicMaterial({
                color: 0x808080,
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

            group.position.set(-5, -4, 0.1);
            group.name = "arrowss";
            // group.rotateX(3.14159);

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

        let text2 = document.createElement("div");
        text2.className = "label";
        text2.style.color = "rgb(0,0,0)";
        text2.textContent = `${Math.round(this.length * (180 / Math.PI))}°`;
        let label2 = new CSS2DObject(text2);
        label2.name = "angle";
        sceneObjects.push(label2.name);
        label2.position.set(0.3, 0.3, 0);
        this.scene.add(label2);
      };
      createAngleArcGeometry();
      // Draw Force Vector
      let vec1 = new Three.Vector3(0, this.length, 0);
      let vec2 = new Three.Vector3(0, 0, 0);
      let vecColor = 0x0acbee;
      let createAction = true;
      createVectorGeometry(vec1, vec2, vecColor, false);

      let oldValue = -1;
      // let finishedSpin = false;
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
          new Three.Vector3(-3, -2, 0),
          new Three.Vector3(-0.15, -0.15, 0),
          0x000000,
          false
        );
        createAngleArcGeometry();

        let rVec = new Three.Vector3(3, 2, 0);
        let momentVec = rVec.cross(fVector);

        if (
          (oldValue >= 0 && momentVec.z <= 0) ||
          (oldValue <= 0 && momentVec.z >= 0)
        ) {
          let arrowsSVG = this.scene.getObjectByName("arrowss");
          // point - the point of rotation (THREE.Vector3)
          let rotateSVGaxis = new Three.Vector3(-3, -2, 0);
          // axis - the axis of rotation (normalized THREE.Vector3)
          let svgAxis = new Three.Vector3(0, 1, 0).normalize();
          // theta - radian value of rotation
          let theta = Math.PI;
          // pointIsWorld - boolean indicating the point is in world coordinates (default = false)
          let pointIsWorld = true;

          rotateAboutPoint(
            arrowsSVG,
            rotateSVGaxis,
            svgAxis,
            theta,
            pointIsWorld
          );
        }
        // obj - your object (THREE.Object3D or derived)
        oldValue = momentVec.z;

        createMomentVector(
          new Three.Vector3(-3, -2, 0),
          new Three.Vector3(-3, -2, 2 * momentVec.z),
          0xff064a,
          false
        );
        // let selectArrows = this.scene.getObjectByName("arrowss");
        // console.log(momentVec.z);
        // if (momentVec.z > 0 && !finishedSpin) {
        //   finishedSpin = true;
        // } else if (momentVec.z < 0 && finishedSpin) {
        //   selectArrows.rotateY(3.14159);
        //   selectedObject.position.set = (2, 2, 2);
        //   finishedSpin = false;
        // }

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
    // onWindowResize: function () {
    //   this.renderer.setSize(window.innerWidth, window.innerHeight);
    //   this.camera.aspect = window.innerWidth / window.innerHeight;
    //   this.labelRenderer.setSize(window.innerWidth, window.innerHeight);
    //   this.camera.updateProjectionMatrix();
    // },
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
  width: 500px;
  height: 500px;
}

.viz-controls-wrap {
  flex: 1;
  padding-right: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.slider-styling {
  width: 200px;
  margin-top: 4rem;

  --slider-tooltip-bg: #0acbee;
  --slider-connect-bg: #0acbee;
  --slider-tooltip-color: rgb(0, 0, 0);
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
