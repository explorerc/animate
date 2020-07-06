var letters = [];
var letterContainer = document.querySelector(".letter-container");
var moveTimer = null;
var produceTimer = null;
var scoreDom = document.querySelector("#score");
var score = 0;
var failNumber = 0;
var maxFailNumber = 10;
var gameOverDom = document.querySelector(".over");
function Letter() {
    this.letter = getRandomLetter();
    this.left = getRandom(0, letterContainer.clientWidth - 100);
    this.top = -100;
    this.speed = getRandom(20, 100);//每秒移动的像素值
    this.dom = document.createElement("img");
    this.dom.src = "./img/letter/" + this.letter + ".png";
    this.dom.className = "letter";
    letterContainer.appendChild(this.dom);
    letters.push(this);
    this.show();
}

Letter.prototype.show = function () {
    this.dom.style.top = this.top + "px";
    this.dom.style.left = this.left + "px";
}

Letter.prototype.move = function (duration) {
    var dis = duration / 1000 * this.speed;
    this.top += dis;
    this.show();
}

Letter.prototype.outOfRange = function () {
    if (this.top > letterContainer.clientHeight) {
        return true;
    }
    return false;
}

Letter.prototype.kill = function () {
    this.dom.remove();
    var i = letters.indexOf(this);
    if (i !== -1) {
        letters.splice(i, 1);
    }
}

function showScore() {
    scoreDom.innerHTML = `
        <p>得分：${score}</p>
        <p>丢失：${failNumber} / ${maxFailNumber}</p>
    `;
}

/**
 * 创建一个随机字母，生成可移动的元素，然后将其添加到数组中
 */
function startProduce() {
    clearInterval(produceTimer);
    produceTimer = setInterval(() => {
        new Letter();
    }, 1000);
}

function getRandomLetter() {
    var code = getRandom(65, 65 + 26);
    return String.fromCharCode(code);
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function startMove() {
    clearInterval(moveTimer);
    moveTimer = setInterval(() => {
        for (var i = 0; i < letters.length; i++) {
            var item = letters[i];
            item.move(16);
            if (item.outOfRange()) {
                item.kill();
                i--;
                failNumber++;
                showScore();
                if (failNumber === maxFailNumber) {
                    gameOver();
                }
            }
        }
    }, 16)
}

function gameOver() {
    stop();
    gameOverDom.style.display = "block";
    window.onkeydown = null;
}

function start() {
    startProduce();
    startMove();
}

function stop() {
    clearInterval(moveTimer);
    clearInterval(produceTimer);
}

start();
showScore();

window.onkeydown = function (e) {
    if (e.key.length === 1) {
        var k = e.key.toUpperCase();
        var letter = letters.find(it => it.letter === k);
        if (letter) {
            letter.kill();
            score += 10;
            showScore();
        }
    }
}