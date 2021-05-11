const score = document.querySelector(".score");
const startScreen = document.querySelector(".startScreen");
const gameArea = document.querySelector(".gameArea");
        

let player = { speed: 9, score: 0 };
let keys = {ArrowUp: false,ArrowDown: false,ArrowRight: false,ArrowLeft: false};

startScreen.addEventListener("click", start);
document.addEventListener("keydown", pressOn);
document.addEventListener("keyup", pressOff);

function hareketli_cizgiler() {
    let lines = document.querySelectorAll(".line");
    lines.forEach(function (satir) {
    if (satir.y > 1500) {
        satir.y -= 1500;
    }
    satir.y += player.speed;
    satir.style.top = satir.y + "px";
    });
}

function hareketli_arabalar(car) {
    let otherCar = document.querySelectorAll(".otherCars");
    otherCar.forEach(function (other_car) {
    if (carpisma(car, other_car)) {
        endGame();
    }
    if (other_car.y > 1500) {
        other_car.y = -600;
        other_car.style.left = Math.floor(Math.random() * 350) + "px";
    }
    other_car.y += player.speed;
    other_car.style.top = other_car.y + "px";
    });
}
function carpisma(car1,car2) {
    car1_position = car1.getBoundingClientRect();
    car2_position = car2.getBoundingClientRect();
    return !(car1_position.bottom < car2_position.top ||car1_position.top > car2_position.bottom ||
    car1_position.right < car2_position.left ||car1_position.left > car2_position.right);
}

function playGame() {
    let car = document.querySelector(".car");
    let road = gameArea.getBoundingClientRect();
    hareketli_cizgiler();
    hareketli_arabalar(car);
    if (player.start) {
        if (keys.ArrowUp && player.y > road.top - 542) {
                player.y -= player.speed;
        }
        if (keys.ArrowDown && player.y < road.bottom - 237) {
                player.y += player.speed;
        }
        if (keys.ArrowLeft && player.x > 0) {
                player.x -= player.speed;
        }
        if (keys.ArrowRight && player.x < road.width - 70) {
                player.x += player.speed;
        }
        car.style.left = player.x + "px";
        car.style.top = player.y + "px";
        window.requestAnimationFrame(playGame);
        player.score++;
        score.innerText = "Score: " + player.score;
    }
}

function pressOn(e) {
    e.preventDefault();
    keys[e.key] = true;
}
function pressOff(e) {
    e.preventDefault();
    keys[e.key] = false;
}

function start() {
    music.play();
    startScreen.classList.add("hide");
    gameArea.classList.remove("hide");
    gameArea.innerHTML = "";
    player.start = true;
    player.score = 0;
    for (let x = 0; x < 10; x++) {
        let div = document.createElement("div");
        div.classList.add("line");
        div.y = x * 150;
        div.style.top = x * 150 + "px";
        gameArea.appendChild(div);
    }
    window.requestAnimationFrame(playGame);
    let car = document.createElement("div");
    car.setAttribute("class", "car");
    gameArea.appendChild(car);
    player.x = car.offsetLeft;
    player.y = car.offsetTop;
    for (let x = 0; x < 3; x++) {
        let otherCars = document.createElement("div");
        otherCars.classList.add("otherCars");
        otherCars.y = (x + 1) * 600 * -1;
        otherCars.style.top = otherCars.y + "px";
        otherCars.style.left = Math.floor(Math.random() * 350) + "px";
        otherCars.style.backgroundColor = randomColor();
        gameArea.appendChild(otherCars);

    }
}
function endGame() {
    music.pause();
    player.start = false;
    score.innerHTML = "Game Over<br>Score: " + player.score;
    startScreen.classList.remove("hide");
    startScreen.innerHTML="Tekrar başlamak için buraya tıklayın";
}

function randomColor() {
    function colors() {
          let color = Math.floor(Math.random() * 256).toString(16);
          return ("0" + String(color)).substr(-2);
    }
    return "#" + colors() + colors() + colors();
}

