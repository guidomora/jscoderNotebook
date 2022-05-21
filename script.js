
class Ramos {
  constructor(id, nombre, ramo, precio, flores, ) {
    this.id = id
    this.nombre = nombre
    this.ramo = ramo
    this.precio = precio
    this.flores = flores
  }
}

const ramo1 = new Ramos (1, "ramo1", "variado chico", 2500, "flores variadas");
const ramo2 = new Ramos (2, "ramo2", "rosas", 6000, "rosas rojas");
const ramo3 = new Ramos (3, "ramo3", "liliums", 3500, "liliums blanco");
const ramo4 = new Ramos (4, "ramo4", "variado grande", 7000, "flores variadas");

let ramos = [ramo1, ramo2, ramo3, ramo4];
let divProductos = document.getElementById("divProductos");
let divCheckout = document.querySelector(".precios");
let costo = 500;
const carrito = [];
let botonEnvio = document.getElementById("botonEnvio");

const suma = (carrito, costo) => carrito + costo;


ramos.forEach(ramos => {
  divProductos.innerHTML += `
    <div id="divProductos ${ramos.id}" class="productos">
      <img src="" alt="">
      <h2> Nombre: ${ramos.nombre} </h2>
      <p> Tipo: ${ramos.ramo} </p>
      <p> Precio: ${ramos.precio} </p>
      <p> Flores: ${ramos.flores} </p>
      <button id= "boton${ramos.id}"> Sumar al carrito </button>
    </div>
  `
})

const productoElegido = ramos.forEach(ramos => {
  document.getElementById(`boton${ramos.id}`).addEventListener("click", () => {
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
      onClick: function(){} // Callback after click
    }).showToast();
    localStorage.setItem("ramosCarrito", JSON.stringify(carrito));
    sumarAlCarrito(ramos);
  })
  return carrito
})


function sumarAlCarrito (ramos) {
  const existe = carrito.some((element) => element.id === ramos.id);
  const ramoAlCarrito = {...ramos, cantidad: 1}
  if (existe) {
    carrito.map((element) => {
      if (element.id === ramos.id){
        element.cantidad++;
        return element;
      }
    });
  } else {
    carrito.push(ramoAlCarrito);
  }
}

const carritoPrecios = carrito.filter (carrito => {
  return carrito.precio > 0});
console.log(carritoPrecios);

document.getElementById(`botonEnvio${carrito}`).addEventListener("click", () => {
  botonEnvio.innerHTML += `
  <h3> Precio final: ${carritoPrecios} </h3>
` 
})
