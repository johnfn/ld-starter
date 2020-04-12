import { Entity } from "../library/entity";
import { Game } from "./game";
import { GameState } from "../library/state";
import { TextEntity } from "../library/text_entity";

export class Test extends Entity {

  constructor() {
    super({
      name: "Bookshelf",
    });

    const bookshelf = new Entity({
      texture: Game.Instance.assets.getResource("tileset.png").texture,
    });

    bookshelf.x      = 0;
    bookshelf.y      = 0;
    bookshelf.width  = 50;
    bookshelf.height = 50;

    this.addChild(bookshelf);

    // const text = new TextEntity("This is a test of a text");

    // this.addChild(text);
  }

  update(state: GameState): void {

  }
}