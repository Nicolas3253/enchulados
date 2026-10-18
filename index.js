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

  // Asegúrate de que id="usuario" e id="contrasena" sean los mismos IDs de tus <input> en el HTML
  const elementoUsuario = document.getElementById("usuario");
  const elementoContrasena = document.getElementById("contrasena");

  if (!elementoUsuario || !elementoContrasena) {
    console.error("No se encontraron los inputs 'usuario' o 'contrasena' en el HTML.");
    return;
  }

  const usuarioIngresado = elementoUsuario.value.trim().toLowerCase();
  const contrasenaIngresada = elementoContrasena.value.trim();

  if (!usuarioIngresado || !contrasenaIngresada) {
    mostrarError("Por favor completa todos los campos.");
    return;
  }

  try {
    // IMPORTANTE: Aquí cambiamos "usuarios" por "users" para que coincida con Supabase
    let { data: usuarioEncontrado, error } = await _supabase
      .from("users")
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

    if (usuarioEncontrado.is_active === false) {
      mostrarError("Acceso deshabilitado. Consulta con administración.");
      return;
    }

    const rol = usuarioEncontrado.role;

    // Validación de horario de turno (solo si check_in y check_out están presentes)
    if (rol !== "Administrador" && rol !== "administrador" && rol !== "Administradora") {
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

    const rolNormalizado = rol.toLowerCase();
    if (rolNormalizado.includes("admin")) {
      window.location.href = "panel.html";
    } else if (rolNormalizado.includes("mese")) {
      window.location.href = "mesera.html";
    } else if (rolNormalizado.includes("caje")) {
      window.location.href = "caja.html";
    } else if (rolNormalizado.includes("repart") || rolNormalizado.includes("domici")) {
      window.location.href = "repartidor.html";
    } else {
      window.location.href = "panel.html";
    }
  } catch (err) {
    console.error("Error en conexión:", err);
    mostrarError("Error al conectar con la base de datos.");
  }
}
