import React, { useId } from "react";
import {
  Button,
  TextField,
  Box,
  Typography,
  Container,
  IconButton,
  InputAdornment,
  Link,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createUser } from "../../Store/Slices/authSlice";
import useBoolean from "../../CustomHooks/useBoolean";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface UserPayload {
  id: string;
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const passwordState = useBoolean(false);
  const confirmPasswordState = useBoolean(false);
  const userId = useId();

  const validationSchema = yup.object({
    name: yup.string().required("Required"),
    email: yup.string().email("Invalid email address").required("Required"),
    password: yup
      .string()
      .required("Required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Add your login logic here
      const payload: UserPayload = {
        id: userId,
        name: values.name,
        email: values.email,
        password: values.password,
      };

      dispatch(createUser(payload));
      navigate("/dashboard");
      formik.resetForm();
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
        <Typography variant="h5">Sign Up</Typography>
        <Box component="form" onSubmit={formik.handleSubmit}>
          <TextField
            id="name"
            name="name"
            type="name"
            label="Name"
            variant="outlined"
            margin="normal"
            fullWidth
            {...formik.getFieldProps("name")}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            onKeyDown={handleKeyPress}
          />
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
          <TextField
            id="confirmPassword"
            name="confirmPassword"
            type={confirmPasswordState.value ? "text" : "password"}
            label="Confirm Password"
            variant="outlined"
            margin="normal"
            fullWidth
            {...formik.getFieldProps("confirmPassword")}
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => confirmPasswordState.toggle()}
                    edge="end"
                  >
                    {confirmPasswordState.value ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            onKeyDown={handleKeyPress}
          />
          <Button type="submit" variant="contained" fullWidth>
            Sign Up
          </Button>
          <Typography variant="body2" mt={2}>
            Already have an account ?{" "}
            <Link href="/" underline="always">
              Login
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
