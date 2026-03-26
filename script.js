const text = "these thoughts never really stop";
const words = text.split(" ");
const container = document.getElementById("overlayWords");

if (!container) {
  console.error("overlayWords container not found");
}

const fonts = ["serif", "sans-serif", "monospace", "cursive"];
const wordElements = [];

// grid setup (prevents overlap)
const cols = 6;
const rows = 4;
let positions = [];

// generate grid positions
for (let i = 0; i < cols; i++) {
  for (let j = 0; j < rows; j++) {
    positions.push({
      x: (i + 0.5) * (100 / cols),
      y: (j + 0.5) * (100 / rows)
    });
  }
}

// shuffle helper (fixed)
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// create words
shuffle(positions);

words.forEach((word, index) => {
  const el = document.createElement("span");
  el.className = "word";
  el.innerText = word;

  placeWord(el, positions[index % positions.length]);

  container.appendChild(el);
  wordElements.push(el);
});

// place word
function placeWord(el, pos) {
  el.style.top = pos.y + "vh";
  el.style.left = pos.x + "vw";

  // ❌ no font size here (CSS controls it)
  el.style.fontFamily = fonts[Math.floor(Math.random() * fonts.length)];
  el.style.color = "black";
  el.style.opacity = 1;
  el.style.transform = "translate(-50%, -50%)"; // ✅ center nicely
}

// reshuffle (only on interaction)
function reshuffle() {
  shuffle(positions);

  wordElements.forEach((el, i) => {
    placeWord(el, positions[i % positions.length]);
  });
}

// --- INTERACTIONS ---

window.addEventListener("click", (e) => {
  if (e.target.classList.contains("word")) return;
  reshuffle();
});

window.addEventListener("touchstart", (e) => {
  if (e.target.classList.contains("word")) return;
  reshuffle();
});

// smooth scroll trigger (debounced)
let scrollTimeout;

window.addEventListener("scroll", () => {
  clearTimeout(scrollTimeout);

  scrollTimeout = setTimeout(() => {
    reshuffle();
  }, 150);
});

// --- POST HOVER ---

const links = document.querySelectorAll(".post a");

links.forEach((link) => {
  link.addEventListener("mouseenter", () => {
    document.body.classList.add("post-hover");
  });

  link.addEventListener("mouseleave", () => {
    document.body.classList.remove("post-hover");
  });
});

@media (max-width: 600px) {
  .word {
    font-size: 20vw; /* 🔥 huge on phones */
  }
}