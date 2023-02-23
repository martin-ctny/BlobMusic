import App from "./app";
import * as THREE from "three";

export default class Camera {
  constructor() {
    this.app = new App();
    this.scene = this.app.scene.instance;

    this.setInstance();
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.instance.position.z = 2.7;
    this.scene.add(this.instance);
  }
}
