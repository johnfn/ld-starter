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

    this.startCoroutine("TasuketeMove", this.tasuketeMove());
    this.startCoroutine("TasuketeAnimation", this.tasuketeAnimation());

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

  *tasuketeAnimation(): GameCoroutine {
    const frames = [
      Game.Instance.assets.getResource("tasukete/tasukete_0000.png").texture,
      Game.Instance.assets.getResource("tasukete/tasukete_0001.png").texture,
      Game.Instance.assets.getResource("tasukete/tasukete_0002.png").texture,
      Game.Instance.assets.getResource("tasukete/tasukete_0003.png").texture,
      Game.Instance.assets.getResource("tasukete/tasukete_0004.png").texture,
      Game.Instance.assets.getResource("tasukete/tasukete_0005.png").texture,
      Game.Instance.assets.getResource("tasukete/tasukete_0006.png").texture,
      Game.Instance.assets.getResource("tasukete/tasukete_0007.png").texture,
      Game.Instance.assets.getResource("tasukete/tasukete_0008.png").texture,
      Game.Instance.assets.getResource("tasukete/tasukete_0009.png").texture,
      Game.Instance.assets.getResource("tasukete/tasukete_0010.png").texture,
      Game.Instance.assets.getResource("tasukete/tasukete_0011.png").texture,
      Game.Instance.assets.getResource("tasukete/tasukete_0012.png").texture,
      Game.Instance.assets.getResource("tasukete/tasukete_0013.png").texture,
      Game.Instance.assets.getResource("tasukete/tasukete_0014.png").texture,
      Game.Instance.assets.getResource("tasukete/tasukete_0015.png").texture,
      Game.Instance.assets.getResource("tasukete/tasukete_0016.png").texture,
      Game.Instance.assets.getResource("tasukete/tasukete_0017.png").texture,
      Game.Instance.assets.getResource("tasukete/tasukete_0018.png").texture,
    ];

    let index = 0;

    while (true) {
      yield { frames: 5 };

      this.texture = frames[++index % frames.length];
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

  *annoying(nextDialog: DialogText): GameCoroutine {
    yield* DialogBox.StartDialog(nextDialog);
    this.talking = false;
  }

  *tasuketeMove(): GameCoroutine {
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