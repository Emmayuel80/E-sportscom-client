import {
  Divider,
  Grid,
  Typography,
  Button,
  List,
  ListItemText,
  Collapse,
  Avatar,
} from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import getDataTorneo from "../../services/jugador/getDataTorneo.js";
import DashboardJugadorContext from "../../context/DashboardJugadorContext";
import ResponseError from "../ResponseError";
import JUEGOS from "../../constants/Juegos.json";
import COLORS from "../../constants/Colors.json";
import ETAPAS from "../../constants/Etapas.json";
import JoinLOLTournamentDialog from "../JoinLOLTournamentDialog.js";
import getPartidaLoL from "../../services/jugador/getPartidaLoL.js";
import MaterialIcon from "material-icons-react";
const textStyle = {
  color: "white",
};
/* eslint-disable complexity */
const DashboardVerTorneoLOL = ({ idTorneo }) => {
  // Context
  const { user } = React.useContext(DashboardJugadorContext);
  // States
  const [values, setValues] = React.useState(null);
  const [responseError, setResponseError] = React.useState(false);
  const [ganador, setGanador] = React.useState(null);
  const [equiposInscritos, setEquiposInscritos] = React.useState({});
  const [logos, setLogos] = React.useState([]);
  const [verEquipo, setVerEquipo] = React.useState([]);
  const [dataPartida, setDataPartida] = React.useState(null);
  const [etapas, setEtapas] = React.useState({});

  const [open, setOpen] = React.useState(false);

  // Handlers
  const handleExpandEquipo = (index) => {
    const newVerEquipo = verEquipo.slice();
    newVerEquipo[index] = !newVerEquipo[index];
    setVerEquipo(newVerEquipo);
  };

  // const handleClickOpen = () => {
  // 	setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);
    getDataTorneo(user.token, idTorneo, setResponseError, setValues);
  };

  const handleUnirseTorneo = () => {
    setOpen(true);
  };

  // UseEffect
  React.useEffect(() => {
    getDataTorneo(user.token, idTorneo, setResponseError, setValues);
  }, []);

  React.useEffect(() => {
    if (values) {
      console.log(values);
      if (values.torneo.id_estado === 3) {
        console.log(`id_edo: ${values.torneo.id_estado}`);
        const firstPos = values.torneo.participantes.find(
          (participante) => participante.ganador === 1
        );
        setGanador(firstPos);
      }

      const participantes = values.torneo.participantes;
      const equipos = {};
      const logos = [];
      const verEquipoAux = [];
      participantes.forEach((participante) => {
        if (equipos[participante.id_equipo]) {
          equipos[participante.id_equipo].push(participante);
        } else {
          equipos[participante.id_equipo] = [participante];
          logos.push(participante.logo);
          verEquipoAux.push(false);
        }
      });
      setEquiposInscritos(equipos);
      setVerEquipo(verEquipoAux);
      setLogos(logos);

      getPartidaLoL(user.token, idTorneo, setResponseError, setDataPartida);
      const partidas = values.torneo.partidas;
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
              Ganador: {ganador.equipo}
            </Typography>
          </Grid>
        </Grid>
      )}

      {values.torneo.id_estado === 2 && (
        <Grid
          item
          xs={12}
          sx={{
            backgroundColor: "#1a3650",
            p: 5,
            mt: 3,
            borderRadius: 5,
          }}
        >
          <Grid item xs={12}>
            <Typography sx={{ color: "white" }} variant="h4">
              Tu partida en curso
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography sx={{ color: "white" }} variant="h5">
              Fecha a jugar:{" "}
              {new Date(dataPartida?.partida?.fecha_jugada).toLocaleString()}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {dataPartida?.partida && (
              <Grid container>
                <Grid
                  sx={{
                    backgroundColor: COLORS.secondary.main,
                    borderRadius: "1rem",
                    width: "100%",
                    my: 3,
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
                        {dataPartida?.partida.equipos[0]?.nombre}
                      </Typography>
                    </Grid>
                    <Grid container justifyContent="end" item xs={6}>
                      <Avatar
                        sx={{ width: 64, height: 64 }}
                        src={dataPartida?.partida.equipos[0]?.logo}
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
                        {dataPartida?.partida.equipos[1]?.nombre}
                      </Typography>
                    </Grid>
                    <Grid container justifyContent="end" item xs={6}>
                      <Avatar
                        sx={{ width: 64, height: 64 }}
                        src={dataPartida?.partida.equipos[1]?.logo}
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
      )}

      {etapas &&
        Object.values(etapas).map((etapa, index) => {
          return (
            <Grid key={JSON.stringify(etapa) + index} item xs={12}>
              {etapa.every((partida) => partida?.id_ganador) && (
                <>
                  <Grid item xs={12}>
                    <Typography sx={{ color: "white", mt: 5 }} variant="h4">
                      Etapa: {ETAPAS[etapa[0].etapa]}
                    </Typography>
                  </Grid>
                  <Divider sx={{ backgroundColor: "white" }} />
                </>
              )}
              {etapa &&
                etapa.map((partida) => {
                  // es-lint disable complexity
                  if (!partida?.id_ganador) return <Grid></Grid>;
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
                      key={JSON.stringify(partida)}
                    >
                      <Grid item xs={12}>
                        <Typography sx={{ color: "white" }} variant="h6">
                          Fecha jugada :{" "}
                          {new Date(partida?.fecha_jugada).toLocaleString()}
                        </Typography>
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
                                    src={partida.equipo2.logo2}
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
          <List
            sx={{ width: "100%" }}
            component="nav"
            aria-labelledby="nested-list-subheader"
          >
            {Object.keys(equiposInscritos).map((equipo, index) => {
              console.log(equipo);
              return (
                <Grid key={JSON.stringify(equipo) + index} item sx={{ pb: 5 }}>
                  <Grid
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
                          {equiposInscritos[equipo][0].equipo}
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
                  <Collapse in={verEquipo[index]} timeout="auto" unmountOnExit>
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
                        equiposInscritos[equipo].map((participante, index) => (
                          <>
                            <Grid
                              key={JSON.stringify(participante) + index}
                              container
                              sx={{ p: 1 }}
                              direction="row"
                            >
                              <Avatar src={participante.image}></Avatar>
                              <ListItemText
                                sx={{ p: 1 }}
                                primary={participante.nombre}
                              />
                            </Grid>
                            <Divider />
                          </>
                        ))}
                    </List>
                  </Collapse>
                </Grid>
              );
            })}
          </List>
        </Grid>
      </Grid>
      <Grid item>
        <ResponseError error={responseError}></ResponseError>
      </Grid>
      <JoinLOLTournamentDialog
        idTorneo={idTorneo}
        open={open}
        handleClose={handleClose}
        token={user.token}
      ></JoinLOLTournamentDialog>
    </Grid>
  );
};
DashboardVerTorneoLOL.propTypes = {
  idTorneo: PropTypes.any,
};

export default DashboardVerTorneoLOL;
