export default function (
  user,
  setResponseError,
  getProfileData,
  setProfileData,
  setUser
) {
  fetch(`${process.env.REACT_APP_API_URL}/jugador/actualizarRiotApi`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        setResponseError(data.error);
      } else {
        getProfileData(user, setProfileData, setResponseError);
        localStorage.setItem(
          "data",
          JSON.stringify({ ...data.data, token: user.token })
        );
        setUser({ ...data.data, token: user.token });
      }
    })
    .catch((error) => {
      setResponseError(error);
    });
}
