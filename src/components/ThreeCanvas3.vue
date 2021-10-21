<template>
  <iframe
    src="https://tulip781.github.io/ic-engine/#/"
    style="border: 0px #ffffff none"
    name="myiFrame"
    scrolling="no"
    frameborder="1"
    marginheight="0px"
    marginwidth="0px"
    height="400px"
    width="600px"
    allowfullscreen
  ></iframe>
  <div class="viz-wrap">
    <div class="viz-controls-wrap">
      <p class="intro_title__width">
        The moment vector TEST
        <img src="@/assets/mVector.svg" alt="M Vector" /> of the force
        <img src="@/assets/fVector.svg" alt="F Vector" /> about point P will be
        equal to the cross products of the
        <img src="@/assets/rVector.svg" alt="r Vector" /> vector and the force
        vector <img src="@/assets/fVector.svg" alt="F Vector" />. The
        <img src="@/assets/rVector.svg" alt="r Vector" /> vector is a vector
        from point P to any point along the line of action of the force.
      </p>
      <img
        src="@/assets/equation.svg"
        width="230"
        alt="M Vector = r Vector cross F Vector"
      />
      <h3>
        Angle between <img src="@/assets/rVector.svg " alt="r Vector" /> and
        Line of Action:
      </h3>
      <Slider
        v-model="length"
        class="slider-styling"
        :min="-Math.PI"
        :max="Math.PI + 0.5"
        :format="formatToRadians"
        :step="0.5"
      />
    </div>

    <div id="container"></div>
    <img
      src="@/assets/rhr.png"
      class="newimages"
      width="200px"
      alt="image of Right Hand Rule"
    />
    <figcaption>
      The result of <img src="@/assets/rVector.svg" alt="r Vector" /> cross
      <img src="@/assets/fVector.svg" alt="F Vector" /> will give us the moment
      vector <img src="@/assets/mVector.svg" alt="M Vector" />. We can use the
      right hand rule to determine the direction of rotation from the moment
      (line our right thumb up with the moment vector
      <img src="@/assets/mVector.svg" alt="M Vector" />
      and our curled fingers will point in the direction of rotation from the
      moment).
    </figcaption>
    <p class="disclaimer">
      Words from
      http://mechanicsmap.psu.edu/websites/3_equilibrium_rigid_body/3-4_moment_vector/momentvector.html
      <br />
      Image from https://en.wikipedia.org/wiki/Right-hand_rule
    </p>
  </div>
</template>

<script >
import * as Three from "three";

import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import Slider from "@vueform/slider";
import {
  CSS2DRenderer,
  CSS2DObject,
} from "three/examples/jsm/renderers/CSS2DRenderer.js";

