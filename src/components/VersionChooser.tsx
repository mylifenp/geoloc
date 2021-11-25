import * as React from "react";
import { FunctionComponent } from "react";
import { observer } from "mobx-react-lite";
import Button from "@mui/material/Button";
import { useStore } from "../store";

interface Props {}

const VersionChooser: FunctionComponent<Props> = observer(() => {
  const store = useStore();
  return (
    <>
      <Button
        onClick={() => store.uiState.setVersion("v1")}
        variant="contained"
      >
        User API version: 1
      </Button>
      <Button
        onClick={() => store.uiState.setVersion("v2")}
        variant="contained"
      >
        User API version: 2
      </Button>
    </>
  );
});

export default VersionChooser;
