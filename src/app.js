// Range Control to show animation hands
let index = 0;
// To stop animation with clearInterval
let interval;

// Choices
let cpuChoice;
let humanChoice;

// CPU Actions
const cpuOptionList = ["rock", "paper", "scissors"];

// Human Action Buttons
const buttonActions = document.querySelectorAll(".actions-game button");

// Animation CPU Hands
const cpuHandsAnimationImg = document.querySelectorAll(
  ".hands-cpu-animation img"
);

// Display
const displayCpuAnimationhands = document.querySelector(".hands-cpu-animation");
const displayCpuHandResult = document.querySelector(".hands-cpu-result");
const displayActionButtons = document.querySelector(".actions-game");

// Action
const actionButtons = document.querySelectorAll(".in-game");
const displayStartButton = document.querySelector(".start");

// Image
const imageCpuChoice = document.querySelector(".hands-cpu-result img");
const imageHumanChoice = document.querySelector(".hands-human img");

// Score
const cpuScore = document.querySelector(".score-cpu");
const humanScore = document.querySelector(".score-human");
const resultText = document.querySelector(".result-text");

const initGame = () => {
  // Init Events
  startEvents();
  // Start hands animation
  startAnimation(100);
};

const startEvents = () => {
  // Adding actions to click event
  buttonActions.forEach((action) =>
    action.addEventListener("click", (event) => {
      humanChoice = event.target.id;
      imageHumanChoice.src = `./assets/svg/human-${humanChoice}.svg`;
      imageHumanChoice.style.display = "inherit";

      displayCpuAnimationhands.style.display = "none";

      // Stop Animation CPU Hands
      clearInterval(interval);

      generateComputerChoice();
      imageCpuChoice.src = `./assets/svg/cpu-${cpuChoice}.svg`;
      displayCpuHandResult.style.display = "inherit";

      incrementScore(getResult());

      // Resume Animation CPU Hands
      setTimeout(() => {
        startAnimation(100);
        displayActionButtons.style.display = "inherit";
        displayCpuAnimationhands.style.display = "inherit";
        displayCpuHandResult.style.display = "none";
        resultText.style.display = "none";
      }, 2000);
    })
  );
};

// Score control and show the result action
const incrementScore = (result) => {
  displayActionButtons.style.display = "none";
  if (result === "win") {
    humanScore.innerHTML = ++humanScore.innerHTML;
    resultText.innerHTML = "WIN";
  }

  if (result === "loose") {
    cpuScore.innerHTML = ++cpuScore.innerHTML;
    resultText.innerHTML = "LOOSE";
  }

  if (result === "draw") {
    resultText.innerHTML = "DRAW";
  }

  resultText.style.display = "inherit";
};

// Generate CPU action
const generateComputerChoice = () => {
  cpuChoice = cpuOptionList[randonNumber()];
};

// Plays with the results of hands
const getResult = () => {
  const fightResults = {
    paperscissors: "win",
    scissorsrock: "win",
    rockpaper: "win",
    scissorspaper: "loose",
    rockscissors: "loose",
    paperrock: "loose",
  };

  return fightResults[cpuChoice + humanChoice] || "draw";
};

// Animation CPU Hands
const startAnimation = (time) => {
  interval = setInterval(() => {
    cpuHandsAnimationImg.forEach((img) => {
      img.style.display = "none";
    });

    if (index === cpuHandsAnimationImg.length) {
      index = 0;
    }

    cpuHandsAnimationImg[index].style.display = "block";

    index++;
  }, time);
};

// When Start the game
const startGame = () => {
  // Display / Hide buttons
  displayStartButton.style.display = "none";
  actionButtons.forEach((element) => {
    element.style.display = "inherit";
  });
  initGame();
};

// Give me number to CPU action
const randonNumber = () => {
  return Math.floor(Math.random() * cpuOptionList.length);
};