export default {
  name: "ThreeCanvas3",

  data() {
    return {
      length: -0.4,

      formula: "$$x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}.$$",
    };
  },
  inject: ["mq"],
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
    init: function () {
      // Find Container To Mount To
      let container = document.getElementById("container");
      this.width = container.clientWidth;
      this.height = container.clientHeight;
      // Create a scene
      this.scene = new Three.Scene();
      this.scene2 = new Three.Scene();
      let sceneObjects = [];
      let sceneObjects2 = [];
      // Create a camera and set its position
      this.camera = new Three.PerspectiveCamera(70, 2, 0.01, 50);
      this.camera2 = new Three.PerspectiveCamera(70, 2, 0.01, 50);
      // Position Camera and point it to the origin
      this.camera.position.set(-2, -2, 10);
      this.camera2.position.set(4, 5, 8);
      this.camera2.lookAt(-2, -1.5, 0);
      // this.camera2.rotateY(0.8);
      // this.camera.lookAt(this.scene.position);
      this.ollieViewports = [
        { view: 1, x: 0, y: 0, width: this.width / 2, height: this.height / 2 },
        {
          view: 2,
          x: this.width / 2,
          y: 0,
          width: this.width / 2,
          height: this.height / 2,
        },
      ];

      // Arrow Helper
      const dir = new Three.Vector3(0, 1, 0);

      //normalize the direction vector (convert to vector of length 1)
      dir.normalize();

      const origin = new Three.Vector3(0, 3, 0);

      const hex = 0x003e74;

      const arrowHelper = new Three.ArrowHelper(dir, origin, this.length, hex);
      arrowHelper.name = "first arrow";
      this.scene.add(arrowHelper);

      this.renderer = new Three.WebGLRenderer();
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      this.renderer.setClearColor("#FFFFFF");
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.sortObjects = true;

      this.labelRenderer = new CSS2DRenderer();
      this.labelRenderer.setSize(this.width / 2, this.height);
      this.labelRenderer.domElement.style.position = "absolute";
      this.labelRenderer.domElement.style.bottom = "0px";
      this.labelRenderer.domElement.style.left = "0px";
      this.labelRenderer.domElement.style.pointerEvents = "none";
      container.appendChild(this.labelRenderer.domElement);

      this.labelRenderer2 = new CSS2DRenderer();
      this.labelRenderer2.setSize(this.width / 2, this.height);
      this.labelRenderer2.domElement.style.position = "absolute";
      this.labelRenderer2.domElement.style.bottom = "0px";
      this.labelRenderer2.domElement.style.left = `${this.width / 2}px`;
      this.labelRenderer2.domElement.style.pointerEvents = "none";
      container.appendChild(this.labelRenderer2.domElement);

      // Create a grid
      this.gridHelper = new Three.GridHelper(10, 10, 0x444444, 0xd3d3d3);
      this.gridHelper.rotateX((90 * Math.PI) / 180);
      this.gridHelper.position.set(-3, -2, 0);
      this.scene.add(this.gridHelper);
      // Create an axis helper
      this.axesHelper = new Three.AxesHelper(1);
      container.appendChild(this.renderer.domElement);

      const rotateAboutPoint = (obj, point, axis, theta) => {
        if (obj) {
          obj.position.sub(point); // remove the offset
          obj.position.applyAxisAngle(axis, theta); // rotate the POSITION
          obj.position.add(point); // re-add the offset

          obj.rotateOnAxis(axis, theta);
        }
      };

      const createText = (
        content,
        name,
        color,
        bgcolor,
        x,
        y,
        z,
        sceneList,
        scene
      ) => {
        let newText3 = document.createElement("div");
        newText3.className = "label";

        newText3.style.padding = `0px 2px 0px 2px`;
        newText3.style.fontWeight = "700";
        newText3.style.color = color;
        newText3.style.fontStyle = "italic";
        newText3.style.backgroundColor = bgcolor;
        newText3.style.fontFamily = "Times New Roman";
        newText3.textContent = content;
        let label3 = new CSS2DObject(newText3);
        label3.name = name;
        sceneList.push(label3.name);
        label3.position.set(x, y, z);
        scene.add(label3);
      };

      const resizeCanvasToDisplaySize = () => {
        this.width = container.clientWidth;
        this.height = container.clientHeight;
        // console.log("width", this.width, "height", this.height);
        this.labelRenderer.setSize(this.width / 2, this.height);
        this.labelRenderer2.setSize(this.width / 2, this.height);
        this.labelRenderer2.domElement.style.left = `${this.width / 2}px`;
        this.ollieViewports = [
          {
            view: 1,
            x: 0,
            y: 0,
            width: this.width / 2,
            height: this.height,
          },
          {
            view: 2,
            x: this.width / 2,
            y: 0,
            width: this.width / 2,
            height: this.height,
          },
        ];

        this.renderer.setSize(this.width, this.height);
        this.camera.aspect = this.width / 2 / this.height;
        this.camera2.aspect = this.width / 2 / this.height;
        this.labelRenderer.render(this.scene, this.camera, false);
        this.labelRenderer.render(this.scene2, this.camera2, false);
        this.camera.updateProjectionMatrix();
        this.camera2.updateProjectionMatrix();
      };

      resizeCanvasToDisplaySize();
      // const resizeObserver = new ResizeObserver(resizeCanvasToDisplaySize);
      // resizeObserver.observe(container, { box: "content-box" });

      const removeObjectFromScene = (objectName) => {
        objectName.forEach((object) => {
          let selectedObject = this.scene.getObjectByName(object);
          this.scene.remove(selectedObject);
        });
      };
      const removeObjectFromScene2 = (objectName) => {
        objectName.forEach((object) => {
          let selectedObject = this.scene2.getObjectByName(object);
          this.scene2.remove(selectedObject);
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
        line.renderOrder = 1005;
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

        createText(
          `r`,
          "angle2",
          "#85CB33",
          `rgba(255, 255, 255, 0.9)`,
          -1.2,
          -0.8,
          0,
          sceneObjects,
          this.scene
        );

        createText(
          `r`,
          "angle2",
          "#85CB33",
          `rgba(255, 255, 255, 0.9)`,
          -1.2,
          -0.8,
          0,
          sceneObjects2,
          this.scene2
        );
      };
      createText(
        `P`,
        "P",
        "rgb(0,0,0)",
        `rgba(255, 255, 255, 0)`,
        -2.7,
        -2.5,
        0,
        sceneObjects,
        this.scene
      );

      createText(
        `P`,
        "P",
        "rgb(0,0,0)",
        `rgba(255, 255, 255, 0)`,
        -2.7,
        -2.5,
        0,
        sceneObjects2,
        this.scene2
      );

      createText(
        `y`,
        "y",
        " #d3d3d3",
        `rgba(255, 255, 255, 0)`,
        -3,
        3.5,
        0,
        sceneObjects,
        this.scene
      );

      createText(
        `y`,
        "2y",
        " #d3d3d3",
        `rgba(255, 255, 255, 0)`,
        -3,
        3.5,
        0,
        sceneObjects2,
        this.scene2
      );

      createText(
        `x`,
        "xy",
        " #d3d3d3",
        `rgba(255, 255, 255, 0)`,
        2.3,
        -1.9,
        0,
        sceneObjects,
        this.scene
      );

      createText(
        `x`,
        "x2y",
        " #d3d3d3",
        `rgba(255, 255, 255, 0)`,
        2.3,
        -1.9,
        0,
        sceneObjects2,
        this.scene2
      );

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

        createText(
          "M",
          "m",
          "hsl(344, 100%, 51%)",
          `rgba(255, 255, 255, 0.9)`,
          vecTop.x,
          vecTop.y + 1,
          vecTop.z,
          sceneObjects,
          this.scene
        );

        createText(
          "M",
          "m",
          "hsl(344, 100%, 51%)",
          `rgba(255, 255, 255, 0.9)`,
          vecTop.x,
          vecTop.y + 1,
          vecTop.z,
          sceneObjects2,
          this.scene2
        );
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
        line.renderOrder = 1000;
        line.name = "thick line";
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
          dashedline.renderOrder = 1001;
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
        let newPosition = newBottomVector.add(newTopVector).divideScalar(2);
        createText(
          "F",
          "F",
          "hsl(189, 92%, 49%)",
          `rgba(255, 255, 255, 0.9)`,
          newPosition.x,
          newPosition.y,
          newPosition.z,
          sceneObjects,
          this.scene
        );

        createText(
          "F",
          "F",
          "hsl(189, 92%, 49%)",
          `rgba(255, 255, 255, 0.9)`,
          newPosition.x,
          newPosition.y,
          newPosition.z,
          sceneObjects2,
          this.scene2
        );

        cone.name = "arrow head";
        // cone.rotateZ(-this.length);
        cone.renderOrder = 1002;
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
                color: 0xff0548,
                side: Three.DoubleSide,
                depthWrite: false,
              });

              const shapes = SVGLoader.createShapes(path);

              for (let j = 0; j < shapes.length; j++) {
                const shape = shapes[j];
                const geometry = new Three.ShapeGeometry(shape);

                const mesh = new Three.Mesh(geometry, material);
                mesh.renderOrder = 999;
                group.add(mesh);
              }
            }

            group.position.set(-5, -4, 0.1);
            group.name = "arrowss";
            // group.rotateX(3.14159)
            // group.translate(1, 1, 0);

            self.scene.add(group);

            // point - the point of rotation (THREE.Vector3)
            let rotateSVGaxis = new Three.Vector3(-3, -2, 0);
            // axis - the axis of rotation (normalized THREE.Vector3)
            let svgAxis = new Three.Vector3(0, 1, 0).normalize();
            // theta - radian value of rotation
            let theta = Math.PI;
            // pointIsWorld - boolean indicating the point is in world coordinates (default = false)
            let pointIsWorld = true;

            rotateAboutPoint(
              group,
              rotateSVGaxis,
              svgAxis,
              theta,
              pointIsWorld
            );
          },

          // called when loading is in progresses
          function () {},
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
          this.length + 2.18166
        );
        const materialTorus = new Three.MeshBasicMaterial({ color: 0x0acbee });
        const torus = new Three.Mesh(geometryTorus, materialTorus);

        torus.rotateZ(0.610865);
        torus.rotateY(Math.PI);
        torus.name = "angle torus";
        sceneObjects.push(torus.name);
        this.scene.add(torus);

        let positionObject = {};
        if (((this.length + 2.158638) * 180) / Math.PI > 0) {
          // label2.position.set(0.3, 0.3, 0);
          positionObject = { x: 0.3, y: 0.3, z: 0 };
        } else {
          // label2.position.set(0.3, -0.5, 0);
          positionObject = { x: 0.3, y: -0.5, z: 0 };
        }
        createText(
          `${Math.round(((this.length + 2.158638) * 180) / Math.PI)}°`,
          "angle",
          "rgb(0,0,0)",
          `rgba(255, 255, 255, 0.9)`,
          positionObject.x,
          positionObject.y,
          positionObject.z,
          sceneObjects,
          this.scene
        );
        createText(
          `${Math.round(((this.length + 2.158638) * 180) / Math.PI)}°`,
          "angle",
          "rgb(0,0,0)",
          `rgba(255, 255, 255, 0.9)`,
          positionObject.x,
          positionObject.y,
          positionObject.z,
          sceneObjects2,
          this.scene2
        );
      };

      createAngleArcGeometry();
      let vec11 = new Three.Vector3(0, 1, 0);
      let vec22 = new Three.Vector3(0, 3, 0);
      let vecColor3 = 0x0acbee;
      createVectorGeometry(vec11, vec22, vecColor3, true);
      let createAction = true;
      let oldValue = -1;
      let oldSlider = this.length;
      let rVec2 = new Three.Vector3(3, 2, 0);
      let momentVec2 = rVec2.cross(fVector);
      createMomentVector(
        new Three.Vector3(-3, -2, 0),
        new Three.Vector3(-3, -2, 1.8 * momentVec2.z),
        0xff064a,
        false
      );
      createStillLine(
        new Three.Vector3(-3, -2, 0),
        new Three.Vector3(-0.15, -0.15, 0),
        0x85cb33,
        false
      );
      this.updateSceneLoop = () => {
        if (oldSlider !== this.length) {
          removeObjectFromScene(sceneObjects);
          removeObjectFromScene2(sceneObjects2);
          sceneObjects = [];
          sceneObjects2 = [];
          let vec1 = new Three.Vector3(0, 1, 0);
          let vec2 = new Three.Vector3(0, 3, 0);
          let vecColor = 0x0acbee;
          createVectorGeometry(vec1, vec2, vecColor, createAction);
          createStillLine(
            new Three.Vector3(-3, -2, 0),
            new Three.Vector3(-0.15, -0.15, 0),
            0x85cb33,
            false
          );
        }
        let rVec = new Three.Vector3(3, 2, 0);
        let momentVec = rVec.cross(fVector);

        if (oldSlider !== this.length) {
          createAngleArcGeometry();
        }
        if (oldSlider !== this.length) {
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

            // rotateAboutPoint(
            //   arrowsSVG,
            //   rotateSVGaxis,
            //   new Three.Vector3(0, 0, 1).normalize(),
            //   -theta,
            //   pointIsWorld
            // );
          }
        }
        oldValue = momentVec.z;
        if (oldSlider !== this.length) {
          createMomentVector(
            new Three.Vector3(-3, -2, 0),
            new Three.Vector3(-3, -2, 1.8 * momentVec.z),
            0xff064a,
            false
          );
        }
        oldSlider = this.length;
      };
      this.renderCamera = (
        firstView,
        scene,
        camera,
        renderer,
        labelRenderer
      ) => {
        renderer.setScissorTest(true);
        renderer.setViewport(
          firstView.x,
          firstView.y,
          firstView.width,
          firstView.height
        );
        renderer.setScissor(
          firstView.x,
          firstView.y,
          firstView.width,
          firstView.height
        );

        camera.aspect = firstView.width / firstView.height;
        camera.updateProjectionMatrix();
        renderer.render(scene, camera);
        labelRenderer.render(scene, camera);
      };
    },
    animate: function () {
      requestAnimationFrame(this.animate);
      this.updateSceneLoop();
      this.renderCamera(
        this.ollieViewports[0],
        this.scene,
        this.camera,
        this.renderer,
        this.labelRenderer
      );
      this.renderCamera(
        this.ollieViewports[1],
        this.scene,
        this.camera2,
        this.renderer,
        this.labelRenderer2
      );
      // this.renderer.setScissorTest(true);
      // let firstView = this.ollieViewports[0];
      // this.renderer.setViewport(
      //   firstView.x,
      //   firstView.y,
      //   firstView.width,
      //   firstView.height
      // );
      // this.renderer.setScissor(
      //   firstView.x,
      //   firstView.y,
      //   firstView.width,
      //   firstView.height
      // );
      // this.renderer.render(this.scene, this.camera);
      // this.camera.aspect = firstView.width / firstView.height;
      // this.camera.updateProjectionMatrix();
      // this.renderer.render(this.scene, this.camera);
      // this.labelRenderer.render(this.scene, this.camera);
      // // this.renderer.setScissorTest(true);
      // let secondView = this.ollieViewports[1];
      // this.renderer.setViewport(
      //   secondView.x,
      //   secondView.y,
      //   secondView.width,
      //   secondView.height
      // );
      // this.renderer.setScissor(
      //   secondView.x,
      //   secondView.y,
      //   secondView.width,
      //   secondView.height
      // );
      this.renderer.clearColor(255, 255, 0);
      // this.renderer.render(this.scene, this.camera2);
      // this.camera2.aspect = secondView.width / secondView.height;
      // this.camera2.updateProjectionMatrix();
      this.renderer.render(this.scene, this.camera2);
      this.labelRenderer.render(this.scene, this.camera);
      this.labelRenderer2.render(this.scene2, this.camera2);
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
.intro_title__width {
  width: clamp(20ch, 70%, 75ch);
}
figcaption {
  width: clamp(20ch, 70%, 75ch);
  margin: 0 auto;
  margin-top: 2rem;
}
#container {
  position: relative;
  margin-top: 2rem;
  flex: 1;
  width: 100%;
  overflow: scroll;
  /* height: 400px; */
  aspect-ratio: 2/1;
}

/* @media only screen and (max-width: 768px) {
  #container {
    height: 800px;
    width: 400px;
    background-color: pink;
  }
} */

.newimages {
  width: 200px;
  margin-top: 2rem;
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
  max-width: 900px;
  width: 100vw;
  background-color: #ebeeee;
  padding: 1.5rem;
  box-sizing: border-box;
}
.biggerlate {
  font-size: 3rem;
}

.disclaimer {
  margin-top: 3rem;
  opacity: 0.9;
  font-size: 0.5rem;
}
</style>
