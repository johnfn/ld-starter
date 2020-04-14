import { Entity } from "../library/entity";
import { Game } from "./game";
import { GameCoroutine } from "../library/coroutine_manager";
import { Player } from "./player";
import { Vector2 } from "../library/geometry/vector2";
import { DialogTexts } from "./dialog_text";
import { DialogBox, DialogText } from "./dialog";

export class TasuketeHead extends Entity {
  constructor() {
    super({
      texture: Game.Instance.assets.getResource("tasukete/tasukete_0000.png").texture,
      name   : "TasuketeHead",
    });

    this.sprite.anchor.set(0.5, 0.5);

    this.startCoroutine("TasuketeAI", this.tasuketeAI());

    this.addOnMouseOver(() => { 
      this.scale = new Vector2(1.1, 1.1);
    });

    this.addOnMouseOut(() => { 
      this.scale = new Vector2(1, 1);
    });

    this.addOnClick(() => {
      this.startDialog();
    })
  }

  dialogIndex = -1;
  startDialog() {
    this.dialogIndex++;

    if (this.dialogIndex > DialogTexts.TasuketeInteractText.length) {
      this.visible = false;

      return;
    }

    const nextDialog = [DialogTexts.TasuketeInteractText[this.dialogIndex]];

    this.startCoroutine("TasuketeDialog", DialogBox.StartDialog(nextDialog));
  }

  *annoying(nextDialog: DialogText): GameCoroutine {
    yield* DialogBox.StartDialog(nextDialog);
  }

  *tasuketeAI(): GameCoroutine {
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