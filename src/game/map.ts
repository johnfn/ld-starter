import { Game } from "./game";
import { TiledTilemap } from "../library/tilemap/tilemap";
import { Rect } from "../library/rect";
import { Entity } from "../library/entity";

export class GameMap extends Entity {
  tilemap: TiledTilemap;

  constructor() {
    super({ });

    this.tilemap = new TiledTilemap({
      pathToTilemap: "",
      json         : Game.Instance.assets.getResource("map.json").data,
      renderer     : Game.Instance.renderer,
      customObjects: [],
      game         : Game.Instance,
    });

    const layers = this.tilemap.loadLayersInRect(new Rect({
      x     : 0,
      y     : 0,
      width : 640,
      height: 640,
    }));

    for (const layer of layers) {
      this.addChild(layer.entity);
    }
  }
}