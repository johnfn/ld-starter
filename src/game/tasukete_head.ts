import { GameCoroutine } from "../library/coroutine_manager";
import { Player } from "./player";
import { Vector2 } from "../library/geometry/vector2";
import { DialogTexts } from "./dialog_text";
import { DialogBox, DialogText } from "./dialog";
import { Texture } from "pixi.js";
import { Assets } from "./assets";
import { GameState } from "./state";
import { ModeEntity } from "./modes";

export class TasuketeHead extends ModeEntity {
  frames: Texture[];

  constructor() {
    super({
      texture: Assets.getResource("tasukete/tasukete")[0],
      name   : "TasuketeHead",
    });

    this.frames = Assets.getResource("tasukete/tasukete");

    this.sprite.anchor.set(0.5, 0.5);

    this.startCoroutine("TasuketeMove", this.tasuketeMove());
    this.startCoroutine("TasuketeAnimation", this.tasuketeAnimation());

    this.addOnMouseOver(state => { 
      this.scale = new Vector2(1.1, 1.1);
    });

    this.addOnMouseOut(state => { 
      this.scale = new Vector2(1, 1);
    });

    this.addOnClick(state => {
      this.startDialog();
    });
  }

  *tasuketeAnimation(): GameCoroutine<GameState> {
    let index = 0;

    while (true) {
      yield { frames: 5 };

      this.texture = this.frames[++index % this.frames.length];
    }
  }

  dialogIndex = -1;
  talking = false;
  startDialog() {
    if (this.talking) { return; }

    this.talking = true;
    this.dialogIndex++;

    if (this.dialogIndex >= DialogTexts.TasuketeInteractText.length) {
      this.visible = false;

      return;
    }

    const nextDialog = [DialogTexts.TasuketeInteractText[this.dialogIndex]];

    this.startCoroutine("TasuketeDialog", this.annoying(nextDialog));
  }

  *annoying(nextDialog: DialogText): GameCoroutine<GameState> {
    yield* DialogBox.StartDialog(nextDialog);
    this.talking = false;
  }

  *tasuketeMove(): GameCoroutine<GameState> {
    const player = Player.Instance;
    const speed = 1.4;

    while (true) {
      const destination = player.position.add(Vector2.Random(200, 200, -200, -200).add(this.dimensions().divide(2)));

      while (destination.distance(this.position) > 50) {
        yield "next";

        const towards = destination.subtract(this.position).normalize().multiply(speed);

        this.position = this.position.add(towards);
      }

      yield { frames: 60 };
    }
  }
}