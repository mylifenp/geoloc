import {
  types,
  Instance,
  SnapshotIn,
  SnapshotOut,
  applySnapshot,
  detach,
  destroy,
} from "mobx-state-tree";
import Location, { LocationSnapshotIn } from "./Location";
import UiState from "./UiState";
import { flow } from "mobx";
import { ApiCalls } from "../utilities";

export interface RootStoreModel extends Instance<typeof RootStore> {}
export interface RootStoreSnapshotIn extends SnapshotIn<typeof RootStore> {}
export interface RootStoreSnapshotOut extends SnapshotOut<typeof RootStore> {}

export const RootStore = types
  .model("RootStore", {
    uiState: UiState,
    locations: types.optional(types.map(Location), {}),
  })
  .views((self) => ({
    getLocations() {
      return Array.from(self.locations.values());
    },
  }))
  .actions((self) => ({
    addLocation(location: LocationSnapshotIn) {
      self.locations.put({ ...location });
    },
  }))
  .actions((self) => ({
    fetchLocationsData: flow(function* fetchLocationsData() {
      const endpoint = `locations`;
      const result = yield ApiCalls(endpoint).apiGet();
      if (typeof result === "object" && "error" in result && result.error) {
        return result;
      } else {
        result.forEach((item: LocationSnapshotIn) => self.addLocation(item));
      }
    }),
    addNewLocation: flow(function* addNewLocation(location) {
      const endpoint = "location";
      const result = yield ApiCalls(endpoint, location).apiPost();
      if (typeof result === "object" && "error" in result && result.error) {
        return result;
      } else {
        self.addLocation(result);
      }
    }),
    editLocation: flow(function* editLocation(location) {
      const endpoint = `location/${location.id}`;
      const result = yield ApiCalls(endpoint, location).apiPut();
      if (typeof result === "object" && "error" in result && result.error) {
        return result;
      } else {
        const _location = self.locations.get(location.id);
        if (!_location) return;
        applySnapshot(_location, result);
      }
    }),
    deleteLocation: flow(function* deleteLocation(location) {
      const endpoint = `location/${location.id}`;
      const result = yield ApiCalls(endpoint).apiDelete();
      if (typeof result === "object" && "error" in result && result.error) {
        return result;
      } else {
        detach(location);
        destroy(location);
      }
    }),
  }));

export default RootStore;
