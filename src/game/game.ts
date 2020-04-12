import { BaseGame } from "../library/base_game";
import { ResourcesToLoad } from "./resources";
import { Player } from "./player";
import { GameMap } from "./map";
import { Bookshelf } from "./bookshelf";

export class Game extends BaseGame<typeof ResourcesToLoad> {
  public static Instance: Game;

  constructor() {
    super({
      canvasWidth : 600,
      canvasHeight: 400,
      resources   : ResourcesToLoad,
    });

    Game.Instance = this;
  }

  initialize() {
    this.stage.addChild(new GameMap());
    this.stage.addChild(new Player());
    let bookshelf = new Bookshelf();
    bookshelf.width = 20;
    bookshelf.height = 20;
    this.stage.addChild(bookshelf);
  };
}
