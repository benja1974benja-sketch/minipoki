const games = [

{
id: "clicker",
name: "Clicker",
category: "arcade",
icon: "👆",
color: "#ef4444",
description: "Haz tantos clics como puedas."
},

{
id: "reaction",
name: "Reflejos",
category: "arcade",
icon: "⚡",
color: "#f59e0b",
description: "Comprueba tus reflejos."
},

{
id: "memory",
name: "Memoria",
category: "puzzle",
icon: "🧠",
color: "#3b82f6",
description: "Encuentra las parejas."
},

{
id: "number",
name: "Adivina el número",
category: "puzzle",
icon: "🔢",
color: "#10b981",
description: "Encuentra el número secreto."
},

{
id: "basket",
name: "Basket",
category: "sports",
icon: "🏀",
color: "#f97316",
description: "Consigue puntos."
},

{
id: "football",
name: "Fútbol",
category: "sports",
icon: "⚽",
color: "#22c55e",
description: "Marca goles."
},

{
id: "snake",
name: "Snake",
category: "arcade",
icon: "🐍",
color: "#16a34a",
description: "Come las frutas y crece."
},

{
id: "pong",
name: "Pong",
category: "arcade",
icon: "🏓",
color: "#6366f1",
description: "Juega al clásico Pong."
},

{
id: "breakout",
name: "Breakout",
category: "arcade",
icon: "🧱",
color: "#dc2626",
description: "Rompe todos los bloques."
},

{
id: "tetris",
name: "Mini Tetris",
category: "puzzle",
icon: "🧱",
color: "#9333ea",
description: "Coloca las piezas."
},

{
id: "dodge",
name: "Esquiva",
category: "action",
icon: "💥",
color: "#e11d48",
description: "Esquiva los enemigos."
},

{
id: "space",
name: "Nave espacial",
category: "action",
icon: "🚀",
color: "#2563eb",
description: "Destruye los meteoritos."
},

{
id: "star",
name: "Atrapa estrellas",
category: "arcade",
icon: "⭐",
color: "#eab308",
description: "Atrapa las estrellas."
},

{
id: "2048",
name: "2048",
category: "puzzle",
icon: "🔢",
color: "#f59e0b",
description: "Llega hasta 2048."
},

{
id: "tictactoe",
name: "Tres en raya",
category: "puzzle",
icon: "❌",
color: "#ec4899",
description: "Juega contra otra persona."
}

];

let currentCategory = "all";

let favorites =
JSON.parse(localStorage.getItem("favorites") || "[]");

const gamesContainer =
document.getElementById("games");

const searchInput =
document.getElementById("search");

function renderGames() {

const search =
searchInput.value.toLowerCase();

const filtered = games.filter(game => {

```
const matchesSearch =
  game.name.toLowerCase().includes(search) ||
  game.description.toLowerCase().includes(search);

let matchesCategory = true;

if (currentCategory === "favorites") {

  matchesCategory =
    favorites.includes(game.id);

} else if (currentCategory !== "all") {

  matchesCategory =
    game.category === currentCategory;

}

return matchesSearch && matchesCategory;
```

});

gamesContainer.innerHTML = "";

if (filtered.length === 0) {

```
gamesContainer.innerHTML =
  "<p>No se encontraron juegos.</p>";

return;
```

}

filtered.forEach(game => {

```
const card =
  document.createElement("div");

card.className = "card";

const favorite =
  favorites.includes(game.id);

card.innerHTML = `

  <div
    class="thumbnail"
    style="background:${game.color}"
  >
    ${game.icon}
  </div>

  <button class="favorite">
    ${favorite ? "⭐" : "☆"}
  </button>

  <div class="card-info">

    <h3>${game.name}</h3>

    <p>${game.description}</p>

  </div>
`;

card.onclick = () =>
  openGame(game);

const fav =
  card.querySelector(".favorite");

fav.onclick = event => {

  event.stopPropagation();

  toggleFavorite(game.id);

};

gamesContainer.appendChild(card);
```

});

}

function toggleFavorite(id) {

if (favorites.includes(id)) {

```
favorites =
  favorites.filter(x => x !== id);
```

} else {

```
favorites.push(id);
```

}

localStorage.setItem(
"favorites",
JSON.stringify(favorites)
);

renderGames();

}

