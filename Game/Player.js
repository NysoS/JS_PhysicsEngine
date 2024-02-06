import GameObject from "../GameObject.js";
import Vector2D from "../Math/Vector2D.js";

export default class Player extends GameObject {
  constructor(name) {
    super(name);

    this.isStaticMesh = false;
  }

  init() {
    super.init();

    window.addEventListener("mousemove", (e) => {
      this.move(e);
    });
  }

  update() {
    super.update();

    if (this.getComponent("Collider").isOverlap) {
      this.getComponent("Renderer").setColor("blue");
    } else {
      this.getComponent("Renderer").setColor("red");
    }
  }

  move(mousemoveEvent) {
    this.transform.position = new Vector2D(
      mousemoveEvent.offsetX,
      mousemoveEvent.offsetY
    );
  }

  onCollision(otherCollider) {}

  onCollisionExit(otherCollider) {}
}
