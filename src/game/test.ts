import { Entity } from "../library/entity";
import { BaseGameState } from "../library/base_state";
import { Assets } from "./assets";
import { ModeEntity } from "./modes";
import { GameState } from "./state";

export class Test extends ModeEntity {
  constructor() {
    super({
      name: "Bookshelf",
    });

    const bookshelf = new ModeEntity({
      texture: Assets.getResource("tileset"),
      name: "BookshelfTestGraphics",
    });

    bookshelf.x      = 0;
    bookshelf.y      = 0;
    bookshelf.width  = 50;
    bookshelf.height = 50;

    this.addChild(bookshelf);

    // const text = new TextEntity("This is a test of a text");

    // this.addChild(text);
  }

  update(state: BaseGameState): void {

  }
}