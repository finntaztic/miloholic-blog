const text = "these thoughts never really stop lol pls work";
const words = text.split(" ");
const container = document.getElementById("overlayWords");

const fonts = ["serif", "sans-serif", "monospace", "cursive"];
let wordElements = [];

function createGrid() {
  const isMobile = window.innerWidth < 600;
  const cols = isMobile ? 3 : 6;
  const rows = isMobile ? 8 : 5;
  let positions = [];

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      positions.push({
        x: (i + 0.5) * (100 / cols),
        y: (j + 0.5) * (100 / rows)
      });
    }
  }
  return positions.sort(() => Math.random() - 0.5);
}

let activePositions = createGrid();

// Create words once
words.forEach((word, index) => {
  const el = document.createElement("span");
  el.className = "word";
  el.innerText = word;
  el.style.fontFamily = fonts[Math.floor(Math.random() * fonts.length)];
  container.appendChild(el);
  wordElements.push(el);
});

function positionWords() {
  activePositions = createGrid();
  wordElements.forEach((el, i) => {
    const pos = activePositions[i % activePositions.length];
    el.style.left = pos.x + "%";
    el.style.top = pos.y + "%";
  });
}

// Initial placement
positionWords();

// Listeners
window.addEventListener("click", positionWords);
window.addEventListener("touchstart", positionWords);
window.addEventListener("resize", positionWords);