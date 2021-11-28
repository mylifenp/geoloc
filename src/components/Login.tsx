import {
  ChangeEventHandler,
  FormEventHandler,
  FunctionComponent,
  MouseEventHandler,
  useState,
} from "react";
import { observer } from "mobx-react-lite";
import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useSnackbar } from "notistack";
import { useStore } from "../store";
import { Credentials } from "../interfaces";

interface Props {}

const Login: FunctionComponent<Props> = observer(() => {
  const store = useStore();
  const { enqueueSnackbar } = useSnackbar();

  const [register, setRegister] = useState(false);
  const [credentials, setCredentials] = useState<Credentials>({
    email: "",
    password: "",
  });

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCancel: MouseEventHandler = (event) => {
    event.preventDefault();
    setRegister(() => {
      setCredentials({ email: "", password: "" });
      return false;
    });
  };
  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    console.log("submit");
    if (!credentials.email || !credentials.password) {
      console.log("values emptyl", credentials);
      return;
    }
    if (register) {
      store.handleRegister(credentials).then((result) => {
        if (typeof result === "object" && "error" in result) {
          enqueueSnackbar("could not register", { variant: "error" });
          return;
        }
        if (result.status === "success") {
          setRegister(false);
          enqueueSnackbar("registration success", { variant: "success" });
          return;
        }
      });
    } else {
      store.handleLogin(credentials).then((result) => {
        if (typeof result === "object" && "error" in result) {
          enqueueSnackbar(result.error, { variant: "error" });
          return;
        }
        enqueueSnackbar("login success", { variant: "success" });
      });
    }
  };

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <TextField
        label="email"
        name="email"
        variant="outlined"
        data-cy="email"
        required
        value={credentials.email}
        onChange={handleChange}
      />
      <TextField
        id="filled-basic"
        label="password"
        type="password"
        name="password"
        variant="filled"
        data-cy="password"
        value={credentials.password}
        onChange={handleChange}
        required
      />
      <Button type="button" onClick={handleCancel} data-cy="cancel">
        Cancel
      </Button>
      <Button type="submit" data-cy={!register ? "login" : "register"}>
        {!register ? "Login" : "Register"}
      </Button>

      <Button variant="text" onClick={() => setRegister(true)}>
        Sign in for a new account
      </Button>
    </Box>
  );
});

export default Login;
