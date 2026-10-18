const urlSupabase = "https://pulredetdokxytrzdmdf.supabase.co";
const llaveAnonima = "sb_publishable_PjHlobWwih51omYBr-c8Kw_VAdgl72d";

const _supabase = supabase.createClient(urlSupabase, llaveAnonima);

function mostrarError(mensaje) {
  const caja = document.getElementById("cajaAlerta");
  const msg = document.getElementById("mensajeAlerta");
  msg.textContent = mensaje;
  caja.style.display = "flex";
}

function ocultarError() {
  document.getElementById("cajaAlerta").style.display = "none";
}

async function validarLogin(e) {
  e.preventDefault();
  ocultarError();

  const usuarioIngresado = document
    .getElementById("usuario")
    .value.trim()
    .toLowerCase();
  const contrasenaIngresada = document
    .getElementById("contrasena")
    .value.trim();

  if (!usuarioIngresado || !contrasenaIngresada) {
    mostrarError("Por favor completa todos los campos.");
    return;
  }

  try {
    let { data: usuarioEncontrado, error } = await _supabase
      .from("usuarios")
      .select("*")
      .eq("username", usuarioIngresado)
      .single();

    if (error || !usuarioEncontrado) {
      mostrarError("Usuario o contraseña incorrectos.");
      return;
    }

    if (usuarioEncontrado.password !== contrasenaIngresada) {
      mostrarError("Usuario o contraseña incorrectos.");
      return;
    }

    if (!usuarioEncontrado.is_active) {
      mostrarError("Acceso deshabilitado. Consulta con administración.");
      return;
    }

    const rol = usuarioEncontrado.role;

    if (rol !== "Administrador" && rol !== "Administradora") {
      const ahora = new Date();
      const horaActual =
        ahora.getHours().toString().padStart(2, "0") +
        ":" +
        ahora.getMinutes().toString().padStart(2, "0");

      const inicio = usuarioEncontrado.check_in
        ? usuarioEncontrado.check_in.slice(0, 5)
        : "00:00";
      const fin = usuarioEncontrado.check_out
        ? usuarioEncontrado.check_out.slice(0, 5)
        : "23:59";

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
        id: usuarioEncontrado.id,
        nombre: usuarioEncontrado.name,
        usuario: usuarioEncontrado.username,
        rol: usuarioEncontrado.role,
        fechaIngreso: new Date().toISOString(),
      }),
    );

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
  } catch (err) {
    console.error("Error en conexión:", err);
    mostrarError("Error al conectar con la base de datos.");
  }
}
