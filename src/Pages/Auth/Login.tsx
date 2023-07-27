import React from "react";
import {
  Button,
  TextField,
  Box,
  Typography,
  Container,
  Link,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Store/store";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import useBoolean from "../../CustomHooks/useBoolean";
import { saveLoginUser } from "../../Store/Slices/authSlice";

const Login: React.FC = () => {
  const { userList } = useSelector((state: RootState) => state.auth);

  const passwordState = useBoolean(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const validationSchema = yup.object({
    email: yup.string().email("Invalid email address").required("Required"),
    password: yup.string().required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Add your login logic here
      let user = userList.find(
        (user: any) =>
          user.email === values.email && user.password === values.password
      );
      if (!!user) {
        dispatch(saveLoginUser(user));
        navigate("/dashboard");
        formik.resetForm();
      } else {
        alert("Opps!! We Could not find matching credentials");
      }
    },
  });

  // Handle the Enter key press to submit the form
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
      formik.handleSubmit();
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 8,
        }}
      >
        <Typography variant="h5">Login</Typography>
        <Box component="form" onSubmit={formik.handleSubmit}>
          <TextField
            id="email"
            name="email"
            type="email"
            label="Email"
            variant="outlined"
            margin="normal"
            fullWidth
            {...formik.getFieldProps("email")}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            onKeyDown={handleKeyPress}
          />
          <TextField
            id="password"
            name="password"
            type={passwordState.value ? "text" : "password"}
            label="Password"
            variant="outlined"
            margin="normal"
            fullWidth
            {...formik.getFieldProps("password")}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => passwordState.toggle()} edge="end">
                    {passwordState.value ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            onKeyDown={handleKeyPress}
          />
          <Button type="submit" variant="contained" fullWidth>
            Login
          </Button>
          <Typography variant="body2" mt={2}>
            Don't have an account?{" "}
            <Link href="/sign-up" underline="always">
              Signup
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
