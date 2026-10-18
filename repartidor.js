const sesionActual = JSON.parse(localStorage.getItem("enchulados_sesion"));

if (!sesionActual) {
  window.location.href = "index.html";
} else if (
  sesionActual.rol !== "Repartidor" &&
  sesionActual.rol !== "Domiciliario"
) {
  if (sesionActual.rol.includes("Admin")) window.location.href = "panel.html";
  else if (sesionActual.rol.includes("Mese"))
    window.location.href = "mesera.html";
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

function renderizarDomicilios() {
  let pedidos = JSON.parse(localStorage.getItem("enchulados_pedidos")) || [];
  let domicilios = pedidos.filter(
    (p) => p.tipo === "Domicilio" && p.estado !== "entregado",
  );

  let contenedor = document.getElementById("listaDomicilios");

  if (!domicilios.length) {
    contenedor.innerHTML =
      '<div class="vacio"><p>No hay domicilios pendientes en este momento.</p></div>';
    return;
  }

  contenedor.innerHTML = domicilios
    .map(
      (p) => `
    <div class="tarjeta-domicilio">
      <div class="domicilio-superior">
        <b>Pedido #${p.id}</b>
        <span class="pastilla ${p.estado === "listo" ? "pastilla-listo" : "pastilla-cocina"}">${p.estado === "listo" ? "Listo para llevar" : "Preparándose"}</span>
      </div>
      <div class="domicilio-informacion">
        <div><span>Cliente / Dirección:</span><br><strong>${p.cliente}</strong></div>
        <div><span>Contenido:</span><br>${p.detalle}</div>
        <div><span>Total a cobrar:</span><br><strong>$${p.total.toLocaleString("es-CO")}</strong></div>
      </div>
      <div class="domicilio-acciones">
        <button class="boton boton-primario" onclick="marcarEntregado(${p.id})">Marcar como Entregado</button>
      </div>
    </div>
  `,
    )
    .join("");
}

function marcarEntregado(id) {
  let pedidos = JSON.parse(localStorage.getItem("enchulados_pedidos")) || [];
  let p = pedidos.find((x) => x.id === id);
  if (p) {
    p.estado = "entregado";
    localStorage.setItem("enchulados_pedidos", JSON.stringify(pedidos));
    renderizarDomicilios();
  }
}

renderizarDomicilios();
