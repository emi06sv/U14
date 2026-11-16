// ---------- Selectores ----------
var squares = document.querySelectorAll(".square");
var colorDisplay = document.querySelector("#colorDisplay");
var message = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

// ---------- Variables (se definen en reset) ----------
var numSquares = 6;
var colors;
var pickedColor;

// ---------- Funciones de colores ----------

// Devuelve un color RGB aleatorio con el formato "rgb(240, 14, 128)"
function randomColor() {
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);
  return "rgb(" + r + ", " + g + ", " + b + ")";
}

// Devuelve un Arreglo de "num" colores aleatorios
function generateRandomColors(num) {
  var arr = [];
  for (var i = 0; i < num; i++) {
    arr.push(randomColor());
  }
  return arr;
}

// Devuelve un color random del Arreglo colors
function pickColor() {
  var random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

// Cambia todos los cuadrados (y el h1) al color recibido
function changeColors(color) {
  for (var i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = color;
  }
  h1.style.backgroundColor = color;
}

// ---------- Reset ----------
function reset() {
  // 1. Generar nuevos colores
  colors = generateRandomColors(numSquares);
  // 2. Elegir un color ganador
  pickedColor = pickColor();
  // 3. Actualizar el display
  colorDisplay.textContent = pickedColor;
  resetButton.textContent = "Nuevos colores";
  message.textContent = "";
  h1.style.backgroundColor = "";

  for (var i = 0; i < squares.length; i++) {
    if (colors[i]) {
      squares[i].style.display = "block";
      squares[i].style.backgroundColor = colors[i];
    } else {
      // No hay color para ese índice: se esconde el cuadrado
      squares[i].style.display = "none";
    }
  }
}

// ---------- Listeners ----------
function setupModeButtons() {
  for (var i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener("click", function () {
      modeButtons[0].classList.remove("selected");
      modeButtons[1].classList.remove("selected");
      this.classList.add("selected");

      numSquares = this.dataset.mode === "easy" ? 3 : 6;
      reset();
    });
  }
}

function setupSquares() {
  for (var i = 0; i < squares.length; i++) {
    squares[i].addEventListener("click", function () {
      var clickedColor = this.style.backgroundColor;

      if (clickedColor === pickedColor) {
        message.textContent = "¡Correcto! Encontraste el color.";
        resetButton.textContent = "Jugar otra vez";
        changeColors(clickedColor);
      } else {
        this.style.backgroundColor = getComputedStyle(document.body).backgroundColor;
        message.textContent = "Ese no era. ¡Inténtalo de nuevo!";
      }
    });
  }
}

// ---------- Init ----------
function init() {
  setupModeButtons();
  setupSquares();
  reset();
}

resetButton.addEventListener("click", reset);

init();
