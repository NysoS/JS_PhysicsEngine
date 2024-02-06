import GameObject from "../GameObject.js";
import IComponent from "./IComponent.js";

export default class Renderer extends IComponent {
  /**
   *
   * @param {GameObject} entity
   * @param {*} name
   */
  constructor(entity, name, width, height, color) {
    super(entity, name);

    this.width = width;
    this.height = height;
    this.color = color;
  }

  init() {}

  setColor(color) {
    this.color = color;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(
      this.entity.transform.position.x - this.width / 2,
      this.entity.transform.position.y - this.height / 2,
      this.width,
      this.height
    );

    ctx.fillStyle = "white";
    ctx.fillRect(
      this.entity.transform.position.x - 2,
      this.entity.transform.position.y - 2,
      4,
      4
    );
  }
}
