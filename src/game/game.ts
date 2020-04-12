import { BaseGame } from "../library/base_game";
import { ResourcesToLoad } from "./resources";
import { Player } from "./player";
import { GameMap } from "./map";
import { Test } from "./test";
import { MyName } from "./whos_there";
import { DialogBox } from "./dialog";
import { DialogTexts } from "./dialog_text";
import { DebugFlags } from "./debug";

export class Game extends BaseGame<typeof ResourcesToLoad> {
  public static Instance: Game;

  constructor() {
    super({
      canvasWidth : 800,
      canvasHeight: 600,
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

    this.fixedCameraStage.addChild(new DialogBox());

    if (DebugFlags["Play Music"]) {
      const audio = new Audio('music/mystery loop 1.mp3');
      audio.play();
    }

    if (DebugFlags["Show Initial Dialog"].on) {
      DialogBox.StartDialog(DialogTexts.IntroText);
    }
  };
}
