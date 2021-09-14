let index = 0;
let animation = false;
let cpuChoice;
let humanChoice;
let interval;

const cpuOptionList = ["rock", "paper", "scissors"];

const buttonActions = document.querySelectorAll(".actions-game button");

const cpuHandsAnimationImg = document.querySelectorAll(
  ".hands-cpu-animation img"
);

const displayCpuAnimationhands = document.querySelector(".hands-cpu-animation");
const displayCpuHandResult = document.querySelector(".hands-cpu-result");
const displayStartButton = document.querySelector(".start");
const displayActionButtons = document.querySelector(".actions-game");

const actionButtons = document.querySelectorAll(".in-game");

const imageCpuChoice = document.querySelector(".hands-cpu-result img");
const imageHumanChoice = document.querySelector(".hands-human img");

const cpuScore = document.querySelector(".score-cpu");
const humanScore = document.querySelector(".score-human");
const resultText = document.querySelector(".result-text");

const initApp = () => {
  startEvents();
  startAnimation(100);
};

const startEvents = () => {
  buttonActions.forEach((action) =>
    action.addEventListener("click", (event) => {
      userChoice = event.target.id;

      imageHumanChoice.src = `./assets/svg/human-${userChoice}.svg`;
      imageHumanChoice.style.display = "inherit";
      generateComputerChoice();

      displayCpuAnimationhands.style.display = "none";
      imageCpuChoice.src = `./assets/svg/cpu-${cpuChoice}.svg`;
      displayCpuHandResult.style.display = "inherit";
      clearInterval(interval);
      animation = false;

      incrementScore(getResult());

      setTimeout(() => {
        startAnimation(100);
        displayActionButtons.style.display = "inherit";
        displayCpuAnimationhands.style.display = "inherit";
        displayCpuHandResult.style.display = "none";
        resultText.style.display = "none";
      }, 3000);
    })
  );
};

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

  displayActionButtons.style.display = "none";
  resultText.style.display = "inherit";
};

const generateComputerChoice = () => {
  cpuChoice = cpuOptionList[randonNumber()];
};

const getResult = () => {
  const fightResults = {
    paperscissors: "win",
    scissorsrock: "win",
    rockpaper: "win",
    scissorspaper: "loose",
    rockscissors: "loose",
    paperrock: "loose",
  };

  return fightResults[cpuChoice + userChoice] || "draw";
};

const startAnimation = (time) => {
  if (!animation) {
    animation = true;

    interval = setInterval(() => {
      cpuHandsAnimationImg.forEach((img, index) => {
        img.style.display = "none";
      });

      if (index === cpuHandsAnimationImg.length) {
        index = 0;
      }

      cpuHandsAnimationImg[index].style.display = "block";

      index++;
    }, time);
  }
};

const startGame = () => {
  displayStartButton.style.display = "none";
  actionButtons.forEach((element) => {
    element.style.display = "inherit";
  });
  initApp();
};

const randonNumber = () => {
  return Math.floor(Math.random() * cpuOptionList.length);
};
