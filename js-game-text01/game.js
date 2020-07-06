let letterContainer = document.getElementById('letter-content')
let startDom = document.getElementsByClassName('start')[0]
let over = document.getElementsByClassName('over')[0]
let board = document.getElementsByClassName('board')[0]
let score = document.getElementById('score')
let lose = document.getElementById('lose')
let lastScore = document.getElementById('last-score') // 最后得分
let maxLose = 10 // 最大失误数
let loseNumber = 0 // 失误数
let letters = [] // 存储字母
let scoreNumber = 0 // 得分
let produceTimer = null
let moveTimer = null

// 初始化的时候字母所在位置
function init() {}
// 开始游戏
function start(){
    startProduce();
    startMove();
    showScore();
    window.onkeydown = function(e){
        action(e)
    }
    startDom.style.display = 'none'
}
function restart(){
    over.style.display = 'none'
    letterContainer.innerHTML = ''
    letters = []
    loseNumber = 0;
    scoreNumber = 0;
    window.onkeydown = function(e){
        action(e)
    }
    startProduce();
    startMove();
    showScore();
}
// 随机数
function getRandom(min, max){
    return Math.floor(Math.random() * (max - min) + min)
}
// 获取随机字母
function getRandomLetter() {
    var code = getRandom(65, 65 + 26)
    return String.fromCharCode(code) 
}
// 字母,构造函数
function Letter() {
    this.letter = getRandomLetter();
    this.left = getRandom(0, letterContainer.clientWidth - 100)
    this.top = -100;
    this.speed = getRandom(10, 100)
    this.img = document.createElement('img')
    this.img.src = './img/letter/' + this.letter + '.png'
    this.img.className = 'letter'
    letterContainer.appendChild(this.img)
    letters.push(this) 
}
Letter.prototype.show = function () {
    this.img.style.top = this.top + "px"
    this.img.style.left = this.left + 'px'
}
Letter.prototype.move = function(duration) {
    var dis = duration / 1000 * this.speed
    this.top += dis;
    this.show();
}
Letter.prototype.outOfRange = function () {
    
    return this.top > letterContainer.clientHeight
}
Letter.prototype.kill = function() {
    this.img.remove(); // 移除该dom
    var index = letters.indexOf(this);
    if(index > -1){
        letters.splice(index, 1)
    }
}
function showScore() {
    board.style.display = 'inline-block'
    score.innerText = scoreNumber
    lose.innerText = loseNumber
}

// 创建一个随机字母
function startProduce() {
    if(produceTimer) {clearInterval(produceTimer);}
    produceTimer = setInterval(() => {
        new Letter();
    }, 1000)
}
// 借宿游戏
function end () {
    stop();
    over.style.display = 'block' // 结束提示语
    lastScore.innerHTML = scoreNumber // 展示最后得分
    window.onkeydown = null;
}
// 
function startMove() {
    if(moveTimer) {clearInterval(moveTimer)}
    moveTimer = setInterval(() => {
        letters.forEach((item, i) => {
            item.move(16);
            if(item.outOfRange()){
                item.kill();
                loseNumber++;
                showScore();
                if(loseNumber == maxLose) {
                    end()
                }
            }
        })
    }, 16)
}
function stop () {
    clearInterval(moveTimer);
    clearInterval(produceTimer);
}

function action(e) {
    if(e.key.length === 1){
        var k = e.key.toUpperCase();
        var let = letters.find(it => it.letter === k)
        if (let) {
            let.kill()
            scoreNumber += 10;
            showScore();
        }
    }
}