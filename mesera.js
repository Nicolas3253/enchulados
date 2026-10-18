const sesionActual = JSON.parse(localStorage.getItem("enchulados_sesion"));

if (!sesionActual) {
  window.location.href = "index.html";
} else if (sesionActual.rol !== "Mesera" && sesionActual.rol !== "Mesero") {
  if (sesionActual.rol.includes("Admin")) window.location.href = "panel.html";
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

function renderizarMesas() {
  let pedidos = JSON.parse(localStorage.getItem("enchulados_pedidos")) || [];
  let html = "";
  for (let i = 1; i <= 12; i++) {
    let nombreMesa = "Mesa " + i;
    let pedidoMesa = pedidos.find(
      (p) =>
        p.tipo === "Mesa" &&
        p.cliente.includes(nombreMesa) &&
        p.estado !== "entregado",
    );
    let ocupada = pedidoMesa ? "ocupada" : "";
    let textoEstado = pedidoMesa
      ? pedidoMesa.estado === "listo"
        ? "¡Listo!"
        : "En cocina"
      : "Disponible";

    html += `
      <div class="boton-mesa ${ocupada}" onclick="seleccionarMesa(${i})">
        <span class="numero-mesa">Mesa ${i}</span>
        <span class="estado-mesa">${textoEstado}</span>
      </div>
    `;
  }
  document.getElementById("gridMesas").innerHTML = html;

  let pedidosSalon = pedidos.filter(
    (p) => p.tipo === "Mesa" && p.estado !== "entregado",
  );
  let htmlPedidos = "";
  if (!pedidosSalon.length) {
    htmlPedidos =
      '<p style="font-size:.82rem;color:var(--txt-suave);text-align:center;padding:1rem;">No hay pedidos activos.</p>';
  } else {
    htmlPedidos = pedidosSalon
      .map(
        (p) => `
      <div class="tarjeta-pedido">
        <div class="pedido-superior">
          <b>${p.cliente}</b>
          <span class="pastilla ${p.estado === "listo" ? "pastilla-listo" : "pastilla-cocina"}">${p.estado === "listo" ? "Listo" : "Cocina"}</span>
        </div>
        <div class="pedido-detalle">${p.detalle}</div>
      </div>
    `,
      )
      .join("");
  }
  document.getElementById("listaPedidosSalon").innerHTML = htmlPedidos;
}

function seleccionarMesa(n) {
  document.getElementById("campoMesa").value = "Mesa " + n;
  abrirModalPedido();
}

function abrirModalPedido() {
  document.getElementById("modalPedido").classList.add("abierto");
}

function cerrarModal() {
  document.getElementById("modalPedido").classList.remove("abierto");
}

function guardarPedidoMesa() {
  let mesa = document.getElementById("campoMesa").value;
  let detalle = document.getElementById("campoDetalle").value.trim();
  let total = parseInt(document.getElementById("campoTotal").value) || 0;

  if (!detalle) {
    alert("Por favor escribe el detalle del pedido.");
    return;
  }

  let pedidos = JSON.parse(localStorage.getItem("enchulados_pedidos")) || [];
  let nuevoId = pedidos.length
    ? Math.max(...pedidos.map((p) => p.id)) + 1
    : 1050;

  pedidos.push({
    id: nuevoId,
    cliente: mesa + " · Salón",
    tipo: "Mesa",
    detalle: detalle,
    total: total,
    estado: "cocina",
  });

  localStorage.setItem("enchulados_pedidos", JSON.stringify(pedidos));
  cerrarModal();
  document.getElementById("campoDetalle").value = "";
  document.getElementById("campoTotal").value = "";
  renderizarMesas();
}

renderizarMesas();
