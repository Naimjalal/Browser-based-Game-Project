const storyPaths = [
  {
      prompt: "You brought back in a jungle. What will you do?",
      image: "images/1st_prompt.jpg",
      choices: {
        Investigate: 1,
        Run: 2,
        Climb: 3
      },
      outcomes: {
        Investigate: "You found a hidden path, proceed!",
        Run: "You tripped over a rock and hurt your leg & you lost 3 health.",
        Climb: "You spotted a safe path from the top of the tree."
      },
      healthEffects: { Investigate: 0, Run: -3, Climb: 0 }
  },
  {
      prompt: "You found a hidden cave. What will you do?",
      image: "images/2nd_prompt.jpg",
      choices: {
        Enter: 4,
        Leave: 5,
        Rest: 6
      },
      outcomes: {
        Enter: "You entered the cave but got ambushed by wild animals. You lost 5 health!",
        Leave: "You left the cave, but you hear something behind you.",
        Rest: "You rested for a while but nothing happened."
      },
      healthEffects: { Enter: -5, Leave: 0, Rest: 0 }
  },
  {
      prompt: "While running, you encounter a dragon. What will you do?",
      image: "images/3rd_prompt.jpg",
      choices: {
        Fight:5,
        Hide: 4,
        RunAgain: 3
      },
      outcomes: {
        Fight: "You fought bravely but got injured & lost 5 health.",
        Hide: "You hid behind a rock, and the dragon flew away.",
        RunAgain: "You kept running and climded a tree."
      },
      healthEffects: { Fight: -5, Hide: 0, RunAgain: 0 }
  },
  {
      prompt: "From the tree, you see a river nearby. What will you do?",
      image: "images/4th_prompt.jpg",
      choices: {
        GoToRiver: 2,
        StayPut: 5,
        ClimbDown: 6
      },
      outcomes: {
        GoToRiver: "You headed towards the river but encountered quicksand! You lost 3 health.",
        StayPut: "You stayed in the tree, but a storm is coming.",
        ClimbDown: "You safely climbed down the tree."
      },
      healthEffects: { GoToRiver: -3, StayPut: 0, ClimbDown: 0 }
  },
  {
    prompt: "You reached the ground, but you're badly injured. You see an abandoned hut nearby. What will you do?",
    image: "images/5th_prompt.jpg",

    choices: {
      Enter: 5,
      Ignore: 2,
      SearchArea:1
    },
    outcomes: {
      Enter: "You entered the hut and found useful supplies.",
      Ignore: "You ignored the hut and continued your journey.",
      SearchArea: "You searched the area but found nothing useful."
    },
    healthEffects: { Enter: 0, Ignore: 0, SearchArea: 0 }
  },
  {
    prompt: "You hear footsteps approaching. What will you do?",
    image: "images/6th_prompt.jpg",
    choices: {
      Hide: 4,
      Run: 2,
      Investigate: 6
    },
    outcomes: {
      Hide: "You hid in the hut, but the footsteps got closer. You lost 5 health from fear.",
      Run: "You ran into a dense part of the jungle but tripped, losing 5 health.",
      Investigate: "You confronted the source of the footsteps and found an ally!"
    },
    healthEffects: { Hide: -5, Run: -5, Investigate: 0 }
  },
  {
    prompt: "You encounter an ally who offers you help. What will you do?",
    image: "images/7th_prompt.jpg",
    choices: {
      AcceptHelp:0,
      RefuseHelp: 2,
      ContinueAlone: 1
    },
    outcomes: {
      AcceptHelp: "Your ally guides you safely out of the jungle.",
      RefuseHelp: "You refuse and continue on, but get lost.",
      ContinueAlone: "You continue alone but encounter more danger."
    },
    healthEffects: { AcceptHelp: 0, RefuseHelp: -3, ContinueAlone: -2 }
  }
];

// DOM Elements
const promptBox = document.getElementById("promptBox");  
const outcomeBox = document.getElementById("outcomeBox");  
const choice1Btn = document.getElementById("choice1");
const choice2Btn = document.getElementById("choice2");
const choice3Btn = document.getElementById("choice3");
const healthDisplay = document.getElementById("healthDisplay");
const restartBtn = document.getElementById("restartBtn");
const storyImage = document.getElementById("storyImage");

// Variables
let currentStoryIndex = 0;
let playerHealth = 10;

// Functions
const renderStory = () => {
  const currentStory = storyPaths[currentStoryIndex];

  
  promptBox.value = currentStory.prompt;
   
if (currentStory.image) {
  storyImage.src = currentStory.image;
} else {
  storyImage.src = "";  
}
  outcomeBox.value = "";
  choice1Btn.disabled = false;
  choice2Btn.disabled = false;
  choice3Btn.disabled = false;
 
  choice1Btn.textContent = Object.keys(currentStory.choices)[0];
  choice2Btn.textContent = Object.keys(currentStory.choices)[1];
  choice3Btn.textContent = Object.keys(currentStory.choices)[2];
};


const buttonChoice = (choice) => {
  const currentStory = storyPaths[currentStoryIndex];
  const nextScenario = currentStory.choices[choice];
  outcomeBox.value = currentStory.outcomes[choice];

  playerHealth += currentStory.healthEffects[choice];
  healthDisplay.textContent = `${playerHealth}`;

 
  if (playerHealth <= 0) {
    outcomeBox.value += "\nYou are out of health. GAME OVER";
    choice1Btn.disabled = true;
    choice2Btn.disabled = true;
    choice3Btn.disabled = true;
    restartBtn.classList.remove("hidden");
  } else if (choice === "AcceptHelp") {
    outcomeBox.value += "\nYou have completed the story!";
    choice1Btn.disabled = true;
    choice2Btn.disabled = true;
    choice3Btn.disabled = true;
    restartBtn.classList.remove("hidden");
  }else if (nextScenario !== undefined) {
    choice1Btn.disabled = true;
    choice2Btn.disabled = true;
    choice3Btn.disabled = true;
    currentStoryIndex = nextScenario;
    setTimeout(renderStory, 4000);
  
  } else {
    
    outcomeBox.value += "\nYou have completed the story!";
    restartBtn.classList.remove("hidden");
  }
};


const restartGame = () => {
  playerHealth = 10;
  currentStoryIndex = 0;
  renderStory();
  healthDisplay.textContent = `${playerHealth}`;
  restartBtn.classList.add("hidden");
  choice1Btn.disabled = false;
  choice2Btn.disabled = false;
  choice3Btn.disabled = false;
};

// Event listeners
choice1Btn.addEventListener("click", () => buttonChoice(choice1Btn.textContent));
choice2Btn.addEventListener("click", () => buttonChoice(choice2Btn.textContent));
choice3Btn.addEventListener("click", () => buttonChoice(choice3Btn.textContent));
restartBtn.addEventListener("click", restartGame);

// Start the game
renderStory();