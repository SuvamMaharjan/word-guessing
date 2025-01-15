 const options = {
    atom: "smallest unit of matter, consisting of protons, neutrons, and electrons",
    cell: "basic unit of life, the building block of all living organisms",
    gravity: "force that pulls objects toward the center of the Earth",
    energy: "ability to do work or cause change, exists in various forms",
    ecosystem: "community of living organisms and their physical environment",
    force: "push or pull that can change the motion of an object",
    friction: "force that resists motion between two objects in contact",
    temperature: "measure of how hot or cold something is, related to particle movement",
    matter: "anything that has mass and occupies space",
    compound: "substance made up of two or more elements chemically bonded",
    element: "a pure substance made of only one kind of atom",
    mixture: "a combination of two or more substances that are not chemically bonded",
    conductor: "material that allows heat or electricity to flow through it easily",
    insulator: "material that resists the flow of heat or electricity",
    evaporation: "process where liquid water changes into water vapor",
    condensation: "process where water vapor cools and changes back into liquid",
    volcano: "a vent in Earth's crust that allows magma to escape and form lava",
    magnetism: "force that attracts or repels materials with magnetic properties",
    rotation: "the spinning of an object around its axis, like Earth's rotation",
    photosynthesis: "process by which plants convert sunlight into energy"    
  };
  
  const message = document.getElementById("message");
  const hintRef = document.querySelector(".hint-ref");
  const controls = document.querySelector(".controls-container");
  const startBtn = document.getElementById("start");
  const letterContainer = document.getElementById("letter-container");
  const userInpSection = document.getElementById("user-input-section");
  const resultText = document.getElementById("result");
  const word = document.getElementById("word");
  const words = Object.keys(options);
  
  let randomWord = "", randomHint = "";
  let winCount = 0, lossCount = 5;
  
  const generateRandomValue = (array) => Math.floor(Math.random() * array.length);
  
  const blocker = () => {
    let lettersButtons = document.querySelectorAll(".letters");
    lettersButtons.forEach((button) => (button.disabled = true));
    stopGame();
  };
  
  startBtn.addEventListener("click", () => {
    controls.classList.add("hide");
    init();
  });
  
  const stopGame = () => {
    controls.classList.remove("hide");
  };
  
  const generateWord = () => {
    letterContainer.classList.remove("hide");
    userInpSection.innerText = "";
    randomWord = words[generateRandomValue(words)];
    randomHint = options[randomWord];
  
    hintRef.innerHTML = `<div id="wordHint"><span>Hint: </span>${randomHint}</div>`;
  
    let displayItem = "";
    randomWord.split("").forEach(() => {
      displayItem += '<span class="inputSpace">_ </span>';
    });
  
    userInpSection.innerHTML = displayItem;
    userInpSection.innerHTML += `<div id='chanceCount'>Chances Left: ${lossCount}</div>`;
  };
  const init = () => {
    winCount = 0;
    lossCount = 5;
    randomWord = "";
    word.innerText = "";
    randomHint = "";
    message.innerText = "";
    userInpSection.innerHTML = "";
    letterContainer.innerHTML = "";
    letterContainer.classList.add("hide");
  
    generateWord();
  
    for (let i = 65; i < 91; i++) {
      let button = document.createElement("button");
      button.classList.add("letters");
      button.innerText = String.fromCharCode(i);
  
      button.addEventListener("click", () => {
        message.innerText = `Correct Letter`;
        message.style.color = "#008000";
        let charArray = randomWord.toUpperCase().split("");
        let inputSpace = document.getElementsByClassName("inputSpace");
  
        if (charArray.includes(button.innerText)) {
          charArray.forEach((char, index) => {
            if (char === button.innerText) {
              button.classList.add("correct");
              inputSpace[index].innerText = char;
              winCount += 1;
              if (winCount === charArray.length) {
                resultText.innerHTML = "You Won!";
                startBtn.innerText = "Restart";
                blocker();
              }
            }
          });
        } else {
          button.classList.add("incorrect");
          lossCount -= 1;
          document.getElementById("chanceCount").innerText = `Chances Left: ${lossCount}`;
          message.innerText = `Incorrect Letter`;
          message.style.color = "#ff0000";
          if (lossCount === 0) {
            word.innerHTML = `The word was: <span>${randomWord}</span>`;
            resultText.innerHTML = "Game Over";
            startBtn.innerText = "Restart";
            blocker();
          }
        }
  
        button.disabled = true;
      });
  
      letterContainer.appendChild(button);
    }
  };
  
  window.onload = () => {
    init();
  };
  
