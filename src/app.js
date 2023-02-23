import Scene from "./scene";
import Camera from "./camera";
import Model from "./model";
import Renderer from "./renderer";
import LoadSound from "./loadSound";

let instance = null;

export default class App {
  constructor() {
    if (instance) {
      return instance;
    }
    instance = this;

    this.scene = new Scene();

    this.camera = new Camera();

    this.model = new Model();

    this.LoadSound = new LoadSound();

    this.renderer = new Renderer();

    this.update();
  }

  update() {
    this.renderer.update();

    // this.models.forEach((model) => {
    //   model.update();
    // });

    this.model.update();

    requestAnimationFrame(() => this.update());
  }
}

const app = new App();
