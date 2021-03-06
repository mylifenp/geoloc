import {
  types,
  Instance,
  SnapshotIn,
  SnapshotOut,
  getRoot,
} from "mobx-state-tree";
import { RootStoreModel } from "./RootStore";

export interface LocationModel extends Instance<typeof Location> {}
export interface LocationSnapshotIn extends SnapshotIn<typeof Location> {}
export interface LocationSnapshotOut extends SnapshotOut<typeof Location> {}

export const Location = types
  .model("Location", {
    id: types.identifierNumber,
    latitude: types.number,
    longitude: types.number,
    name: types.string,
    imageurl: types.maybeNull(types.string),
  })
  .views((self) => ({
    getCoordinates() {
      return [self.longitude, self.latitude];
    },
    getName() {
      return self.name;
    },
    getImage() {
      return self.imageurl;
    },
    toShow() {
      return {
        name: self.name,
        imageurl: self.imageurl,
        latitude: self.latitude,
        longitude: self.longitude,
      };
    },
  }))
  .actions((self) => ({
    setName(name: string) {
      self.name = name;
    },
    setimageurl(url: string) {
      self.imageurl = url;
    },
    setLatitude(lat: number) {
      self.latitude = lat;
    },
    setLongitude(lng: number) {
      self.longitude = lng;
    },
    remove() {
      getRoot<RootStoreModel>(self).deleteLocation(self);
    },
  }));

export default Location;
