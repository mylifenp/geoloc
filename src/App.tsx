import React from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "./store";
import Dashboard from "./View/Dashboard";

// allow the choice of version1 or version2

const App = observer(() => {
  const store = useStore();
  return <Dashboard />;
});

export default App;
