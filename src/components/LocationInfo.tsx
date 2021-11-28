import {
  FunctionComponent,
  useState,
  useEffect,
  SyntheticEvent,
  MouseEventHandler,
  Fragment,
  ChangeEvent,
} from "react";
import { observer } from "mobx-react-lite";
import { LocationModel } from "../store/Location";
import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface Props {
  location: LocationModel;
  onClose: MouseEventHandler<Element>;
}

const LocationInfo: FunctionComponent<Props> = observer(
  ({ location, onClose }) => {
    const [editLocation, setEditLocation] = useState<LocationModel | null>(
      null
    );
    const [cloneLocation, setCloneLocation] = useState<LocationModel | null>(
      null
    );

    const handleEditLocation: MouseEventHandler = (event) => {
      event.preventDefault();
      if (!location) return;
      setEditLocation(() => {
        setCloneLocation(location);
        return location;
      });
    };

    const handleDeleteLocation: MouseEventHandler = (event) => {
      event.preventDefault();
      setEditLocation(() => {
        location.remove();
        onClose(event);
        return null;
      });
    };

    const handleCancelEdit: MouseEventHandler = (event) => {
      event.preventDefault();
      setCloneLocation(() => {
        setEditLocation(null);
        return null;
      });
    };

    return (
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            width: 550,
            height: 340,
          },
        }}
      >
        <Paper elevation={0}>
          <Grid container spacing={2} maxWidth="md">
            {!editLocation
              ? Object.entries(location.toShow()).map((item, index) => (
                  <Fragment key={index}>
                    <Grid item xs={4}>
                      <Typography>{item[0]}</Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography>{item[1]}</Typography>
                    </Grid>
                  </Fragment>
                ))
              : cloneLocation && (
                  <Fragment>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        value={cloneLocation.name}
                        onChange={(e) => cloneLocation.setName(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        value={cloneLocation.imageurl}
                        onChange={(e) =>
                          cloneLocation.setimageurl(e.target.value)
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        value={cloneLocation.latitude}
                        onChange={(e) =>
                          cloneLocation.setLatitude(
                            parseInt(e.target.value, 10)
                          )
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        value={cloneLocation.longitude}
                        onChange={(e) =>
                          cloneLocation.setLongitude(
                            parseInt(e.target.value, 10)
                          )
                        }
                      />
                    </Grid>
                  </Fragment>
                )}
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button
                startIcon={<EditIcon fontSize="large" />}
                onClick={handleEditLocation}
              >
                {"Edit"}
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                startIcon={<DeleteIcon fontSize="large" />}
                onClick={handleDeleteLocation}
              >
                Delete
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    );
  }
);

export default LocationInfo;
