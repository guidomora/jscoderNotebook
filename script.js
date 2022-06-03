let divProductos = document.getElementById("divProductos");
let mostrarCarrito = document.getElementById("mostrarCarrito");
let mostrarCarritoo = document.getElementById("mostrarCarritoo");
let costo = 500;
let carrito = [];
let subTotal = [];
let botonEnvio = document.getElementById("botonEnvio");
let botonEnvioo = document.getElementById("botonEnvio");
let botonSinEnvio = document.getElementById("botonSinEnvio");
let botonSinEnvioo = document.getElementById("botonSinEnvioo");


fetch(`./productos.json`)
  .then((response) => response.json())
  .then((ramos) => {
    ramos.forEach((ramos) => {
      let { id, nombre, ramo, precio, flores } = ramos;
      divProductos.innerHTML += `
    <div id="divProductos ${id}" class="productos">
      <h2> Nombre: ${nombre} </h2>
      <p> Tipo: ${ramo} </p>
      <p> Precio: ${precio} </p>
      <p> Flores: ${flores} </p>
      <button id= "boton${id}"> Sumar al carrito </button>
    </div>
  `;
    });
    const productoElegido = ramos.forEach((ramos) => {
      document
        .getElementById(`boton${ramos.id}`)
        .addEventListener("click", () => {
          Toastify({
            text: "Agregado al carrito!",
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "linear-gradient(to right, #d961f7, #f128c2)",
            },
            onClick: function () {}, // Callback after click
          }).showToast();
          localStorage.setItem("ramosCarrito", JSON.stringify(carrito));
          sumarAlCarrito(ramos);
        });
      return carrito;
    });
  });

function sumarAlCarrito(ramos) {
  const existe = carrito.some((element) => element.id === ramos.id);
  const ramoAlCarrito = { ...ramos, cantidad: 1 };
  if (existe) {
    carrito.map((element) => {
      if (element.id === ramos.id) {
        element.cantidad++;
        return element;
      }
    });
  } else {
    carrito.push(ramoAlCarrito);
  }
}

document.getElementById(`mostrarCarrito`).addEventListener("click", () => {
  mostrarCarrito.innerHTML = "";
  carrito.forEach((element) => {
    mostrarCarritoo.innerHTML += ` 
    <div id="divProductos ${element.id}" class="productosElegidos">
      <h2> Nombre: ${element.nombre} </h2>
      <p> Tipo: ${element.ramo} </p>
      <p> Precio: ${element.precio} </p>
      <p> Flores: ${element.flores} </p>
      <p> Cantidad: ${element.cantidad} </p>
      <button id= "borrar ${element.id}" class ="btnBorrar"> Eliminar del carrito </button>
    </div>
    `;
  });
  borrarProducto();
});

function borrarProducto() {
  const btnBorrar = document.querySelectorAll(".btnBorrar");
  btnBorrar.forEach((element) => {
    element.addEventListener("click", (e) => {
      let id = parseInt(e.target.id);
      carrito = carrito.filter((element) => {
        return element.id !== id;
      });
      mostrarCarrito;
    });
  });
}

document.getElementById(`botonEnvio${carrito}`).addEventListener("click", () => {
  const preciosSuma = carrito.map ((datos) => datos.precio);
  console.log(preciosSuma);
});

document.getElementById(`botonSinEnvio${carrito}`).addEventListener("click", () => {
  const preciosSinEnvio = carrito.map ((datos) => datos.precio);
  const conjuntoPrecios = preciosSinEnvio.reduce((precio1, precio2) => precio1 + precio2)
  subTotal.push(conjuntoPrecios);
  subTotal.forEach((precios) => {
    botonSinEnvioo.innerHTML += `
      <div id ="botonSinEnvio">
        <h3> Precio final: ${precios} </h3>
      </div>  
    `
  })
  console.log(subTotal);
});

