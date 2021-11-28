import {
  FunctionComponent,
  useState,
  ChangeEventHandler,
  MouseEventHandler,
} from "react";
import { observer } from "mobx-react-lite";
import { Box } from "@mui/system";
import { useStore } from "../store";
import Login from "../components/Login";
import { Button, TextField, Typography } from "@mui/material";
import { BACKEND_URL } from "../config";
import Cookies from "js-cookie";

interface Props {}
// interface LocationState {
//   latitude: number | undefined;
//   longitude: number | undefined;
//   name: string;
//   imageurl: null | string;
// }

const Sidebar: FunctionComponent<Props> = observer(() => {
  const store = useStore();
  const { uiState } = store;
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [location, setLocation] = useState({
    latitude: undefined,
    longitude: undefined,
    name: "",
    imageurl: null,
  });

  const handleImageSelect: ChangeEventHandler<HTMLInputElement> = (event) => {
    event.preventDefault();
    const { files } = event.target;
    if (!files || !files.length) return;
    setSelectedImage(files[0]);
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setLocation((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave: MouseEventHandler = async (event) => {
    event.preventDefault();
    let imageurl: string | null = null;
    if (selectedImage) {
      // upload the image and wait for the imageurl
      const headers = new Headers({
        token: Cookies.get("token") || "",
      });
      const formData = new FormData();
      formData.append("image", selectedImage, selectedImage.name);
      const response = await window.fetch(`${BACKEND_URL}upload/`, {
        method: "post",
        headers,
        body: formData,
      });
      const data = await response.json();
      imageurl = data.imageurl;
      store.addNewLocation({
        ...location,
        latitude: uiState.getLatitude(),
        longitude: uiState.getLongitude(),
        imageurl,
      });
    } else {
      store.addNewLocation({
        ...location,
        latitude: uiState.getLatitude(),
        longitude: uiState.getLongitude(),
        imageurl: null,
      });
    }
    setSelectedImage(() => {
      setLocation({
        latitude: undefined,
        longitude: undefined,
        name: "",
        imageurl: null,
      });
      return null;
    });
  };

  if (!uiState.getLogged()) {
    return <Login />;
  }
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "100%" },
      }}
      noValidate
      autoComplete="off"
    >
      <Typography>{`${uiState.getLatitude() ? uiState.getLatitude() : "--"}, ${
        uiState.getLongitude() ? uiState.getLongitude() : "--"
      }`}</Typography>
      <TextField
        label="Name"
        name="name"
        variant="outlined"
        fullWidth
        value={location.name}
        onChange={handleChange}
      />
      <Typography>{!selectedImage ? null : `${selectedImage.name}`}</Typography>
      <Button variant="contained" component="label">
        select Image
        <input type="file" hidden onChange={handleImageSelect} />
      </Button>

      <Button variant="outlined" onClick={handleSave}>
        save location
      </Button>
    </Box>
  );
});

export default Sidebar;
