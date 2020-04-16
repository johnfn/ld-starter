declare namespace Library {
  export enum Mode {
    Dialog,
  }
}


// export class ModeEntity extends Entity<GameState> {
//   shouldUpdate(state: GameState) {
//     return this.activeModes.includes(state.mode);
//   }

//   baseUpdate(state: GameState): void {
//     if (this.shouldUpdate(state)) {
//       for (const cb of this.queuedUpdates) {
//         cb(state);
//       }

//       this.update(state);
//     }

//     this.queuedUpdates = [];
//   }
// }