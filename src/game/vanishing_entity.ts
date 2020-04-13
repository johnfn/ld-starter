import { Entity } from "../library/entity";
import { Texture } from "pixi.js";

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
      this.sprite.parent.removeChild(this.sprite);
    });
  }
}