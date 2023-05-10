import React, { useState } from "react";
import { Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../redux/authSlice";
import { makeStyles, createStyles } from "@mui/styles";
import AddFieldModal from "./AddFieldModal";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    dispatch(logOut({}));
  };

  const useStyles: any = makeStyles(() =>
    createStyles({
      imageBox: {
        fontSize: "50px",
        color: "red",
      },
    })
  );
  const classes: any = useStyles();
  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        flexDirection="column"
      >
        <Typography
          className={classes.imageBox}
          sx={{
            fontFamily: "mulish",
            border: "1px solid black",
            cursor: "pointer",
          }}
          variant="h2"
          onClick={() => setOpen(true)}
        >
          Dynamic field modal
        </Typography>
        <Button variant="contained" onClick={handleLogout}>
          Logout
        </Button>
        <Button
          sx={{ marginTop: "10px" }}
          variant="contained"
          onClick={() => navigate("/table")}
        >
          Table
        </Button>
        {open && <AddFieldModal open={open} setOpen={setOpen} />}
      </Box>
    </>
  );
};

export default Home;
