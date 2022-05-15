import {
  Avatar,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Button,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import getDataTorneo from "../../services/organizador/getDataTorneo";
import DashboardOrganizadorContext from "../../context/DashboardOrganizadorContext";
import ResponseError from "../ResponseError";
import JUEGOS from "../../constants/Juegos.json";
import AvatarImg from "../../pngegg.png";
import MaterialIcon from "material-icons-react";
import expulsarJugador from "../../services/organizador/expulsarJugador";
import DialogBitacora from "../DialogBitacora";
import DialogEnfrentamientoTFT from "../DialogEnfrentamientoTFT";
import getBitacoraTorneo from "../../services/organizador/getBitacoraTorneo";
import CardEnfrentamientoTFT from "../CardEnfrentamientoTFT";
import CopyToClipboard from "../CopyToClipboard";
const textStyle = {
  color: "white",
};
const DashboardOrganizadorVerTorneoTFT = ({ idTorneo }) => {
  // Context
  const { user } = React.useContext(DashboardOrganizadorContext);
  // States
  const [values, setValues] = React.useState(null);
  const [responseError, setResponseError] = React.useState(false);
  const [ganador, setGanador] = React.useState(null);
  const [disableAll, setDisableAll] = React.useState(false);
  const [openDialogBitacora, setOpenDialogBitacora] = React.useState(false);
  const [openDialogEnfrentamientoTFT, setOpenDialogEnfrentamientoTFT] =
    React.useState(false);
  const [bitacora, setBitacora] = React.useState([]);
  const [enfrentamientoSeleccionado, setEnfrentamientoSeleccionado] =
    React.useState({});
  const [enfrentamientos, setEnfrentamientos] = React.useState(null);
  const [openClipboard, setOpenClipboard] = React.useState(false);
  // Handlers
  const handleBitacoraEquipo = () => {
    getBitacoraTorneo(user, idTorneo, setBitacora, setResponseError).then(
      () => {
        setOpenDialogBitacora(true);
      }
    );
  };
  const handleEnfrentamientoSeleccionado = (enfrentamiento) => {
    setOpenDialogEnfrentamientoTFT(true);
    setEnfrentamientoSeleccionado(enfrentamiento);
  };

  // UseEffect
  React.useEffect(() => {
    getDataTorneo(user.token, idTorneo, setResponseError, setValues);
  }, []);

  React.useEffect(() => {
    if (values) {
      console.log(values);
      if (values.torneo.id_estado === 4 || values.torneo.id_estado === 3) {
        console.log(`id_edo: ${values.torneo.id_estado}`);
        setGanador(values.participantes[0]);
      }
      setEnfrentamientos(values.partidas);
    }
  }, [values]);

  console.log(ganador);
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
        <Grid item container justifyContent="start">
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleBitacoraEquipo}
            >
              Ver bitacora de torneo.
            </Button>
          </Grid>
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
                <MaterialIcon size="large" icon="qr_code"></MaterialIcon>
              </Grid>
              <Grid item xs={12} xl={11}>
                <Typography sx={{ color: "white" }} variant="h5">
                  Código de Torneo: {values.torneo.codigo_torneo}
                  <CopyToClipboard
                    open={openClipboard}
                    setOpen={setOpenClipboard}
                    copy={values.torneo.codigo_torneo}
                  ></CopyToClipboard>
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
        sx={{
          width: "80vw",
          backgroundColor: "#1a3650",
          p: 5,
          mt: 3,
          borderRadius: 5,
        }}
        xs={12}
        item
        container
        justifyContent="center"
        direction="column"
      >
        <Typography sx={{ color: "white" }} variant="h4">
          Participantes{" "}
        </Typography>
        <TableContainer>
          <Table sx={{ overflowX: "hidden" }}>
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
                {values.torneo.id_estado === 0 && (
                  <TableCell sx={{ textAlign: "center", color: "white" }}>
                    Acciones
                  </TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {values.participantes.map((element, index) => {
                return (
                  <TableRow key={index}>
                    {/* TFT */}
                    <TableCell>
                      <Avatar src={element.image ? element.image : AvatarImg} />
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
                    <TableCell sx={{ textAlign: "end" }}>
                      <Typography
                        sx={{ color: "white" }}
                        variant="body2"
                        component="span"
                      >
                        {index + 1}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ textAlign: "end" }}>
                      <Typography
                        sx={{ color: "white" }}
                        variant="body2"
                        component="span"
                      >
                        {element.puntaje_jugador}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ textAlign: "end" }}>
                      <Typography
                        sx={{ color: "white" }}
                        variant="body2"
                        component="span"
                      >
                        {element.no_enfrentamientos_jugados}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ textAlign: "end" }}>
                      <Typography
                        sx={{ color: "white" }}
                        variant="body2"
                        component="span"
                      >
                        {element.total_damage}
                      </Typography>
                    </TableCell>
                    {values.torneo.id_estado === 0 && (
                      <TableCell sx={{ textAlign: "center" }}>
                        <Tooltip title="Expulsar jugador">
                          <IconButton
                            disabled={disableAll}
                            onClick={(e) =>
                              expulsarJugador(
                                user.token,
                                element.id_usuario,
                                idTorneo,
                                setResponseError,
                                values,
                                setValues,
                                setDisableAll
                              )
                            }
                          >
                            <MaterialIcon icon="person_off"></MaterialIcon>
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      {values?.torneo?.id_estado >= 1 && (
        <Grid
          container
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
              enfrentamientos?.map((enfrentamiento, i) => {
                return (
                  <Grid
                    onClick={(e) =>
                      handleEnfrentamientoSeleccionado(enfrentamiento)
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
                      textFecha={"Fecha jugada:"}
                      propertieFecha={"fecha_jugada"}
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
      <DialogBitacora
        open={openDialogBitacora}
        setOpen={setOpenDialogBitacora}
        bitacoraArray={bitacora}
      ></DialogBitacora>
      <DialogEnfrentamientoTFT
        setOpen={setOpenDialogEnfrentamientoTFT}
        open={openDialogEnfrentamientoTFT}
        enfrentamiento={enfrentamientoSeleccionado}
        puuids={values.puuids}
      ></DialogEnfrentamientoTFT>
    </Grid>
  );
};
DashboardOrganizadorVerTorneoTFT.propTypes = {
  idTorneo: PropTypes.any,
};

export default DashboardOrganizadorVerTorneoTFT;
