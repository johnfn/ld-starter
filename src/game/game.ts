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
    bookshelf.width = 50;
    bookshelf.height = 90;
    bookshelf.sprite.interactive = true;
    bookshelf.sprite.on('click', function() {
      bookshelf.sprite.parent.removeChild(bookshelf.sprite);
    });
    this.stage.addChild(bookshelf);
  };
}
