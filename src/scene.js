import App from "./app";
import * as THREE from "three";

export default class Scene {
  constructor() {
    this.app = new App();
    this.instance = new THREE.Scene();
    this.instance.background = new THREE.Color(0x9aaae5);
  }
}
