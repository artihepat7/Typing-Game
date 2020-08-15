const settingsBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const selectEl = document.getElementById("difficulty");
const wordEl = document.getElementById("word");
const inputEl = document.getElementById("text");
const timeEl = document.getElementById("time");
const scoreEl = document.getElementById("score");
const endGameContainer = document.getElementById("end-game-container");
const settingsForm = document.getElementById("settings-form");
//array of words
const words = [
  "sigh",
  "tense",
  "airplane",
  "ball",
  "pies",
  "juice",
  "warlike",
  "bad",
  "north",
  "dependent",
  "steer",
  "silver",
  "highfalutin",
  "superficial",
  "quince",
  "eight",
  "feeble",
  "admit",
  "drag",
  "loving",
];

const difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

selectEl.value =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

let randomWord;
let score = 0;
let time = 10;
const timeInterval = setInterval(updateTime, 1000);

//print random word
function getWord() {
  randomWord = words[Math.floor(Math.random() * words.length)];
  wordEl.innerHTML = randomWord;
}

getWord();

//get Input
inputEl.addEventListener("input", () => {
  if (randomWord === event.target.value) {
    getWord();
    updateScore();
    inputEl.value = "";

    if (difficulty === "hard") {
      time += 2;
    } else if (difficulty === "medium") {
      time += 3;
    } else {
      time += 5;
    }

    updateTime();
  }
});

function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}

function updateTime() {
  time--;
  timeEl.innerHTML = `${time}s`;
  if (time === 0) {
    clearInterval(timeInterval);
    endGame();
  }
}

function endGame() {
  endGameContainer.innerHTML = `
  <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onclick='location.reload()'>Reload</button>
  `;
  endGameContainer.style.display = "flex";
}

//setting btn
settingsBtn.addEventListener("click", () => {
  settings.classList.toggle("hide");
});

//settengs
selectEl.addEventListener("change", () => {
  console.log(event.target.value);
  const difficulty = event.target.value;
  localStorage.setItem("difficulty", difficulty);
});
