import {
  FunctionComponent,
  useState,
  useEffect,
  SyntheticEvent,
  MouseEventHandler,
} from "react";
import { observer } from "mobx-react-lite";
import "mapbox-gl/dist/mapbox-gl.css";
import { svg } from "../assets/red";
import ReactMapboxGl, {
  Image,
  Layer,
  Feature,
  Popup,
  Marker,
  GeoJSONLayer,
} from "react-mapbox-gl";
import { FitBounds } from "react-mapbox-gl/lib/map";
import marker from "../assets/images/marker.png";
import { marker as makerSVG } from "../assets/marker";
import { useStore } from "../store";
import { MapEvent } from "react-mapbox-gl/lib/map-events";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box,
  Grid,
} from "@mui/material";
import AddNewLocationButton from "../components/AddNewLocationButton";
import { LocationStore } from "../store/Location";
import LocationInfo from "../components/LocationInfo";

interface Props {
  onStyleLoad?: (map: any) => any;
}

interface State {
  fitBounds?: [[number, number], [number, number]];
  center: [number, number];
  zoom: [number];
  location?: Location;
  locations: Location[];
}
const { token } = require("../config.json");

const Mapbox = ReactMapboxGl({
  accessToken: token,
});

// const maxBounds = [
//   [-0.481747846041145, 51.3233379650232],
//   [0.23441119994140536, 51.654967740310525],
// ] as FitBounds;

// const layoutLayer = { "icon-image": "red" };

// const image = new Image();
// image.src = "data:image/svg+xml;charset=utf-8;base64," + btoa(svg);
// const images: any = ["red", image];

const MapViewer: FunctionComponent<Props> = observer((props) => {
  const store = useStore();
  const [locations, setLocations] = useState<LocationStore[] | []>([]);
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const [selectedLocation, setSelectedLocation] =
    useState<LocationStore | null>(null);
  const [state, setState] = useState<State>({
    fitBounds: undefined,
    center: [9.11221099168304, 48.84976061593608],
    zoom: [11],
    location: undefined,
    locations: [],
  });

  useEffect(() => {
    store.fetchLocationsData();
  }, [store]);

  useEffect(() => {
    setLocations(() => store.getLocations());
  }, [store, store.getLocations().length]);

  const handleAddMarker: MapEvent = (map, evt: any) => {
    const { lngLat } = evt;
    const { lng, lat } = lngLat;
    console.log("lng, lat", lng, lat);
    setLocation(() => ({ lat, lng }));
  };

  const handleMarkerClick = (location: LocationStore) => {
    if (!location) return;
    setSelectedLocation(location);
  };

  const handleClose: MouseEventHandler = (event) => {
    setSelectedLocation(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <Mapbox
            style={"mapbox://styles/mylifenp/ck9072mp50f551ipc4vqlokz9"}
            containerStyle={{
              height: "90vh",
              width: "90vw",
            }}
            onClick={handleAddMarker}
          >
            {locations.map((location) => (
              <Marker
                coordinates={location.getCoordinates()}
                anchor="bottom"
                onClick={(e) => handleMarkerClick(location)}
              >
                <div className="mapMarkerStyle" />
              </Marker>
            ))}
          </Mapbox>
        </Grid>
        <Grid item xs={2}>
          <AddNewLocationButton {...location} />
        </Grid>
      </Grid>
      {selectedLocation && (
        <Dialog open={!!selectedLocation} onClose={handleClose}>
          <DialogTitle id="alert-dialog-title">
            {"Use Google's location service?"}
          </DialogTitle>
          <DialogContent>
            <LocationInfo location={selectedLocation} onClose={handleClose} />
          </DialogContent>
        </Dialog>
      )}
    </Box>
  );
});

export default MapViewer;
