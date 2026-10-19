const USUARIOS_BASE = [
  {
    nombre: "Enchulados Admin",
    usuario: "admin",
    clave: "1234",
    rol: "Administrador",
    turnoInicio: "00:00",
    turnoFin: "23:59",
    activo: true,
  },
  {
    nombre: "Gisella Pardo",
    usuario: "gisella",
    clave: "1234",
    rol: "Cajera",
    turnoInicio: "14:00",
    turnoFin: "22:00",
    activo: true,
  },
  {
    nombre: "Dayana García",
    usuario: "dayana",
    clave: "1234",
    rol: "Mesera",
    turnoInicio: "08:00",
    turnoFin: "21:00",
    activo: true,
  },
  {
    nombre: "Sharon González",
    usuario: "sharon",
    clave: "1234",
    rol: "Administradora",
    turnoInicio: "00:00",
    turnoFin: "23:59",
    activo: true,
  },
  {
    nombre: "Carlos Rojas",
    usuario: "carlos",
    clave: "1234",
    rol: "Repartidor",
    turnoInicio: "18:00",
    turnoFin: "23:00",
    activo: false,
  },
];

if (!localStorage.getItem("enchulados_usuarios")) {
  localStorage.setItem("enchulados_usuarios", JSON.stringify(USUARIOS_BASE));
}

function mostrarError(mensaje) {
  const caja = document.getElementById("cajaAlerta");
  const msg = document.getElementById("mensajeAlerta");
  msg.textContent = mensaje;
  caja.style.display = "flex";
}

function ocultarError() {
  document.getElementById("cajaAlerta").style.display = "none";
}

function validarLogin(e) {
  e.preventDefault();
  ocultarError();

  const usuarioIngresado = document
    .getElementById("usuario")
    .value.trim()
    .toLowerCase();
  const contrasenaIngresada = document
    .getElementById("contrasena")
    .value.trim();

  const listaUsuarios =
    JSON.parse(localStorage.getItem("enchulados_usuarios")) || USUARIOS_BASE;

  const usuarioEncontrado = listaUsuarios.find(
    (u) =>
      u.usuario.toLowerCase() === usuarioIngresado &&
      u.clave === contrasenaIngresada,
  );

  if (!usuarioEncontrado) {
    mostrarError("Usuario o contraseña incorrectos.");
    return;
  }

  if (!usuarioEncontrado.activo) {
    mostrarError("Acceso deshabilitado. Consulta con administración.");
    return;
  }

  if (
    usuarioEncontrado.rol !== "Administrador" &&
    usuarioEncontrado.rol !== "Administradora"
  ) {
    const ahora = new Date();
    const horaActual =
      ahora.getHours().toString().padStart(2, "0") +
      ":" +
      ahora.getMinutes().toString().padStart(2, "0");

    const inicio = usuarioEncontrado.turnoInicio;
    const fin = usuarioEncontrado.turnoFin;

    if (horaActual < inicio || horaActual > fin) {
      mostrarError(
        `Fuera de turno laboral. Tu horario asignado es de ${inicio} a ${fin}.`,
      );
      return;
    }
  }

  localStorage.setItem(
    "enchulados_sesion",
    JSON.stringify({
      nombre: usuarioEncontrado.nombre,
      usuario: usuarioEncontrado.usuario,
      rol: usuarioEncontrado.rol,
      fechaIngreso: new Date().toISOString(),
    }),
  );

  const rol = usuarioEncontrado.rol;
  if (rol === "Administrador" || rol === "Administradora") {
    window.location.href = "panel.html";
  } else if (rol === "Mesera" || rol === "Mesero") {
    window.location.href = "mesera.html";
  } else if (rol === "Cajera" || rol === "Cajero") {
    window.location.href = "caja.html";
  } else if (rol === "Repartidor" || rol === "Domiciliario") {
    window.location.href = "repartidor.html";
  } else {
    window.location.href = "panel.html";
  }
}
