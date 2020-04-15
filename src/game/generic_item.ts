import { VanishingEntity } from "./vanishing_entity";
import { TextEntity } from "../library/text_entity";
import { Texture } from "pixi.js";
import { BaseGameState } from "../library/base_state";
import { Player } from "./player";
import { Entity } from "../library/entity";
import { Assets } from "./assets";
import { GameState } from "./state";

export class GenericItem extends VanishingEntity {
  floatingText: TextEntity<GameState>;
  graphic: Entity<GameState>;

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

    this.floatingText.visible = false;
    this.graphic.visible = false;
  }

  update(state: BaseGameState): void {
    this.floatingText.visible = Player.Instance.position.distance(this.position) < 200;
    this.graphic.visible = Player.Instance.position.distance(this.position) < 200;
  }
}