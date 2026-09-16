const games = [
{
id: "clicker",
name: "Clicker",
category: "arcade",
icon: "??",
color: "#ef4444",
description: "Haz clic lo más rápido posible."
},
{
id: "reaction",
name: "Reflejos",
category: "arcade",
icon: "?",
color: "#f59e0b",
description: "Pon a prueba tus reflejos."
},
{
id: "memory",
name: "Memoria",
category: "puzzle",
icon: "??",
color: "#3b82f6",
description: "Encuentra todas las parejas."
},
{
id: "number",
name: "Adivina el número",
category: "puzzle",
icon: "??",
color: "#10b981",
description: "Adivina el número secreto."
},
{
id: "basket",
name: "Basket",
category: "sports",
icon: "??",
color: "#f97316",
description: "Consigue la máxima puntuación."
},
{
id: "football",
name: "Fútbol",
category: "sports",
icon: "?",
color: "#22c55e",
description: "Marca tantos goles como puedas."
}
];

let currentCategory = "all";
let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

const gamesContainer = document.getElementById("games");
const searchInput = document.getElementById("search");

function renderGames() {
const search = searchInput.value.toLowerCase();

const filtered = games.filter(game => {
const matchesSearch =
game.name.toLowerCase().includes(search) ||
game.description.toLowerCase().includes(search);

```
let matchesCategory = true;

if (currentCategory === "favorites") {
  matchesCategory = favorites.includes(game.id);
} else if (currentCategory !== "all") {
  matchesCategory = game.category === currentCategory;
}

return matchesSearch && matchesCategory;
```

});

gamesContainer.innerHTML = "";

if (filtered.length === 0) {
gamesContainer.innerHTML = "<p>No se encontraron juegos.</p>";
return;
}

filtered.forEach(game => {
const card = document.createElement("div");
card.className = "card";

```
const isFavorite = favorites.includes(game.id);

card.innerHTML = `
  <div class="thumbnail" style="background:${game.color}">
    ${game.icon}
  </div>

  <button class="favorite" data-id="${game.id}">
    ${isFavorite ? "?" : "?"}
  </button>

  <div class="card-info">
    <h3>${game.name}</h3>
    <p>${game.description}</p>
  </div>
`;

card.addEventListener("click", () => openGame(game));

const favoriteButton = card.querySelector(".favorite");

favoriteButton.addEventListener("click", event => {
  event.stopPropagation();
  toggleFavorite(game.id);
});

gamesContainer.appendChild(card);
```

});
}

function toggleFavorite(id) {
if (favorites.includes(id)) {
favorites = favorites.filter(x => x !== id);
} else {
favorites.push(id);
}

localStorage.setItem("favorites", JSON.stringify(favorites));
renderGames();
}

document.querySelectorAll(".category").forEach(button => {
button.addEventListener("click", () => {
document.querySelectorAll(".category")
.forEach(btn => btn.classList.remove("active"));

```
button.classList.add("active");
currentCategory = button.dataset.category;

renderGames();
```

});
});

searchInput.addEventListener("input", renderGames);

const modal = document.getElementById("gameModal");
const gameTitle = document.getElementById("gameTitle");
const gameArea = document.getElementById("gameArea");

document.getElementById("closeGame").addEventListener("click", closeGame);

modal.addEventListener("click", event => {
if (event.target === modal) closeGame();
});

function openGame(game) {
modal.classList.remove("hidden");
gameTitle.textContent = game.icon + " " + game.name;

if (game.id === "clicker") clickerGame();
if (game.id === "reaction") reactionGame();
if (game.id === "memory") memoryGame();
if (game.id === "number") numberGame();
if (game.id === "basket") basketGame();
if (game.id === "football") footballGame();
}

function closeGame() {
modal.classList.add("hidden");
gameArea.innerHTML = "";
}

/* CLICKER */

function clickerGame() {
let score = 0;
let time = 10;

gameArea.innerHTML = `     <div class="game-box">       <h2>Haz clic durante 10 segundos</h2>       <p>Puntos: <span id="clickScore">0</span></p>       <p>Tiempo: <span id="clickTime">10</span></p>       <br>       <button id="clickTarget">CLICK</button>     </div>
  `;

const target = document.getElementById("clickTarget");

target.onclick = () => {
if (time > 0) {
score++;
document.getElementById("clickScore").textContent = score;
}
};

const timer = setInterval(() => {
time--;
document.getElementById("clickTime").textContent = time;

```
if (time <= 0) {
  clearInterval(timer);
  target.disabled = true;
  target.textContent = "FIN";
}
```

}, 1000);
}

/* REFLEJOS */

