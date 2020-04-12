import { Game } from "./game";
import { TiledTilemap } from "../library/tilemap/tilemap";
import { Rect } from "../library/rect";
import { Entity } from "../library/entity";
import { TilemapRegion } from "../library/tilemap/tilemap_data";

export class GameMap extends Entity {
  artMap         : TiledTilemap;
  musicRegionsMap: TiledTilemap;

  musicRegions   : TilemapRegion[] = [];

  public static Instance: GameMap;

  constructor() {
    super({ 
      name: "Map",
    });

    GameMap.Instance = this;

    this.artMap = new TiledTilemap({
      pathToTilemap: "",
      json         : Game.Instance.assets.getResource("map.json").data,
      renderer     : Game.Instance.renderer,
      customObjects: [],
      game         : Game.Instance,
    });

    this.musicRegionsMap = new TiledTilemap({
      pathToTilemap: "",
      json         : Game.Instance.assets.getResource("music.json").data,
      renderer     : Game.Instance.renderer,
      customObjects: [{
        type     : "rect",
        layerName: "Music Layer",
        process  : (rect: TilemapRegion) => {
          this.musicRegions.push(rect);
        }
      }],
      game         : Game.Instance,
    });

    this.loadMap();
  }

  loadMap() {
    const layers = this.artMap.loadLayersInRect(new Rect({
      x     : 0,
      y     : 0,
      width : 640,
      height: 640,
    }));

    for (const layer of layers) {
      this.addChild(layer.entity);
    }
  }

  loadMusicRegions() {
  }
}