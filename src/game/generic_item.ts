import { VanishingEntity } from "./vanishing_entity";
import { TextEntity } from "../library/text_entity";
import { Texture } from "pixi.js";
import { GameState } from "../library/state";
import { Player } from "./player";
import { Entity } from "../library/entity";
import { Assets } from "./assets";

export class GenericItem extends VanishingEntity {
  floatingText: TextEntity;
  graphic: Entity;

  constructor(tex: Texture, description: string) {
    super({
      name   : "bookshelfRoot",
      texture: tex,
    });

    this.graphic = new Entity({ 
      texture: Assets.getResource("dialog_box"),
      name   : "Graphic",
    });

    this.addChild(this.graphic);
    this.graphic.y = -250;
    this.graphic.alpha = 0.5;
    this.graphic.zIndex = 499;

    this.floatingText = new TextEntity({ text: description });
    this.floatingText.y = -250;
    this.floatingText.zIndex = 500;

    this.addChild(this.floatingText);
  }

  update(state: GameState): void {
    this.floatingText.visible = Player.Instance.position.distance(this.position) < 200;
    this.graphic.visible = Player.Instance.position.distance(this.position) < 200;
  }
}