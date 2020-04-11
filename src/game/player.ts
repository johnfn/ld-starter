import { Entity } from "../library/entity";
import { Game } from "./game";
import { GameState } from "../library/state";

export class Player extends Entity {
  speed = 7;

  constructor() {
    super({
      name   : "Player!",
      texture: Game.Instance.loader.getResource("owo.png").texture,
    });
  }

  update(state: GameState): void {
    if (state.keys.down.W) {
      this.y -= this.speed;
    }

    if (state.keys.down.S) {
      this.y += this.speed;
    }

    if (state.keys.down.A) {
      this.x -= this.speed;
    }

    if (state.keys.down.D) {
      this.x += this.speed;
    }
  }
}