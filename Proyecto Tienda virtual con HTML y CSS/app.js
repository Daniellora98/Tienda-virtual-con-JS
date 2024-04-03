document.addEventListener("DOMContentLoaded", function() {
    const productos = [
        { nombre: "VueJS", precio: 25 },
        { nombre: "AngularJS", precio: 25 },
        { nombre: "ReactJS", precio: 25 }
    ];
    let carrito = [];

    // Manejar la selección de talla y cantidad
    const formularios = document.querySelectorAll(".formulario");
    formularios.forEach(formulario => {
        formulario.addEventListener("submit", function(event) {
            event.preventDefault();
            const productoIndex = parseInt(event.target.dataset.productoIndex);
            const talla = event.target.querySelector(".formulario__talla").value;
            const cantidad = parseInt(event.target.querySelector(".formulario__cantidad").value);
            if (talla && cantidad > 0) {
                carrito.push({ producto: productos[productoIndex], talla, cantidad });
                actualizarResumenCompra();
            } else {
                alert("Por favor selecciona talla y cantidad válidas.");
            }
        });
    });

    // Actualizar el resumen de la compra
    function actualizarResumenCompra() {
        const productosSeleccionadosElement = document.getElementById("productosSeleccionados");
        productosSeleccionadosElement.innerHTML = "";
        let totalCompra = 0;
        carrito.forEach(item => {
            const subtotal = item.producto.precio * item.cantidad;
            totalCompra += subtotal;
            const listItem = document.createElement("li");
            listItem.textContent = `${item.cantidad} x ${item.producto.nombre} (${item.talla}) - $${subtotal}`;
            productosSeleccionadosElement.appendChild(listItem);
        });
        document.getElementById("totalCompra").textContent = `Total: $${totalCompra}`;
    }

    // Mostrar el resumen de la compra al hacer clic en "Finalizar compra"
    document.getElementById("finalizarCompra").addEventListener("click", function() {
        actualizarResumenCompra();
        document.getElementById("resumenCompra").style.display = "block";
        // Abrir una nueva ventana con el ticket de los productos obtenidos
        const ticket = carrito.map(item => `${item.cantidad} x ${item.producto.nombre} (${item.talla}) - $${item.producto.precio * item.cantidad}`).join("\n");
        const nuevaVentana = window.open("", "_blank");
        nuevaVentana.document.write("<pre>" + ticket + "</pre>");
    });
});
