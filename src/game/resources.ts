// Put all resources the game uses in this file and we'll preload them before
// the game starts.

export enum ResourceType {
  Image,
  TileMap,
  Spritesheet,
}

export const ResourcesToLoad = {
  "owo.png"    : ResourceType.Image,
  "map.json"   : ResourceType.TileMap,
  "music.json" : ResourceType.TileMap,
  "tileset.png": ResourceType.Image,
  "bookshelf.png": ResourceType.Image,
};

export type ResourceName = keyof typeof ResourcesToLoad;