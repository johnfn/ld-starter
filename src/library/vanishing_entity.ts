import { Entity } from "./entity";
import { Texture } from "pixi.js";
import { GameState } from "./state";

export abstract class VanishingEntity extends Entity {
  constructor(props: {
    name: string,
    texture   ?: Texture;
    collidable : boolean;
  }) {
    super({
      ...props,
      interactable: true,
    });

    let sprite = this.sprite;

    sprite.on('click', function() {
        sprite.parent.removeChild(sprite);
    });
    this.startUpdating();
  }

  startUpdating() {
    super.startUpdating();
  }

  stopUpdating() {
    super.stopUpdating();
  }

  abstract interact(other: Entity, gameState: GameState): void;
  abstract interactRange: number;
  abstract interactText(state: GameState): string;
  abstract canInteract: (state: GameState) => boolean;

  hash(): string {
    return `[VanishingEntity ${ this.id }]`;
  }
}