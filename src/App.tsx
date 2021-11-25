import React from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "./store";
import MapViewer from "./View/MapViewer";

// allow the choice of version1 or version2

const App = observer(() => {
  const store = useStore();
  // if (!store.uiState.getVersion()) {
  //   return <VersionChooser />;
  // }
  return <MapViewer />;
});

export default App;
