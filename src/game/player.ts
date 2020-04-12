import { Entity } from "../library/entity";
import { Game } from "./game";
import { GameState } from "../library/state";
import { GameMap } from "./map";
import { DialogBox } from "./dialog";

export class Player extends Entity {
  speed = 7;

  constructor() {
    super({
      name   : "Player!",
      texture: Game.Instance.assets.getResource("owo.png").texture,
    });
  }

  audio: HTMLAudioElement | null = null;

  update(state: GameState): void {
    if (DialogBox.DialogVisible()) {
      return;
    }

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

    Game.Instance.camera.centerOn(this.position);

    for (const region of GameMap.Instance.musicRegions) {
      if (region.rect.contains(this.position)) {
        const songPath = region.properties["file"];

        if (!this.audio || this.audio.src !== songPath) {
          this.audio = new Audio(songPath);
        }
      }
    }
  }
}