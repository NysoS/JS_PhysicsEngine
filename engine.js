import Collider from "./Component/Collider.js";
import Renderer from "./Component/Renderer.js";
import Game from "./Game.js";
import Floor from "./Game/Floor.js";
import Player from "./Game/Player.js";
import Wall from "./Game/Wall.js";

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

const game = new Game(ctx);

const player = new Player("Player");
player.addComponent(new Renderer(player, "Renderer", 50, 50, "red"));
player.addComponent(new Collider(player, "Collider", 51, 51, "green", 3));

const staticMesh = new Floor("static");
staticMesh.addComponent(
  new Renderer(staticMesh, "Renderer", 350, 100, "orange")
);
staticMesh.addComponent(
  new Collider(staticMesh, "Collider", 350, 100, "green", 3)
);

const staticMesh2 = new Wall("Wallstatic");
staticMesh2.addComponent(
  new Renderer(staticMesh2, "Renderer", 150, 300, "green")
);
staticMesh2.addComponent(
  new Collider(staticMesh2, "Collider", 150, 300, "green", 3)
);

game.addEntity(staticMesh2);
game.addEntity(staticMesh);
game.addEntity(player);

game.init();

function gameLoop() {
  game.loop();
  requestAnimationFrame(gameLoop);
}

gameLoop();
