import {
  Avatar,
  Button,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  List,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import getDataTorneo from "../../services/organizador/getDataTorneo";
import DashboardOrganizadorContext from "../../context/DashboardOrganizadorContext";
import ResponseError from "../ResponseError";
import JUEGOS from "../../constants/Juegos.json";
import COLORS from "../../constants/Colors.json";
import ETAPAS from "../../constants/Etapas.json";
import MaterialIcon from "material-icons-react";
import expulsarJugador from "../../services/organizador/expulsarJugador";
import registrarResultadoLoL from "../../services/organizador/registrarResultadoLoL";
import DialogBitacora from "../DialogBitacora";
import getBitacoraTorneo from "../../services/organizador/getBitacoraTorneo";
import CopyToClipboard from "../CopyToClipboard";
/* eslint-disable complexity */
const textStyle = {
  color: "white",
};
const DashboardOrganizadorVerTorneoLOL = ({ idTorneo }) => {
  // Context
  const { user } = React.useContext(DashboardOrganizadorContext);
  // States
  const [values, setValues] = React.useState(null);
  const [responseError, setResponseError] = React.useState(false);
  const [ganador, setGanador] = React.useState(null);
  const [disableAll, setDisableAll] = React.useState(false);
  const [equiposInscritos, setEquiposInscritos] = React.useState({});
  const [logos, setLogos] = React.useState([]);
  const [verEquipo, setVerEquipo] = React.useState([]);
  const [idEquipos, setIdEquipos] = React.useState([]);
  const [etapas, setEtapas] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const [partidaSeleccionada, setPartidaSeleccionada] = React.useState({});
  const [reload, setReload] = React.useState(0);
  const [equipoSeleccionado, setEquipoSeleccionado] = React.useState(-1);
  const [confirmDialog, setConfirmDialog] = React.useState(false);
  const [openDialogBitacora, setOpenDialogBitacora] = React.useState(false);
  const [bitacora, setBitacora] = React.useState([]);
  const [openClipboard, setOpenClipboard] = React.useState(false);

  // Handlers
  const handleExpandEquipo = (index) => {
    const newVerEquipo = verEquipo.slice();
    newVerEquipo[index] = !newVerEquipo[index];
    setVerEquipo(newVerEquipo);
  };
  const handleBitacoraEquipo = () => {
    getBitacoraTorneo(user, idTorneo, setBitacora, setResponseError).then(
      () => {
        setOpenDialogBitacora(true);
      }
    );
  };
  const handleRegistrarResultadoLOL = () => {
    let idEquipo;
    if (equipoSeleccionado !== -1 && equipoSeleccionado === 1) {
      idEquipo = partidaSeleccionada.id_equipo1;
    }
    if (equipoSeleccionado !== -1 && equipoSeleccionado === 2) {
      idEquipo = partidaSeleccionada.id_equipo2;
    }
    registrarResultadoLoL(
      user.token,
      idEquipo,
      partidaSeleccionada.id_partida,
      setResponseError,
      setReload,
      reload,
      setConfirmDialog,
      setOpen
    );
  };

  const handlePartidaSeleccionada = (idGanador, partida) => {
    if (!idGanador) {
      setPartidaSeleccionada(partida);
      setOpen(true);
    }
  };
  // UseEffect
  React.useEffect(() => {
    getDataTorneo(user.token, idTorneo, setResponseError, setValues);
  }, []);

  React.useEffect(() => {
    getDataTorneo(user.token, idTorneo, setResponseError, setValues);
  }, [reload]);

  React.useEffect(() => {
    if (values) {
      console.log(values);
      if (values.torneo.id_estado === 3) {
        console.log(`id_edo: ${values.torneo.id_estado}`);
        const firstPos = values.participantes.filter(
          (participante) => participante.ganador === 1
        );
        console.log("ganador2: ", firstPos[0]);
        setGanador(firstPos[0].equipo);
      }

      const participantes = values.participantes;
      const equipos = {};
      const logos = [];
      const verEquipoAux = [];
      const idEquiposAux = [];
      participantes.forEach((participante) => {
        if (equipos[participante.equipo]) {
          equipos[participante.equipo].push(participante);
        } else {
          equipos[participante.equipo] = [participante];
          idEquiposAux.push(participante.id_equipo);
          logos.push(participante.logo);
          verEquipoAux.push(false);
        }
      });
      setIdEquipos(idEquiposAux);
      setEquiposInscritos(equipos);
      setVerEquipo(verEquipoAux);
      setLogos(logos);

      const partidas = values.partidas;
      const etapasAux = {};
      partidas.forEach((partida) => {
        if (etapasAux[partida.etapa]) {
          etapasAux[partida.etapa].push(partida);
        } else {
          etapasAux[partida.etapa] = [partida];
        }
      });
      console.log(etapasAux);
      setEtapas(etapasAux);
    }
  }, [values]);

  console.log("ganador", ganador);
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
            mb: 5,
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
              Ganador: {ganador}
            </Typography>
          </Grid>
        </Grid>
      )}

      {values.torneo.id_estado > 1 && (
        <Grid item xs={12}>
          <Typography sx={{ color: "white" }} variant="h4">
            Partidas en curso
          </Typography>
        </Grid>
      )}
      {etapas &&
        Object.values(etapas).map((etapa, index) => {
          return (
            <Grid key={JSON.stringify(etapa) + index} item xs={12}>
              <Grid item xs={12}>
                <Typography sx={{ color: "white" }} variant="h4">
                  Etapa: {ETAPAS[etapa[0].etapa]}
                </Typography>
              </Grid>
              <Divider sx={{ backgroundColor: "white" }} />
              {etapa &&
                etapa.map((partida) => {
                  return (
                    <Grid
                      sx={{
                        backgroundColor: partida?.id_ganador
                          ? "#287A79"
                          : "#7A2828",
                        borderRadius: 5,
                        mb: 5,
                        mt: 3,
                        p: 3,
                        cursor: !partida?.id_ganador ? "pointer" : "",
                      }}
                      onClick={(e) =>
                        handlePartidaSeleccionada(partida?.id_ganador, partida)
                      }
                      key={JSON.stringify(partida)}
                    >
                      <Grid item xs={12}>
                        <Typography sx={{ color: "white" }} variant="h6">
                          {!partida?.id_ganador
                            ? "Fecha a jugar"
                            : "Fecha jugada"}
                          : {new Date(partida?.fecha_jugada).toLocaleString()}
                        </Typography>
                        <Grid item container justifyContent="start">
                          <Typography
                            sx={{ color: "white", pr: 1 }}
                            variant="h6"
                          >
                            Estado:
                          </Typography>
                          <Typography
                            sx={{ color: "white", fontWeight: "bold" }}
                            variant="h6"
                          >
                            {!partida?.id_ganador
                              ? ` Pendiente de registrar resultados`
                              : ` Resultados registrados`}
                          </Typography>
                        </Grid>
                        <Grid item container justifyContent="start">
                          <Typography
                            sx={{ color: "white", pr: 1 }}
                            variant="h6"
                          >
                            Ganador:
                          </Typography>
                          <Typography
                            sx={{ color: "white", fontWeight: "bold" }}
                            variant="h6"
                          >
                            {partida?.id_ganador ? partida?.nombre_ganador : ""}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        {partida.equipo1 && (
                          <Grid container>
                            <Grid
                              sx={{
                                backgroundColor: COLORS.secondary.main,
                                borderRadius: "1rem",
                                width: "100%",
                                my: 3,
                                opacity:
                                  partida?.id_ganador &&
                                  partida.id_equipo1 === partida?.id_ganador
                                    ? 1
                                    : 0.5,
                              }}
                            >
                              <Grid
                                sx={{ py: 1.5, px: 1.5 }}
                                justifyContent="space-between"
                                alignItems="center"
                                item
                                container
                                direction="row"
                              >
                                <Grid item xs={6} sx={{ height: "70px" }}>
                                  <Typography
                                    sx={{
                                      overflowWrap: "break-word",
                                      inlineSize: "200px",
                                    }}
                                    variant="h5"
                                  >
                                    {partida.equipo1}
                                  </Typography>
                                </Grid>
                                <Grid
                                  container
                                  justifyContent="end"
                                  item
                                  xs={6}
                                >
                                  <Avatar
                                    sx={{ width: 64, height: 64 }}
                                    src={partida.logo1}
                                    variant="rounded"
                                    aria-label="recipe"
                                  ></Avatar>
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item xs={12} sx={{ mb: 3 }}>
                              <Typography
                                sx={{ color: "white", textAlign: "center" }}
                                variant="h4"
                              >
                                VS
                              </Typography>
                            </Grid>
                            <Grid
                              sx={{
                                backgroundColor: COLORS.secondary.main,
                                borderRadius: "1rem",
                                width: "100%",
                                mb: 5,
                                opacity:
                                  partida?.id_ganador &&
                                  partida.id_equipo2 === partida.id_ganador
                                    ? 1
                                    : 0.5,
                              }}
                            >
                              <Grid
                                sx={{ py: 1.5, px: 1.5 }}
                                justifyContent="space-between"
                                alignItems="center"
                                item
                                container
                                direction="row"
                              >
                                <Grid item xs={6} sx={{ height: "70px" }}>
                                  <Typography
                                    sx={{
                                      overflowWrap: "break-word",
                                      inlineSize: "200px",
                                    }}
                                    variant="h5"
                                  >
                                    {partida.equipo2}
                                  </Typography>
                                </Grid>
                                <Grid
                                  container
                                  justifyContent="end"
                                  item
                                  xs={6}
                                >
                                  <Avatar
                                    sx={{ width: 64, height: 64 }}
                                    src={partida.logo2}
                                    variant="rounded"
                                    aria-label="recipe"
                                  ></Avatar>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        )}
                      </Grid>
                    </Grid>
                  );
                })}
            </Grid>
          );
        })}
      <Grid
        item
        xs={12}
        sx={{
          mb: 0,
          pb: 0,
          backgroundColor: "#1a3650",
          p: 5,
          mt: 3,
          borderRadius: 5,
        }}
      >
        <Grid item container alignItems="center" xs={12}>
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
          <List
            sx={{ width: "100%" }}
            component="nav"
            aria-labelledby="nested-list-subheader"
          >
            {equiposInscritos &&
              Object.keys(equiposInscritos).map((equipo, index) => {
                console.log(equipo);
                return (
                  <Grid
                    key={JSON.stringify(equipo) + index}
                    item
                    sx={{ pb: 5, cursor: "pointer" }}
                  >
                    <Grid
                      container
                      justifyContent="space-between"
                      direction="row"
                    >
                      <Grid
                        item
                        xs={values.torneo.id_estado === 0 ? 11 : 12}
                        sx={{
                          backgroundColor: COLORS.secondary.main,
                          borderRadius: "1rem",
                          width: "100%",
                        }}
                        onClick={(e) => handleExpandEquipo(index)}
                      >
                        <Grid
                          sx={{ py: 1.5, px: 1.5 }}
                          justifyContent="space-between"
                          alignItems="center"
                          item
                          container
                          direction="row"
                        >
                          <Grid item xs={6} sx={{ height: "70px" }}>
                            <Typography
                              sx={{
                                overflowWrap: "break-word",
                                inlineSize: "200px",
                              }}
                              variant="h5"
                            >
                              {equipo}
                            </Typography>
                          </Grid>
                          <Grid container justifyContent="end" item xs={6}>
                            <Avatar
                              sx={{ width: 64, height: 64 }}
                              src={logos[index]}
                              variant="rounded"
                              aria-label="recipe"
                            ></Avatar>
                          </Grid>
                        </Grid>
                      </Grid>
                      {values.torneo.id_estado === 0 && (
                        <Grid
                          container
                          justifyContent="center"
                          alignItems="center"
                          item
                          xs={1}
                        >
                          <IconButton
                            disabled={disableAll}
                            size={"large"}
                            onClick={(e) =>
                              expulsarJugador(
                                user.token,
                                idEquipos[index],
                                idTorneo,
                                setResponseError,
                                values,
                                setValues,
                                setDisableAll,
                                true
                              )
                            }
                          >
                            <MaterialIcon
                              size={50}
                              icon="group_remove"
                            ></MaterialIcon>
                          </IconButton>
                        </Grid>
                      )}
                    </Grid>
                    <Grid item xs={values.torneo.id_estado === 0 ? 11 : 12}>
                      <Collapse
                        in={verEquipo[index]}
                        timeout="auto"
                        unmountOnExit
                      >
                        <List
                          sx={{
                            backgroundColor: `${COLORS.secondary.main}DD`,
                            borderRadius: "1rem",
                            p: 2,
                          }}
                          component="div"
                          disablePadding
                        >
                          {equiposInscritos[equipo] &&
                            equiposInscritos[equipo].map(
                              (participante, index) => (
                                <>
                                  <Grid
                                    key={
                                      JSON.stringify(participante) +
                                      index +
                                      equipo
                                    }
                                    container
                                    sx={{ p: 1 }}
                                    direction="row"
                                  >
                                    <Avatar src={participante.image}></Avatar>
                                    <ListItemText
                                      key={
                                        JSON.stringify(participante) +
                                        equipo +
                                        index
                                      }
                                      sx={{ p: 1 }}
                                      primary={participante.nombre}
                                    />
                                  </Grid>
                                  <Divider />
                                </>
                              )
                            )}
                        </List>
                      </Collapse>
                    </Grid>
                  </Grid>
                );
              })}
          </List>
        </Grid>
      </Grid>
      <Grid item>
        <ResponseError error={responseError}></ResponseError>
        <DialogBitacora
          open={openDialogBitacora}
          setOpen={setOpenDialogBitacora}
          bitacoraArray={bitacora}
        ></DialogBitacora>
      </Grid>
      <Dialog
        maxWidth={"lg"}
        open={open}
        onClose={(e) => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          sx={{ color: "white", fontWeight: "bold" }}
          id="alert-dialog-title"
        >
          {"Selecciona el equipo ganador"}
        </DialogTitle>
        <DialogContent>
          <Grid
            container
            item
            xs={12}
            justifyContent="space-around"
            direction="row"
          >
            <Grid
              item
              xs={12}
              lg={5}
              onClick={(e) => setEquipoSeleccionado(1)}
              sx={{
                backgroundColor: COLORS.secondary.main,
                borderRadius: "1rem",
                width: "100%",
                my: 3,
                cursor: "pointer",
                opacity: equipoSeleccionado === 1 ? 1 : 0.5,
              }}
            >
              <Grid
                sx={{ py: 10, px: 5 }}
                justifyContent="space-between"
                alignItems="center"
                item
                container
                direction="row"
              >
                <Grid
                  sx={{ mb: 5 }}
                  container
                  justifyContent="center"
                  item
                  xs={12}
                >
                  <Avatar
                    sx={{ width: 96, height: 96 }}
                    src={partidaSeleccionada.logo1}
                    variant="rounded"
                    aria-label="recipe"
                  ></Avatar>
                </Grid>
                <Grid
                  item
                  container
                  justifyContent="center"
                  xs={12}
                  sx={{ height: "70px" }}
                >
                  <Typography
                    sx={{
                      overflowWrap: "break-word",
                      inlineSize: "200px",
                    }}
                    variant="h5"
                  >
                    {partidaSeleccionada.equipo1}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              xs={12}
              lg={5}
              onClick={(e) => setEquipoSeleccionado(2)}
              sx={{
                backgroundColor: COLORS.secondary.main,
                borderRadius: "1rem",
                width: "100%",
                my: 3,
                cursor: "pointer",
                opacity: equipoSeleccionado === 2 ? 1 : 0.5,
              }}
            >
              <Grid
                sx={{ py: 10, px: 5 }}
                justifyContent="space-between"
                alignItems="center"
                item
                container
                direction="row"
              >
                <Grid
                  sx={{ mb: 5 }}
                  container
                  justifyContent="center"
                  item
                  xs={12}
                >
                  <Avatar
                    sx={{ width: 96, height: 96 }}
                    src={partidaSeleccionada.logo2}
                    variant="rounded"
                    aria-label="recipe"
                  ></Avatar>
                </Grid>
                <Grid
                  item
                  container
                  justifyContent="center"
                  xs={12}
                  sx={{ height: "70px" }}
                >
                  <Typography
                    sx={{
                      overflowWrap: "break-word",
                      inlineSize: "200px",
                    }}
                    variant="h5"
                  >
                    {partidaSeleccionada.equipo2}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="secondary"
            onClick={(e) => setConfirmDialog(true)}
            autoFocus
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={confirmDialog}
        onClose={(e) => setConfirmDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle sx={{ color: "white" }} id="alert-dialog-title">
          {"¿Estas seguro?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ color: "white" }}
          >
            Seleccionaras al equipo{" "}
            {equipoSeleccionado === 1 && equipoSeleccionado !== -1
              ? partidaSeleccionada.equipo1
              : partidaSeleccionada.equipo2}{" "}
            como ganador
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="secondary"
            onClick={(e) => setConfirmDialog(false)}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={(e) => handleRegistrarResultadoLOL()}
            autoFocus
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};
DashboardOrganizadorVerTorneoLOL.propTypes = {
  idTorneo: PropTypes.any,
};

export default DashboardOrganizadorVerTorneoLOL;
