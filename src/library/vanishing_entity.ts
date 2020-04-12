import { Entity } from "./entity";
import { Texture } from "pixi.js";

export abstract class VanishingEntity extends Entity {
  constructor(props: {
    name     : string,
    texture ?: Texture;
  }) {
    super({
      ...props,
      interactable: true,
    });

    const content = new Entity({
      name   : "Bookshelf",
      texture: props.texture,
    })

    content.sprite.interactive = true;
    this.addChild(content);

    content.sprite.on('click', () => {
      this.sprite.parent.removeChild(this.sprite);
    });
  }
}