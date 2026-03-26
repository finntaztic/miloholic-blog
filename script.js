const text = "these thoughts never really stop";
const words = text.split(" ");
const container = document.getElementById("overlayWords");

const setupGrid = () => {
  const isMobile = window.innerWidth < 600;
  const cols = isMobile ? 3 : 6; // Fewer columns on phone
  const rows = isMobile ? 8 : 4; 
  let positions = [];

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      positions.push({
        x: (i + 0.5) * (100 / cols),
        y: (j + 0.5) * (100 / rows)
      });
    }
  }
  return positions;
};

let positions = setupGrid();
const fonts = ["serif", "sans-serif", "monospace", "cursive"];
const wordElements = [];

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

shuffle(positions);

words.forEach((word, index) => {
  const el = document.createElement("span");
  el.className = "word";
  el.innerText = word;
  container.appendChild(el);
  wordElements.push(el);
  placeWord(el, positions[index % positions.length]);
});

function placeWord(el, pos) {
  el.style.top = pos.y + "%";
  el.style.left = pos.x + "%";
  el.style.fontFamily = fonts[Math.floor(Math.random() * fonts.length)];
}

function reshuffle() {
  shuffle(positions);
  wordElements.forEach((el, i) => {
    placeWord(el, positions[i % positions.length]);
  });
}

window.addEventListener("click", reshuffle);
window.addEventListener("touchstart", reshuffle);
window.addEventListener("resize", () => {
  positions = setupGrid();
  reshuffle();
});