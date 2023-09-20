import React, { useState } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const DeleteProfile = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleDelete = () => {};

  const handleCancel = () => {};

  return (
    <Box
      width={{ xl: "50%", sm: "85%", xs: "95%", lg: "65%" }}
      height={{ xl: 500, sm: 550, xs: 650, lg: 500 }}
      marginBottom={{ sm: "40px", xs: "50px" }}
      marginX={{ xs: "50px" }}
      borderRadius={{
        xs: "32px",
        sm: "40px",
        md: "50px",
        lg: "50px",
        xl: "50px",
      }}
      sx={{
        backgroundColor: "#71C887",
        marginTop: "120px",

        marginX: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <Avatar
        alt="Placeholder Image"
        src="https://via.placeholder.com/150" //sample url
        sx={{
          width: 150,
          height: 150,
          backgroundColor: "#fff",
          borderRadius: "50%",
          position: "absolute",
          top: -75,
        }}
      />

      <Stack marginTop={{ xs: 0, sm: 4, md: 5, lg: 5, xl: 5 }}>
        <Typography
          variant="h4"
          color="white"
          fontWeight="bold"
          marginBottom="50px"
          textAlign="center"
        >
          Delete Account
        </Typography>
        <Typography
          variant="body1"
          textAlign="left"
          marginLeft={{ xs: 3, sm: 3, md: 0, lg: 0, xl: 0 }}
          marginBottom="10px"
          color="white"
        >
          We are sorry to hear that you want to delete your account.
        </Typography>
        <TextField
          label="Password"
          placeholder="Enter password"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          margin="normal"
          sx={{
            marginBottom: "50px",
            marginLeft: {
              xs: 3,
              sm: 3,
              md: 0,
              lg: 0,
              xl: 0,
            },
            "& .MuiInputLabel-root": {
              color: "white",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "white",
              },
              "&:hover fieldset": {
                borderColor: "white",
              },
              "&.Mui-focused fieldset": {
                borderColor: "white",
              },
            },
          }}
          InputProps={{
            sx: {
              width: `calc(100% - ${75 / 4}% - 16px)`,
              color: "white",
            },
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleTogglePasswordVisibility}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Typography
          variant="body2"
          textAlign="left"
          marginBottom="20px"
          color="white"
          marginLeft={{ xs: 3, sm: 3, md: 0, lg: 0, xl: 0 }}
        >
          If you choose to continue, your account details, and other related
          data will also be deleted.
        </Typography>
        <Typography
          variant="body2"
          textAlign="left"
          marginBottom="10px"
          color="white"
          marginLeft={{ xs: 3, sm: 3, md: 0, lg: 0, xl: 0 }}
        >
          Do you still want to delete your account?
        </Typography>
      </Stack>
      <Box
        marginTop={{
          xs: "50px",
          sm: "20px",
          md: "20px",
          lg: "20px",
          xl: "20px",
        }}
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          width: "100%",
          marginRight: "15%",
        }}
      >
        <Button
          variant="contained"
          sx={{
            width: "130px",
            height: "40px",
            borderRadius: "50px",
            color: "white",
            backgroundColor: "#CCCCCC",
            boxShadow: "0px 4px 4px 0px #00000040",
            "&:hover": {
              backgroundColor: "red",
            },
          }}
        >
          Delete
        </Button>

        <Button
          variant="contained"
          sx={{
            width: "130px",
            height: "40px",
            borderRadius: "50px",
            color: "#71C887",
            marginLeft: "10px",
            backgroundColor: "white",
            "&:hover": {
              backgroundColor: "green",
            },
          }}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default DeleteProfile;
