import { VanishingEntity } from "../library/vanishing_entity";
import { TextEntity } from "../library/text_entity";
import { Texture } from "pixi.js";

export class Bookshelf extends VanishingEntity {
  floatingText: TextEntity;

  constructor(tex: Texture) {
    super({
      name: "bookshelfRoot",
      texture: tex,
    });

    this.floatingText = new TextEntity("It’s a bookshelf. Surprisingly, it’s filled with books.");
    this.floatingText.y = -50;

    this.addChild(this.floatingText);
  }
}