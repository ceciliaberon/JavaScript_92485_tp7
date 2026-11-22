class Rutina {
    constructor(nombre, duracionMinutos, caloriasPorMinuto, nivelDificultad) {
        this.nombre = nombre;
        this.duracionMinutos = duracionMinutos;
        this.caloriasPorMinuto = caloriasPorMinuto;
        this.nivelDificultad = nivelDificultad;
    }

    calcularCalorias() {
        return this.duracionMinutos * this.caloriasPorMinuto;
    }

    ajustarDuracion(minutosExtra) {
        this.duracionMinutos = this.duracionMinutos + minutosExtra;
    }
}

const catalogoRutinas = [
    new Rutina("Fuerza y Pesas", 60, 7, "Avanzado"),
    new Rutina("Cardio HIIT", 45, 10, "Intermedio"),
    new Rutina("Yoga y Movilidad", 30, 4, "Principiante")
];
const miPlan = [];

const formulario = document.getElementById("form-rutina");
const inputNombre = document.getElementById("nombre");
const inputDuracion = document.getElementById("duracion");
const inputCalorias = document.getElementById("calorias");
const inputNivel = document.getElementById("nivel");
const inputBusqueda = document.getElementById("busqueda");
const selectNivel = document.getElementById("filtro-nivel");
const contenedorCatalogo = document.getElementById("contenedor-rutinas");
const contenedorPlan = document.getElementById("contenedor-plan");
const mensaje = document.getElementById("mensaje");
const resumen = document.getElementById("resumen");
const totalActividades = document.getElementById("total-actividades");
const totalMinutos = document.getElementById("total-minutos");
const totalCalorias = document.getElementById("total-calorias");
const formularioDias = document.getElementById("form-dias");
const inputDias = document.getElementById("dias");
const resultadoDias = document.getElementById("resultado-dias");

function mostrarMensaje(texto, esError) {
    mensaje.textContent = texto;
    if (esError) {
        mensaje.className = "mensaje mensaje-error";
    } else {
        mensaje.className = "mensaje mensaje-exito";
    }
}

function mostrarRutinas() {
    contenedorCatalogo.innerHTML = "";

    const rutinasFiltradas = catalogoRutinas.filter(function(rutina) {
        const coincideNombre = rutina.nombre.toLowerCase().includes(inputBusqueda.value.toLowerCase().trim());
        const coincideNivel = selectNivel.value === "Todos" || rutina.nivelDificultad === selectNivel.value;
        return coincideNombre && coincideNivel;
    });

    resumen.textContent = rutinasFiltradas.length + " de " + catalogoRutinas.length + " rutinas visibles";

    if (rutinasFiltradas.length === 0) {
        contenedorCatalogo.innerHTML = `<p class="sin-resultados">No hay rutinas que coincidan con tu búsqueda.</p>`;
    }

    rutinasFiltradas.forEach(function(rutina) {
        const tarjeta = document.createElement("article");
        tarjeta.className = "tarjeta-rutina";
        tarjeta.innerHTML = `
            <div class="info-rutina">
                <span class="nivel">${rutina.nivelDificultad}</span>
                <h3 class="nombre-rutina"></h3>
                <p>${rutina.duracionMinutos} minutos · ${rutina.caloriasPorMinuto} kcal/min</p>
                <p class="calorias-rutina">Una sesión: ${rutina.calcularCalorias()} kcal</p>
            </div>
            <div class="acciones-rutina">
                <button type="button" class="boton boton-principal boton-elegir">Elegir rutina</button>
            </div>
        `;
        tarjeta.querySelector(".nombre-rutina").textContent = rutina.nombre;
        tarjeta.querySelector(".boton-elegir").addEventListener("click", function() {
            const seleccionada = new Rutina(rutina.nombre, rutina.duracionMinutos, rutina.caloriasPorMinuto, rutina.nivelDificultad);
            miPlan.push(seleccionada);
            mostrarPlan();
            mostrarMensaje("Agregaste " + rutina.nombre + " a tu plan.", false);
        });
        contenedorCatalogo.appendChild(tarjeta);
    });
}

