const sesionActual = JSON.parse(localStorage.getItem("enchulados_sesion"));
if (!sesionActual) {
  window.location.href = "index.html";
} else if (!sesionActual.rol.includes("Admin")) {
  if (sesionActual.rol.includes("Mese")) window.location.href = "mesera.html";
  else if (sesionActual.rol.includes("Repart"))
    window.location.href = "repartidor.html";
  else if (sesionActual.rol.includes("Caja"))
    window.location.href = "caja.html";
  else window.location.href = "index.html";
} else {
  document.getElementById("nombreSesion").textContent = sesionActual.nombre;
  document.getElementById("rolSesion").textContent = sesionActual.rol;
  document.getElementById("avatarSesion").textContent = sesionActual.nombre
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function cerrarSesion() {
  localStorage.removeItem("enchulados_sesion");
  window.location.href = "index.html";
}

const PEDIDOS_DEF = [
  {
    id: 1042,
    cliente: "Mesa 4 · Familia Ruiz",
    tipo: "Mesa",
    detalle: "4 tacos al pastor, 2 limonadas",
    total: 38000,
    estado: "cocina",
  },
  {
    id: 1043,
    cliente: "Para llevar · Andrés",
    tipo: "Para llevar",
    detalle: "2 enchiladas verdes",
    total: 46500,
    estado: "nuevo",
  },
  {
    id: 1044,
    cliente: "Calle 45 #20-10 · Sofía Pérez",
    tipo: "Domicilio",
    detalle: "3 Tacos y 2 Margaritas",
    total: 52000,
    estado: "listo",
  },
];

const INVENTARIO_DEF = [
  {
    nombre: "Maíz nixtamalizado",
    categoria: "Base",
    cantidad: 9,
    unidad: "kg",
    minimo: 20,
  },
  {
    nombre: "Frijol negro",
    categoria: "Base",
    cantidad: 14,
    unidad: "kg",
    minimo: 8,
  },
  {
    nombre: "Queso fresco",
    categoria: "Lácteos",
    cantidad: 5,
    unidad: "kg",
    minimo: 12,
  },
  {
    nombre: "Chile chipotle",
    categoria: "Salsas",
    cantidad: 6,
    unidad: "kg",
    minimo: 4,
  },
  {
    nombre: "Aguacate",
    categoria: "Frescos",
    cantidad: 18,
    unidad: "unid.",
    minimo: 25,
  },
  {
    nombre: "Tortillas de maíz",
    categoria: "Base",
    cantidad: 140,
    unidad: "unid.",
    minimo: 100,
  },
];

const USUARIOS_DEF = [
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
];

const PASOS_DEF = [
  {
    t: "Revisa el inventario",
    d: "Confirma que tienes los insumos del día.",
    hecho: false,
    ir: "inventario",
  },
  {
    t: "Registra tu primer pedido",
    d: "Usa el botón “Registrar pedido”.",
    hecho: false,
    ir: "pedidos",
  },
  {
    t: "Agrega a tu equipo",
    d: "Crea cuentas de meseros o cajeros.",
    hecho: false,
    ir: "usuarios",
  },
  {
    t: "Mira el reporte semanal",
    d: "Entiende qué se vende más.",
    hecho: false,
    ir: "reportes",
  },
];

let pedidos =
  JSON.parse(localStorage.getItem("enchulados_pedidos")) || PEDIDOS_DEF;
let inventario =
  JSON.parse(localStorage.getItem("enchulados_inventario")) || INVENTARIO_DEF;
let usuarios =
  JSON.parse(localStorage.getItem("enchulados_usuarios")) || USUARIOS_DEF;
let pasos = JSON.parse(localStorage.getItem("enchulados_pasos")) || PASOS_DEF;

let contadorId = pedidos.length
  ? Math.max(...pedidos.map((p) => p.id)) + 1
  : 1047;
let filtro = "";

const seleccionar = (s) => document.querySelector(s);
const dinero = (n) => "$" + n.toLocaleString("es-CO");
const iniciales = (n) =>
  n
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
const ETIQUETAS = {
  nuevo: "Nuevo",
  cocina: "En cocina",
  listo: "Listo",
  entregado: "Entregado",
};

function guardarTodo() {
  localStorage.setItem("enchulados_pedidos", JSON.stringify(pedidos));
  localStorage.setItem("enchulados_inventario", JSON.stringify(inventario));
  localStorage.setItem("enchulados_usuarios", JSON.stringify(usuarios));
  localStorage.setItem("enchulados_pasos", JSON.stringify(pasos));
}

(function () {
  const f = new Date();
  const elem = seleccionar("#fechaHoy");
  if (elem)
    elem.textContent = f.toLocaleDateString("es-CO", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
})();

const TITULOS = {
  panel: ["Panel principal", "Resumen del día en Enchulados"],
  pedidos: ["Pedidos", "Registra y sigue cada pedido hasta la entrega"],
  inventario: ["Inventario", "Controla tus insumos y evita quedarte sin nada"],
  usuarios: ["Usuarios", "Administra a tu equipo y sus accesos"],
  reportes: ["Reportes", "Ventas, productos y tendencias"],
};

function cambiarVista(vista) {
  document
    .querySelectorAll(".vista")
    .forEach((v) => v.classList.remove("activo"));
  const target = document.getElementById("vista-" + vista);
  if (target) target.classList.add("activo");

  document
    .querySelectorAll(".elemento-navegacion")
    .forEach((b) => b.classList.toggle("activo", b.dataset.vista === vista));

  if (TITULOS[vista]) {
    seleccionar("#tituloVista").textContent = TITULOS[vista][0];
    seleccionar("#subtituloVista").textContent = TITULOS[vista][1];
  }
  seleccionar("#barraLateral").classList.remove("abierto");
  seleccionar("#superposicion").classList.remove("abierto");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelectorAll(".elemento-navegacion").forEach((b) => {
  b.addEventListener("click", () => {
    const vista = b.getAttribute("data-vista");
    if (vista) cambiarVista(vista);
  });
});

seleccionar("#hamburguesa").addEventListener("click", () => {
  seleccionar("#barraLateral").classList.toggle("abierto");
  seleccionar("#superposicion").classList.toggle("abierto");
});
seleccionar("#superposicion").addEventListener("click", () => {
  seleccionar("#barraLateral").classList.remove("abierto");
  seleccionar("#superposicion").classList.remove("abierto");
});

seleccionar("#buscador").addEventListener("input", (e) => {
  filtro = e.target.value.toLowerCase().trim();
  renderizarTodo();
});

function renderizarPedidos() {
  const visibles = pedidos.filter(
    (p) =>
      !filtro ||
      (p.cliente + p.detalle + p.tipo).toLowerCase().includes(filtro),
  );
  const vacio =
    '<tr><td colspan="7"><div class="vacio"><p>No hay pedidos registrados.</p></div></td></tr>';

  const tPedidos = seleccionar("#tablaPedidos");
  if (tPedidos) {
    tPedidos.innerHTML = visibles.length
      ? visibles
          .map(
            (p) =>
              '<tr><td class="numerico">#' +
              p.id +
              '</td><td><span class="texto-fuerte">' +
              p.cliente +
              '</span></td><td><span class="texto-mini">' +
              p.tipo +
              '</span></td><td><span class="texto-mini">' +
              p.detalle +
              '</span></td><td><select class="selector-estado" onchange="cambiarEstado(' +
              p.id +
              ', this.value)">' +
              Object.keys(ETIQUETAS)
                .map(
                  (k) =>
                    '<option value="' +
                    k +
                    '" ' +
                    (p.estado === k ? "selected" : "") +
                    ">" +
                    ETIQUETAS[k] +
                    "</option>",
                )
                .join("") +
              '</select></td><td class="numerico">' +
              dinero(p.total) +
              '</td><td><button class="boton boton-linea boton-mini" onclick="borrarPedido(' +
              p.id +
              ')">Borrar</button></td></tr>',
          )
          .join("")
      : vacio;
  }

  const tRecientes = seleccionar("#tablaRecientes");
  if (tRecientes) {
    tRecientes.innerHTML = pedidos.length
      ? pedidos
          .slice(-5)
          .reverse()
          .map(
            (p) =>
              '<tr><td class="numerico">#' +
              p.id +
              '</td><td><span class="texto-fuerte">' +
              p.cliente +
              '</span></td><td><span class="texto-mini">' +
              p.detalle +
              '</span></td><td><span class="etiqueta-estado estado-' +
              p.estado +
              '">' +
              ETIQUETAS[p.estado] +
              '</span></td><td class="numerico">' +
              dinero(p.total) +
              "</td></tr>",
          )
          .join("")
      : '<tr><td colspan="5"><div class="vacio"><p>No hay pedidos registrados.</p></div></td></tr>';
  }

  const activos = pedidos.filter((p) => p.estado !== "entregado").length;
  if (seleccionar("#pastillaPedidos"))
    seleccionar("#pastillaPedidos").textContent = activos;
  if (seleccionar("#kpiActivos"))
    seleccionar("#kpiActivos").textContent = activos;
  if (seleccionar("#kpiVentas"))
    seleccionar("#kpiVentas").textContent = dinero(
      pedidos.reduce((s, p) => s + p.total, 0),
    );
  if (seleccionar("#kpiVentasPie"))
    seleccionar("#kpiVentasPie").textContent =
      pedidos.length + " pedidos registrados hoy";
  if (seleccionar("#kpiMesas"))
    seleccionar("#kpiMesas").textContent =
      pedidos.filter((p) => p.tipo === "Mesa" && p.estado !== "entregado")
        .length + " / 12";
}

function cambiarEstado(id, nuevo) {
  const p = pedidos.find((x) => x.id === id);
  if (!p) return;
  p.estado = nuevo;
  guardarTodo();
  notificar(
    "ok",
    "Estado actualizado",
    "El pedido #" + id + " cambió de estado.",
  );
  renderizarTodo();
}

function borrarPedido(id) {
  pedidos = pedidos.filter((p) => p.id !== id);
  guardarTodo();
  notificar("warn", "Pedido eliminado", "Se borró el pedido #" + id + ".");
  renderizarTodo();
}

function renderizarInventario() {
  const visibles = inventario.filter(
    (i) => !filtro || (i.nombre + i.categoria).toLowerCase().includes(filtro),
  );
  const lInv = seleccionar("#listaInventario");

  if (lInv) {
    if (!visibles.length) {
      lInv.innerHTML =
        '<div class="vacio"><p>No hay insumos registrados.</p></div>';
    } else {
      lInv.innerHTML = visibles
        .map((i) => {
          const ref = i.minimo * 2;
          const n =
            i.cantidad <= i.minimo
              ? "bajo"
              : i.cantidad <= ref
                ? "medio"
                : "ok";
          const pct = Math.min(100, Math.round((i.cantidad / ref) * 100));
          return (
            '<div class="elemento-inventario"><div><div class="nombre-insumo">' +
            i.nombre +
            "<small>" +
            i.categoria +
            "</small></div>" +
            (n === "bajo"
              ? '<span class="alerta-insumo">Se está acabando</span>'
              : "") +
            '</div><div><div class="barra-progreso ' +
            n +
            '"><i style="width:' +
            pct +
            '%"></i></div><div class="meta-insumo">' +
            i.cantidad +
            " " +
            i.unidad +
            " · mínimo " +
            i.minimo +
            " " +
            i.unidad +
            '</div></div><div class="acciones-inventario"><div class="control-desplazamiento"><button onclick="ajustar(\'' +
            i.nombre +
            "',-1)\">−</button><span>" +
            i.cantidad +
            "</span><button onclick=\"ajustar('" +
            i.nombre +
            "',1)\">+</button></div></div></div>"
          );
        })
        .join("");
    }
  }

  const bajos = inventario.filter((i) => i.cantidad <= i.minimo).length;
  if (seleccionar("#pastillaInventario"))
    seleccionar("#pastillaInventario").textContent = bajos;
  if (seleccionar("#kpiInsumos"))
    seleccionar("#kpiInsumos").textContent = bajos;
}

function ajustar(nombre, delta) {
  const i = inventario.find((x) => x.nombre === nombre);
  if (!i) return;
  i.cantidad = Math.max(0, i.cantidad + delta);
  guardarTodo();
  renderizarTodo();
}

function renderizarUsuarios() {
  usuarios =
    JSON.parse(localStorage.getItem("enchulados_usuarios")) || USUARIOS_DEF;
  const visibles = usuarios.filter(
    (u) => !filtro || (u.nombre + u.rol).toLowerCase().includes(filtro),
  );
  const lUsrs = seleccionar("#listaUsuarios");

  if (lUsrs) {
    if (!visibles.length) {
      lUsrs.innerHTML =
        '<div class="vacio"><p>No hay usuarios registrados.</p></div>';
    } else {
      lUsrs.innerHTML = visibles
        .map(
          (u) =>
            '<div class="fila-usuario"><span class="avatar-usuario">' +
            iniciales(u.nombre) +
            '</span><div class="info-usuario"><b>' +
            u.nombre +
            "</b><span>Turno " +
            (u.turnoInicio || "08:00") +
            " - " +
            (u.turnoFin || "17:00") +
            " · " +
            (u.activo ? "Acceso activo" : "Bloqueado") +
            '</span></div><span class="pastilla" style="background:rgba(27,20,16,.08);color:var(--tinta)">' +
            u.rol +
            '</span><label class="interruptor" title="Activar / Desactivar acceso"><input type="checkbox" ' +
            (u.activo ? "checked" : "") +
            " onchange=\"alternarUsuario('" +
            u.usuario +
            '\', this.checked)"><span class="deslizador"></span></label></div>',
        )
        .join("");
    }
  }
}

function alternarUsuario(user, activo) {
  usuarios =
    JSON.parse(localStorage.getItem("enchulados_usuarios")) || USUARIOS_DEF;
  const u = usuarios.find((x) => x.usuario === user);
  if (!u) return;
  u.activo = activo;
  localStorage.setItem("enchulados_usuarios", JSON.stringify(usuarios));
  notificar(
    activo ? "ok" : "warn",
    activo ? "Acceso permitido" : "Acceso denegado",
    u.nombre + (activo ? " ya puede ingresar." : " bloqueado."),
  );
  renderizarTodo();
}

function renderizarPasos() {
  const lPasos = seleccionar("#listaPasos");
  if (lPasos) {
    lPasos.innerHTML = pasos
      .map(
        (p, i) =>
          '<button class="elemento-paso ' +
          (p.hecho ? "completado" : "") +
          '" onclick="marcarPaso(' +
          i +
          ')"><span class="caja-verificacion"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6L9 17l-5-5"/></svg></span><span><span class="texto-paso">' +
          p.t +
          '</span><span class="detalle-paso">' +
          p.d +
          "</span></span></button>",
      )
      .join("");
  }
}

function marcarPaso(i) {
  pasos[i].hecho = !pasos[i].hecho;
  guardarTodo();
  renderizarTodo();
}

function renderizarNotasAdmin() {
  const notasGuardadas = localStorage.getItem("enchulados_notas_caja");
  const contenedorNotas = document.getElementById("panelNotasCaja");
  if (contenedorNotas) {
    if (notasGuardadas && notasGuardadas.trim() !== "") {
      contenedorNotas.textContent = notasGuardadas;
    } else {
      contenedorNotas.textContent =
        "No hay notas registradas por la cajera todavía.";
    }
  }
}

function renderizarReportes() {
  const cVentas = seleccionar("#chartVentas");
  if (cVentas) {
    const vals = [58, 64, 49, 72, 88, 96, 70];
    cVentas.innerHTML = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"]
      .map(
        (d, i) =>
          '<div class="columna-grafica"><span style="font-size:.68rem;color:var(--txt-suave)">$' +
          (vals[i] * 0.09).toFixed(1) +
          'M</span><div class="barra-grafica" style="height:' +
          vals[i] +
          '%"></div><small>' +
          d +
          "</small></div>",
      )
      .join("");
  }

  const rProds = seleccionar("#rankProductos");
  if (rProds) {
    const productos = [
      { n: "Tacos al pastor", v: 68, m: "$1.36M" },
      { n: "Enchiladas verdes", v: 52, m: "$1.04M" },
      { n: "Nachos", v: 44, m: "$748K" },
    ];
    rProds.innerHTML = productos
      .map(
        (p, i) =>
          '<div class="elemento-ranking"><span class="numero-ranking">' +
          (i + 1) +
          '</span><div><span class="nombre-ranking">' +
          p.n +
          '</span><div class="barra-ranking"><i style="width:' +
          Math.round((p.v / 68) * 100) +
          '%"></i></div></div><span class="valor-ranking">' +
          p.m +
          "</span></div>",
      )
      .join("");
  }
}

function renderizarTodo() {
  renderizarPedidos();
  renderizarInventario();
  renderizarUsuarios();
  renderizarPasos();
  renderizarNotasAdmin();
  renderizarReportes();
}

const FORMULARIOS = {
  pedido: {
    titulo: "Registrar un pedido",
    pista: "Llena los datos básicos.",
    html: '<div class="fila-formulario dos"><div class="campo-formulario"><label>¿Para quién es?</label><input id="f_cliente" placeholder="Mesa 3 · Juan o Dir. Calle 10"></div><div class="campo-formulario"><label>Tipo</label><select id="f_tipo"><option>Mesa</option><option>Para llevar</option><option>Domicilio</option></select></div></div><div class="campo-formulario"><label>Detalle</label><textarea id="f_detalle" placeholder="3 Tacos al pastor"></textarea></div><div class="campo-formulario"><label>Total</label><input id="f_total" type="number" placeholder="38000"></div>',
    guardar: function () {
      pedidos.push({
        id: contadorId++,
        cliente: seleccionar("#f_cliente").value.trim() || "Mesa",
        tipo: seleccionar("#f_tipo").value,
        detalle: seleccionar("#f_detalle").value.trim() || "Plato",
        total: parseInt(seleccionar("#f_total").value) || 0,
        estado: "nuevo",
      });
      guardarTodo();
      cambiarVista("pedidos");
      renderizarTodo();
    },
  },
  insumo: {
    titulo: "Agregar insumo",
    pista: "Registra materia prima.",
    html: '<div class="campo-formulario"><label>Nombre</label><input id="f_nombre" placeholder="Tomate"></div><div class="fila-formulario dos"><div class="campo-formulario"><label>Categoría</label><select id="f_cat"><option>Base</option><option>Frescos</option><option>Lácteos</option></select></div><div class="campo-formulario"><label>Unidad</label><select id="f_unidad"><option>kg</option><option>unid.</option></select></div></div><div class="fila-formulario dos"><div class="campo-formulario"><label>Cantidad</label><input id="f_cantidad" type="number" placeholder="10"></div><div class="campo-formulario"><label>Mínimo alerta</label><input id="f_minimo" type="number" placeholder="4"></div></div>',
    guardar: function () {
      inventario.push({
        nombre: seleccionar("#f_nombre").value.trim(),
        categoria: seleccionar("#f_cat").value,
        unidad: seleccionar("#f_unidad").value,
        cantidad: parseInt(seleccionar("#f_cantidad").value) || 0,
        minimo: parseInt(seleccionar("#f_minimo").value) || 1,
      });
      guardarTodo();
      cambiarVista("inventario");
      renderizarTodo();
    },
  },
  usuario: {
    titulo: "Crear usuario",
    pista: "Añade personal al sistema.",
    html: '<div class="campo-formulario"><label>Nombre completo</label><input id="f_nombre" placeholder="Ana Pérez"></div><div class="campo-formulario"><label>Usuario (login)</label><input id="f_usuario" placeholder="ana"></div><div class="campo-formulario"><label>Contraseña</label><input id="f_clave" type="password" placeholder="1234"></div><div class="fila-formulario dos"><div class="campo-formulario"><label>Rol</label><select id="f_rol"><option>Mesera</option><option>Cajera</option><option>Repartidor</option><option>Administrador</option></select></div><div class="campo-formulario"><label>Turno</label><select id="f_jornada"><option value="08:00-16:00">Mañana (08:00 - 16:00)</option><option value="14:00-22:00">Tarde (14:00 - 22:00)</option><option value="00:00-23:59">Completo (24/7)</option></select></div></div>',
    guardar: function () {
      const nombre = seleccionar("#f_nombre").value.trim();
      const usuario = seleccionar("#f_usuario").value.trim().toLowerCase();
      const clave = seleccionar("#f_clave").value.trim();
      if (!nombre || !usuario || !clave) {
        notificar("warn", "Faltan datos", "Llena todos los campos.");
        return false;
      }
      const turno = seleccionar("#f_jornada").value.split("-");

      let listaUsrs =
        JSON.parse(localStorage.getItem("enchulados_usuarios")) || USUARIOS_DEF;

      if (listaUsrs.some((u) => u.usuario === usuario)) {
        notificar(
          "warn",
          "Usuario existente",
          "Ese nombre de usuario ya está registrado.",
        );
        return false;
      }

      listaUsrs.push({
        nombre: nombre,
        usuario: usuario,
        clave: clave,
        rol: seleccionar("#f_rol").value,
        turnoInicio: turno[0],
        turnoFin: turno[1],
        activo: true,
      });

      localStorage.setItem("enchulados_usuarios", JSON.stringify(listaUsrs));

      cambiarVista("usuarios");
      renderizarTodo();
      notificar("ok", "Usuario creado", nombre + " ya puede iniciar sesión.");
    },
  },
};

function abrirModal(tipo) {
  const f = FORMULARIOS[tipo];
  seleccionar("#modalTitulo").textContent = f.titulo;
  seleccionar("#modalPista").textContent = f.pista;
  seleccionar("#modalCuerpo").innerHTML = f.html;
  seleccionar("#modal").classList.add("abierto");
  seleccionar("#modalGuardar").onclick = function () {
    if (f.guardar() !== false) cerrarModal();
  };
}
function cerrarModal() {
  seleccionar("#modal").classList.remove("abierto");
}

function notificar(tipo, titulo, texto) {
  const t = document.createElement("div");
  t.className = "notificacion " + (tipo === "warn" ? "warn" : "ok");
  t.innerHTML = "<span><b>" + titulo + "</b><p>" + texto + "</p></span>";
  seleccionar("#contenedorNotificaciones").appendChild(t);
  setTimeout(function () {
    t.remove();
  }, 3500);
}

renderizarTodo();
