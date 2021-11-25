import {
  types,
  Instance,
  SnapshotIn,
  SnapshotOut,
  getRoot,
} from "mobx-state-tree";
import { RootStoreModel } from "./RootStore";

export interface LocationStore extends Instance<typeof Location> {}
export interface LocationSnapshotIn extends SnapshotIn<typeof Location> {}
export interface LocationSnapshotOut extends SnapshotOut<typeof Location> {}

export const Location = types
  .model("Location", {
    id: types.identifier,
    latitude: types.number,
    longitude: types.number,
    name: types.string,
    imageUrl: types.string,
  })
  .views((self) => ({
    getCoordinates() {
      return [self.longitude, self.latitude];
    },
    toShow() {
      return {
        name: self.name,
        imageUrl: self.imageUrl,
        latitude: self.latitude,
        longitude: self.longitude,
      };
    },
  }))
  .actions((self) => ({
    setName(name: string) {
      self.name = name;
    },
    setImageUrl(url: string) {
      self.imageUrl = url;
    },
    setLatitude(lat: number) {
      self.latitude = lat;
    },
    setLongitude(lng: number) {
      self.longitude = lng;
    },
    // setValue<
    //   K extends keyof SnapshotIn<typeof self>,
    //   T extends SnapshotIn<typeof self>
    // >(key: K, value: T | null) {
    //   if (!value) {
    //     self[key] = "" as never;
    //     return;
    //   }
    //   self[key] = value as any;
    // },
    remove() {
      getRoot<RootStoreModel>(self).deleteLocation(self);
    },
  }));

export default Location;