document
.querySelectorAll(".category")
.forEach(button => {

```
button.onclick = () => {

  document
    .querySelectorAll(".category")
    .forEach(x =>
      x.classList.remove("active")
    );

  button.classList.add("active");

  currentCategory =
    button.dataset.category;

  renderGames();

};
```

});

searchInput.oninput =
renderGames;

const modal =
document.getElementById("gameModal");

const gameTitle =
document.getElementById("gameTitle");

const gameArea =
document.getElementById("gameArea");

document.getElementById("closeGame")
.onclick = closeGame;

modal.onclick = event => {

if (event.target === modal)
closeGame();

};

function openGame(game) {

modal.classList.remove("hidden");

gameTitle.textContent =
game.icon + " " + game.name;

gameArea.innerHTML = "";

const gamesMap = {

```
clicker: clickerGame,
reaction: reactionGame,
memory: memoryGame,
number: numberGame,
basket: basketGame,
football: footballGame,
snake: snakeGame,
pong: pongGame,
breakout: breakoutGame,
tetris: tetrisGame,
dodge: dodgeGame,
space: spaceGame,
star: starGame,
"2048": game2048,
tictactoe: ticTacToe
```

};

gamesMap[game.id]();

}

function closeGame() {

modal.classList.add("hidden");

gameArea.innerHTML = "";

}

/* =========================

1. CLICKER
   ========================= */

