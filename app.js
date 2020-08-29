const word = document.getElementById("word")
const text = document.getElementById("text")
const scoreElement = document.getElementById("score")
const timeElement = document.getElementById("time")
const endGameElement = document.getElementById("end-game-container")
const settingsBtn = document.getElementById("settings-btn")
const settings = document.getElementById("settings")
const settingsForm = document.getElementById("settings-form")
const difficultySelect = document.getElementById("difficulty")

let wordPool = [ "perfect", "enjoy", "behave", "grape", "airport", "argument", "produce", "listen", "stuff", "whole", "motionless", "obey", "belligerent", "basin", "rude", "groovy", "dare", "hammer", "admit", "thing","lock","material","thankful","recognise","glove","needless", "slope", "lewd", "drown", "double", "jump" ]

// Init
let randomWord;
let score = 0;
let time = 10;
let difficulty = localStorage.getItem("difficulty") !== null ? localStorage.getItem("difficulty") : "normal"

// Set difficulty on load
difficultySelect.value = difficulty;

text.focus();

// Begin countdown
const timeInterval = setInterval(updateTime, 1000);

function getRandomWord() {
    return wordPool[Math.floor(Math.random() * wordPool.length)]
}

function addWordToDOM() {
    randomWord = getRandomWord();
    word.innerText = randomWord
}

function updateScore() {
    score++;
    scoreElement.innerHTML = score;
}

function updateTime() {
    time--;
    timeElement.innerText = time + "s"

    if (time === 0) {
        clearInterval(timeInterval);
        gameOver();
    }
}

function gameOver() {
    endGameElement.innerHTML = `
        <h1>Time Ran Out</h1>
        <p>Your final score is: ${score}</p>
        <button onclick="location.reload()">Play Again</button>
    `;

    endGameElement.style.display = "flex"
}

addWordToDOM();


// Event Listeners
text.addEventListener("input", (e) => {
    const insertedText = e.target.value;
    
    if (insertedText === randomWord) {
        addWordToDOM();
        updateScore();
        text.value = "";
        switch (difficulty) {
            case "easy": 
                time += 5;
                break;
            case "normal": 
                time += 4;
                break;
            case "hard":
                time += 3;
                break;
        }
        updateTime();
    }
});

settingsBtn.addEventListener("click", () => {
    settings.classList.toggle("hidden");

    settingsBtn.innerHTML = settings.classList.contains("hidden")? settingsBtn.innerHTML = `<i class="fas fa-eye-slash"></i>` : settingsBtn.innerHTML = `<i class="fas fa-eye"></i>`
});

settingsForm.addEventListener("change", e => {
    difficulty = e.target.value;
    
    localStorage.setItem("difficulty", difficulty);

})