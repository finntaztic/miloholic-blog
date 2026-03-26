/**
 * Configuration
 */
const text = "these thoughts never really stop";
const words = text.split(" ");
const container = document.getElementById("overlayWords");
const fonts = ["serif", "sans-serif", "monospace", "cursive"];
const wordElements = [];

/**
 * Grid Logic
 * This prevents words from bunching up or bleeding off the screen
 */
function getGridPositions() {
  const isMobile = window.innerWidth < 600;
  
  // Fewer columns on mobile to prevent horizontal overlap
  const cols = isMobile ? 3 : 6; 
  const rows = isMobile ? 8 : 5; 
  const positions = [];

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      positions.push({
        // Add a bit of padding (10% to 90%) so words don't hit screen edges
        x: (i + 0.5) * (100 / cols),
        y: (j + 0.5) * (100 / rows)
      });
    }
  }
  // Shuffle positions so they aren't in a perfect boring grid
  return positions.sort(() => Math.random() - 0.5);
}

/**
 * Initialize Words
 */
function init() {
  if (!container) return;

  const positions = getGridPositions();

  words.forEach((word, index) => {
    const el = document.createElement("span");
    el.className = "word";
    el.innerText = word;
    
    // Randomize style once
    el.style.fontFamily = fonts[Math.floor(Math.random() * fonts.length)];
    
    // Initial Position
    const pos = positions[index % positions.length];
    el.style.left = `${pos.x}%`;
    el.style.top = `${pos.y}%`;

    container.appendChild(el);
    wordElements.push(el);
  });
}

/**
 * Reshuffle Function
 */
function reshuffle() {
  const positions = getGridPositions();
  
  wordElements.forEach((el, i) => {
    const pos = positions[i % positions.length];
    el.style.left = `${pos.x}%`;
    el.style.top = `${pos.y}%`;
  });
}

/**
 * Event Listeners
 */

// Initialize on load
init();

// Shuffle on clicks or taps (unless clicking a specific link)
window.addEventListener("click", (e) => {
  if (e.target.tagName === "A") return; 
  reshuffle();
});

window.addEventListener("touchstart", (e) => {
  if (e.target.tagName === "A") return;
  reshuffle();
}, { passive: true });

// Debounced Reshuffle on Window Resize (Laptop fixing)
let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(reshuffle, 200);
});

// Handle Hover Effect for the Overlay
const links = document.querySelectorAll(".post a");
links.forEach((link) => {
  link.addEventListener("mouseenter", () => {
    document.body.classList.add("post-hover");
  });
  link.addEventListener("mouseleave", () => {
    document.body.classList.remove("post-hover");
  });
});