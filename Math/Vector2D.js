export default class Vector2D {
  constructor(_x = 0, _y = 0) {
    this.x = _x;
    this.y = _y;
  }

  /**
   *
   * @returns number
   */
  squareLenght() {
    return this.x * this.x + this.y * this.y;
  }

  /**
   *
   * @returns number
   */
  lenght() {
    return Math.sqrt(this.squareLenght());
  }

  /**
   *
   * @returns number
   */
  getNormalized() {
    return new Vector2D(this.x / this.lenght, this.y / this.lenght);
  }

  /**
   *
   * @returns number
   */
  normalize() {
    this.x = this.x / this.lenght();
    this.y = this.y / this.lenght();

    return this;
  }

  /**
   *
   * @param {Vector2D} vector
   * @returns number
   */
  dotProduct(vector) {
    return this.x * vector.x + this.y * vector.y;
  }

  normalLeft() {
    return new Vector2D(-this.y, this.x).normalize();
  }

  normalRight() {
    return new Vector2D(this.y, -this.x).normalize();
  }
}
