const quoteDisplay = document.getElementById("quote");
const input = document.getElementById("input");
const startBtn = document.getElementById("start-btn");
const timeDisplay = document.getElementById("time");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");

const quotes = [
  "The quick brown fox jumps over the lazy dog.",
  "Typing fast requires accuracy and rhythm.",
  "Practice every day to improve your typing speed.",
  "Electron makes building desktop apps fun and easy!"
];

let timer;
let time = 0;
let isRunning = false;
let currentQuote = "";

startBtn.addEventListener("click", startTest);

function startTest() {
  if (isRunning) return;

  isRunning = true;
  input.disabled = false;
  input.value = "";
  input.focus();
  time = 0;
  timeDisplay.textContent = "0";
  wpmDisplay.textContent = "0";
  accuracyDisplay.textContent = "0";

  currentQuote = quotes[Math.floor(Math.random() * quotes.length)];
  quoteDisplay.textContent = currentQuote;

  timer = setInterval(() => {
    time++;
    timeDisplay.textContent = time;
  }, 1000);
}

input.addEventListener("input", () => {
  const typed = input.value;
  const correctChars = countMatchingChars(typed, currentQuote);
  const accuracy = ((correctChars / typed.length) * 100) || 0;
  const words = typed.trim().split(/\s+/).filter(Boolean).length;
  const wpm = Math.round((words / time) * 60) || 0;

  accuracyDisplay.textContent = accuracy.toFixed(1);
  wpmDisplay.textContent = wpm;

  if (typed === currentQuote) {
    clearInterval(timer);
    isRunning = false;
    input.disabled = true;
    quoteDisplay.textContent = "✅ Completed!";
  }
});

function countMatchingChars(a, b) {
  let count = 0;
  for (let i = 0; i < a.length; i++) {
    if (a[i] === b[i]) count++;
  }
  return count;
}
