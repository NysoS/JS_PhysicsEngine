import Vector2D from "../Math/Vector2D.js";
import IComponent from "./IComponent.js";

export default class Transform extends IComponent {
  constructor(enity, name) {
    super(enity, name);

    this.position = new Vector2D(0, 0);
    this.rotation = new Vector2D(0, 0);
    this.scale = new Vector2D(1, 1);
  }

  getPosition() {
    return this.position;
  }

  getRotation() {
    return this.rotation;
  }

  getScale() {
    return this.scale;
  }

  init() {}
}
