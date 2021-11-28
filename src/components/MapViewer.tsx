import { FunctionComponent, useState } from "react";
import { observer } from "mobx-react-lite";
import MarkerIcon from "../assets/images/marker.png";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { Box, IconButton } from "@mui/material";
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
    width: "80vw",
    height: "100vh",
    zoom: 10,
  });

  return (
    <Box sx={{ flexGrow: 1 }}>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={token}
        mapStyle={styles.ownstyle}
        onViewportChange={(viewport: Viewport) => {
          setViewport(viewport);
        }}
      >
        {store.getLocations().map((item) => (
          <Marker
            key={item.id}
            latitude={item.latitude}
            longitude={item.longitude}
          >
            <IconButton>
              <MarkerIcon />
            </IconButton>
          </Marker>
        ))}
      </ReactMapGL>
    </Box>
  );
});

export default MapViewer;
