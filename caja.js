const sesionActual = JSON.parse(localStorage.getItem("enchulados_sesion"));
if (!sesionActual) {
  window.location.href = "index.html";
} else if (
  sesionActual.rol !== "Cajera" &&
  sesionActual.rol !== "Cajero" &&
  !sesionActual.rol.includes("Admin")
) {
  if (sesionActual.rol.includes("Mese")) window.location.href = "mesera.html";
  else if (sesionActual.rol.includes("Repart"))
    window.location.href = "repartidor.html";
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

let pedidoActualId = null;
let totalActualValor = 0;

function mostrarNotificacion(msg) {
  const t = document.getElementById("notificacionFlotante");
  t.textContent = msg;
  t.style.display = "block";
  setTimeout(() => (t.style.display = "none"), 3000);
}

function renderizarCaja() {
  let pedidos = JSON.parse(localStorage.getItem("enchulados_pedidos")) || [];
  let pendientes = pedidos.filter((p) => p.estado !== "entregado");
  let entregados = pedidos.filter((p) => p.estado === "entregado");
  let contenedor = document.getElementById("tablaCaja");

  let ingresosTotales = entregados.reduce((acc, p) => acc + (p.total || 0), 0);
  document.getElementById("etiquetaTotalIngresos").textContent =
    "$" + ingresosTotales.toLocaleString("es-CO");
  document.getElementById("etiquetaTotalFacturados").textContent =
    entregados.length;

  if (!pendientes.length) {
    contenedor.innerHTML =
      '<tr><td colspan="5"><div class="vacio"><p>No hay pedidos pendientes de cobro.</p></div></td></tr>';
  } else {
    contenedor.innerHTML = pendientes
      .map(
        (p) => `
      <tr>
        <td class="numerico">#${p.id}</td>
        <td><strong>${p.cliente}</strong></td>
        <td style="font-size:.8rem; color:var(--txt-suave);">${p.detalle}</td>
        <td class="numerico">$${p.total.toLocaleString("es-CO")}</td>
        <td><button class="boton boton-primario" onclick="abrirCobro(${p.id})">Cobrar</button></td>
      </tr>
    `,
      )
      .join("");
  }

  let notasGuardadas = localStorage.getItem("enchulados_notas_caja") || "";
  document.getElementById("textoNotasCaja").value = notasGuardadas;
}

function abrirCobro(id) {
  let pedidos = JSON.parse(localStorage.getItem("enchulados_pedidos")) || [];
  let p = pedidos.find((x) => x.id === id);
  if (!p) return;

  pedidoActualId = p.id;
  totalActualValor = p.total;

  document.getElementById("tituloCobro").textContent = "Cobrar Pedido #" + p.id;
  document.getElementById("detalleCobro").innerHTML = `
    <div><b>Cliente:</b> ${p.cliente}</div>
    <div><b>Detalle:</b> ${p.detalle}</div>
    <div><b>Total a pagar:</b> <span style="color:var(--chile); font-size:1rem;">$${p.total.toLocaleString("es-CO")}</span></div>
  `;
  document.getElementById("efectivoRecibido").value = "";
  document.getElementById("etiquetaVueltas").textContent = "$0";
  document.getElementById("modalCobro").classList.add("abierto");
}

function calcularVueltas() {
  let recibido =
    parseInt(document.getElementById("efectivoRecibido").value) || 0;
  let vueltas = recibido - totalActualValor;
  let lbl = document.getElementById("etiquetaVueltas");
  if (vueltas >= 0) {
    lbl.textContent = "$" + vueltas.toLocaleString("es-CO");
    lbl.style.color = "var(--jade-d)";
  } else {
    lbl.textContent =
      "Falta dinero ($" + Math.abs(vueltas).toLocaleString("es-CO") + ")";
    lbl.style.color = "var(--chile)";
  }
}

function confirmarPago() {
  let pedidos = JSON.parse(localStorage.getItem("enchulados_pedidos")) || [];
  let p = pedidos.find((x) => x.id === pedidoActualId);
  if (p) {
    p.estado = "entregado";
    localStorage.setItem("enchulados_pedidos", JSON.stringify(pedidos));
    cerrarModal();
    renderizarCaja();
    mostrarNotificacion("¡Pedido cobrado y facturado con éxito!");
  }
}

function cerrarModal() {
  document.getElementById("modalCobro").classList.remove("abierto");
}

function guardarNotasCaja() {
  let notas = document.getElementById("textoNotasCaja").value;
  localStorage.setItem("enchulados_notas_caja", notas);
  mostrarNotificacion("Notas de caja guardadas correctamente.");
}

renderizarCaja();
