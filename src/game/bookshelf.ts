import { VanishingEntity } from "../library/vanishing_entity";
import { TextEntity } from "../library/text_entity";
import { Texture } from "pixi.js";
import { GameState } from "../library/state";
import { Player } from "./player";
import { Game } from "./game";
import { Entity } from "../library/entity";

export class GenericItem extends VanishingEntity {
  floatingText: TextEntity;
  graphic: Entity;

  constructor(
    tex: Texture,
    description: string
    ) {
    super({
      name: "bookshelfRoot",
      texture: tex,
    });

    this.graphic = new Entity({ 
      texture: Game.Instance.assets.getResource("dialog_box.png").texture,
    });

    this.addChild(this.graphic);
    this.graphic.y = -50;
    this.graphic.alpha = 0.5;

    this.floatingText = new TextEntity(description);
    this.floatingText.y = -50;

    this.addChild(this.floatingText);
  }

  update(state: GameState): void {
    this.floatingText.visible = Player.Instance.position.distance(this.position) < 200;
    this.graphic.visible = Player.Instance.position.distance(this.position) < 200;
  }
}