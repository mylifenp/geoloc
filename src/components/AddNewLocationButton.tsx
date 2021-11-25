import {
  FunctionComponent,
  useState,
  MouseEventHandler,
  ChangeEvent,
} from "react";
import AddIcon from "@mui/icons-material/Add";
import { observer } from "mobx-react-lite";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  TextField,
} from "@mui/material";
import { useStore } from "../store";
import { LocationSnapshotIn } from "../store/Location";

interface Props {
  lat: number;
  lng: number;
}

const AddNewLocationButton: FunctionComponent<Props> = observer(
  ({ lat, lng }) => {
    const store = useStore();
    const [open, setOpen] = useState(false);
    const [newLocation, setNewLocation] = useState<
      Omit<LocationSnapshotIn, "id">
    >({
      latitude: lat,
      longitude: lng,
      name: "",
      imageUrl: "",
    });

    const handleAddNewLocation: MouseEventHandler = (event) => {
      event.preventDefault();
      setNewLocation(() => {
        setOpen(true);
        return {
          latitude: lat,
          longitude: lng,
          name: "",
          imageUrl: "",
        };
      });
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
      const { name, value } = event.target;
      setNewLocation((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };

    const handleClose: MouseEventHandler = (event) => {
      setOpen(false);
    };

    const handleAdd: MouseEventHandler = (event) => {
      event.preventDefault();
      console.log("new location", newLocation);
      store.addNewLocation(newLocation).then(() => setOpen(false));
    };
    if (!lat && !lng) return null;
    return (
      <>
        <Button
          onClick={handleAddNewLocation}
          variant="outlined"
          startIcon={<AddIcon />}
          color="primary"
          aria-label="add"
        >
          Add
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle id="alert-dialog-title">
            {"Use Google's location service?"}
          </DialogTitle>
          <DialogContent>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-basic"
                label="name"
                name="name"
                variant="outlined"
                value={newLocation.name}
                required
                onChange={handleChange}
              />
              <TextField
                id="outlined-basic"
                label="imageUrl"
                name="imageUrl"
                variant="outlined"
                value={newLocation.imageUrl}
                required
                onChange={handleChange}
              />
              <TextField
                id="outlined-basic"
                label="latitude"
                name="latitude"
                variant="outlined"
                value={newLocation.latitude}
                onChange={handleChange}
              />
              <TextField
                id="outlined-basic"
                label="longitude"
                name="longitude"
                variant="outlined"
                value={newLocation.longitude}
                onChange={handleChange}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button onClick={handleAdd} autoFocus>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
);

export default AddNewLocationButton;
