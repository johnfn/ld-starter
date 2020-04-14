import { BaseGame } from "../library/base_game";
import { ResourcesToLoad } from "./resources";
import { Player } from "./player";
import { GameMap } from "./game_map";
import { Test } from "./test";
import { DialogBox } from "./dialog";
import { DialogTexts } from "./dialog_text";
import { DebugFlags } from "./debug";
import { TasuketeHead } from "./tasukete_head";

export class Game extends BaseGame<typeof ResourcesToLoad> {
  public static Instance: Game;

  constructor() {
    super({
      canvasWidth : 800,
      canvasHeight: 600,
      tileWidth   : 256,
      tileHeight  : 256,
      scale       : 0.5,
      resources   : ResourcesToLoad,
      debugFlags  : DebugFlags,
    });

    Game.Instance = this;
  }

  initialize() {
    this.stage.addChild(new GameMap());
    this.stage.addChild(new Player());
    this.stage.addChild(new Test());
    this.stage.addChild(new TasuketeHead());

    this.fixedCameraStage.addChild(new DialogBox());

    if (DebugFlags["Play Music"].on) {
      const audio = new Audio('music/mystery loop 1.mp3');

      audio.play();
      audio.loop = true;
    }

    if (DebugFlags["Show Initial Dialog"].on) {
      this.coroutineManager.startCoroutine(
        "Initial Dialog",
        DialogBox.StartDialog(DialogTexts.IntroText)
      );
    }
  };
}
