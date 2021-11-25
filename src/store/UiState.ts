import { types, Instance, SnapshotIn, SnapshotOut } from "mobx-state-tree";

export interface UiStateStore extends Instance<typeof UiState> {}
export interface UiStateSnapshotIn extends SnapshotIn<typeof UiState> {}
export interface UiStateSnapshotOut extends SnapshotOut<typeof UiState> {}

export const UiState = types
  .model("UiState", {
    version: types.string,
  })
  .views((self) => ({
    getVersion() {
      return self.version;
    },
  }))
  .actions((self) => ({
    setVersion(version: string) {
      self.version = version;
    },
  }));

export default UiState;
