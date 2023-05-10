import { TextField, Button, Modal, Box, Typography } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useState } from "react";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

interface ModalProps {
  open: boolean;
  setOpen: Function;
}

const AddFieldModal = ({ ...props }: ModalProps) => {
  const { open, setOpen } = props;
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [validated, setValidated] = useState(false);
  const [names, setNames] = useState<any>([
    {
      firstName: "",
      lastName: "",
    },
  ]);
  const handleChangeInput = (event: any, index: number) => {
    const values: any = JSON.parse(JSON.stringify(names));
    values[index][event.target.name] = event.target.value;
    setNames(values);
  };
  console.log("names", names);

  const handleAddFields = (inputField: any) => {
    if (inputField?.firstName === "" || inputField?.lastName === "") {
      setValidated(true);
      return;
    }
   
    setValidated(false);
    setNames([...names, { firstName: "", lastName: "" }]);
    // const formData = new FormData(); // names.map((item: any) => item.firstName === "" || item.lastName === "" );
    // names.map((item: any) => {
    //   console.log("called", item);

    //   if (item.firstName === "" || item.lastName === "") {
    //     return;
    //   }
    // });
    // formData.append("file", "");
  };
  const handleRemoveFields = (index: number) => {
    const values = [...names];
    console.log(values);
    if (values.length === 1) {
      return;
    }
    values.splice(index, 1);
    setNames(values);
  };
  const useStyles: any = makeStyles(() =>
    createStyles({
      outerBox: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "20px",
        gap: "10px",
      },
      formBox: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        width: "80%",
      },
      iconsBox: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
      },
    })
  );
  const classes: any = useStyles();
  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form>
            {names.map(
              (
                item: { firstName: string; lastName: string },
                index: number
              ) => {
                console.log("item", item);

                return (
                  <Box key={index} className={classes.outerBox}>
                    <Box className={classes.formBox}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "10px",
                        }}
                      >
                        <TextField
                          value={item.firstName}
                          id="outlined-basic"
                          name="firstName"
                          label="First Name"
                          variant="outlined"
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleChangeInput(e, index)
                          }
                        />
                        {item.firstName === "" && validated ? (
                          <Typography sx={{ color: "red" }}>
                            Please enter first name
                          </Typography>
                        ) : (
                          <></>
                        )}
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "10px",
                        }}
                      >
                        <TextField
                          value={item.lastName}
                          id="outlined-basic"
                          name="lastName"
                          label="Last Name"
                          variant="outlined"
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleChangeInput(e, index)
                          }
                        />
                        {item.lastName === "" && validated ? (
                          <Typography sx={{ color: "red" }}>
                            Please enter last name
                          </Typography>
                        ) : (
                          <></>
                        )}
                      </Box>
                    </Box>
                    <Box className={classes.iconsBox}>
                      <RemoveIcon
                        onClick={() => handleRemoveFields(index)}
                        sx={
                          names.length === 1
                            ? { cursor: "not-allowed" }
                            : { cursor: "pointer" }
                        }
                      />
                      <AddIcon
                        onClick={() => handleAddFields(item)}
                        sx={{ cursor: "pointer" }}
                      />
                    </Box>
                  </Box>
                );
              }
            )}
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default AddFieldModal;
