import { FunctionComponent, useState } from "react";
import { observer } from "mobx-react-lite";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { Box, Button } from "@mui/material";
import { useStore } from "../store";

interface Props {}
interface Viewport {
  latitude: number;
  longitude: number;
  width: string;
  height: string;
  zoom: number;
}

const { token, styles } = require("../config.json");

const MapViewer: FunctionComponent<Props> = observer((props) => {
  const store = useStore();
  const [viewport, setViewport] = useState({
    latitude: 48.775845,
    longitude: 9.182932,
    width: "99vw",
    height: "99vh",
    zoom: 10,
  });

  const selectedLocation = store.getSelectedLocation();

  return (
    <Box sx={{ m: 0 }}>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={token}
        mapStyle={styles.ownstyle}
        onViewportChange={(viewport: Viewport) => {
          setViewport(viewport);
        }}
        onClick={(evt) => store.uiState.setCoordinates(evt.lngLat)}
      >
        {store.getLocations().map((item) => (
          <Marker
            key={item.id}
            latitude={item.latitude}
            longitude={item.longitude}
          >
            <button
              className="marker-btn"
              onClick={(e) => store.selectLocation(item)}
            >
              <img src="/marker.png" width={20} alt="icon" />
            </button>
          </Marker>
        ))}
        {selectedLocation ? (
          <Popup
            latitude={selectedLocation.getCoordinates()[1]}
            longitude={selectedLocation.getCoordinates()[0]}
            onClose={() => store.clearSelectedLocation()}
          >
            <Box sx={{ minWidth: 400 }}>
              <h2>{selectedLocation.getName()}</h2>
              {selectedLocation.getImage() && (
                <img
                  src={`${selectedLocation.getImage()}`}
                  width={180}
                  alt="image_url"
                />
              )}
              <Button onClick={() => selectedLocation.remove()}>delete</Button>
            </Box>
          </Popup>
        ) : null}
      </ReactMapGL>
    </Box>
  );
});

export default MapViewer;
