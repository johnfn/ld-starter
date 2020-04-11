// Put all resources the game uses in this file and we'll preload them before
// the game starts.

export enum ResourceType {
  Image,
  Tileset,
  Spritesheet,
}

export const ResourcesToLoad = {
  "logo192.png": ResourceType.Image,
  "owo.png"    : ResourceType.Image,
};

export type ResourceName = keyof typeof ResourcesToLoad;