import { Game } from "./game";
import { TiledTilemap } from "../library/tilemap/tilemap";
import { Rect } from "../library/rect";
import { Entity } from "../library/entity";
import { TilemapRegion } from "../library/tilemap/tilemap_data";
import { GenericItem } from "./bookshelf";
import { Texture } from "pixi.js";

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
      customObjects: [
        {
          type     : "single",
          name     : "fridge",
          getInstanceType: (tex: Texture, tileProperties: { [key: string]: unknown }, layerName: string) => {
            return new GenericItem(tex,
              tileProperties["description"] as string
            );
          }
        },

        {
          type     : "single",
          name     : "toilet",
          getInstanceType: (tex: Texture, tileProperties: { [key: string]: unknown }, layerName: string) => {
            return new GenericItem(tex, 
              tileProperties["description"] as string
            );
          }
        },

        {
          type     : "single",
          name     : "tv",
          getInstanceType: (tex: Texture, tileProperties: { [key: string]: unknown }, layerName: string) => {
            return new GenericItem(tex, 
              tileProperties["description"] as string
            );
          }
        },
        {
          type     : "single",
          name     : "bookshelf",
          getInstanceType: (tex: Texture, tileProperties: { [key: string]: unknown }, layerName: string) => {
            return new GenericItem(tex, 
              tileProperties["description"] as string
            );
          }
        },
        {
          type     : "single",
          name     : "photo frame",
          getInstanceType: (tex: Texture, tileProperties: { [key: string]: unknown }, layerName: string) => {
            return new GenericItem(tex, 
              tileProperties["description"] as string
            );
          }
        },
        {
          type     : "single",
          name     : "sofa",
          getInstanceType: (tex: Texture, tileProperties: { [key: string]: unknown }, layerName: string) => {
            return new GenericItem(tex, 
              tileProperties["description"] as string
            );
          }
        },
        {
          type     : "single",
          name     : "table",
          getInstanceType: (tex: Texture, tileProperties: { [key: string]: unknown }, layerName: string) => {
            return new GenericItem(tex, 
              tileProperties["description"] as string
            );
          }
        },
        {
          type     : "single",
          name     : "bed",
          getInstanceType: (tex: Texture, tileProperties: { [key: string]: unknown }, layerName: string) => {
            return new GenericItem(tex, 
              tileProperties["description"] as string
            );
          }
        },
        {
          type     : "single",
          name     : "lamp",
          getInstanceType: (tex: Texture, tileProperties: { [key: string]: unknown }, layerName: string) => {
            return new GenericItem(tex, 
              tileProperties["description"] as string
            );
          }
        },
        {
          type     : "single",
          name     : "laptop",
          getInstanceType: (tex: Texture, tileProperties: { [key: string]: unknown }, layerName: string) => {
            return new GenericItem(tex, 
              tileProperties["description"] as string
            );
          }
        },
    ],
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
      width : 5000,
      height: 5000,
    }));

    for (const layer of layers) {
      this.addChild(layer.entity);
    }
  }

  loadMusicRegions() {
  }
}