let divProductos = document.getElementById("divProductos");
let costo = 750;
let carrito = [];
let subTotal = [];
let padreProductos = document.querySelector(".padreProductos");
let botonEnvio = document.getElementById("botonEnvio");
let botonEnvioo = document.getElementById("botonEnvioo");
let botonSinEnvio = document.getElementById("botonSinEnvio");
let botonSinEnvioo = document.getElementById("botonSinEnvioo");
let finalizar = document.getElementById("finalizar");


// Productos diponibles

fetch(`./productos.json`)
  .then((response) => response.json())
  .then((ramos) => {
    ramos.forEach((ramos) => {
      let { id, nombre, ramo, precio, flores} = ramos;
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

// Funcion para que se sumen los productos elegidos al carrito y se le agregue la cantidad

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

// Carrito 

function showCarrito() {
  document.getElementById(`show`).addEventListener("click", () => {
    padreProductos.innerHTML = "";
    carrito.forEach((element) => {
      padreProductos.innerHTML += ` 
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
};

// Funcion para borrar productos del carrito

function borrarProducto() {
  const btnBorrar = document.querySelectorAll(".btnBorrar");
  btnBorrar.forEach((element) => {
    element.addEventListener("click", (e) => {
      let id = parseInt(e.target.id);
      carrito = carrito.filter((element) => {
        return element.id !== id;
      });
    showCarrito();
    });
  });
};

// Boton para calcular el precio final con envio
function envio() {
  document.getElementById(`botonEnvio${carrito}`).addEventListener("click", () => {
    const preciosSinEnvio = carrito.forEach ((carrito) => {
      const preciosProducto = [(carrito.precio * carrito.cantidad) + costo];
      const precioFinal = preciosProducto.reduce ((precio1, precio2)=> precio1 + precio2);
      subTotal.push(precioFinal);
    });
    subTotal.forEach((precios) => {
      botonEnvioo.innerHTML += `
          <h3> Precio final: ${precios} </h3>
      `
    })
    console.log(subTotal);
  });
};



// Boton para calcular el precio final sin envio
function sinEnvio() {
  document.getElementById(`botonSinEnvio${carrito}`).addEventListener("click", () => {
    const preciosSinEnvio = carrito.forEach ((carrito) => {
      const preciosProducto = [carrito.precio * carrito.cantidad];
      const precioFinal = preciosProducto.reduce((precio1, precio2) => precio1 + precio2);
      subTotal.push(precioFinal);
    });
    subTotal.forEach((precios) => {
      botonSinEnvioo.innerHTML += `
          <h3> Precio final: ${precios} </h3>
      `
    })
    console.log(subTotal);
  });
};


// Boton para finalizar la compra
function finalizarCompra() { 
  document.getElementById(`finalizar`).addEventListener("click",() => {
      Swal.fire({
      title: 'Estas por finalizar la compra',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, finalizar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Felicitaciones!',
          'Tu compra se ha realizado con exito.',
          'success'
        )
      }
    })
  })
};

showCarrito();
envio();
sinEnvio();
finalizarCompra();