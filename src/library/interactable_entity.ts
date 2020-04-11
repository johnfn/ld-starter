import { Entity } from "./entity";
import { Texture } from "pixi.js";
import { GameState } from "./state";

export abstract class InteractableEntity extends Entity {
  constructor(props: {
    texture   ?: Texture;
    collidable : boolean;
  }) {
    super({
      ...props,
      interactable: true,
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
    return `[InteractableEntity ${ this.id }]`;
  }
}
