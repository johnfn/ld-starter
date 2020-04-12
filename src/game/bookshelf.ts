import { Entity } from "../library/entity";
import { Game } from "./game";
import { GameState } from "../library/state";
import { GameMap } from "./map";

export class Bookshelf extends Entity {

  constructor() {
    super({
      name   : "Bookshelf!",
      texture: Game.Instance.assets.getResource("bookshelf.png").texture,
    });
  }

}