function reactionGame() {
gameArea.innerHTML = `     <div class="game-box">       <h2>Espera al verde...</h2>       <button id="reactionButton" class="game-button">
        ESPERA       </button>       <p id="reactionResult"></p>     </div>
  `;

const button = document.getElementById("reactionButton");
const result = document.getElementById("reactionResult");

let startTime;
let ready = false;

const delay = 1000 + Math.random() * 4000;

setTimeout(() => {
ready = true;
startTime = performance.now();

```
button.style.background = "#22c55e";
button.textContent = "¡AHORA!";
```

}, delay);

button.onclick = () => {
if (!ready) {
result.textContent = "¡Demasiado pronto!";
return;
}

```
const reaction = Math.round(performance.now() - startTime);

result.textContent = `Tu tiempo: ${reaction} ms`;
button.disabled = true;
```

};
}

/* MEMORIA */

function memoryGame() {
const emojis = [
"??", "??",
"??", "??",
"??", "??",
"?", "?"
];

emojis.sort(() => Math.random() - 0.5);

gameArea.innerHTML = `     <div class="game-box">       <h2>Encuentra las parejas</h2>       <div class="memory-grid" id="memoryGrid"></div>       <p id="memoryResult"></p>     </div>
  `;

const grid = document.getElementById("memoryGrid");

let first = null;
let second = null;
let locked = false;
let matches = 0;

emojis.forEach(emoji => {
const card = document.createElement("button");

```
card.className = "memory-card";
card.textContent = "?";

card.addEventListener("click", () => {
  if (locked || card === first || card.dataset.matched) {
    return;
  }

  card.textContent = emoji;

  if (!first) {
    first = card;
    return;
  }

  second = card;
  locked = true;

  if (first.textContent === second.textContent) {
    first.dataset.matched = "true";
    second.dataset.matched = "true";

    matches++;
    first = null;
    second = null;
    locked = false;

    if (matches === 4) {
      document.getElementById("memoryResult").textContent =
        "?? ¡Has encontrado todas las parejas!";
    }
  } else {
    setTimeout(() => {
      first.textContent = "?";
      second.textContent = "?";

      first = null;
      second = null;
      locked = false;
    }, 700);
  }
});

grid.appendChild(card);
```

});
}

/* NÚMERO */

function numberGame() {
const secret = Math.floor(Math.random() * 100) + 1;

gameArea.innerHTML = ` <div class="game-box"> <h2>Adivina el número</h2> <p>Estoy pensando en un número entre 1 y 100.</p>

```
  <input id="numberInput"
    type="number"
    min="1"
    max="100"
    placeholder="Tu número">

  <button id="numberButton" class="game-button">
    Comprobar
  </button>

  <p id="numberResult"></p>
</div>
```

`;

const input = document.getElementById("numberInput");
const button = document.getElementById("numberButton");
const result = document.getElementById("numberResult");

button.onclick = () => {
const value = Number(input.value);

```
if (!value) {
  result.textContent = "Introduce un número.";
  return;
}

if (value < secret) {
  result.textContent = "?? Es más alto.";
} else if (value > secret) {
  result.textContent = "?? Es más bajo.";
} else {
  result.textContent = "?? ¡Correcto!";
}
```

};
}

/* BASKET */

function basketGame() {
let score = 0;

gameArea.innerHTML = ` <div class="game-box"> <h2>?? Basket</h2> <p>Haz clic en la pelota para conseguir puntos.</p> <p>Puntos: <span id="basketScore">0</span></p>

```
  <button id="basketButton"
    style="
      font-size:80px;
      border:none;
      background:none;
      cursor:pointer;
    ">
    ??
  </button>
</div>
```

`;

document.getElementById("basketButton").onclick = () => {
score++;
document.getElementById("basketScore").textContent = score;
};
}

/* FÚTBOL */

function footballGame() {
let goals = 0;

gameArea.innerHTML = ` <div class="game-box"> <h2>? Tiros a puerta</h2> <p>Haz clic para disparar.</p> <p>Goles: <span id="goals">0</span></p>

```
  <button id="footballButton"
    style="
      font-size:100px;
      border:none;
      background:none;
      cursor:pointer;
    ">
    ?
  </button>

  <p id="footballResult"></p>
</div>
```

`;

document.getElementById("footballButton").onclick = () => {
const scored = Math.random() > 0.45;

```
if (scored) {
  goals++;
  document.getElementById("goals").textContent = goals;
  document.getElementById("footballResult").textContent =
    "?? ¡GOOOOOOL!";
} else {
  document.getElementById("footballResult").textContent =
    "?? ¡El portero la ha parado!";
}
```

};
}

renderGames();
