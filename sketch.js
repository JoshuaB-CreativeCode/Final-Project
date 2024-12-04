let programState = 'start';
let dif = 1;
let score = 0;
let readyUp = 0;
let spawner = 1;
let circleX = -50;
let circleY = -50;
let backgroundSpawner = 1;
let circleColor = 0;
let colorPicker = 1;

function setup() {
    createCanvas(800,800);
    rectMode(CENTER);
    frameRate(60);
    background(150);

}

function draw() {
    switch(programState) {
        case 'start':
            startScreen();
            break;
        case 'game':
            gameScreen();
            break;
        case 'fail':
            failScreen();
            break;
    }
}

function keyReleased() {
    if (keyCode === ENTER) {
        if (programState === 'start' || programState === 'fail') {
            readyUp = 0;
            backgroundSpawner = 1
            spawner = 1
            dif = 1;
            programState = 'game';
            //startState();
        }
    }
}

function startScreen() {
    background(150,150,150);
    textSize(75);
    fill(0);
    textAlign(CENTER);
    text('T h i n k  Q u i c k', 400, 150);
    text('P r e s s  F a s t !', 400, 250);
    textSize(35);
    text('Press "ENTER" to play!', 400, 300);
    text('Objective: \n Press the circle on the screen in time! \n If green, you score! \n If red, you lose :( \n Wait out red circles to score! \n A new circle will appear after you score. \n Score as high as you can!', 400, 400)
}

function gameScreen() {
    readyUp++

    if (backgroundSpawner == 1){
        background(150);
        backgroundSpawner = 0;
    }

    if (readyUp < 180) {
        textSize(50)
        text('Ready?', 400, 400)
    }
    else if (readyUp > 180 && readyUp < 270) {
        if (backgroundSpawner == 0){
            background(150);
            backgroundSpawner = 2
        }
        textSize(50)
        fill('green')
        if (readyUp > 260) {
            fill(150)
            frameCount = 0;
        }
        text('Go!', 400, 400)
    }
    if (readyUp > 180) {
        if (spawner == 1) {
            frameCount = 0;
            circleColor = random(1,70)
            circleX = random(100,700)
            circleY = random(100,700)
            if (circleColor <= 59) {
                fill('green')
            }
            else if (circleColor >= 60) {
                fill('red')
            }
            circle(circleX, circleY, 100)
            spawner = 0
        }
        if (frameCount > 300 && dif == 1) {
            if (circleColor <= 59) {
                programState = 'fail'
            }
            else if (circleColor >= 60) {
                ridBalls();
                spawner = 1
            }
        }
        else if (frameCount > 180 && dif == 2) {
            if (circleColor <= 59) {
                programState = 'fail'
            }
            else if (circleColor >= 60) {
                ridBalls();
                spawner = 1
            }
        }
        else if (frameCount > 90 && dif == 3) {
            if (circleColor <= 59) {
                programState = 'fail'
            }
            else if (circleColor >= 60) {
                ridBalls();
                spawner = 1
            }
        }
    }
}

function ridBalls() {
    background(150);
}

function mousePressed() {
    if (mouseX >= circleX - 50 && mouseX <= circleX + 50){
        if (mouseY >= circleY - 50 && mouseY <= circleY + 50) {
            if (circleColor <= 59) {
                ridBalls();
                spawner = 1
            }
            else if (circleColor >= 60) {
                programState = 'fail'
            }
        }
    }
}

function failScreen() {
    background(150,150,150);
    textSize(75);
    fill(0);
    textAlign(CENTER);
    text('Y O U  F A I L E D !', 400, 150);
    textSize(35);
    text('Press "ENTER" to try again!', 400, 400);
}