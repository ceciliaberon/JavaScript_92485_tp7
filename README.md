# JavaScript 92485 — Pre-entrega 7

## Simulador de entrenamiento: catálogo y plan personal

Continuamos el simulador del TP6 y reemplazamos la interacción con `prompt`, `alert` y consola por una interfaz HTML con DOM y eventos.

### Cómo funciona

1. **Catálogo de rutinas:** muestra las rutinas disponibles y permite buscarlas por nombre o filtrarlas por nivel. El botón **Elegir rutina** agrega una copia al plan personal.
2. **Mi plan de actividades:** muestra únicamente las rutinas elegidas. Permite sumar 5 minutos a una actividad o quitarla del plan. Calcula el número de actividades, la duración total y las calorías estimadas utilizando `reduce()`.
3. **Crear una rutina propia:** permite ingresar nombre, duración, calorías por minuto y nivel. La rutina se agrega al catálogo y al plan sin recargar la página.
4. **Planificación semanal:** permite indicar cuántos días se pretende entrenar; es independiente del total de sesiones elegidas.

### Conceptos aplicados

- Clase `Rutina`, instancias con `new` y arrays de objetos.
- `forEach`, `filter` y `reduce` de módulos previos.
- Selección de nodos con `getElementById` y `querySelector`.
- Creación de tarjetas con `createElement`, `innerHTML`, backticks, `textContent` y `appendChild`.
- Eventos `click`, `input`, `change` y `submit` con `addEventListener` y `preventDefault`.
- Mensajes de confirmación mediante DOM, sin `prompt`, `alert` ni `console.log`.

### Archivos

- `index.html`
- `css/style.css`
- `js/main.js`

### Ejecución

Abrir `index.html` en un navegador. Elegir una rutina del catálogo y observar el plan y sus totales. Los datos se mantienen mientras la página está abierta; la persistencia con `localStorage` corresponde al TP8.
