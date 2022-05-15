import {
  Grid,
  Typography,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import getDataTorneo from "../../services/jugador/getDataTorneo.js";
import DashboardJugadorContext from "../../context/DashboardJugadorContext";
import ResponseError from "../ResponseError";
import JUEGOS from "../../constants/Juegos.json";
import AvatarImg from "../../pngegg.png";
import unirseTorneoTFT from "../../services/jugador/unirseTorneoTFT.js";
import DashboardBuscarTorneos from "./DashboardBuscarTorneos";
import DashboardVerMisTorneosInscritos from "./DashboardVerMisTorneosInscritos";
import CardEnfrentamientoTFT from "../CardEnfrentamientoTFT.js";
import getEnfrentamientosJugador from "../../services/jugador/getEnfrentamientosJugador.js";
import DashboardVerEnfrentamientoTFT from "./DashboardVerEnfrentamientoTFT.js";
import MaterialIcon from "material-icons-react";
// import MaterialIcon from 'material-icons-react';
// import ESTADOS from '../../constants/Estados.json';
/* eslint-disable complexity */
const textStyle = {
  color: "white",
};
const DashboardVerTorneo = ({ idTorneo }) => {
  // Context
  const { user, changeComponent } = React.useContext(DashboardJugadorContext);
  // States
  const [values, setValues] = React.useState(null);
  const [responseError, setResponseError] = React.useState(false);
  const [ganador, setGanador] = React.useState(null);
  const [enfrentamientos, setEnfrentamientos] = React.useState(null);

  const [open, setOpen] = React.useState(false);

  // Handlers
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUnirseTorneo = () => {
    if (values?.torneo?.id_juego === 2) {
      unirseTorneoTFT(
        user,
        values.torneo.id_torneo,
        setResponseError,
        handleClickOpen
      );
    }
  };

  // UseEffect
  React.useEffect(() => {
    getDataTorneo(user.token, idTorneo, setResponseError, setValues);
  }, []);

  React.useEffect(() => {
    if (values) {
      console.log(values);
      if (values.torneo.id_estado === 2) {
        getEnfrentamientosJugador(user.token, idTorneo, setEnfrentamientos);
      } else if (values.torneo.id_estado === 3) {
        console.log(`id_edo: ${values.torneo.id_estado}`);

        setGanador(values.torneo.participantes[0]);
      }
    }
  }, [values]);

  // console.log(ganador);

  return !values ? (
    <Grid item></Grid>
  ) : (
    <Grid container justifyContent="center" direction="row">
      <Grid
        sx={{ py: 5 }}
        container
        justifyContent="center"
        direction="row"
        item
      >
        <Grid item xs={12}>
          <Typography sx={{ color: "white" }} variant="h2">
            {values.torneo.nombre}
          </Typography>
        </Grid>
        <Grid xs={12} sx={{ py: 2, px: 1, fontWeight: "bold" }} item>
          <Typography sx={{ color: "white" }} variant="h5">
            {JUEGOS[values.torneo.id_juego]}
          </Typography>
        </Grid>
        <Grid container alignContent="start" item xs={12}>
          {!values.torneo.participantes.some(
            (value) => value.id_usuario === user.id_usuario
          ) && (
            <Button
              onClick={handleUnirseTorneo}
              variant="contained"
              color="secondary"
            >
              UNIRSE AL TORNEO
            </Button>
          )}
        </Grid>
        <Grid
          item
          xs={12}
          sx={{ backgroundColor: "#287A79", p: 5, mt: 3, borderRadius: 5 }}
        >
          <Grid
            sx={{ px: 3 }}
            xs={12}
            item
            container
            direction="row"
            justifyContent="space-around"
          >
            <Grid xs={12} md={12} item container alignItems="center">
              <Grid item xs={12} xl={1}>
                <MaterialIcon size="large" icon="abc"></MaterialIcon>
              </Grid>
              <Grid item xs={12} xl={11}>
                <Typography sx={textStyle} variant="h5">
                  {values.torneo.description}
                </Typography>
              </Grid>
            </Grid>
            <Grid xs={12} md={12} item container alignItems="center">
              <Grid item xs={12} xl={1}>
                <MaterialIcon size="large" icon="event"></MaterialIcon>
              </Grid>
              <Grid item xs={12} xl={11}>
                <Typography sx={textStyle} variant="h5">
                  {" "}
                  Fecha inicio:{" "}
                  {new Date(values.torneo.fecha_inicio).toLocaleDateString()}
                </Typography>
              </Grid>
            </Grid>
            <Grid xs={12} md={12} item container alignItems="center">
              <Grid item xs={12} xl={1}>
                <MaterialIcon size="large" icon="lock_clock"></MaterialIcon>
              </Grid>
              <Grid item xs={12} xl={11}>
                <Typography sx={textStyle} variant="h5">
                  {" "}
                  Fecha fin registro:{" "}
                  {new Date(
                    values.torneo.fecha_fin_registro
                  ).toLocaleDateString()}
                </Typography>
              </Grid>
            </Grid>
            <Grid xs={12} md={12} item container>
              <Grid item xs={12} xl={1}>
                <MaterialIcon size="large" icon="access_time"></MaterialIcon>
              </Grid>
              <Grid item xs={12} xl={11}>
                <Typography sx={textStyle} variant="h5">
                  {" "}
                  Hora de inicio: {`${values.torneo.hora_inicio}:00`}
                </Typography>
              </Grid>
            </Grid>
            <Grid xs={12} md={12} item container>
              <Grid item xs={12} xl={1}>
                <MaterialIcon size="large" icon="emoji_events"></MaterialIcon>
              </Grid>
              <Grid item xs={12} xl={11}>
                <Typography sx={textStyle} variant="h5">
                  Premio:{" "}
                  {values.torneo.premio
                    ? values.torneo.desc_premio
                    : "Sin premio"}
                </Typography>
              </Grid>
            </Grid>
            <Grid xs={12} md={12} item container>
              <Grid item xs={12} xl={1}>
                <MaterialIcon size="large" icon="sports_esports"></MaterialIcon>
              </Grid>
              <Grid item xs={12} xl={11}>
                <Typography sx={textStyle} variant="h5">
                  No. total de enfrentamientos:{" "}
                  {values.torneo.no_enfrentamientos}
                </Typography>
              </Grid>
            </Grid>
            <Grid xs={12} md={12} item container>
              <Grid item xs={12} xl={1}>
                <MaterialIcon size="large" icon="account_circle"></MaterialIcon>
              </Grid>
              <Grid item xs={12} xl={11}>
                <Typography sx={textStyle} variant="h5">
                  Organizado por: {values.torneo.organizador.nombre}
                </Typography>
              </Grid>
            </Grid>
            <Grid xs={12} md={12} item container>
              <Grid item xs={12} xl={1}>
                <MaterialIcon size="large" icon="contact_mail"></MaterialIcon>
              </Grid>
              <Grid item xs={12} xl={11}>
                <Typography sx={textStyle} variant="h5">
                  Contacto: {values.torneo.organizador.email}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {ganador && (
        <Grid
          item
          container
          justifyContent="center"
          direction="row"
          alignItems="center"
          sx={{
            backgroundColor: "#d4af37",
            p: 5,
            borderRadius: 5,
          }}
        >
          <Grid item>
            <MaterialIcon size="large" icon="emoji_events"></MaterialIcon>
          </Grid>
          <Grid item>
            <Typography
              sx={{ color: "black", fontWeight: "bold" }}
              variant="h5"
            >
              Ganador: {ganador.nombre}
            </Typography>
          </Grid>
        </Grid>
      )}

      <Grid
        item
        sx={{
          backgroundColor: "#1a3650",
          p: 5,
          mt: 3,
          borderRadius: 5,
        }}
      >
        <Grid item xs={12}>
          <Typography sx={{ color: "white" }} variant="h4">
            Participantes{" "}
          </Typography>
        </Grid>
        <Grid
          sx={{ width: "80vw" }}
          xs={12}
          item
          container
          justifyContent="start"
          direction="column"
        >
          <TableContainer>
            <Table size="small" sx={{ overflowX: "hidden" }}>
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell sx={{ color: "white" }}>Nombre</TableCell>
                  <TableCell sx={{ textAlign: "end", color: "white" }}>
                    Posicion
                  </TableCell>
                  <TableCell sx={{ textAlign: "end", color: "white" }}>
                    Puntaje
                  </TableCell>
                  <TableCell sx={{ textAlign: "end", color: "white" }}>
                    # Enfrentamientos
                  </TableCell>
                  <TableCell sx={{ textAlign: "end", color: "white" }}>
                    Daño Total
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {values?.torneo?.participantes &&
                  values.torneo.participantes.map((element, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell sx={{ color: "white" }}>
                          <Avatar
                            src={element.image ? element.image : AvatarImg}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography
                            sx={{ color: "white" }}
                            variant="body2"
                            component="span"
                          >
                            {element.nombre}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ textAlign: "end", color: "white" }}>
                          <Typography variant="body2" component="span">
                            {index + 1}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ textAlign: "end", color: "white" }}>
                          <Typography variant="body2" component="span">
                            {element.puntaje_jugador}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ textAlign: "end", color: "white" }}>
                          <Typography variant="body2" component="span">
                            {element.no_enfrentamientos_jugados}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ textAlign: "end", color: "white" }}>
                          <Typography variant="body2" component="span">
                            {element.total_damage}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      {values?.torneo?.id_estado === 2 && (
        <Grid
          item
          sx={{
            backgroundColor: "#1a3650",
            p: 5,
            mt: 3,
            borderRadius: 5,
          }}
        >
          <Grid item sx={{ my: 5 }} xs={12}>
            <Typography sx={{ color: "white" }} variant="h4">
              Enfrentamientos{" "}
            </Typography>
          </Grid>
          <Grid
            sx={{ width: "80vw" }}
            xs={12}
            item
            container
            justifyContent="start"
            direction="column"
          >
            {enfrentamientos &&
              enfrentamientos?.enfrentamientos?.map((enfrentamiento, i) => {
                return (
                  <Grid
                    onClick={(e) =>
                      changeComponent(
                        <DashboardVerEnfrentamientoTFT
                          values={enfrentamiento}
                        ></DashboardVerEnfrentamientoTFT>
                      )
                    }
                    item
                    key={i}
                    sx={{ py: 2.5 }}
                  >
                    <CardEnfrentamientoTFT
                      data={{
                        ...enfrentamiento,
                        nombre: `ID Enfrentamiento: ${enfrentamiento.idenfrentamiento_TFT}`,
                      }}
                    ></CardEnfrentamientoTFT>
                  </Grid>
                );
              })}
          </Grid>
        </Grid>
      )}
      <Grid item>
        <ResponseError error={responseError}></ResponseError>
      </Grid>
      {responseError ? (
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle
            sx={{ color: "white", fontWeight: "bold" }}
            id="alert-dialog-title"
          >
            {"Error"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Typography sx={{ color: "white" }} variant="h5">
                No fue posible unirte al torneo: {responseError}
              </Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="secondary"
              onClick={(e) =>
                changeComponent(
                  <DashboardBuscarTorneos></DashboardBuscarTorneos>
                )
              }
              autoFocus
            >
              Aceptar
            </Button>
          </DialogActions>
        </Dialog>
      ) : (
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle
            sx={{ color: "white", fontWeight: "bold" }}
            id="alert-dialog-title"
          >
            {"Unirse a torneo"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              sx={{ color: "white" }}
              id="alert-dialog-description"
            >
              Te has unido a un torneo
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="secondary"
              onClick={(e) =>
                changeComponent(
                  <DashboardVerMisTorneosInscritos></DashboardVerMisTorneosInscritos>
                )
              }
              autoFocus
            >
              Aceptar
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Grid>
  );
};
DashboardVerTorneo.propTypes = {
  idTorneo: PropTypes.any,
};

export default DashboardVerTorneo;
