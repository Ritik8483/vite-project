import React from "react";
import { TextField, Box, Button } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveAuthToken } from "../redux/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userToken = JSON.parse(localStorage.getItem("token") || "{}");
  console.log("userToken", userToken);

  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "Password should be of minimum 8 characters length")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      localStorage.setItem("token", JSON.stringify({ user: values.email }));
      dispatch(saveAuthToken({ user: values.email }));
    },
  });

  const { values, handleChange, touched, isSubmitting, handleSubmit, errors } =
    formik;

  return (
    <>
      <Box>
        <form
          style={{
            display: "flex",
            justifyContent: "center",
            minHeight: "100vh",
            alignItems: "center",
            gap: "20px",
            flexDirection: "column",
          }}
          onSubmit={handleSubmit}
        >
          <TextField
            id="outlined-basic"
            name="email"
            label="Email"
            variant="outlined"
            onChange={handleChange}
            error={touched.email && Boolean(errors.email)}
            value={values.email}
            helperText={touched.email && errors.email}
          />
          <TextField
            id="outlined-basic"
            name="password"
            onChange={handleChange}
            error={touched.password && Boolean(errors.password)}
            value={values.password}
            helperText={touched.password && errors.password}
            label="Password"
            variant="outlined"
          />
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </form>
      </Box>
    </>
  );
};

export default Login;
