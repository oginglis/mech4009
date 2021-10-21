<template>
  <div class="viz-wrap">
    <div class="viz-controls-wrap">
      <p class="intro_title__width">
        The moment vector
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

      this.renderer = new Three.WebGLRenderer({ antialias: true });
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

      // obj - your object (THREE.Object3D or derived)
      // point - the point of rotation (THREE.Vector3)
      // axis - the axis of rotation (normalized THREE.Vector3)
      // theta - radian value of rotation
      // pointIsWorld - boolean indicating the point is in world coordinates (default = false)
      const rotateAboutPoint = (obj, point, axis, theta) => {
        // if (pointIsWorld) {
        //   obj.parent.localToWorld(obj.position); // compensate for world coordinate
        // }
        if (obj) {
          obj.position.sub(point); // remove the offset
          obj.position.applyAxisAngle(axis, theta); // rotate the POSITION
          obj.position.add(point); // re-add the offset

          // if (pointIsWorld) {
          //   obj.parent.worldToLocal(obj.position); // undo world coordinates compensation
          // }

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
        // console.log("canvas size changed");
        // const canvas = this.renderer.domElement;
        // look up the size the canvas is being displayed
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
        // if (this.mq.current === "md") {
        //   this.ollieViewports[0].x = 0;
        //   this.ollieViewports[0].y = 0;
        //   this.ollieViewports[1].x = this.width / 2;
        //   this.ollieViewports[1].y = 0;
        // } else {
        //   this.ollieViewports[0].x = 0;
        //   this.ollieViewports[0].y = 400;
        //   this.ollieViewports[1].x = 0;
        //   this.ollieViewports[1].y = 0;
        // }

        // you must pass false here or three.js sadly fights the browser
        this.renderer.setSize(this.width, this.height);
        this.camera.aspect = this.width / 2 / this.height;
        this.camera2.aspect = this.width / 2 / this.height;
        this.labelRenderer.render(this.scene, this.camera, false);
        this.labelRenderer.render(this.scene2, this.camera2, false);
        this.camera.updateProjectionMatrix();
        this.camera2.updateProjectionMatrix();

        // update any render target sizes here
      };

      resizeCanvasToDisplaySize();
      const resizeObserver = new ResizeObserver(resizeCanvasToDisplaySize);
      resizeObserver.observe(container, { box: "content-box" });

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

        // let text3 = document.createElement("div");
        // text3.className = "label";
        // text3.style.color = "rgb(0,0,0)";

        // text3.style.padding = `0px 2px 0px 2px`;
        // text3.style.fontWeight = "700";
        // text3.style.color = "#85CB33";
        // text3.style.fontStyle = "italic";
        // text3.style.backgroundColor = `rgba(255, 255, 255, 0.9)`;

        // text3.style.fontFamily = "Times New Roman";
        // text3.textContent = `r`;
        // let label3 = new CSS2DObject(text3);
        // label3.name = "angle2";
        // sceneObjects.push(label3.name);

        // label3.position.set(-1.2, -0.8, 0);

        // this.scene.add(label3);

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
        // let text3_5 = document.createElement("div");
        // text3_5.className = "label";
        // text3_5.style.color = "rgb(0,0,0)";
        // text3_5.style.backgroundColor = `#ffffff`;
        // text3_5.style.padding = `0px 2px 0px 2px`;
        // text3_5.style.fontWeight = "700";
        // text3_5.style.color = "#85CB33";
        // text3_5.style.fontFamily = "Times New Roman";
        // text3_5.style.backgroundColor = `rgba(255, 255, 255, 0.9)`;
        // text3_5.style.fontStyle = "italic";
        // text3_5.textContent = `r`;
        // let label3_5 = new CSS2DObject(text3_5);
        // label3_5.name = "angle2";
        // label3_5.position.set(-1.2, -0.8, 0);
        // sceneObjects2.push(label3_5.name);
        // this.scene2.add(label3_5);
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

      // let text8 = document.createElement("div");
      // text8.className = "label";
      // text8.style.color = "rgb(0,0,0)";
      // // text8.style.backgroundColor = `#ffffff`;
      // // text8.style.fontWeight = "900";
      // text8.style.padding = `.5px 1px 2px 3px`;
      // text8.style.fontFamily = "Times New Roman";
      // text8.textContent = `P`;
      // let label8 = new CSS2DObject(text8);
      // label8.name = "P";

      // label8.position.set(-2.7, -2.5, 0);
      // this.scene.add(label8);

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
      // let text8_5 = document.createElement("div");
      // text8_5.className = "label";
      // text8_5.style.color = "rgb(0,0,0)";
      // text8_5.style.fontFamily = "Times New Roman";
      // // text8_5.style.backgroundColor = `#ffffff`;
      // // text8_5.style.fontWeight = "900";

      // text8_5.style.padding = `.5px 1px 2px 3px`;
      // text8_5.textContent = `P`;
      // let label8_5 = new CSS2DObject(text8_5);
      // label8_5.name = "P";
      // sceneObjects2.push(label8_5.name);
      // label8_5.position.set(-2.6, -2.5, 0);
      // // label8.position.set(0, 0, 0);
      // this.scene2.add(label8_5);

      // label8_5.name = "angle44";

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

      // let text8_5ylabel = document.createElement("div");
      // text8_5ylabel.className = "label";
      // text8_5ylabel.style.color = " #d3d3d3";
      // // text8_5ylabel.style.backgroundColor = `#ffffff`;
      // // text8_5ylabel.style.fontWeight = "900";
      // text8_5ylabel.style.padding = `.5px 1px 2px 3px`;
      // text8_5ylabel.style.fontFamily = "Times New Roman";
      // text8_5ylabel.style.fontStyle = "italic";
      // text8_5ylabel.textContent = `y`;
      // let label8_5ylabel = new CSS2DObject(text8_5ylabel);
      // label8_5ylabel.name = "y";
      // sceneObjects2.push(label8_5ylabel.name);
      // label8_5ylabel.position.set(-3, 3.5, 0);
      // // label8.position.set(0, 0, 0);
      // this.scene.add(label8_5ylabel);

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

      // let ytext2 = document.createElement("div");
      // ytext2.className = "label";
      // ytext2.style.color = " #d3d3d3";
      // // ytext2.style.backgroundColor = `#ffffff`;
      // // ytext2.style.fontWeight = "900";
      // ytext2.style.padding = `.5px 1px 2px 3px`;
      // ytext2.style.fontFamily = "Times New Roman";
      // ytext2.textContent = `y`;
      // let ylabel2 = new CSS2DObject(ytext2);
      // ylabel2.name = "2y";

      // ylabel2.position.set(-3, 3.5, 0);
      // // label8.position.set(0, 0, 0);
      // this.scene2.add(ylabel2);
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

      // let xtext = document.createElement("div");
      // xtext.className = "label";
      // xtext.style.color = " #d3d3d3";
      // // xtext.style.backgroundColor = `#ffffff`;
      // // xtext.style.fontWeight = "900";
      // xtext.style.padding = `.5px 1px 2px 3px`;
      // xtext.style.fontFamily = "Times New Roman";
      // xtext.textContent = `x`;
      // let xlabel = new CSS2DObject(xtext);
      // xlabel.name = "xy";
      // xlabel.position.set(2.3, -1.9, 0);
      // // label8.position.set(0, 0, 0);
      // this.scene.add(xlabel);

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

      // let xtext2 = document.createElement("div");
      // xtext2.className = "label";
      // xtext2.style.color = " #d3d3d3";
      // // xtext2.style.backgroundColor = `#ffffff`;
      // // xtext2.style.fontWeight = "900";
      // xtext2.style.padding = `.5px 1px 2px 3px`;
      // xtext2.style.fontFamily = "Times New Roman";
      // xtext2.textContent = `x`;
      // let xlabel2 = new CSS2DObject(xtext2);
      // xlabel2.name = "x2y";
      // xlabel2.position.set(2.3, -1.9, 0);
      // // label8.position.set(0, 0, 0);
      // this.scene2.add(xlabel2);

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

        // let text5 = document.createElement("div");
        // text5.className = "label";
        // text5.style.color = "rgb(0,0,0)";
        // text5.style.fontFamily = "Times New Roman";
        // text5.style.fontStyle = "italic";
        // text5.textContent = `M`;
        // text5.style.color = "hsl(344, 100%, 51%)";
        // text5.style.backgroundColor = `rgba(255, 255, 255, 0.9)`;
        // text5.style.borderRadius = "25%";
        // text5.style.padding = `0px 2px 0px 2px`;
        // text5.fontWeight = `bold`;
        // text5.style.fontWeight = "600";
        // text5.style.boxShadow = `1px 2px 3px rgba(0,0,0,.5)`;
        // let label5 = new CSS2DObject(text5);
        // label5.name = "M";
        // sceneObjects.push(label5.name);
        // label5.position.set(vecTop.x, vecTop.y + 1, vecTop.z);
        // this.scene.add(label5);

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

        // let text5_5 = document.createElement("div");
        // text5_5.className = "label";
        // text5_5.style.color = "rgb(0,0,0)";
        // text5_5.textContent = `M`;
        // text5_5.style.color = "hsl(344, 100%, 51%)";
        // text5_5.style.fontFamily = "Times New Roman";
        // text5_5.style.fontStyle = "italic";

        // text5_5.style.backgroundColor = `rgba(255, 255, 255, 0.9)`;
        // text5_5.style.borderRadius = "25%";
        // text5_5.style.padding = `0px 2px 0px 2px`;
        // text5_5.fontWeight = `bold`;
        // text5_5.style.fontWeight = "600";
        // text5_5.style.boxShadow = `1px 2px 3px rgba(0,0,0,.5)`;
        // let label5_5 = new CSS2DObject(text5_5);
        // label5_5.name = "M";
        // sceneObjects.push(label5_5.name);
        // label5_5.position.set(vecTop.x, vecTop.y + 1, vecTop.z);
        // this.scene2.add(label5_5);
        // label5_5.name = "angle4324";
        // sceneObjects2.push(label5_5.name);
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
        // let text4 = document.createElement("div");
        // text4.className = "label";
        // text4.style.color = "rgb(0,0,0)";
        // text4.textContent = `F`;
        // text4.style.color = "hsl(189, 92%, 49%)";
        // text4.style.backgroundColor = `rgba(255, 255, 255, 0.9)`;
        // // text4.style.padding = `3px 2px 3px 2px`;
        // text4.style.fontFamily = "Times New Roman";
        // text4.style.fontStyle = "italic";
        // text4.style.fontWeight = "700";
        // let label4 = new CSS2DObject(text4);
        // label4.name = "F";
        // sceneObjects.push(label4.name);

        // label4.position.set(newPosition.x, newPosition.y, newPosition.z);
        // this.scene.add(label4);
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
        // let text4_5 = document.createElement("div");
        // text4_5.className = "label";
        // text4_5.style.color = "rgb(0,0,0)";
        // text4_5.textContent = `F`;
        // text4_5.style.color = "hsl(189, 92%, 49%)";
        // text4_5.style.fontFamily = "Times New Roman";
        // text4_5.style.backgroundColor = `rgba(255, 255, 255, 0.9)`;
        // // text4_5.style.padding = `3px 2px 3px 2px`;
        // text4_5.style.fontWeight = "900";
        // let label4_5 = new CSS2DObject(text4_5);
        // label4_5.name = "F";
        // sceneObjects.push(label4_5.name);
        // label4_5.position.set(newPosition.x, newPosition.y, newPosition.z);
        // this.scene2.add(label4_5);
        // label4_5.name = "angwele4324";
        // sceneObjects2.push(label4_5.name);

        // cone.position.set((0, 1, 1));
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

        // let text2 = document.createElement("div");
        // text2.className = "label";
        // text2.style.color = "rgb(0,0,0)";
        // text2.style.fontFamily = "Times New Roman";
        // text2.textContent = `${Math.round(
        //   ((this.length + 2.158638) * 180) / Math.PI
        // )}°`;
        // let label2 = new CSS2DObject(text2);
        // text2.style.fontWeight = "900";
        // label2.name = "angle";
        // sceneObjects.push(label2.name);

        // this.scene.add(label2);

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

        // let text2_5 = document.createElement("div");
        // text2_5.className = "label";
        // text2_5.style.color = "rgb(0,0,0)";
        // text2_5.style.fontFamily = "Times New Roman";
        // text2_5.textContent = `${Math.round(
        //   ((this.length + 2.158638) * 180) / Math.PI
        // )}°`;
        // let label2_5 = new CSS2DObject(text2_5);
        // text2_5.style.fontWeight = "900";
        // label2_5.name = "angle";
        // sceneObjects.push(label2_5.name);
        // if (((this.length + 2.158638) * 180) / Math.PI > 0) {
        //   label2_5.position.set(0.3, 0.3, 0);
        // } else {
        //   label2_5.position.set(0.3, -0.5, 0);
        // }

        // this.scene2.add(label2_5);
        // label2_5.name = "angwwerwele4324";
        // sceneObjects2.push(label2_5.name);
      };
      createAngleArcGeometry();
      let vec11 = new Three.Vector3(0, 1, 0);
      let vec22 = new Three.Vector3(0, 3, 0);
      let vecColor3 = 0x0acbee;
      createVectorGeometry(vec11, vec22, vecColor3, true);
      // Draw Force Vector
      // let vec1 = new Three.Vector3(0, this.length, 0);
      // let vec2 = new Three.Vector3(0, 0, 0);
      // let vecColor = 0x0acbee;
      let createAction = true;
      // createVectorGeometry(vec1, vec2, vecColor, true);

      let oldValue = -1;
      // let finishedSpin = false;
      // let theta2 = 0.01;
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

      this.updateSlider = () => {
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

      // Add action line to Vector Geometry
      // Add Label to vectors

      //
    },
    animate: function () {
      requestAnimationFrame(this.animate);
      this.updateSlider();

      this.renderer.setScissorTest(true);
      let firstView = this.ollieViewports[0];
      this.renderer.setViewport(
        firstView.x,
        firstView.y,
        firstView.width,
        firstView.height
      );
      this.renderer.setScissor(
        firstView.x,
        firstView.y,
        firstView.width,
        firstView.height
      );
      this.renderer.render(this.scene, this.camera);
      this.camera.aspect = firstView.width / firstView.height;
      this.camera.updateProjectionMatrix();
      this.renderer.render(this.scene, this.camera);

      this.labelRenderer.render(this.scene, this.camera);

      this.renderer.setScissorTest(true);
      let secondView = this.ollieViewports[1];
      this.renderer.setViewport(
        secondView.x,
        secondView.y,
        secondView.width,
        secondView.height
      );
      this.renderer.setScissor(
        secondView.x,
        secondView.y,
        secondView.width,
        secondView.height
      );
      this.renderer.clearColor(255, 255, 0);
      this.renderer.render(this.scene, this.camera2);
      this.camera2.aspect = secondView.width / secondView.height;
      this.camera2.updateProjectionMatrix();
      this.renderer.render(this.scene, this.camera2);

      this.labelRenderer.render(this.scene, this.camera);
      // this.rendlabelRenderererer.setViewport(450, 0, 450, 500);

      this.labelRenderer2.render(this.scene2, this.camera2);
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
