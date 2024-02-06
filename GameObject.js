import Transform from "./Component/Transform.js";

export default class GameObject {
  isStaticMesh = true;

  constructor(name) {
    this.name = name;
    this.components = [];
    this.transform = null;
    this.isDebug = false;
  }

  addComponent(component) {
    this.components.push(component);
  }

  removeComponent(component) {
    this.components.splice(
      this.components.findIndex((comp) => comp.name === component.name),
      1
    );
  }

  getComponent(component) {
    return this.components[
      this.components.findIndex((comp) => comp.name === component)
    ];
  }

  isExistRenderer(componentName) {
    if (this.components.find((comp) => comp.name === componentName)) {
      return true;
    }

    return false;
  }

  init() {
    let transformComponent = new Transform(this, "Transform");
    this.components.push(transformComponent);
    this.transform = transformComponent;

    this.components.forEach((comp) => comp.init());
  }

  update() {
    if (!this.isStaticMesh) {
      this.getComponent("Collider").update();
    }
  }

  draw(ctx) {
    this.getComponent("Renderer").draw(ctx);
    if (this.isDebug) {
      this.getComponent("Collider").draw(ctx);
    }
  }

  onCollision(otherCollider) {
    console.log("Collider :", otherCollider);
  }

  onCollisionExit(otherCollider) {
    console.log("Exit Collider :", otherCollider);
  }
}
