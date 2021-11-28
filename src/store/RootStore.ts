import {
  types,
  Instance,
  SnapshotIn,
  SnapshotOut,
  applySnapshot,
  detach,
  destroy,
  isValidReference,
} from "mobx-state-tree";
import Cookies from "js-cookie";
import Location, { LocationSnapshotIn, LocationModel } from "./Location";

import UiState from "./UiState";
import { flow } from "mobx";
import { ApiCalls } from "../utilities";
import { Credentials } from "../interfaces";

export interface RootStoreModel extends Instance<typeof RootStore> {}
export interface RootStoreSnapshotIn extends SnapshotIn<typeof RootStore> {}
export interface RootStoreSnapshotOut extends SnapshotOut<typeof RootStore> {}

export const RootStore = types
  .model("RootStore", {
    uiState: UiState,
    locations: types.optional(types.map(Location), {}),
    selectedLocation: types.maybe(types.reference(Location)),
  })
  .views((self) => ({
    getLocations() {
      return Array.from(self.locations.values());
    },
    getSelectedLocation() {
      return isValidReference(() => self.selectedLocation)
        ? self.selectedLocation
        : undefined;
    },
  }))
  .actions((self) => ({
    addLocation(location: LocationSnapshotIn) {
      self.locations.put({ ...location });
    },
    selectLocation(location: LocationModel) {
      self.selectedLocation = location;
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
  }))
  .actions((self) => ({
    handleLogin: flow(function* handleLogin(credentials: Credentials) {
      const endpoint = `auth/login`;
      const result = yield ApiCalls(endpoint, credentials).apiPost();
      console.log("result", result);
      if (typeof result !== "object") {
        return { error: "fatal error" };
      }
      if (typeof result === "object" && "error" in result) return result;
      const { token, expires } = result;
      let _exp = (expires - Date.now() / 1000) / 86400;
      Cookies.set("token", token, { expires: _exp });
      self.uiState.setLogged();
      self.fetchLocationsData();
      return {};
    }),
    handleRegister: flow(function* handleSingin(credentials: Credentials) {
      const endpoint = `auth/register`;
      const result = yield ApiCalls(endpoint, credentials).apiPost();
      console.log("result", result);
      if (typeof result !== "object") {
        return { error: "fatal error" };
      }
      return result;
    }),
  }))
  .actions((self) => ({
    afterCreate() {
      const token = Cookies.get("token");
      console.log("just got refreshed");
      if (!token) return;
      self.uiState.setLogged();
      self.fetchLocationsData();
    },
  }));

export default RootStore;
