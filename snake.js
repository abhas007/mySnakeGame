let inputDir = {x:0,y:0};
const foodSound = new Audio("Eat.ogg");
const dieSound = new Audio("Die.ogg");
const music = new Audio("Game.mp3");
music.loop = true;
const keySound = new Audio("key.mp3")
var speed = 2;
let score=0;
let lastPaintTime = 0;
var board = document.getElementById("board");
let snakeArr = [
    {x: 1, y: 1}
];
food = {x: 13, y: 15};

document.getElementById("btn").addEventListener("click",function(){
    speed = document.getElementById("speedBox").value;
    music.play();
})
// Game Function

function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime-lastPaintTime)/1000 < 1/speed){return;}
    lastPaintTime=ctime;
    gameEngine();
}

function isCollide(snake){
    for(let i = 1; i<snakeArr.length; i++){
        if(snake[0].x===snakeArr[i].x && snake[0].y===snakeArr[i].y)
        return true;
    }

    if(snake[0].x>=40 || snake[0].x<=0 || snake[0].y>=40 ||snake[0].y<=0)
    return true;
}

function gameEngine(){
    // Collision
    if(isCollide(snakeArr)){
        dieSound.play();
        music.pause();
        inputDir={x:0,y:0};
        alert("Game Over! ");
        snakeArr = [{x:13,y:15}];
        music.play();
        score = 0;
    }
    
    //Food eaten
    if(snakeArr[0].x===food.x && snakeArr[0].y===food.y){
        foodSound.play();
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a = 2; let b = 16;
        food = {x:Math.round(a+(b-a)*Math.random()), y:Math.round(a+(b-a)*Math.random())}
        score++;
        scoreBox.innerHTML="Score: " + score;
    }

    //moving the snake
    for(let i = snakeArr.length -2; i>=0;i--)
    {
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;
    
    
    // Diplay
    
    // Head of snake
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeEl = document.createElement("div");
        snakeEl.style.gridRowStart = e.y;
        snakeEl.style.gridColumnStart = e.x;
        if (index===0){
            snakeEl.classList.add('head');    
        }else{
            snakeEl.classList.add('snake');
        }
        board.appendChild(snakeEl);
    })

    // FOOD
    foodEl = document.createElement("div");
    foodEl.style.gridRowStart = food.y;
    foodEl.style.gridColumnStart = food.x;
    foodEl.classList.add('food');
    board.appendChild(foodEl);
}








//Main LOGIC
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    e.preventDefault();
    inputDir = {x:0, y:0};
    keySound.play();
    switch (e.key){
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        
        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            break;    
        
        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        
        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        
        default:
            break;
        }
})






// const cvs = document.getElementById('canvas');
// const ctx = cvs.getContext('2d');
// let audioName = new Audio();
// audioName.src = "sound.wav";
// // ctx.fillStyle = "red";
// // ctx.fillRect(50,50,10,10);

// let img = new Image(64,64);
// // img.onload = drawImageActualSize;
// img.src="happy.png";

// ctx.drawImage(img,0,0,10,10);

// function drawImageActualSize(){
//     cvs.width = this.naturalWidth;
//     cvs.height = this.naturalHeight;

//     // ctx.drawImage(this,0,0);

//     ctx.drawImage(this,0,0,this.width,this.height);
// }