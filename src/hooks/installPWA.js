import { Button, Grid, Box, Avatar, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const InstallPWA = () => {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState(null);
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      console.log("we are being triggered :D");
      setSupportsPWA(true);
      setPromptInstall(e);
    };
    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("transitionend", handler);
  }, []);

  const onClick = (evt) => {
    evt.preventDefault();
    if (!promptInstall) {
      return;
    }
    promptInstall.prompt();
  };
  if (!supportsPWA) {
    return null;
  }
  return (
    <Box
      sx={{ backgroundColor: (theme) => theme.palette.secondary.main, mt: 2, display: showBanner ? 'flex' : 'none' }}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        direction="row"
        sx={{ mb: 2, mt: 2 }}
        spacing={1}
      >
        <Grid item container justifyContent={"center"} xs={4}>
          <Avatar
            variant="square"
            sx={{ width: "80%", height: "80%" }}
            src="./logo192.png"
          />
        </Grid>
        <Grid item xs={8}>
          <Typography
            variant="h6"
            color="textPrimary"
            sx={{ fontSize: ".85rem", fontWeight: "bold" }}
          >
            {" "}
            Instala nuestra app para una experiencia más fluida.{" "}
          </Typography>
        </Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={4}>
          <Button size="small" color="primary" sx={{ fontSize: ".7rem" }} onClick={() => setShowBanner(false)}>
            {" "}
            Ahora no{" "}
          </Button>
        </Grid>
        <Grid item xs={5}>
          <Button
            size="small"
            variant="contained"
            color="primary"
            sx={{ borderRadius: 3 }}
            disableElevation
            aria-label="Instalar Aplicación"
            title="Instalar Aplicación"
            onClick={onClick}
          >
             Instalar{" "}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default InstallPWA;