function clickerGame() {

let score = 0;

let time = 10;

gameArea.innerHTML = `

```
<div class="game-box">

  <h2>Haz clic durante 10 segundos</h2>

  <div class="score">
    Puntos:
    <span id="clickScore">0</span>
  </div>

  <div class="score">
    Tiempo:
    <span id="clickTime">10</span>
  </div>

  <button id="clickTarget">
    CLICK
  </button>

</div>
```

`;

const button =
document.getElementById("clickTarget");

button.onclick = () => {

```
if (time > 0) {

  score++;

  document.getElementById(
    "clickScore"
  ).textContent = score;

}
```

};

const timer =
setInterval(() => {

```
  time--;

  document.getElementById(
    "clickTime"
  ).textContent = time;

  if (time <= 0) {

    clearInterval(timer);

    button.disabled = true;

    button.textContent = "FIN";

  }

}, 1000);
```

}

/* =========================
2. REFLEJOS
========================= */

function reactionGame() {

gameArea.innerHTML = `

```
<div class="game-box">

  <h2>Espera al verde</h2>

  <button
    id="reactionButton"
    class="game-button"
  >
    ESPERA
  </button>

  <p id="reactionResult"></p>

</div>
```

`;

const button =
document.getElementById(
"reactionButton"
);

const result =
document.getElementById(
"reactionResult"
);

let ready = false;

let start = 0;

const delay =
1000 + Math.random() * 4000;

setTimeout(() => {

```
ready = true;

start =
  performance.now();

button.style.background =
  "#22c55e";

button.textContent =
  "¡AHORA!";
```

}, delay);

button.onclick = () => {

```
if (!ready) {

  result.textContent =
    "❌ ¡Demasiado pronto!";

  return;

}

const time =
  Math.round(
    performance.now() - start
  );

result.textContent =
  `⚡ ${time} ms`;

button.disabled = true;
```

};

}

/* =========================
3. MEMORIA
========================= */

function memoryGame() {

const emojis = [
"🍎","🍎",
"🚀","🚀",
"🐶","🐶",
"⚽","⚽"
];

emojis.sort(
() => Math.random() - .5
);

gameArea.innerHTML = `

```
<div class="game-box">

  <h2>Encuentra las parejas</h2>

  <div
    class="memory-grid"
    id="memoryGrid"
  ></div>

  <p id="memoryResult"></p>

</div>
```

`;

const grid =
document.getElementById(
"memoryGrid"
);

let first = null;

let second = null;

let locked = false;

let matches = 0;

emojis.forEach(emoji => {

```
const card =
  document.createElement("button");

card.className =
  "memory-card";

card.textContent = "❓";

card.onclick = () => {

  if (
    locked ||
    card === first ||
    card.dataset.matched
  ) return;

  card.textContent =
    emoji;

  if (!first) {

    first = card;

    return;

  }

  second = card;

  locked = true;

  if (
    first.textContent ===
    second.textContent
  ) {

    first.dataset.matched =
      "true";

    second.dataset.matched =
      "true";

    matches++;

    first = null;

    second = null;

    locked = false;

    if (matches === 4) {

      document.getElementById(
        "memoryResult"
      ).textContent =
        "🎉 ¡Has ganado!";

    }

  } else {

    setTimeout(() => {

      first.textContent =
        "❓";

      second.textContent =
        "❓";

      first = null;

      second = null;

      locked = false;

    }, 700);

  }

};

grid.appendChild(card);
```

});

}

/* =========================
4. NÚMERO
========================= */

function numberGame() {

const secret =
Math.floor(
Math.random() * 100
) + 1;

gameArea.innerHTML = `

```
<div class="game-box">

  <h2>Adivina el número</h2>

  <p>Entre 1 y 100</p>

  <input
    id="numberInput"
    class="game-input"
    type="number"
  >

  <button
    id="numberButton"
    class="game-button"
  >
    Comprobar
  </button>

  <p id="numberResult"></p>

</div>
```

`;

const input =
document.getElementById(
"numberInput"
);

const button =
document.getElementById(
"numberButton"
);

const result =
document.getElementById(
"numberResult"
);

button.onclick = () => {

```
const value =
  Number(input.value);

if (value < secret) {

  result.textContent =
    "⬆️ Más alto";

} else if (value > secret) {

  result.textContent =
    "⬇️ Más bajo";

} else {

  result.textContent =
    "🎉 ¡Correcto!";

}
```

};

}

/* =========================
5. BASKET
========================= */

function basketGame() {

let score = 0;

gameArea.innerHTML = `

```
<div class="game-box">

  <h2>🏀 Basket</h2>

  <p>
    Puntos:
    <span id="basketScore">0</span>
  </p>

  <button
    id="basketButton"
    style="
      font-size:100px;
      border:none;
      background:none;
      cursor:pointer;
    "
  >
    🏀
  </button>

</div>
```

`;

document.getElementById(
"basketButton"
).onclick = () => {

```
score++;

document.getElementById(
  "basketScore"
).textContent = score;
```

};

}

/* =========================
6. FÚTBOL
========================= */

function footballGame() {

let goals = 0;

gameArea.innerHTML = `

```
<div class="game-box">

  <h2>⚽ Tiros a puerta</h2>

  <p>
    Goles:
    <span id="goals">0</span>
  </p>

  <button
    id="footballButton"
    style="
      font-size:100px;
      border:none;
      background:none;
      cursor:pointer;
    "
  >
    ⚽
  </button>

  <p id="footballResult"></p>

</div>
```

`;

document.getElementById(
"footballButton"
).onclick = () => {

```
if (
  Math.random() > .45
) {

  goals++;

  document.getElementById(
    "goals"
  ).textContent = goals;

  document.getElementById(
    "footballResult"
  ).textContent =
    "🥅 ¡GOOOOOOL!";

} else {

  document.getElementById(
    "footballResult"
  ).textContent =
    "🧤 ¡PARADÓN!";

}
```

};

}

/* =========================
7. SNAKE
========================= */

function snakeGame() {

gameArea.innerHTML = `

```
<div class="game-box">

  <p>Usa las flechas del teclado.</p>

  <canvas
    id="snakeCanvas"
    width="400"
    height="400"
  ></canvas>

  <p id="snakeScore">Puntos: 0</p>

</div>
```

`;

const canvas =
document.getElementById(
"snakeCanvas"
);

const ctx =
canvas.getContext("2d");

const size = 20;

let snake = [
{x:200,y:200}
];

let dx = size;

let dy = 0;

let food = randomFood();

let score = 0;

function randomFood() {

```
return {

  x:
    Math.floor(
      Math.random() * 20
    ) * size,

  y:
    Math.floor(
      Math.random() * 20
    ) * size

};
```

}

document.onkeydown = event => {

```
if (
  event.key === "ArrowUp" &&
  dy === 0
) {

  dx = 0;
  dy = -size;

}

if (
  event.key === "ArrowDown" &&
  dy === 0
) {

  dx = 0;
  dy = size;

}

if (
  event.key === "ArrowLeft" &&
  dx === 0
) {

  dx = -size;
  dy = 0;

}

if (
  event.key === "ArrowRight" &&
  dx === 0
) {

  dx = size;
  dy = 0;

}
```

};

function loop() {

```
const head = {

  x: snake[0].x + dx,

  y: snake[0].y + dy

};

if (
  head.x < 0 ||
  head.y < 0 ||
  head.x >= 400 ||
  head.y >= 400 ||
  snake.some(
    part =>
      part.x === head.x &&
      part.y === head.y
  )
) {

  snake = [
    {x:200,y:200}
  ];

  dx = size;

  dy = 0;

  score = 0;

}

snake.unshift(head);

if (
  head.x === food.x &&
  head.y === food.y
) {

  score++;

  food = randomFood();

} else {

  snake.pop();

}

ctx.fillStyle =
  "#020617";

ctx.fillRect(
  0,0,400,400
);

ctx.fillStyle =
  "#ef4444";

ctx.fillRect(
  food.x,
  food.y,
  size,
  size
);

ctx.fillStyle =
  "#22c55e";

snake.forEach(part => {

  ctx.fillRect(
    part.x,
    part.y,
    size - 2,
    size - 2
  );

});

document.getElementById(
  "snakeScore"
).textContent =
  "Puntos: " + score;
```

}

setInterval(loop,100);

}

/* =========================
8. PONG
========================= */

function pongGame() {

gameArea.innerHTML = `

```
<div class="game-box">

  <p>Usa ↑ y ↓ para mover la pala.</p>

  <canvas
    id="pongCanvas"
    width="700"
    height="400"
  ></canvas>

</div>
```

`;

const canvas =
document.getElementById(
"pongCanvas"
);

const ctx =
canvas.getContext("2d");

let playerY = 170;

let ballX = 350;

let ballY = 200;

let ballDX = 4;

let ballDY = 3;

let enemyY = 170;

document.onkeydown = e => {

```
if (
  e.key === "ArrowUp"
)
  playerY -= 20;

if (
  e.key === "ArrowDown"
)
  playerY += 20;
```

};

function loop() {

```
ballX += ballDX;

ballY += ballDY;

if (
  ballY < 0 ||
  ballY > 390
)
  ballDY *= -1;

enemyY +=
  (ballY - enemyY) * .05;

if (
  ballX < 30 &&
  ballY > playerY &&
  ballY < playerY + 100
)
  ballDX *= -1;

if (
  ballX > 650 &&
  ballY > enemyY &&
  ballY < enemyY + 100
)
  ballDX *= -1;

if (
  ballX < 0 ||
  ballX > 700
) {

  ballX = 350;
  ballY = 200;

  ballDX =
    ballX < 0 ? 4 : -4;

}

ctx.fillStyle =
  "#020617";

ctx.fillRect(
  0,0,700,400
);

ctx.fillStyle =
  "#22c55e";

ctx.fillRect(
  10,
  playerY,
  15,
  100
);

ctx.fillStyle =
  "#ef4444";

ctx.fillRect(
  675,
  enemyY,
  15,
  100
);

ctx.fillStyle =
  "white";

ctx.fillRect(
  ballX,
  ballY,
  10,
  10
);
```

}

setInterval(loop,16);

}

/* =========================
9. BREAKOUT
========================= */

function breakoutGame() {

gameArea.innerHTML = `

```
<div class="game-box">

  <p>Usa ← → para mover la pala.</p>

  <canvas
    id="breakoutCanvas"
    width="700"
    height="450"
  ></canvas>

</div>
```

`;

const canvas =
document.getElementById(
"breakoutCanvas"
);

const ctx =
canvas.getContext("2d");

let paddleX = 300;

let ballX = 350;

let ballY = 400;

let dx = 4;

let dy = -4;

const bricks = [];

for (
let r = 0;
r < 5;
r++
) {

```
for (
  let c = 0;
  c < 10;
  c++
) {

  bricks.push({

    x: c * 70,

    y: r * 25,

    alive: true

  });

}
```

}

document.onkeydown = e => {

```
if (
  e.key === "ArrowLeft"
)
  paddleX -= 25;

if (
  e.key === "ArrowRight"
)
  paddleX += 25;
```

};

function loop() {

```
ballX += dx;

ballY += dy;

if (
  ballX < 0 ||
  ballX > 690
)
  dx *= -1;

if (
  ballY < 0
)
  dy *= -1;

if (
  ballY > 420 &&
  ballX > paddleX &&
  ballX < paddleX + 100
)
  dy *= -1;

if (ballY > 450) {

  ballX = 350;
  ballY = 400;

  dy = -4;

}

bricks.forEach(brick => {

  if (
    brick.alive &&
    ballX > brick.x &&
    ballX < brick.x + 70 &&
    ballY > brick.y &&
    ballY < brick.y + 25
  ) {

    brick.alive = false;

    dy *= -1;

  }

});

ctx.fillStyle =
  "#020617";

ctx.fillRect(
  0,0,700,450
);

bricks.forEach(brick => {

  if (brick.alive) {

    ctx.fillStyle =
      "#8b5cf6";

    ctx.fillRect(
      brick.x + 2,
      brick.y + 2,
      66,
      21
    );

  }

});

ctx.fillStyle =
  "#22c55e";

ctx.fillRect(
  paddleX,
  430,
  100,
  10
);

ctx.fillStyle =
  "#ef4444";

ctx.beginPath();

ctx.arc(
  ballX,
  ballY,
  8,
  0,
  Math.PI * 2
);

ctx.fill();
```

}

setInterval(loop,16);

}

/* =========================
10. MINI TETRIS
========================= */

function tetrisGame() {

gameArea.innerHTML = `

```
<div class="game-box">

  <p>Usa ← → ↓ para mover la pieza.</p>

  <canvas
    id="tetrisCanvas"
    width="300"
    height="500"
  ></canvas>

</div>
```

`;

const canvas =
document.getElementById(
"tetrisCanvas"
);

const ctx =
canvas.getContext("2d");

const cols = 10;

const rows = 16;

const size = 30;

const board =
Array.from(
{length:rows},
() => Array(cols).fill(0)
);

let piece = {

```
x: 4,

y: 0,

shape: [
  [1,1],
  [1,1]
]
```

};

document.onkeydown = e => {

```
if (
  e.key === "ArrowLeft"
)
  piece.x--;

if (
  e.key === "ArrowRight"
)
  piece.x++;

if (
  e.key === "ArrowDown"
)
  piece.y++;
```

};

function draw() {

```
ctx.fillStyle =
  "#020617";

ctx.fillRect(
  0,0,300,500
);

board.forEach(
  (row,y) =>
    row.forEach(
      (cell,x) => {

        if (cell) {

          ctx.fillStyle =
            "#8b5cf6";

          ctx.fillRect(
            x*size,
            y*size,
            size-1,
            size-1
          );

        }

      }
    )
);

piece.shape.forEach(
  (row,y) =>
    row.forEach(
      (cell,x) => {

        if (cell) {

          ctx.fillStyle =
            "#22c55e";

          ctx.fillRect(
            (piece.x+x)*size,
            (piece.y+y)*size,
            size-1,
            size-1
          );

        }

      }
    )
);
```

}

setInterval(() => {

```
piece.y++;

if (
  piece.y >= rows - 2
) {

  piece.y = 0;

  piece.x =
    Math.floor(
      Math.random() * 8
    );

}

draw();
```

},500);

}

/* =========================
11. ESQUIVA
========================= */

function dodgeGame() {

gameArea.innerHTML = `

```
<div class="game-box">

  <p>Usa ← → para moverte.</p>

  <canvas
    id="dodgeCanvas"
    width="500"
    height="450"
  ></canvas>

  <p id="dodgeScore">
    Tiempo: 0
  </p>

</div>
```

`;

const canvas =
document.getElementById(
"dodgeCanvas"
);

const ctx =
canvas.getContext("2d");

let playerX = 230;

let enemyY = -30;

let enemyX =
Math.random() * 470;

let score = 0;

document.onkeydown = e => {

```
if (
  e.key === "ArrowLeft"
)
  playerX -= 20;

if (
  e.key === "ArrowRight"
)
  playerX += 20;
```

};

function loop() {

```
enemyY += 5;

score++;

if (enemyY > 450) {

  enemyY = -30;

  enemyX =
    Math.random() * 470;

}

if (
  enemyY > 390 &&
  enemyX > playerX - 30 &&
  enemyX < playerX + 30
) {

  enemyY = -30;

  enemyX =
    Math.random() * 470;

  score = 0;

}

ctx.fillStyle =
  "#020617";

ctx.fillRect(
  0,0,500,450
);

ctx.fillStyle =
  "#22c55e";

ctx.fillRect(
  playerX,
  410,
  40,
  25
);

ctx.fillStyle =
  "#ef4444";

ctx.fillRect(
  enemyX,
  enemyY,
  30,
  30
);

document.getElementById(
  "dodgeScore"
).textContent =
  "Puntos: " + score;
```

}

setInterval(loop,30);

}

/* =========================
12. NAVE ESPACIAL
========================= */

function spaceGame() {

gameArea.innerHTML = `

```
<div class="game-box">

  <p>← → para mover | ESPACIO para disparar</p>

  <canvas
    id="spaceCanvas"
    width="600"
    height="450"
  ></canvas>

  <p id="spaceScore">
    Puntos: 0
  </p>

</div>
```

`;

const canvas =
document.getElementById(
"spaceCanvas"
);

const ctx =
canvas.getContext("2d");

let playerX = 280;

let score = 0;

const bullets = [];

const enemies = [];

document.onkeydown = e => {

```
if (
  e.key === "ArrowLeft"
)
  playerX -= 20;

if (
  e.key === "ArrowRight"
)
  playerX += 20;

if (
  e.code === "Space"
)
  bullets.push({
    x: playerX + 15,
    y: 410
  });
```

};

setInterval(() => {

```
enemies.push({

  x:
    Math.random() * 570,

  y: 0

});
```

},1000);

function loop() {

```
bullets.forEach(
  bullet =>
    bullet.y -= 8
);

enemies.forEach(
  enemy =>
    enemy.y += 3
);

enemies.forEach(
  (enemy,ei) => {

    bullets.forEach(
      (bullet,bi) => {

        if (
          Math.abs(
            enemy.x - bullet.x
          ) < 25 &&
          Math.abs(
            enemy.y - bullet.y
          ) < 25
        ) {

          enemies.splice(
            ei,1
          );

          bullets.splice(
            bi,1
          );

          score++;

        }

      }
    );

  }
);

ctx.fillStyle =
  "#020617";

ctx.fillRect(
  0,0,600,450
);

ctx.fillStyle =
  "#22c55e";

ctx.fillText(
  "🚀",
  playerX,
  430
);

ctx.font =
  "30px Arial";

bullets.forEach(
  bullet => {

    ctx.fillStyle =
      "#facc15";

    ctx.fillRect(
      bullet.x,
      bullet.y,
      5,
      15
    );

  }
);

enemies.forEach(
  enemy => {

    ctx.fillText(
      "☄️",
      enemy.x,
      enemy.y
    );

  }
);

document.getElementById(
  "spaceScore"
).textContent =
  "Puntos: " + score;
```

}

setInterval(loop,30);

}

/* =========================
13. ATRAPA ESTRELLAS
========================= */

function starGame() {

gameArea.innerHTML = `

```
<div class="game-box">

  <canvas
    id="starCanvas"
    width="500"
    height="400"
  ></canvas>

  <p id="starScore">
    Estrellas: 0
  </p>

</div>
```

`;

const canvas =
document.getElementById(
"starCanvas"
);

const ctx =
canvas.getContext("2d");

let x = 250;

let y = 200;

let score = 0;

function newStar() {

```
x =
  Math.random() * 470 + 15;

y =
  Math.random() * 370 + 15;
```

}

newStar();

canvas.onclick = event => {

```
const rect =
  canvas.getBoundingClientRect();

const mx =
  event.clientX - rect.left;

const my =
  event.clientY - rect.top;

if (
  Math.abs(mx-x) < 30 &&
  Math.abs(my-y) < 30
) {

  score++;

  newStar();

  document.getElementById(
    "starScore"
  ).textContent =
    "Estrellas: " + score;

}
```

};

function draw() {

```
ctx.fillStyle =
  "#020617";

ctx.fillRect(
  0,0,500,400
);

ctx.font =
  "35px Arial";

ctx.fillText(
  "⭐",
  x,
  y
);
```

}

setInterval(
draw,
30
);

}

/* =========================
14. 2048
========================= */

function game2048() {

gameArea.innerHTML = `

```
<div class="game-box">

  <h2>2048</h2>

  <div
    id="game2048Board"
    style="
      display:grid;
      grid-template-columns:repeat(4,70px);
      gap:5px;
      justify-content:center;
    "
  ></div>

  <p>Usa las flechas.</p>

</div>
```

`;

let board =
Array.from(
{length:4},
() => Array(4).fill(0)
);

board[0][0] = 2;

board[1][1] = 2;

function draw() {

```
const container =
  document.getElementById(
    "game2048Board"
  );

container.innerHTML = "";

board.forEach(
  row =>
    row.forEach(
      value => {

        const cell =
          document.createElement(
            "div"
          );

        cell.style.width =
          "70px";

        cell.style.height =
          "70px";

        cell.style.background =
          value
            ? "#f59e0b"
            : "#334155";

        cell.style.display =
          "flex";

        cell.style.alignItems =
          "center";

        cell.style.justifyContent =
          "center";

        cell.style.fontSize =
          "25px";

        cell.textContent =
          value || "";

        container.appendChild(
          cell
        );

      }
    )
);
```

}

document.onkeydown = e => {

```
if (
  ![
    "ArrowUp",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight"
  ].includes(e.key)
)
  return;

const values =
  board
    .flat()
    .filter(Boolean);

values.sort(
  () => Math.random() - .5
);

board =
  Array.from(
    {length:4},
    () => Array(4).fill(0)
  );

values
  .slice(0,16)
  .forEach(
    (value,i) => {

      board[
        Math.floor(i/4)
      ][i%4] = value;

    }
  );

draw();
```

};

draw();

}

/* =========================
15. TRES EN RAYA
========================= */

function ticTacToe() {

gameArea.innerHTML = `

```
<div class="game-box">

  <h2>❌ Tres en raya ⭕</h2>

  <div
    class="board"
    id="ticBoard"
  ></div>

  <p id="ticResult"></p>

  <button
    class="game-button"
    id="ticReset"
  >
    Reiniciar
  </button>

</div>
```

`;

const board =
document.getElementById(
"ticBoard"
);

const result =
document.getElementById(
"ticResult"
);

let cells =
Array(9).fill("");

let player = "❌";

function draw() {

```
board.innerHTML = "";

cells.forEach(
  (value,index) => {

    const cell =
      document.createElement(
        "button"
      );

    cell.className =
      "cell";

    cell.textContent =
      value;

    cell.onclick = () => {

      if (
        cells[index] ||
        winner()
      )
        return;

      cells[index] =
        player;

      player =
        player === "❌"
          ? "⭕"
          : "❌";

      draw();

      if (winner()) {

        result.textContent =
          "🎉 ¡Ganador!";

      }

    };

    board.appendChild(
      cell
    );

  }
);
```

}

function winner() {

```
const combinations = [

  [0,1,2],
  [3,4,5],
  [6,7,8],

  [0,3,6],
  [1,4,7],
  [2,5,8],

  [0,4,8],
  [2,4,6]

];

return combinations.some(
  combo =>
    cells[combo[0]] &&
    cells[combo[0]] ===
    cells[combo[1]] &&
    cells[combo[1]] ===
    cells[combo[2]]
);
```

}

document.getElementById(
"ticReset"
).onclick = () => {

```
cells =
  Array(9).fill("");

player = "❌";

result.textContent = "";

draw();
```

};

draw();

}

renderGames();
