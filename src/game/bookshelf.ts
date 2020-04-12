import { Game } from "./game";
import { GameState } from "../library/state";
import { TextEntity } from "../library/text_entity";
import { Entity } from "../library/entity";
import { Texture } from "pixi.js";

export class Bookshelf extends Entity {
  floatingText: TextEntity;

  constructor(tex: Texture) {
    super({
      name: "bookshelfRoot"
    });

    debugger;

    this.addChild(new Entity({
      name   : "Bookshelf",
      texture: tex,
    }))

    this.floatingText = new TextEntity("FloatingText");

    this.addChild(this.floatingText);
  }

  update(state: GameState): void {

  }
}