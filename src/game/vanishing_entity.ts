import { Texture } from "pixi.js";

import { Entity } from "../library/entity";
import { GameCoroutine } from "../library/coroutine_manager";
import { DialogBox } from "./dialog";
import { DialogTexts } from "./dialog_text";

export abstract class VanishingEntity extends Entity {
  constructor(props: {
    name     : string,
    texture ?: Texture;
  }) {
    super({
      ...props,
      collidable: true,
    });

    const content = new Entity({
      name   : "VanishingEntity",
      texture: props.texture,
    })

    content.sprite.interactive = true;
    this.addChild(content);

    content.sprite.on('click', () => {
      this.startCoroutine(this.removeEntity())
    });
  }

  *removeEntity(): GameCoroutine {
    yield* DialogBox.StartDialog(DialogTexts.FirstTouchTextBefore);

    this.sprite.parent.removeChild(this.sprite);

    // yield { frames: 20 };

    yield* DialogBox.StartDialog(DialogTexts.FirstTouchTextAfter);
  }
}