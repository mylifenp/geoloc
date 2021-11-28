import { observer } from "mobx-react-lite";
import Dashboard from "./View/Dashboard";

// allow the choice of version1 or version2

const App = observer(() => {
  return <Dashboard />;
});

export default App;
