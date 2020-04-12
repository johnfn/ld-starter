import { VanishingEntity } from "../library/vanishing_entity";
import { TextEntity } from "../library/text_entity";
import { Entity } from "../library/entity";
import { Texture } from "pixi.js";

export class Bookshelf extends VanishingEntity {
  floatingText: TextEntity;

  constructor(tex: Texture) {
    super({
      name: "bookshelfRoot",
      texture: tex,
    });

    this.floatingText = new TextEntity("FloatingText");

    this.addChild(this.floatingText);
  }
}