import { VanishingEntity } from "../library/vanishing_entity";
import { Game } from "./game";
import { GameState } from "../library/state";
import { GameMap } from "./map";

export class Bookshelf extends VanishingEntity {

  constructor() {
    super({
      name   : "Bookshelf!",
      texture: Game.Instance.assets.getResource("bookshelf.png").texture,
      collidable: true,
    });
  }
  
}