function mostrarPlan() {
    contenedorPlan.innerHTML = "";

    if (miPlan.length === 0) {
        contenedorPlan.innerHTML = `<p class="sin-resultados">Todavía no seleccionaste actividades. Elegí una rutina del catálogo.</p>`;
    }

    miPlan.forEach(function(rutina) {
        const tarjeta = document.createElement("article");
        tarjeta.className = "tarjeta-rutina tarjeta-elegida";
        tarjeta.innerHTML = `
            <div class="info-rutina">
                <span class="nivel">${rutina.nivelDificultad}</span>
                <h3 class="nombre-rutina"></h3>
                <p>${rutina.duracionMinutos} minutos · ${rutina.caloriasPorMinuto} kcal/min</p>
                <p class="calorias-rutina">Sesión estimada: ${rutina.calcularCalorias()} kcal</p>
            </div>
            <div class="acciones-rutina">
                <button type="button" class="boton boton-secundario boton-sumar">+ 5 min</button>
                <button type="button" class="boton boton-eliminar boton-quitar">Quitar del plan</button>
            </div>
        `;
        tarjeta.querySelector(".nombre-rutina").textContent = rutina.nombre;

        tarjeta.querySelector(".boton-sumar").addEventListener("click", function() {
            rutina.ajustarDuracion(5);
            mostrarPlan();
            mostrarMensaje("Sumaste 5 minutos a " + rutina.nombre + " en tu plan.", false);
        });

        tarjeta.querySelector(".boton-quitar").addEventListener("click", function() {
            const posicion = miPlan.indexOf(rutina);
            miPlan.splice(posicion, 1);
            mostrarPlan();
            mostrarMensaje("Quitaste " + rutina.nombre + " de tu plan.", false);
        });
        contenedorPlan.appendChild(tarjeta);
    });
    actualizarTotales();
}

function actualizarTotales() {
    const minutos = miPlan.reduce(function(acumulador, rutina) {
        return acumulador + rutina.duracionMinutos;
    }, 0);
    const calorias = miPlan.reduce(function(acumulador, rutina) {
        return acumulador + rutina.calcularCalorias();
    }, 0);

    totalActividades.textContent = miPlan.length;
    totalMinutos.textContent = minutos + " min";
    totalCalorias.textContent = calorias + " kcal";
}

formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();
    const nombre = inputNombre.value;
    const duracion = parseInt(inputDuracion.value);
    const calorias = parseFloat(inputCalorias.value);
    const nivel = inputNivel.value;

    if (nombre === "" || !(duracion > 0) || !(calorias > 0) || nivel === "") {
        mostrarMensaje("Completá todos los campos con valores válidos.", true);
    } else {
        const nuevaRutina = new Rutina(nombre, duracion, calorias, nivel);
        catalogoRutinas.push(nuevaRutina);
        miPlan.push(new Rutina(nombre, duracion, calorias, nivel));

        formulario.reset();
        inputBusqueda.value = "";
        selectNivel.value = "Todos";
        mostrarRutinas();
        mostrarPlan();
        mostrarMensaje("Creaste " + nombre + " y la agregaste a tu plan.", false);
    }
});

inputBusqueda.addEventListener("input", mostrarRutinas);
selectNivel.addEventListener("change", mostrarRutinas);

formularioDias.addEventListener("submit", function(evento) {
    evento.preventDefault();
    const dias = parseInt(inputDias.value);
    if (!(dias >= 0 && dias <= 7)) {
        resultadoDias.textContent = "Ingresá un número entre 0 y 7.";
    } else if (dias === 0) {
        resultadoDias.textContent = "Esta semana elegiste descansar.";
    } else if (dias < 3) {
        resultadoDias.textContent = "Planificaste menos de 3 días de entrenamiento.";
    } else {
        resultadoDias.textContent = "Planificaste 3 o más días de entrenamiento.";
    }
});

mostrarRutinas();
mostrarPlan();
