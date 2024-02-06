import GameObject from "../GameObject.js";
import Vector2D from "../Math/Vector2D.js";
import IComponent from "./IComponent.js";

export default class Collider extends IComponent {
  /**
   *
   * @param {GameObject} entity
   * @param {*} name
   */
  constructor(entity, name, width, height, color, strokeWidth = 1) {
    super(entity, name);

    this.width = width;
    this.height = height;
    this.color = color;
    this.strokeWidth = strokeWidth;
    this.isOverlap = false;

    //VertexArray
    //X = vertex
    /**
     * X------X
     * |      |
     * |      |
     * X------X
     */
    this.vertex = [];
    this.normals = [];
  }

  init() {
    this.calculVertexPosition();
  }

  calculVertexPosition() {
    this.vertex = [
      new Vector2D(
        this.entity.transform.position.x - this.width / 2,
        this.entity.transform.position.y - this.height / 2
      ),
      new Vector2D(
        this.entity.transform.position.x + this.width / 2,
        this.entity.transform.position.y - this.height / 2
      ),
      new Vector2D(
        this.entity.transform.position.x + this.width / 2,
        this.entity.transform.position.y + this.height / 2
      ),
      new Vector2D(
        this.entity.transform.position.x - this.width / 2,
        this.entity.transform.position.y + this.height / 2
      ),
    ];

    this.calculNormals();
  }

  calculNormals() {
    this.normals = [];
    for (let i = 0; i < this.vertex.length; ++i) {
      let vector = new Vector2D();
      if (i < this.vertex.length - 1) {
        vector = new Vector2D(
          this.vertex[i + 1].x - this.vertex[i].x,
          this.vertex[i + 1].y - this.vertex[i].y
        );
      } else {
        vector = new Vector2D(
          this.vertex[0].x - this.vertex[i].x,
          this.vertex[0].y - this.vertex[i].y
        );
      }

      this.normals.push(vector.normalLeft());
    }
  }

  getVertex() {
    return this.vertex;
  }

  getNormals() {
    return this.normals;
  }

  update() {
    //this.calculVertexPosition();
  }

  draw(ctx) {
    ctx.lineWidth = this.strokeWidth;
    ctx.strokeStyle = this.color;
    ctx.strokeRect(
      this.entity.transform.position.x - this.width / 2,
      this.entity.transform.position.y - this.height / 2,
      this.width,
      this.height
    );
  }
}
