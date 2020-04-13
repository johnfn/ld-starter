import { Entity } from "../library/entity";
import { Game } from "./game";
import { GameState } from "../library/state";
import { GameMap } from "./game_map";
import { DialogBox } from "./dialog";
import { Vector2 } from "../library/geometry/vector2";

export class Player extends Entity {
  public static Instance: Player;

  speed = 15;

  constructor() {
    super({
      name   : "Player!",
      texture: Game.Instance.assets.getResource("miranda.png").texture,
    });

    Player.Instance = this;
    this.scale = new Vector2({ x: 0.25, y: 0.25 });
  }

  audio: HTMLAudioElement | null = null;

  update(state: GameState): void {
    if (DialogBox.DialogVisible()) {
      return;
    }

    this.velocity = Vector2.Zero;

    if (state.keys.down.W) {
      this.velocity = this.velocity.addY(-this.speed);
    }

    if (state.keys.down.S) {
      this.velocity = this.velocity.addY(this.speed);
    }

    if (state.keys.down.A) {
      this.velocity = this.velocity.addX(-this.speed);
    }

    if (state.keys.down.D) {
      this.velocity = this.velocity.addX(this.speed);
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