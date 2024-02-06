import GameObject from "../GameObject.js";
import Vector2D from "../Math/Vector2D.js";

export default class Floor extends GameObject {
  constructor(name) {
    super(name);
  }

  init() {
    super.init();

    this.transform.position = new Vector2D(600, 400);
  }

  update() {
    super.update();
  }
}
