// meaningful word array
const meaningfulWords = [
  "incredible",
  "accessibility",
  "wonderful",
  "technology",
  "fascinating",
  "programming",
  "development",
  "communication",
  "opportunity",
  "wonderfully",
  "enthusiastic",
  "perseverance",
  "compassionate",
  "celebration",
  "extraordinary",
  "breathtaking",
  "inspiration",
  "unbelievable",
  "creativity",
  "spectacular",
  "excellence",
  "innovation",
  "collaboration",
  "chocolate",
  "passionate",
  "unforgettable",
  "achievement",
  "determination",
  "congratulations",
  "motivation",
  "intelligence",
  "celebratory",
  "advancement",
  "relationship",
  "challenges",
  "friendship",
  "independence",
  "responsibility",
  "entertainment",
  "communication",
  "experience",
  "appreciation",
  "possibilities",
  "information",
  "perspective",
  "contribution",
  "destination",
  "imagination",
  "interaction",
  "harmonious",
  "fulfillment",
  "delightful",
  "inspirational",
  "considerate",
  "knowledgeable",
  "reflection",
  "remarkable",
  "sensational",
  "perseverant",
  "transformation",
  "opportunities",
  "development",
  "entertaining",
  "experiences",
  "compassion",
  "leadership",
  "discipline",
  "achievement",
  "motivational",
  "wonderfully",
  "encouragement",
  "challenging",
  "celebrations",
  "extraordinarily",
  "friendliness",
  "innovative",
  "enthusiasm",
  "relationship",
  "excellence",
  "collaborative",
  "communication",
  "adaptability",
  "understanding",
  "inspirations",
  "insightful",
  "encouraging",
  "appreciating",
  "knowledge",
  "perseverance",
  "unbelievably",
  "experience",
  "contribution",
  "imagination",
  "possibility",
  "consideration",
  "responsibilities",
  "reflection",
  "remarkably",
  "considerately",
  "satisfaction",
  "development",
  "leadership",
  "motivation",
  "discipline",
  "creativity",
  "inspirational",
  "perspectives",
  "motivating",
  "opportunities",
  "encouragements",
  "fulfillments",
  "transformation",
  "challengingly",
  "interactions",
  "adventurous",
  "independence",
  "relationship",
  "celebratory",
  "remarkableness",
  "friendliness",
  "considerations",
  "innovatively",
  "responsibility",
  "imagination",
  "achievement",
];

function getRandomColorExceptRedGreen() {
  const colors = [
    "blue",
    "purple",
    "orange",
    "yellow",
    "cyan",
    "magenta",
    "brown",
    "pink",
    "gray",
    "teal",
    "lime",
  ];

  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

// canvas variable
const canvasHeight = 500;
const canvasWidth = 800;
let userInput = document.getElementById("input-fields");

// random index function
function randomIndex() {
  return Math.floor(Math.random() * 125);
}

// random text
let randomText = {
  x: 10,
  y: canvasWidth / 4,
  text: meaningfulWords[randomIndex()],
};

// speed
let speed = 0.5;

// game over
let gameOver = false;

// spaceship image
const ship = new Image();
ship.src = "assets/spaceship.png";

// score
let score = 0;

// time
let time = 0;

// level
let level = 1;

// lives
let lives = 3;
let running = true;

// Define the ball object
const ball = {
  x: canvasWidth / 2,
  y: canvasHeight,
  radius: 10,
  speed: 10,
  active: false,
  targetX: 0,
};

const start = () => {
  let canvas = document.getElementById("canvas");
  canvas.height = canvasHeight;
  canvas.width = canvasWidth;
  let ctx = canvas.getContext("2d");
  ctx.fillStyle = "lightblue";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  requestAnimationFrame(update);
};
let randomColor = getRandomColorExceptRedGreen();

// calculating time
timeInterval = setInterval(() => {
  time++;
}, 1000);

const update = () => {
  requestAnimationFrame(update);
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white"; // Set the default color to black

  ctx.font = "25px Arial";
  ctx.fillText(`Score: ${score}`, 650, 50);
  ctx.fillText(`Time: ${time}`, 230, 50);
  ctx.fillText(`Level: ${level}`, 30, 50);
  ctx.fillText(`Lives: ${lives}`, 430, 50);
  ctx.drawImage(ship, 370, canvasHeight - 50, 80, 80);

  ctx.font = "40px Arial";

  const typedText = userInput.value.trim();
  let currentX = randomText.x;

  for (let i = 0; i < randomText.text.length; i++) {
    const letter = randomText.text[i];
    const typedLetter = typedText[i];

    // Set the color to red only if typed letter is present and doesn't match the random letter
    if (typedLetter) {
      if (typedLetter == letter) ctx.fillStyle = "green";
      else ctx.fillStyle = "red";
    } else {
      ctx.fillStyle = randomColor;
    }

    ctx.fillText(letter, currentX, randomText.y);

    // Add spacing between letters and spaces
    const letterWidth = ctx.measureText(letter).width;
    currentX += letterWidth + 2;
  }

  randomText.x += speed;

  // Check if the random text has cross the border
  if (randomText.x > canvasWidth) {
    // if yes decrease the live
    if (!gameOver) {
      lives--;
    }
    // if lives is less than 1 then game over
    if (lives < 1) {
      gameOver = true;
      running = false;
    }
    // reset the random text
    if (running) {
      randomText.x = 10;
      userInput.value = "";
      randomText.text = meaningfulWords[randomIndex()];
      randomColor = getRandomColorExceptRedGreen();
    }
  }

  // Game over
  if (gameOver) {
    ctx.fillStyle = "white";
    ctx.fillText("Game Over", 300, 190);
    ctx.fillText("Enter To Restart", 260, 250);
    clearInterval(timeInterval);
    return;
  }

  // increasing the level when user score reach 10
  switch (score) {
    case 10:
      level = 2;
      speed = 1;
      break;
    case 20:
      level = 3;
      speed = 2;
      break;
    case 30:
      level = 3;
      speed = 3;
      break;

    default:
      break;
  }

  // Update ball position
  if (ball.active) {
    let dx = ball.targetX - ball.x;
    let dy = randomText.y - ball.y;
    let distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > ball.speed) {
      const angle = Math.atan2(dy, dx);
      ball.x += ball.speed * Math.cos(angle);
      ball.y += ball.speed * Math.sin(angle);
    } else {
      ball.x = ball.targetX;
      ball.y = randomText.y;
    }

    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 6);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();

    // Check for collision with randomText
    if (ball.y - ball.radius < randomText.y) {
      if (typedText === randomText.text) {
        ball.x = canvasWidth / 2;
        ball.y = canvasHeight;
        ball.active = false;
        randomText.x = 5;
        userInput.value = "";
        randomText.text = meaningfulWords[randomIndex()];
        randomColor = getRandomColorExceptRedGreen();
        score++;
      }
    }
  }
};

// check the word
userInput.addEventListener("keydown", (e) => {
  if (e.key == "Enter" || e.key == " ") {
    if (userInput.value === randomText.text) {
      e.preventDefault();
      ball.active = true;
      ball.targetX = randomText.x + 150 / 2;
    }
  }
});

window.onload = start();

// restart game
const restartGame = () => {
  location.reload();
};

document.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    restartGame();
  }
});
