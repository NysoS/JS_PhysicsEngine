import GameObject from "./GameObject.js";

function Max(array) {
  let max = array[0];
  for (let i = 0; i < array.length; ++i) {
    if (max < array[i]) {
      max = array[i];
    }
  }

  return max;
}

function Min(array) {
  let min = array[0];
  for (let i = 0; i < array.length; ++i) {
    if (min > array[i]) {
      min = array[i];
    }
  }

  return min;
}

export default class Game {
  constructor(ctx) {
    this.entities = [];
    this.rendererEntities = [];
    this.colliderEntities = [];
    this.staticColliderEntities = [];
    this.renderContext = ctx;
  }

  /**
   *
   * @param {GameObject} entities
   */
  addEntity(entities) {
    this.entities.push(entities);
    if (entities.isExistRenderer("Renderer")) {
      this.rendererEntities.push(entities);
    }

    if (entities.isExistRenderer("Collider")) {
      if (entities.isStaticMesh) {
        this.staticColliderEntities.push(entities);
      } else {
        this.colliderEntities.push(entities);
      }
    }
  }

  removeEntity() {}

  init() {
    this.entities.forEach((entity) => entity.init());
  }

  update() {
    this.entities.forEach((entity) => entity.update());
    this.isOverlap();
  }

  draw(ctx) {
    ctx.clearRect(0, 0, 1200, 800);
    this.rendererEntities.forEach((entity) => entity.draw(ctx));
    this.colliderEntities.forEach((entity) => {
      if (entity.isDebug) {
        entity.draw(ctx);
      }
    });
  }

  loop() {
    this.update();
    this.draw(this.renderContext);
  }

  isOverlap() {
    let allCollider = [];

    this.colliderEntities.forEach((entity) => allCollider.push(entity));
    this.staticColliderEntities.forEach((entity) => allCollider.push(entity));

    for (let i = 0; i < this.colliderEntities.length; ++i) {
      let overlap = false;
      for (let x = 0; x < allCollider.length; ++x) {
        if (this.colliderEntities[i] === allCollider[x]) {
          continue;
        }

        let firstCollider = this.colliderEntities[i].getComponent("Collider");
        let secondCollider = allCollider[x].getComponent("Collider");

        if (firstCollider === secondCollider) {
          continue;
        }

        if (
          this.colliderEntities[i].isStaticMesh === false ||
          allCollider[x].isStaticMesh === false
        ) {
          firstCollider.calculVertexPosition();
          secondCollider.calculVertexPosition();
        }

        if (this.sat(firstCollider, secondCollider)) {
          overlap = true;
          break;
        }
      }
      this.colliderEntities[i].getComponent("Collider").isOverlap = overlap;
    }
  }

  sat(firstCollider, secondCollider) {
    let allNormals = [];
    firstCollider.getNormals().forEach((normal) => allNormals.push(normal));
    secondCollider.getNormals().forEach((normal) => allNormals.push(normal));

    for (let normalIndex = 0; normalIndex < allNormals.length; ++normalIndex) {
      let projectPointOne = [];
      let projectPointTwo = [];

      let firstColliderVertex = firstCollider.getVertex();

      for (
        let indexVertex = 0;
        indexVertex < firstColliderVertex.length;
        ++indexVertex
      ) {
        projectPointOne.push(
          firstColliderVertex[indexVertex].dotProduct(allNormals[normalIndex])
        );
      }

      let secondColliderVertex = secondCollider.getVertex();
      for (
        let indexVertex = 0;
        indexVertex < secondColliderVertex.length;
        ++indexVertex
      ) {
        projectPointTwo.push(
          secondColliderVertex[indexVertex].dotProduct(allNormals[normalIndex])
        );
      }

      let maxFirst = Max(projectPointOne);
      let minFirst = Min(projectPointOne);

      let maxSecond = Max(projectPointTwo);
      let minSecond = Min(projectPointTwo);

      if (maxFirst < minSecond || maxSecond < minFirst) {
        return false;
      }
    }
    return true;
  }
}
